// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cbet {
  countries?: any
  deprecated: boolean
  unix_seconds?: any
}

export interface CbetLoadMatch {
  country?: string
  end?: string
  start?: string
}

export interface Cbpf {
  countries?: any
  deprecated: boolean
  unix_seconds?: any
}

export interface CbpfLoadMatch {
  country?: string
  end?: string
  start?: string
}

export interface Frequency {
  data: any[]
  deprecated: boolean
  unix_seconds?: any
}

export interface FrequencyListMatch {
  end?: string
  region?: string
  start?: string
}

export interface InstalledModel {
  deprecated: boolean
  last_update: any
  production_types?: any
  time: any[]
}

export interface InstalledModelListMatch {
  country?: string
  installation_decommission?: boolean
  time_step?: string
}

export interface Price {
  deprecated: boolean
  license_info: string
  price?: number
  unit: string
  unix_seconds?: any
}

export interface PriceLoadMatch {
  bzn?: string
  end?: string
  start?: string
}

export interface PublicPower {
  deprecated: boolean
  production_types?: any
  unix_seconds?: any
}

export interface PublicPowerLoadMatch {
  country?: string
  end?: string
  start?: string
  subtype?: string
}

export interface PublicPowerForecast {
  deprecated: boolean
  forecast_type: string
  forecast_values: any[]
  production_type: string
  unix_seconds: any[]
}

export interface PublicPowerForecastListMatch {
  country?: string
  end?: string
  forecast_type?: string
  production_type?: string
  start?: string
}

export interface RenShareDailyAvg {
  data: any[]
  days: any[]
  deprecated: boolean
}

export interface RenShareDailyAvgListMatch {
  country?: string
  year?: number
}

export interface RenShareModel {
  deprecated: boolean
  ren_share: any[]
  solar_share?: any
  substitute: boolean
  unix_seconds: any[]
  wind_offshore_share?: any
  wind_onshore_share?: any
}

export interface RenShareModelListMatch {
  country?: string
}

export interface SolarShare {
  data?: any
  deprecated: boolean
  forecast?: any
  unix_seconds?: any
}

export interface SolarShareLoadMatch {
  country?: string
}

export interface SolarShareDailyAvg {
  data: any[]
  days: any[]
  deprecated: boolean
}

export interface SolarShareDailyAvgListMatch {
  country?: string
  year?: number
}

export interface TotalPower {
  deprecated: boolean
  production_types?: any
  unix_seconds?: any
}

export interface TotalPowerLoadMatch {
  country?: string
  end?: string
  start?: string
}

export interface TrafficModel {
  deprecated: boolean
  share: any[]
  signal?: any[]
  substitute: boolean
  unix_seconds: any[]
}

export interface TrafficModelListMatch {
  country?: string
  postal_code?: string
}

export interface WindOffshoreShare {
  data?: any
  deprecated: boolean
  forecast?: any
  unix_seconds?: any
}

export interface WindOffshoreShareLoadMatch {
  country?: string
}

export interface WindOffshoreShareDailyAvg {
  data: any[]
  days: any[]
  deprecated: boolean
}

export interface WindOffshoreShareDailyAvgListMatch {
  country?: string
  year?: number
}

export interface WindOnshoreShare {
  data?: any
  deprecated: boolean
  forecast?: any
  unix_seconds?: any
}

export interface WindOnshoreShareLoadMatch {
  country?: string
}

export interface WindOnshoreShareDailyAvg {
  data: any[]
  days: any[]
  deprecated: boolean
}

export interface WindOnshoreShareDailyAvgListMatch {
  country?: string
  year?: number
}

