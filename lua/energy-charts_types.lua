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

---@class DailyAvgDict
---@field data table
---@field day table
---@field deprecated boolean

---@class DailyAvgDictListMatch

---@class Frequency
---@field data table
---@field deprecated boolean
---@field unix_second? any

---@class FrequencyListMatch

---@class InstalledModel
---@field deprecated boolean
---@field last_update any
---@field production_type? any
---@field time table

---@class InstalledModelListMatch

---@class Price
---@field deprecated boolean
---@field license_info string
---@field price? number
---@field unit string
---@field unix_second? any

---@class PriceLoadMatch

---@class ProductionModel
---@field deprecated boolean
---@field production_type? any
---@field unix_second? any

---@class ProductionModelLoadMatch

---@class PublicPowerForecast
---@field deprecated boolean
---@field forecast_type string
---@field forecast_value table
---@field production_type string
---@field unix_second table

---@class PublicPowerForecastListMatch

---@class RenShareModel
---@field deprecated boolean
---@field ren_share table
---@field solar_share? any
---@field substitute boolean
---@field unix_second table
---@field wind_offshore_share? any
---@field wind_onshore_share? any

---@class RenShareModelListMatch

---@class ShareModel
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_second? any

---@class ShareModelLoadMatch

---@class TrafficModel
---@field deprecated boolean
---@field share table
---@field signal? table
---@field substitute boolean
---@field unix_second table

---@class TrafficModelListMatch

local M = {}

return M
