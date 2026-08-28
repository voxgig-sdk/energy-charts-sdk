# frozen_string_literal: true

# Typed models for the EnergyCharts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CrossBorderModel entity data model.
#
# @!attribute [rw] countries
#   @return [Object, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] unix_seconds
#   @return [Object, nil]
CrossBorderModel = Struct.new(
  :countries,
  :deprecated,
  :unix_seconds,
  keyword_init: true
)

# Request payload for CrossBorderModel#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
CrossBorderModelLoadMatch = Struct.new(
  :country,
  :end,
  :start,
  keyword_init: true
)

# DailyAvgDict entity data model.
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] days
#   @return [Array]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
DailyAvgDict = Struct.new(
  :data,
  :days,
  :deprecated,
  keyword_init: true
)

# Request payload for DailyAvgDict#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] year
#   @return [Integer, nil]
DailyAvgDictListMatch = Struct.new(
  :country,
  :year,
  keyword_init: true
)

# Frequency entity data model.
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] unix_seconds
#   @return [Object, nil]
Frequency = Struct.new(
  :data,
  :deprecated,
  :unix_seconds,
  keyword_init: true
)

# Request payload for Frequency#list.
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] region
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
FrequencyListMatch = Struct.new(
  :end,
  :region,
  :start,
  keyword_init: true
)

# InstalledModel entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] last_update
#   @return [Object]
#
# @!attribute [rw] production_types
#   @return [Object, nil]
#
# @!attribute [rw] time
#   @return [Array]
InstalledModel = Struct.new(
  :deprecated,
  :last_update,
  :production_types,
  :time,
  keyword_init: true
)

# Request payload for InstalledModel#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] installation_decommission
#   @return [Boolean, nil]
#
# @!attribute [rw] time_step
#   @return [String, nil]
InstalledModelListMatch = Struct.new(
  :country,
  :installation_decommission,
  :time_step,
  keyword_init: true
)

# Price entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] license_info
#   @return [String]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String]
#
# @!attribute [rw] unix_seconds
#   @return [Object, nil]
Price = Struct.new(
  :deprecated,
  :license_info,
  :price,
  :unit,
  :unix_seconds,
  keyword_init: true
)

# Request payload for Price#load.
#
# @!attribute [rw] bzn
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
PriceLoadMatch = Struct.new(
  :bzn,
  :end,
  :start,
  keyword_init: true
)

# ProductionModel entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] production_types
#   @return [Object, nil]
#
# @!attribute [rw] unix_seconds
#   @return [Object, nil]
ProductionModel = Struct.new(
  :deprecated,
  :production_types,
  :unix_seconds,
  keyword_init: true
)

# Request payload for ProductionModel#load.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
#
# @!attribute [rw] subtype
#   @return [String, nil]
ProductionModelLoadMatch = Struct.new(
  :country,
  :end,
  :start,
  :subtype,
  keyword_init: true
)

# PublicPowerForecast entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] forecast_type
#   @return [String]
#
# @!attribute [rw] forecast_values
#   @return [Array]
#
# @!attribute [rw] production_type
#   @return [String]
#
# @!attribute [rw] unix_seconds
#   @return [Array]
PublicPowerForecast = Struct.new(
  :deprecated,
  :forecast_type,
  :forecast_values,
  :production_type,
  :unix_seconds,
  keyword_init: true
)

# Request payload for PublicPowerForecast#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] forecast_type
#   @return [String, nil]
#
# @!attribute [rw] production_type
#   @return [String, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
PublicPowerForecastListMatch = Struct.new(
  :country,
  :end,
  :forecast_type,
  :production_type,
  :start,
  keyword_init: true
)

# RenShareModel entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] ren_share
#   @return [Array]
#
# @!attribute [rw] solar_share
#   @return [Object, nil]
#
# @!attribute [rw] substitute
#   @return [Boolean]
#
# @!attribute [rw] unix_seconds
#   @return [Array]
#
# @!attribute [rw] wind_offshore_share
#   @return [Object, nil]
#
# @!attribute [rw] wind_onshore_share
#   @return [Object, nil]
RenShareModel = Struct.new(
  :deprecated,
  :ren_share,
  :solar_share,
  :substitute,
  :unix_seconds,
  :wind_offshore_share,
  :wind_onshore_share,
  keyword_init: true
)

# Request payload for RenShareModel#list.
#
# @!attribute [rw] country
#   @return [String, nil]
RenShareModelListMatch = Struct.new(
  :country,
  keyword_init: true
)

# ShareModel entity data model.
#
# @!attribute [rw] data
#   @return [Object, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] forecast
#   @return [Object, nil]
#
# @!attribute [rw] unix_seconds
#   @return [Object, nil]
ShareModel = Struct.new(
  :data,
  :deprecated,
  :forecast,
  :unix_seconds,
  keyword_init: true
)

# Request payload for ShareModel#load.
#
# @!attribute [rw] country
#   @return [String, nil]
ShareModelLoadMatch = Struct.new(
  :country,
  keyword_init: true
)

# TrafficModel entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] share
#   @return [Array]
#
# @!attribute [rw] signal
#   @return [Array, nil]
#
# @!attribute [rw] substitute
#   @return [Boolean]
#
# @!attribute [rw] unix_seconds
#   @return [Array]
TrafficModel = Struct.new(
  :deprecated,
  :share,
  :signal,
  :substitute,
  :unix_seconds,
  keyword_init: true
)

# Request payload for TrafficModel#list.
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] postal_code
#   @return [String, nil]
TrafficModelListMatch = Struct.new(
  :country,
  :postal_code,
  keyword_init: true
)

