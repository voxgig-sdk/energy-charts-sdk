-- EnergyCharts SDK

local json = require("dkjson")
local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")
local unreadable_body = require("utility.unreadable_body")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Typed-model annotations (LuaLS ---@class); empty at runtime.
require("energy-charts_types")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local EnergyChartsSDK = {}

-- The options and the root context both hold the credential. They live in
-- a side table rather than in the client, so a dump or an encoder walking
-- the client's fields never reaches them; `sdk.options` still reads and
-- writes through the metamethods, and options_map() is the documented way
-- to read the credential back.
local HIDDEN = { options = true, _rootctx = true }
local SLOTS = setmetatable({}, { __mode = "k" })

EnergyChartsSDK.__index = function(self, key)
  local member = rawget(EnergyChartsSDK, key)
  if member ~= nil then
    return member
  end
  if HIDDEN[key] then
    local slots = SLOTS[self]
    return slots ~= nil and slots[key] or nil
  end
  return nil
end

EnergyChartsSDK.__newindex = function(self, key, val)
  if HIDDEN[key] then
    local slots = SLOTS[self]
    if slots == nil then
      slots = {}
      SLOTS[self] = slots
    end
    slots[key] = val
  else
    rawset(self, key, val)
  end
end

-- The client's own record: what a serialiser or clean's snapshot sees in
-- place of the client, so neither reaches the options through it.
function EnergyChartsSDK:to_record()
  return { sdk = "EnergyCharts", mode = self.mode }
end

EnergyChartsSDK.__tostring = function(self)
  return "EnergyChartsSDK mode=" .. tostring(self.mode)
end

EnergyChartsSDK.__tojson = function(self)
  return json.encode(self:to_record())
end


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

EnergyChartsSDK._make_feature = _make_feature


