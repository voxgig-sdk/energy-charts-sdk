-- Typed models for the EnergyCharts SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class CrossBorderModel
---@field countries? any
---@field deprecated boolean
---@field unix_seconds? any

---@class CrossBorderModelLoadMatch
---@field country? string
---@field end? string
---@field start? string

---@class DailyAvgDict
---@field data table
---@field days table
---@field deprecated boolean

---@class DailyAvgDictListMatch
---@field country? string
---@field year? number

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

---@class ProductionModel
---@field deprecated boolean
---@field production_types? any
---@field unix_seconds? any

---@class ProductionModelLoadMatch
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

---@class ShareModel
---@field data? any
---@field deprecated boolean
---@field forecast? any
---@field unix_seconds? any

---@class ShareModelLoadMatch
---@field country? string

---@class TrafficModel
---@field deprecated boolean
---@field share table
---@field signal? table
---@field substitute boolean
---@field unix_seconds table

---@class TrafficModelListMatch
---@field country? string
---@field postal_code? string

local M = {}

return M
