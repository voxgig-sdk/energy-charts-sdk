# EnergyCharts SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'EnergyCharts_types'


class EnergyChartsSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = EnergyChartsUtility.new
    @_utility = utility

    config = EnergyChartsConfig.shared_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features in the resolved order (make_options puts an explicit array
    # order first, else defaults to test-first). Ordering matters: the `test`
    # feature installs the base mock transport and the transport features
    # (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
    # must be added before them to sit at the base of the chain.
    feature_opts = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      featureorder = VoxgigStruct.getpath(@options, "__derived__.featureorder")
      if featureorder.is_a?(Array)
        featureorder.each do |fname|
          fopts = EnergyChartsHelpers.to_map(feature_opts[fname])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, EnergyChartsFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    EnergyChartsUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  # The options and the root context both hold the credential, so the
  # client's printed form is its name alone; `options_map` is the
  # documented way to read them back.
  def to_s
    "EnergyCharts " + VoxgigStruct.jsonify({ "name" => "EnergyCharts" })
  end

  def inspect
    to_s
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = EnergyChartsSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    # make_fetch_def returns a (fetchdef, err) tuple; destructure it and
    # return just the fetchdef Hash (raising on error) so callers — including
    # direct(), which indexes fetchdef["url"] — receive a Hash, mirroring the
    # ts/py prepare().
    fetchdef, fd_err = utility.make_fetch_def.call(ctx)
    raise fd_err if fd_err

    fetchdef
  end

  # Raw endpoint access is operator-controllable, like every entity op.
  # Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  # either one reaches the same endpoint.
  def direct(fetchargs = {})
    return op_denied("direct") unless op_allowed?("direct")

    raw_request(fetchargs)
  end

  # Is this raw-access op permitted by the SDK's allow.op option?
  def op_allowed?(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    allow_op.is_a?(String) && allow_op.include?(op)
  end

  def op_denied(op)
    allow_op = VoxgigStruct.getpath(@options, "allow.op")
    {
      "ok" => false,
      "err" => EnergyChartsError.new(
        "#{op}_allow",
        "EnergyChartsSDK: #{op}: operation not allowed by" \
        " SDK option allow.op value: \"#{allow_op}\""),
    }
  end

  # Ungated request path shared by direct and graphql, each of which checks
  # its own allow.op token first. Separate, rather than a flag on fetchargs:
  # a caller-supplied marker would let anyone opt straight back out of the
  # gate by passing it.
  def raw_request(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue EnergyChartsError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => utility.clean.call(ctx, fetch_err) } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = EnergyChartsHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end

  # Raw GraphQL access: the pressure valve that makes the generated surface's
  # deliberate omissions (per-call selection sets, typed filter builders,
  # batching, subscriptions) livable — the whole schema stays reachable.
  #
  # Thin wrapper over the same prepare/fetch path direct uses, with the one
  # thing raw direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
  # as a top-level `errors` array, so status alone would report a failed
  # query as ok.
  #
  # NOTE: like direct, this bypasses the feature pipeline — no retry,
  # ratelimit or paging features apply.
  def graphql(query, variables = nil, ctrl = nil)
    return op_denied("graphql") unless op_allowed?("graphql")

    res = raw_request({
      "method" => "POST",
      "headers" => { "content-type" => "application/json" },
      "body" => { "query" => query, "variables" => variables || {} },
      "ctrl" => ctrl || {},
    })

    # Errors are read BEFORE any status check: a GraphQL parse or validation
    # failure comes back as HTTP 400 carrying the standard { errors: [...] }
    # body, and the raw path represents a non-2xx as ok:false with no err —
    # so returning early on status would discard the server's own
    # diagnostics, which are the only useful part of that response.
    errors = VoxgigStruct.getpath(res, "data.errors")

    if errors.is_a?(Array) && !errors.empty?
      first = errors[0].is_a?(Hash) ? errors[0] : {}
      msg = first["message"]
      msg = "graphql error" if msg.nil? || msg.to_s.empty?
      res["ok"] = false
      res["err"] = EnergyChartsError.new(
        "graphql_error", "EnergyChartsSDK: graphql: #{msg}")
      res["graphql"] = errors
    end

    res
  end


  # Canonical facade: client.Cbet.list / client.Cbet.load({ "id" => ... })
  def Cbet(data = nil)
    require_relative 'entity/cbet_entity'
    CbetEntity.new(self, data)
  end


  # Canonical facade: client.Cbpf.list / client.Cbpf.load({ "id" => ... })
  def Cbpf(data = nil)
    require_relative 'entity/cbpf_entity'
    CbpfEntity.new(self, data)
  end


  # Canonical facade: client.Frequency.list / client.Frequency.load({ "id" => ... })
  def Frequency(data = nil)
    require_relative 'entity/frequency_entity'
    FrequencyEntity.new(self, data)
  end


  # Canonical facade: client.InstalledModel.list / client.InstalledModel.load({ "id" => ... })
  def InstalledModel(data = nil)
    require_relative 'entity/installed_model_entity'
    InstalledModelEntity.new(self, data)
  end


  # Canonical facade: client.Price.list / client.Price.load({ "id" => ... })
  def Price(data = nil)
    require_relative 'entity/price_entity'
    PriceEntity.new(self, data)
  end


  # Canonical facade: client.PublicPower.list / client.PublicPower.load({ "id" => ... })
  def PublicPower(data = nil)
    require_relative 'entity/public_power_entity'
    PublicPowerEntity.new(self, data)
  end


  # Canonical facade: client.PublicPowerForecast.list / client.PublicPowerForecast.load({ "id" => ... })
  def PublicPowerForecast(data = nil)
    require_relative 'entity/public_power_forecast_entity'
    PublicPowerForecastEntity.new(self, data)
  end


  # Canonical facade: client.RenShareDailyAvg.list / client.RenShareDailyAvg.load({ "id" => ... })
  def RenShareDailyAvg(data = nil)
    require_relative 'entity/ren_share_daily_avg_entity'
    RenShareDailyAvgEntity.new(self, data)
  end


  # Canonical facade: client.RenShareModel.list / client.RenShareModel.load({ "id" => ... })
  def RenShareModel(data = nil)
    require_relative 'entity/ren_share_model_entity'
    RenShareModelEntity.new(self, data)
  end


  # Canonical facade: client.SolarShare.list / client.SolarShare.load({ "id" => ... })
  def SolarShare(data = nil)
    require_relative 'entity/solar_share_entity'
    SolarShareEntity.new(self, data)
  end


  # Canonical facade: client.SolarShareDailyAvg.list / client.SolarShareDailyAvg.load({ "id" => ... })
  def SolarShareDailyAvg(data = nil)
    require_relative 'entity/solar_share_daily_avg_entity'
    SolarShareDailyAvgEntity.new(self, data)
  end


  # Canonical facade: client.TotalPower.list / client.TotalPower.load({ "id" => ... })
  def TotalPower(data = nil)
    require_relative 'entity/total_power_entity'
    TotalPowerEntity.new(self, data)
  end


  # Canonical facade: client.TrafficModel.list / client.TrafficModel.load({ "id" => ... })
  def TrafficModel(data = nil)
    require_relative 'entity/traffic_model_entity'
    TrafficModelEntity.new(self, data)
  end


  # Canonical facade: client.WindOffshoreShare.list / client.WindOffshoreShare.load({ "id" => ... })
  def WindOffshoreShare(data = nil)
    require_relative 'entity/wind_offshore_share_entity'
    WindOffshoreShareEntity.new(self, data)
  end


  # Canonical facade: client.WindOffshoreShareDailyAvg.list / client.WindOffshoreShareDailyAvg.load({ "id" => ... })
  def WindOffshoreShareDailyAvg(data = nil)
    require_relative 'entity/wind_offshore_share_daily_avg_entity'
    WindOffshoreShareDailyAvgEntity.new(self, data)
  end


  # Canonical facade: client.WindOnshoreShare.list / client.WindOnshoreShare.load({ "id" => ... })
  def WindOnshoreShare(data = nil)
    require_relative 'entity/wind_onshore_share_entity'
    WindOnshoreShareEntity.new(self, data)
  end


  # Canonical facade: client.WindOnshoreShareDailyAvg.list / client.WindOnshoreShareDailyAvg.load({ "id" => ... })
  def WindOnshoreShareDailyAvg(data = nil)
    require_relative 'entity/wind_onshore_share_daily_avg_entity'
    WindOnshoreShareDailyAvgEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = EnergyChartsSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