function EnergyChartsSDK.new(options)
  local self = setmetatable({}, EnergyChartsSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config_shared")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features in the resolved order (make_options puts an explicit list
  -- order first, else defaults to test-first). Ordering matters: the `test`
  -- feature installs the base mock transport and the transport features
  -- (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
  -- must be added before them to sit at the base of the chain.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local featureorder = vs.getpath(self.options, "__derived__.featureorder")
    if type(featureorder) == "table" then
      for _, fname in ipairs(featureorder) do
        local fopts = helpers.to_map(feature_opts[fname])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- CONSUMED, not kept. `extend` holds feature INSTANCES, and every shipped
  -- feature's init stores `self.client = ctx.client` - so leaving the list
  -- in self.options makes the options map CYCLIC (client.options.extend[1]
  -- .client == client), and options_map()'s vs.clone, which has no cycle
  -- guard, blew the stack on the first prepare_auth of any client built with
  -- an extend feature. The instances live on self.features from here on,
  -- which is the only place anything reads them; the SAME table is
  -- self._rootctx.options, so the root context loses the key too.
  self.options["extend"] = nil

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

    -- feature: ratelimit
  -- feature: retry
  -- feature: test
  -- feature: timeout


  return self
end


function EnergyChartsSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function EnergyChartsSDK:get_utility()
  return Utility.copy(self._utility)
end


function EnergyChartsSDK:get_root_ctx()
  return self._rootctx
end


function EnergyChartsSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" or method == "" then method = "GET" end
  method = string.upper(method)

  local allow_method = vs.getpath(options, "allow.method")
  if not helpers.allowed(allow_method, method) then
    return nil, ctx:make_error("spec_method_allow",
      'Method "' .. method ..
      '" not allowed by SDK option allow.method value: "' .. tostring(allow_method or "") .. '"')
  end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


-- Raw endpoint access is operator-controllable, like every entity op.
-- Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
-- either one reaches the same endpoint.
function EnergyChartsSDK:direct(fetchargs)
  if not self:_op_allowed("direct") then
    return self:_op_denied("direct"), nil
  end

  return self:_raw_request(fetchargs)
end


-- Is this raw-access op permitted by the SDK's allow.op option?
function EnergyChartsSDK:_op_allowed(op)
  return helpers.allowed(vs.getpath(self.options, "allow.op"), op)
end


function EnergyChartsSDK:_op_denied(op)
  local allow = vs.getpath(self.options, "allow.op")
  if type(allow) ~= "string" then allow = "" end
  return {
    ok = false,
    err = "EnergyChartsSDK: " .. op .. ": operation not allowed by" ..
      " SDK option allow.op value: \"" .. allow .. "\"",
  }
end


-- Ungated request path shared by direct and graphql, each of which checks its
-- own allow.op token first. Private, rather than a flag on fetchargs: a
-- caller-supplied marker would let anyone opt straight back out of the gate
-- by passing it.
function EnergyChartsSDK:_raw_request(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = utility.clean(ctx, fetch_err) }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    local body_err = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
      if vs.getprop(fetched, "unreadable") == true then
        local failed = nil
        if status < 200 or status >= 300 then
          failed = ctx:make_error("request_status",
            "request: " .. tostring(status) .. ": " .. tostring(vs.getprop(fetched, "statusText")))
        end
        body_err = unreadable_body(ctx, status, headers, vs.getprop(fetched, "body"),
          fetchdef["headers"], failed)
      end
    end

    local out = {
      ok = body_err == nil and status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }
    if body_err ~= nil then
      out.err = utility.clean(ctx, body_err)
    end
    return out, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end


-- Raw GraphQL access: the pressure valve that makes the generated surface's
-- deliberate omissions (per-call selection sets, typed filter builders,
-- batching, subscriptions) livable — the whole schema stays reachable.
--
-- Thin wrapper over the same prepare/fetch path direct uses, with the one
-- thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200 as
-- a top-level `errors` array, so status alone would report a failed query as
-- ok.
--
-- NOTE: like direct, this bypasses the feature pipeline — no retry, ratelimit
-- or paging features apply.
function EnergyChartsSDK:graphql(query, variables, ctrl)
  if not self:_op_allowed("graphql") then
    return self:_op_denied("graphql"), nil
  end

  local res, err = self:_raw_request({
    method = "POST",
    headers = { ["content-type"] = "application/json" },
    body = {
      query = query,
      variables = type(variables) == "table" and variables or {},
    },
    ctrl = type(ctrl) == "table" and ctrl or {},
  })

  if err ~= nil or type(res) ~= "table" then
    return res, err
  end

  -- Errors are read BEFORE any status check: a GraphQL parse or validation
  -- failure comes back as HTTP 400 carrying the standard { errors = {...} }
  -- body, and the raw path represents a non-2xx as ok=false with no err — so
  -- returning early on status would discard the server's own diagnostics,
  -- which are the only useful part of that response.
  local errors = vs.getpath(res, "data.errors")

  if type(errors) == "table" and 0 < #errors then
    local msg = vs.getprop(errors[1], "message")
    if type(msg) ~= "string" or msg == "" then
      msg = "graphql error"
    end
    res.ok = false
    res.err = "EnergyChartsSDK: graphql: " .. msg
    res.graphql = errors
  end

  return res, nil
end



-- Idiomatic facade: client:Cbet():list() / client:Cbet():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:Cbet(data)
  local EntityMod = require("entity.cbet_entity")
  if data == nil then
    if self._cbet == nil then
      self._cbet = EntityMod.new(self, nil)
    end
    return self._cbet
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Cbpf():list() / client:Cbpf():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:Cbpf(data)
  local EntityMod = require("entity.cbpf_entity")
  if data == nil then
    if self._cbpf == nil then
      self._cbpf = EntityMod.new(self, nil)
    end
    return self._cbpf
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Frequency():list() / client:Frequency():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:Frequency(data)
  local EntityMod = require("entity.frequency_entity")
  if data == nil then
    if self._frequency == nil then
      self._frequency = EntityMod.new(self, nil)
    end
    return self._frequency
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:InstalledModel():list() / client:InstalledModel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:InstalledModel(data)
  local EntityMod = require("entity.installed_model_entity")
  if data == nil then
    if self._installed_model == nil then
      self._installed_model = EntityMod.new(self, nil)
    end
    return self._installed_model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Price():list() / client:Price():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:Price(data)
  local EntityMod = require("entity.price_entity")
  if data == nil then
    if self._price == nil then
      self._price = EntityMod.new(self, nil)
    end
    return self._price
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PublicPower():list() / client:PublicPower():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:PublicPower(data)
  local EntityMod = require("entity.public_power_entity")
  if data == nil then
    if self._public_power == nil then
      self._public_power = EntityMod.new(self, nil)
    end
    return self._public_power
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:PublicPowerForecast():list() / client:PublicPowerForecast():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:PublicPowerForecast(data)
  local EntityMod = require("entity.public_power_forecast_entity")
  if data == nil then
    if self._public_power_forecast == nil then
      self._public_power_forecast = EntityMod.new(self, nil)
    end
    return self._public_power_forecast
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RenShareDailyAvg():list() / client:RenShareDailyAvg():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:RenShareDailyAvg(data)
  local EntityMod = require("entity.ren_share_daily_avg_entity")
  if data == nil then
    if self._ren_share_daily_avg == nil then
      self._ren_share_daily_avg = EntityMod.new(self, nil)
    end
    return self._ren_share_daily_avg
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:RenShareModel():list() / client:RenShareModel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:RenShareModel(data)
  local EntityMod = require("entity.ren_share_model_entity")
  if data == nil then
    if self._ren_share_model == nil then
      self._ren_share_model = EntityMod.new(self, nil)
    end
    return self._ren_share_model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SolarShare():list() / client:SolarShare():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:SolarShare(data)
  local EntityMod = require("entity.solar_share_entity")
  if data == nil then
    if self._solar_share == nil then
      self._solar_share = EntityMod.new(self, nil)
    end
    return self._solar_share
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SolarShareDailyAvg():list() / client:SolarShareDailyAvg():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:SolarShareDailyAvg(data)
  local EntityMod = require("entity.solar_share_daily_avg_entity")
  if data == nil then
    if self._solar_share_daily_avg == nil then
      self._solar_share_daily_avg = EntityMod.new(self, nil)
    end
    return self._solar_share_daily_avg
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TotalPower():list() / client:TotalPower():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:TotalPower(data)
  local EntityMod = require("entity.total_power_entity")
  if data == nil then
    if self._total_power == nil then
      self._total_power = EntityMod.new(self, nil)
    end
    return self._total_power
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:TrafficModel():list() / client:TrafficModel():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:TrafficModel(data)
  local EntityMod = require("entity.traffic_model_entity")
  if data == nil then
    if self._traffic_model == nil then
      self._traffic_model = EntityMod.new(self, nil)
    end
    return self._traffic_model
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WindOffshoreShare():list() / client:WindOffshoreShare():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:WindOffshoreShare(data)
  local EntityMod = require("entity.wind_offshore_share_entity")
  if data == nil then
    if self._wind_offshore_share == nil then
      self._wind_offshore_share = EntityMod.new(self, nil)
    end
    return self._wind_offshore_share
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WindOffshoreShareDailyAvg():list() / client:WindOffshoreShareDailyAvg():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:WindOffshoreShareDailyAvg(data)
  local EntityMod = require("entity.wind_offshore_share_daily_avg_entity")
  if data == nil then
    if self._wind_offshore_share_daily_avg == nil then
      self._wind_offshore_share_daily_avg = EntityMod.new(self, nil)
    end
    return self._wind_offshore_share_daily_avg
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WindOnshoreShare():list() / client:WindOnshoreShare():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:WindOnshoreShare(data)
  local EntityMod = require("entity.wind_onshore_share_entity")
  if data == nil then
    if self._wind_onshore_share == nil then
      self._wind_onshore_share = EntityMod.new(self, nil)
    end
    return self._wind_onshore_share
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:WindOnshoreShareDailyAvg():list() / client:WindOnshoreShareDailyAvg():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function EnergyChartsSDK:WindOnshoreShareDailyAvg(data)
  local EntityMod = require("entity.wind_onshore_share_daily_avg_entity")
  if data == nil then
    if self._wind_onshore_share_daily_avg == nil then
      self._wind_onshore_share_daily_avg = EntityMod.new(self, nil)
    end
    return self._wind_onshore_share_daily_avg
  end
  return EntityMod.new(self, data)
end




function EnergyChartsSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = EnergyChartsSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return EnergyChartsSDK
