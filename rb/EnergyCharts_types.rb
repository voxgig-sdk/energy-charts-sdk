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
# @!attribute [rw] country
#   @return [Object, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
CrossBorderModel = Struct.new(
  :country,
  :deprecated,
  :unix_second,
  keyword_init: true
)

# Request payload for CrossBorderModel#load.
#
# @!attribute [rw] country
#   @return [Object, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
CrossBorderModelLoadMatch = Struct.new(
  :country,
  :deprecated,
  :unix_second,
  keyword_init: true
)

# DailyAvgDict entity data model.
#
# @!attribute [rw] data
#   @return [Array]
#
# @!attribute [rw] day
#   @return [Array]
#
# @!attribute [rw] deprecated
#   @return [Boolean]
DailyAvgDict = Struct.new(
  :data,
  :day,
  :deprecated,
  keyword_init: true
)

# Request payload for DailyAvgDict#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] day
#   @return [Array, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
DailyAvgDictListMatch = Struct.new(
  :data,
  :day,
  :deprecated,
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
# @!attribute [rw] unix_second
#   @return [Object, nil]
Frequency = Struct.new(
  :data,
  :deprecated,
  :unix_second,
  keyword_init: true
)

# Request payload for Frequency#list.
#
# @!attribute [rw] data
#   @return [Array, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
FrequencyListMatch = Struct.new(
  :data,
  :deprecated,
  :unix_second,
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
# @!attribute [rw] production_type
#   @return [Object, nil]
#
# @!attribute [rw] time
#   @return [Array]
InstalledModel = Struct.new(
  :deprecated,
  :last_update,
  :production_type,
  :time,
  keyword_init: true
)

# Request payload for InstalledModel#list.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] last_update
#   @return [Object, nil]
#
# @!attribute [rw] production_type
#   @return [Object, nil]
#
# @!attribute [rw] time
#   @return [Array, nil]
InstalledModelListMatch = Struct.new(
  :deprecated,
  :last_update,
  :production_type,
  :time,
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
# @!attribute [rw] unix_second
#   @return [Object, nil]
Price = Struct.new(
  :deprecated,
  :license_info,
  :price,
  :unit,
  :unix_second,
  keyword_init: true
)

# Request payload for Price#load.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] license_info
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
#
# @!attribute [rw] unit
#   @return [String, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
PriceLoadMatch = Struct.new(
  :deprecated,
  :license_info,
  :price,
  :unit,
  :unix_second,
  keyword_init: true
)

# ProductionModel entity data model.
#
# @!attribute [rw] deprecated
#   @return [Boolean]
#
# @!attribute [rw] production_type
#   @return [Object, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
ProductionModel = Struct.new(
  :deprecated,
  :production_type,
  :unix_second,
  keyword_init: true
)

# Request payload for ProductionModel#load.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] production_type
#   @return [Object, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
ProductionModelLoadMatch = Struct.new(
  :deprecated,
  :production_type,
  :unix_second,
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
# @!attribute [rw] forecast_value
#   @return [Array]
#
# @!attribute [rw] production_type
#   @return [String]
#
# @!attribute [rw] unix_second
#   @return [Array]
PublicPowerForecast = Struct.new(
  :deprecated,
  :forecast_type,
  :forecast_value,
  :production_type,
  :unix_second,
  keyword_init: true
)

# Request payload for PublicPowerForecast#list.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] forecast_type
#   @return [String, nil]
#
# @!attribute [rw] forecast_value
#   @return [Array, nil]
#
# @!attribute [rw] production_type
#   @return [String, nil]
#
# @!attribute [rw] unix_second
#   @return [Array, nil]
PublicPowerForecastListMatch = Struct.new(
  :deprecated,
  :forecast_type,
  :forecast_value,
  :production_type,
  :unix_second,
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
# @!attribute [rw] unix_second
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
  :unix_second,
  :wind_offshore_share,
  :wind_onshore_share,
  keyword_init: true
)

# Request payload for RenShareModel#list.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] ren_share
#   @return [Array, nil]
#
# @!attribute [rw] solar_share
#   @return [Object, nil]
#
# @!attribute [rw] substitute
#   @return [Boolean, nil]
#
# @!attribute [rw] unix_second
#   @return [Array, nil]
#
# @!attribute [rw] wind_offshore_share
#   @return [Object, nil]
#
# @!attribute [rw] wind_onshore_share
#   @return [Object, nil]
RenShareModelListMatch = Struct.new(
  :deprecated,
  :ren_share,
  :solar_share,
  :substitute,
  :unix_second,
  :wind_offshore_share,
  :wind_onshore_share,
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
# @!attribute [rw] unix_second
#   @return [Object, nil]
ShareModel = Struct.new(
  :data,
  :deprecated,
  :forecast,
  :unix_second,
  keyword_init: true
)

# Request payload for ShareModel#load.
#
# @!attribute [rw] data
#   @return [Object, nil]
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] forecast
#   @return [Object, nil]
#
# @!attribute [rw] unix_second
#   @return [Object, nil]
ShareModelLoadMatch = Struct.new(
  :data,
  :deprecated,
  :forecast,
  :unix_second,
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
# @!attribute [rw] unix_second
#   @return [Array]
TrafficModel = Struct.new(
  :deprecated,
  :share,
  :signal,
  :substitute,
  :unix_second,
  keyword_init: true
)

# Request payload for TrafficModel#list.
#
# @!attribute [rw] deprecated
#   @return [Boolean, nil]
#
# @!attribute [rw] share
#   @return [Array, nil]
#
# @!attribute [rw] signal
#   @return [Array, nil]
#
# @!attribute [rw] substitute
#   @return [Boolean, nil]
#
# @!attribute [rw] unix_second
#   @return [Array, nil]
TrafficModelListMatch = Struct.new(
  :deprecated,
  :share,
  :signal,
  :substitute,
  :unix_second,
  keyword_init: true
)

