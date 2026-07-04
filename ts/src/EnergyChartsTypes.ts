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

export type CrossBorderModelLoadMatch = Partial<CrossBorderModel>

export interface DailyAvgDict {
  data: any[]
  day: any[]
  deprecated: boolean
}

export type DailyAvgDictListMatch = Partial<DailyAvgDict>

export interface Frequency {
  data: any[]
  deprecated: boolean
  unix_second?: any
}

export type FrequencyListMatch = Partial<Frequency>

export interface InstalledModel {
  deprecated: boolean
  last_update: any
  production_type?: any
  time: any[]
}

export type InstalledModelListMatch = Partial<InstalledModel>

export interface Price {
  deprecated: boolean
  license_info: string
  price?: number
  unit: string
  unix_second?: any
}

export type PriceLoadMatch = Partial<Price>

export interface ProductionModel {
  deprecated: boolean
  production_type?: any
  unix_second?: any
}

export type ProductionModelLoadMatch = Partial<ProductionModel>

export interface PublicPowerForecast {
  deprecated: boolean
  forecast_type: string
  forecast_value: any[]
  production_type: string
  unix_second: any[]
}

export type PublicPowerForecastListMatch = Partial<PublicPowerForecast>

export interface RenShareModel {
  deprecated: boolean
  ren_share: any[]
  solar_share?: any
  substitute: boolean
  unix_second: any[]
  wind_offshore_share?: any
  wind_onshore_share?: any
}

export type RenShareModelListMatch = Partial<RenShareModel>

export interface ShareModel {
  data?: any
  deprecated: boolean
  forecast?: any
  unix_second?: any
}

export type ShareModelLoadMatch = Partial<ShareModel>

export interface TrafficModel {
  deprecated: boolean
  share: any[]
  signal?: any[]
  substitute: boolean
  unix_second: any[]
}

export type TrafficModelListMatch = Partial<TrafficModel>

