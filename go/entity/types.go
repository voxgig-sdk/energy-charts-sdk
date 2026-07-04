// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CrossBorderModel is the typed data model for the cross_border_model entity.
type CrossBorderModel struct {
	Country *any `json:"country,omitempty"`
	Deprecated bool `json:"deprecated"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// CrossBorderModelLoadMatch mirrors the cross_border_model fields as an all-optional match
// filter (Go analog of Partial<CrossBorderModel>).
type CrossBorderModelLoadMatch struct {
	Country *any `json:"country,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// DailyAvgDict is the typed data model for the daily_avg_dict entity.
type DailyAvgDict struct {
	Data []any `json:"data"`
	Day []any `json:"day"`
	Deprecated bool `json:"deprecated"`
}

// DailyAvgDictListMatch mirrors the daily_avg_dict fields as an all-optional match
// filter (Go analog of Partial<DailyAvgDict>).
type DailyAvgDictListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Day *[]any `json:"day,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
}

// Frequency is the typed data model for the frequency entity.
type Frequency struct {
	Data []any `json:"data"`
	Deprecated bool `json:"deprecated"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// FrequencyListMatch mirrors the frequency fields as an all-optional match
// filter (Go analog of Partial<Frequency>).
type FrequencyListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// InstalledModel is the typed data model for the installed_model entity.
type InstalledModel struct {
	Deprecated bool `json:"deprecated"`
	LastUpdate any `json:"last_update"`
	ProductionType *any `json:"production_type,omitempty"`
	Time []any `json:"time"`
}

// InstalledModelListMatch mirrors the installed_model fields as an all-optional match
// filter (Go analog of Partial<InstalledModel>).
type InstalledModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	LastUpdate *any `json:"last_update,omitempty"`
	ProductionType *any `json:"production_type,omitempty"`
	Time *[]any `json:"time,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
	Deprecated bool `json:"deprecated"`
	LicenseInfo string `json:"license_info"`
	Price *float64 `json:"price,omitempty"`
	Unit string `json:"unit"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// PriceLoadMatch mirrors the price fields as an all-optional match
// filter (Go analog of Partial<Price>).
type PriceLoadMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	LicenseInfo *string `json:"license_info,omitempty"`
	Price *float64 `json:"price,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// ProductionModel is the typed data model for the production_model entity.
type ProductionModel struct {
	Deprecated bool `json:"deprecated"`
	ProductionType *any `json:"production_type,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// ProductionModelLoadMatch mirrors the production_model fields as an all-optional match
// filter (Go analog of Partial<ProductionModel>).
type ProductionModelLoadMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	ProductionType *any `json:"production_type,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// PublicPowerForecast is the typed data model for the public_power_forecast entity.
type PublicPowerForecast struct {
	Deprecated bool `json:"deprecated"`
	ForecastType string `json:"forecast_type"`
	ForecastValue []any `json:"forecast_value"`
	ProductionType string `json:"production_type"`
	UnixSecond []any `json:"unix_second"`
}

// PublicPowerForecastListMatch mirrors the public_power_forecast fields as an all-optional match
// filter (Go analog of Partial<PublicPowerForecast>).
type PublicPowerForecastListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	ForecastType *string `json:"forecast_type,omitempty"`
	ForecastValue *[]any `json:"forecast_value,omitempty"`
	ProductionType *string `json:"production_type,omitempty"`
	UnixSecond *[]any `json:"unix_second,omitempty"`
}

// RenShareModel is the typed data model for the ren_share_model entity.
type RenShareModel struct {
	Deprecated bool `json:"deprecated"`
	RenShare []any `json:"ren_share"`
	SolarShare *any `json:"solar_share,omitempty"`
	Substitute bool `json:"substitute"`
	UnixSecond []any `json:"unix_second"`
	WindOffshoreShare *any `json:"wind_offshore_share,omitempty"`
	WindOnshoreShare *any `json:"wind_onshore_share,omitempty"`
}

// RenShareModelListMatch mirrors the ren_share_model fields as an all-optional match
// filter (Go analog of Partial<RenShareModel>).
type RenShareModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	RenShare *[]any `json:"ren_share,omitempty"`
	SolarShare *any `json:"solar_share,omitempty"`
	Substitute *bool `json:"substitute,omitempty"`
	UnixSecond *[]any `json:"unix_second,omitempty"`
	WindOffshoreShare *any `json:"wind_offshore_share,omitempty"`
	WindOnshoreShare *any `json:"wind_onshore_share,omitempty"`
}

// ShareModel is the typed data model for the share_model entity.
type ShareModel struct {
	Data *any `json:"data,omitempty"`
	Deprecated bool `json:"deprecated"`
	Forecast *any `json:"forecast,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// ShareModelLoadMatch mirrors the share_model fields as an all-optional match
// filter (Go analog of Partial<ShareModel>).
type ShareModelLoadMatch struct {
	Data *any `json:"data,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	Forecast *any `json:"forecast,omitempty"`
	UnixSecond *any `json:"unix_second,omitempty"`
}

// TrafficModel is the typed data model for the traffic_model entity.
type TrafficModel struct {
	Deprecated bool `json:"deprecated"`
	Share []any `json:"share"`
	Signal *[]any `json:"signal,omitempty"`
	Substitute bool `json:"substitute"`
	UnixSecond []any `json:"unix_second"`
}

// TrafficModelListMatch mirrors the traffic_model fields as an all-optional match
// filter (Go analog of Partial<TrafficModel>).
type TrafficModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	Share *[]any `json:"share,omitempty"`
	Signal *[]any `json:"signal,omitempty"`
	Substitute *bool `json:"substitute,omitempty"`
	UnixSecond *[]any `json:"unix_second,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
