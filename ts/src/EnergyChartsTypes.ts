// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CrossBorderModel {
  country?: any
  deprecated: boolean
  unix_second?: any
}

export interface CrossBorderModelLoadMatch {
  country?: any
  deprecated?: boolean
  unix_second?: any
}

export interface DailyAvgDict {
  data: any[]
  day: any[]
  deprecated: boolean
}

export interface DailyAvgDictListMatch {
  data?: any[]
  day?: any[]
  deprecated?: boolean
}

export interface Frequency {
  data: any[]
  deprecated: boolean
  unix_second?: any
}

export interface FrequencyListMatch {
  data?: any[]
  deprecated?: boolean
  unix_second?: any
}

export interface InstalledModel {
  deprecated: boolean
  last_update: any
  production_type?: any
  time: any[]
}

export interface InstalledModelListMatch {
  deprecated?: boolean
  last_update?: any
  production_type?: any
  time?: any[]
}

export interface Price {
  deprecated: boolean
  license_info: string
  price?: number
  unit: string
  unix_second?: any
}

export interface PriceLoadMatch {
  deprecated?: boolean
  license_info?: string
  price?: number
  unit?: string
  unix_second?: any
}

export interface ProductionModel {
  deprecated: boolean
  production_type?: any
  unix_second?: any
}

export interface ProductionModelLoadMatch {
  deprecated?: boolean
  production_type?: any
  unix_second?: any
}

export interface PublicPowerForecast {
  deprecated: boolean
  forecast_type: string
  forecast_value: any[]
  production_type: string
  unix_second: any[]
}

export interface PublicPowerForecastListMatch {
  deprecated?: boolean
  forecast_type?: string
  forecast_value?: any[]
  production_type?: string
  unix_second?: any[]
}

export interface RenShareModel {
  deprecated: boolean
  ren_share: any[]
  solar_share?: any
  substitute: boolean
  unix_second: any[]
  wind_offshore_share?: any
  wind_onshore_share?: any
}

export interface RenShareModelListMatch {
  deprecated?: boolean
  ren_share?: any[]
  solar_share?: any
  substitute?: boolean
  unix_second?: any[]
  wind_offshore_share?: any
  wind_onshore_share?: any
}

export interface ShareModel {
  data?: any
  deprecated: boolean
  forecast?: any
  unix_second?: any
}

export interface ShareModelLoadMatch {
  data?: any
  deprecated?: boolean
  forecast?: any
  unix_second?: any
}

export interface TrafficModel {
  deprecated: boolean
  share: any[]
  signal?: any[]
  substitute: boolean
  unix_second: any[]
}

export interface TrafficModelListMatch {
  deprecated?: boolean
  share?: any[]
  signal?: any[]
  substitute?: boolean
  unix_second?: any[]
}

