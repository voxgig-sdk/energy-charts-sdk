-- Typed models for the EnergyCharts SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cbet
---@field countries? any
---@field deprecated boolean
---@field unix_seconds? any

---@class CbetLoadMatch
---@field country? string
---@field end? string
---@field start? string

---@class Cbpf
---@field countries? any
---@field deprecated boolean
---@field unix_seconds? any

---@class CbpfLoadMatch
---@field country? string
---@field end? string
---@field start? string

---@class Frequency
---@field data table
---@field deprecated boolean
---@field unix_seconds? any

---@class FrequencyListMatch
---@field end? string
---@field region? string
---@field start? string

---@class InstalledModel
---@field deprecated boolean
---@field last_update any
---@field production_types? any
---@field time table

---@class InstalledModelListMatch
---@field country? string
---@field installation_decommission? boolean
---@field time_step? string

---@class Price
---@field deprecated boolean
---@field license_info string
---@field price? number
---@field unit string
---@field unix_seconds? any

---@class PriceLoadMatch
---@field bzn? string
---@field end? string
---@field start? string

---@class PublicPower
---@field deprecated boolean
---@field production_types? any
---@field unix_seconds? any

---@class PublicPowerLoadMatch
---@field country? string
---@field end? string
---@field start? string
---@field subtype? string

---@class PublicPowerForecast
---@field deprecated boolean
---@field forecast_type string
---@field forecast_values table
---@field production_type string
---@field unix_seconds table

---@class PublicPowerForecastListMatch
---@field country? string
---@field end? string
---@field forecast_type? string
---@field production_type? string
---@field start? string

---@class RenShareDailyAvg
---@field data table
---@field days table
---@field deprecated boolean

---@class RenShareDailyAvgListMatch
---@field country? string
---@field year? number

---@class RenShareModel
---@field deprecated boolean
---@field ren_share table
---@field solar_share? any
---@field substitute boolean
---@field unix_seconds table
---@field wind_offshore_share? any
---@field wind_onshore_share? any

---@class RenShareModelListMatch
---@field country? string

---@class SolarShare
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_seconds? any

---@class SolarShareLoadMatch
---@field country? string

---@class SolarShareDailyAvg
---@field data table
---@field days table
---@field deprecated boolean

---@class SolarShareDailyAvgListMatch
---@field country? string
---@field year? number

---@class TotalPower
---@field deprecated boolean
---@field production_types? any
---@field unix_seconds? any

---@class TotalPowerLoadMatch
---@field country? string
---@field end? string
---@field start? string

---@class TrafficModel
---@field deprecated boolean
---@field share table
---@field signal? table
---@field substitute boolean
---@field unix_seconds table

---@class TrafficModelListMatch
---@field country? string
---@field postal_code? string

---@class WindOffshoreShare
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_seconds? any

---@class WindOffshoreShareLoadMatch
---@field country? string

---@class WindOffshoreShareDailyAvg
---@field data table
---@field days table
---@field deprecated boolean

---@class WindOffshoreShareDailyAvgListMatch
---@field country? string
---@field year? number

---@class WindOnshoreShare
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_seconds? any

---@class WindOnshoreShareLoadMatch
---@field country? string

---@class WindOnshoreShareDailyAvg
---@field data table
---@field days table
---@field deprecated boolean

---@class WindOnshoreShareDailyAvgListMatch
---@field country? string
---@field year? number

local M = {}

return M
