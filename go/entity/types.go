// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/energy-charts-sdk/go/core"
)

// CrossBorderModel is the typed data model for the cross_border_model entity.
type CrossBorderModel struct {
	Countries *any `json:"countries,omitempty"`
	Deprecated bool `json:"deprecated"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// CrossBorderModelLoadMatch is the typed request payload for CrossBorderModel.LoadTyped.
type CrossBorderModelLoadMatch struct {
	Countries *any `json:"countries,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// DailyAvgDict is the typed data model for the daily_avg_dict entity.
type DailyAvgDict struct {
	Data []any `json:"data"`
	Days []any `json:"days"`
	Deprecated bool `json:"deprecated"`
}

// DailyAvgDictListMatch is the typed request payload for DailyAvgDict.ListTyped.
type DailyAvgDictListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Days *[]any `json:"days,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
}

// Frequency is the typed data model for the frequency entity.
type Frequency struct {
	Data []any `json:"data"`
	Deprecated bool `json:"deprecated"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// FrequencyListMatch is the typed request payload for Frequency.ListTyped.
type FrequencyListMatch struct {
	Data *[]any `json:"data,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// InstalledModel is the typed data model for the installed_model entity.
type InstalledModel struct {
	Deprecated bool `json:"deprecated"`
	LastUpdate any `json:"last_update"`
	ProductionTypes *any `json:"production_types,omitempty"`
	Time []any `json:"time"`
}

// InstalledModelListMatch is the typed request payload for InstalledModel.ListTyped.
type InstalledModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	LastUpdate *any `json:"last_update,omitempty"`
	ProductionTypes *any `json:"production_types,omitempty"`
	Time *[]any `json:"time,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
	Deprecated bool `json:"deprecated"`
	LicenseInfo string `json:"license_info"`
	Price *float64 `json:"price,omitempty"`
	Unit string `json:"unit"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// PriceLoadMatch is the typed request payload for Price.LoadTyped.
type PriceLoadMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	LicenseInfo *string `json:"license_info,omitempty"`
	Price *float64 `json:"price,omitempty"`
	Unit *string `json:"unit,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// ProductionModel is the typed data model for the production_model entity.
type ProductionModel struct {
	Deprecated bool `json:"deprecated"`
	ProductionTypes *any `json:"production_types,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// ProductionModelLoadMatch is the typed request payload for ProductionModel.LoadTyped.
type ProductionModelLoadMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	ProductionTypes *any `json:"production_types,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// PublicPowerForecast is the typed data model for the public_power_forecast entity.
type PublicPowerForecast struct {
	Deprecated bool `json:"deprecated"`
	ForecastType string `json:"forecast_type"`
	ForecastValues []any `json:"forecast_values"`
	ProductionType string `json:"production_type"`
	UnixSeconds []any `json:"unix_seconds"`
}

// PublicPowerForecastListMatch is the typed request payload for PublicPowerForecast.ListTyped.
type PublicPowerForecastListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	ForecastType *string `json:"forecast_type,omitempty"`
	ForecastValues *[]any `json:"forecast_values,omitempty"`
	ProductionType *string `json:"production_type,omitempty"`
	UnixSeconds *[]any `json:"unix_seconds,omitempty"`
}

// RenShareModel is the typed data model for the ren_share_model entity.
type RenShareModel struct {
	Deprecated bool `json:"deprecated"`
	RenShare []any `json:"ren_share"`
	SolarShare *any `json:"solar_share,omitempty"`
	Substitute bool `json:"substitute"`
	UnixSeconds []any `json:"unix_seconds"`
	WindOffshoreShare *any `json:"wind_offshore_share,omitempty"`
	WindOnshoreShare *any `json:"wind_onshore_share,omitempty"`
}

// RenShareModelListMatch is the typed request payload for RenShareModel.ListTyped.
type RenShareModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	RenShare *[]any `json:"ren_share,omitempty"`
	SolarShare *any `json:"solar_share,omitempty"`
	Substitute *bool `json:"substitute,omitempty"`
	UnixSeconds *[]any `json:"unix_seconds,omitempty"`
	WindOffshoreShare *any `json:"wind_offshore_share,omitempty"`
	WindOnshoreShare *any `json:"wind_onshore_share,omitempty"`
}

// ShareModel is the typed data model for the share_model entity.
type ShareModel struct {
	Data *any `json:"data,omitempty"`
	Deprecated bool `json:"deprecated"`
	Forecast *any `json:"forecast,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// ShareModelLoadMatch is the typed request payload for ShareModel.LoadTyped.
type ShareModelLoadMatch struct {
	Data *any `json:"data,omitempty"`
	Deprecated *bool `json:"deprecated,omitempty"`
	Forecast *any `json:"forecast,omitempty"`
	UnixSeconds *any `json:"unix_seconds,omitempty"`
}

// TrafficModel is the typed data model for the traffic_model entity.
type TrafficModel struct {
	Deprecated bool `json:"deprecated"`
	Share []any `json:"share"`
	Signal *[]any `json:"signal,omitempty"`
	Substitute bool `json:"substitute"`
	UnixSeconds []any `json:"unix_seconds"`
}

// TrafficModelListMatch is the typed request payload for TrafficModel.ListTyped.
type TrafficModelListMatch struct {
	Deprecated *bool `json:"deprecated,omitempty"`
	Share *[]any `json:"share,omitempty"`
	Signal *[]any `json:"signal,omitempty"`
	Substitute *bool `json:"substitute,omitempty"`
	UnixSeconds *[]any `json:"unix_seconds,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
