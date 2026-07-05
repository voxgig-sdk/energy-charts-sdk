-- Typed models for the EnergyCharts SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CrossBorderModel
---@field country? any
---@field deprecated boolean
---@field unix_second? any

---@class CrossBorderModelLoadMatch
---@field country? any
---@field deprecated? boolean
---@field unix_second? any

---@class DailyAvgDict
---@field data table
---@field day table
---@field deprecated boolean

---@class DailyAvgDictListMatch
---@field data? table
---@field day? table
---@field deprecated? boolean

---@class Frequency
---@field data table
---@field deprecated boolean
---@field unix_second? any

---@class FrequencyListMatch
---@field data? table
---@field deprecated? boolean
---@field unix_second? any

---@class InstalledModel
---@field deprecated boolean
---@field last_update any
---@field production_type? any
---@field time table

---@class InstalledModelListMatch
---@field deprecated? boolean
---@field last_update? any
---@field production_type? any
---@field time? table

---@class Price
---@field deprecated boolean
---@field license_info string
---@field price? number
---@field unit string
---@field unix_second? any

---@class PriceLoadMatch
---@field deprecated? boolean
---@field license_info? string
---@field price? number
---@field unit? string
---@field unix_second? any

---@class ProductionModel
---@field deprecated boolean
---@field production_type? any
---@field unix_second? any

---@class ProductionModelLoadMatch
---@field deprecated? boolean
---@field production_type? any
---@field unix_second? any

---@class PublicPowerForecast
---@field deprecated boolean
---@field forecast_type string
---@field forecast_value table
---@field production_type string
---@field unix_second table

---@class PublicPowerForecastListMatch
---@field deprecated? boolean
---@field forecast_type? string
---@field forecast_value? table
---@field production_type? string
---@field unix_second? table

---@class RenShareModel
---@field deprecated boolean
---@field ren_share table
---@field solar_share? any
---@field substitute boolean
---@field unix_second table
---@field wind_offshore_share? any
---@field wind_onshore_share? any

---@class RenShareModelListMatch
---@field deprecated? boolean
---@field ren_share? table
---@field solar_share? any
---@field substitute? boolean
---@field unix_second? table
---@field wind_offshore_share? any
---@field wind_onshore_share? any

---@class ShareModel
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_second? any

---@class ShareModelLoadMatch
---@field data? any
---@field deprecated? boolean
---@field forecast? any
---@field unix_second? any

---@class TrafficModel
---@field deprecated boolean
---@field share table
---@field signal? table
---@field substitute boolean
---@field unix_second table

---@class TrafficModelListMatch
---@field deprecated? boolean
---@field share? table
---@field signal? table
---@field substitute? boolean
---@field unix_second? table

local M = {}

return M
