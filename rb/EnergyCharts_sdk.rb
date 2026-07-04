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

    config = EnergyChartsConfig.make_config

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

    # Add features from config.
    feature_opts = EnergyChartsHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = EnergyChartsHelpers.to_map(item[1])
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

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
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

    return { "ok" => false, "err" => fetch_err } if fetch_err

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


  # Idiomatic facade: client.cross_border_model.list / client.cross_border_model.load({ "id" => ... })
  def cross_border_model
    require_relative 'entity/cross_border_model_entity'
    @cross_border_model ||= CrossBorderModelEntity.new(self, nil)
  end

  # Deprecated: use client.cross_border_model instead.
  def CrossBorderModel(data = nil)
    require_relative 'entity/cross_border_model_entity'
    CrossBorderModelEntity.new(self, data)
  end


  # Idiomatic facade: client.daily_avg_dict.list / client.daily_avg_dict.load({ "id" => ... })
  def daily_avg_dict
    require_relative 'entity/daily_avg_dict_entity'
    @daily_avg_dict ||= DailyAvgDictEntity.new(self, nil)
  end

  # Deprecated: use client.daily_avg_dict instead.
  def DailyAvgDict(data = nil)
    require_relative 'entity/daily_avg_dict_entity'
    DailyAvgDictEntity.new(self, data)
  end


  # Idiomatic facade: client.frequency.list / client.frequency.load({ "id" => ... })
  def frequency
    require_relative 'entity/frequency_entity'
    @frequency ||= FrequencyEntity.new(self, nil)
  end

  # Deprecated: use client.frequency instead.
  def Frequency(data = nil)
    require_relative 'entity/frequency_entity'
    FrequencyEntity.new(self, data)
  end


  # Idiomatic facade: client.installed_model.list / client.installed_model.load({ "id" => ... })
  def installed_model
    require_relative 'entity/installed_model_entity'
    @installed_model ||= InstalledModelEntity.new(self, nil)
  end

  # Deprecated: use client.installed_model instead.
  def InstalledModel(data = nil)
    require_relative 'entity/installed_model_entity'
    InstalledModelEntity.new(self, data)
  end


  # Idiomatic facade: client.price.list / client.price.load({ "id" => ... })
  def price
    require_relative 'entity/price_entity'
    @price ||= PriceEntity.new(self, nil)
  end

  # Deprecated: use client.price instead.
  def Price(data = nil)
    require_relative 'entity/price_entity'
    PriceEntity.new(self, data)
  end


  # Idiomatic facade: client.production_model.list / client.production_model.load({ "id" => ... })
  def production_model
    require_relative 'entity/production_model_entity'
    @production_model ||= ProductionModelEntity.new(self, nil)
  end

  # Deprecated: use client.production_model instead.
  def ProductionModel(data = nil)
    require_relative 'entity/production_model_entity'
    ProductionModelEntity.new(self, data)
  end


  # Idiomatic facade: client.public_power_forecast.list / client.public_power_forecast.load({ "id" => ... })
  def public_power_forecast
    require_relative 'entity/public_power_forecast_entity'
    @public_power_forecast ||= PublicPowerForecastEntity.new(self, nil)
  end

  # Deprecated: use client.public_power_forecast instead.
  def PublicPowerForecast(data = nil)
    require_relative 'entity/public_power_forecast_entity'
    PublicPowerForecastEntity.new(self, data)
  end


  # Idiomatic facade: client.ren_share_model.list / client.ren_share_model.load({ "id" => ... })
  def ren_share_model
    require_relative 'entity/ren_share_model_entity'
    @ren_share_model ||= RenShareModelEntity.new(self, nil)
  end

  # Deprecated: use client.ren_share_model instead.
  def RenShareModel(data = nil)
    require_relative 'entity/ren_share_model_entity'
    RenShareModelEntity.new(self, data)
  end


  # Idiomatic facade: client.share_model.list / client.share_model.load({ "id" => ... })
  def share_model
    require_relative 'entity/share_model_entity'
    @share_model ||= ShareModelEntity.new(self, nil)
  end

  # Deprecated: use client.share_model instead.
  def ShareModel(data = nil)
    require_relative 'entity/share_model_entity'
    ShareModelEntity.new(self, data)
  end


  # Idiomatic facade: client.traffic_model.list / client.traffic_model.load({ "id" => ... })
  def traffic_model
    require_relative 'entity/traffic_model_entity'
    @traffic_model ||= TrafficModelEntity.new(self, nil)
  end

  # Deprecated: use client.traffic_model instead.
  def TrafficModel(data = nil)
    require_relative 'entity/traffic_model_entity'
    TrafficModelEntity.new(self, data)
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
