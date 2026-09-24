// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/energy-charts-sdk/go/core"
)

// Cbet is the typed data model for the cbet entity.
type Cbet struct {
}

// CbetLoadMatch is the typed request payload for Cbet.LoadTyped.
type CbetLoadMatch struct {
	Country *string `json:"country,omitempty"`
	End *string `json:"end,omitempty"`
	Start *string `json:"start,omitempty"`
}

// Cbpf is the typed data model for the cbpf entity.
type Cbpf struct {
}

// CbpfLoadMatch is the typed request payload for Cbpf.LoadTyped.
type CbpfLoadMatch struct {
	Country *string `json:"country,omitempty"`
	End *string `json:"end,omitempty"`
	Start *string `json:"start,omitempty"`
}

// Frequency is the typed data model for the frequency entity.
type Frequency struct {
}

// FrequencyListMatch is the typed request payload for Frequency.ListTyped.
type FrequencyListMatch struct {
	End *string `json:"end,omitempty"`
	Region *string `json:"region,omitempty"`
	Start *string `json:"start,omitempty"`
}

// InstalledModel is the typed data model for the installed_model entity.
type InstalledModel struct {
}

// InstalledModelListMatch is the typed request payload for InstalledModel.ListTyped.
type InstalledModelListMatch struct {
	Country *string `json:"country,omitempty"`
	InstallationDecommission *bool `json:"installation_decommission,omitempty"`
	TimeStep *string `json:"time_step,omitempty"`
}

// Price is the typed data model for the price entity.
type Price struct {
}

// PriceLoadMatch is the typed request payload for Price.LoadTyped.
type PriceLoadMatch struct {
	Bzn *string `json:"bzn,omitempty"`
	End *string `json:"end,omitempty"`
	Start *string `json:"start,omitempty"`
}

// PublicPower is the typed data model for the public_power entity.
type PublicPower struct {
}

// PublicPowerLoadMatch is the typed request payload for PublicPower.LoadTyped.
type PublicPowerLoadMatch struct {
	Country *string `json:"country,omitempty"`
	End *string `json:"end,omitempty"`
	Start *string `json:"start,omitempty"`
	Subtype *string `json:"subtype,omitempty"`
}

// PublicPowerForecast is the typed data model for the public_power_forecast entity.
type PublicPowerForecast struct {
}

// PublicPowerForecastListMatch is the typed request payload for PublicPowerForecast.ListTyped.
type PublicPowerForecastListMatch struct {
	Country *string `json:"country,omitempty"`
	End *string `json:"end,omitempty"`
	ForecastType *string `json:"forecast_type,omitempty"`
	ProductionType *string `json:"production_type,omitempty"`
	Start *string `json:"start,omitempty"`
}

// RenShareDailyAvg is the typed data model for the ren_share_daily_avg entity.
type RenShareDailyAvg struct {
}

// RenShareDailyAvgListMatch is the typed request payload for RenShareDailyAvg.ListTyped.
type RenShareDailyAvgListMatch struct {
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
}

// RenShareModel is the typed data model for the ren_share_model entity.
type RenShareModel struct {
}

// RenShareModelListMatch is the typed request payload for RenShareModel.ListTyped.
type RenShareModelListMatch struct {
	Country *string `json:"country,omitempty"`
}

// SolarShare is the typed data model for the solar_share entity.
type SolarShare struct {
}

// SolarShareLoadMatch is the typed request payload for SolarShare.LoadTyped.
type SolarShareLoadMatch struct {
	Country *string `json:"country,omitempty"`
}

// SolarShareDailyAvg is the typed data model for the solar_share_daily_avg entity.
type SolarShareDailyAvg struct {
}

// SolarShareDailyAvgListMatch is the typed request payload for SolarShareDailyAvg.ListTyped.
type SolarShareDailyAvgListMatch struct {
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
}

// TotalPower is the typed data model for the total_power entity.
type TotalPower struct {
}

// TotalPowerLoadMatch is the typed request payload for TotalPower.LoadTyped.
type TotalPowerLoadMatch struct {
	Country *string `json:"country,omitempty"`
	End *string `json:"end,omitempty"`
	Start *string `json:"start,omitempty"`
}

// TrafficModel is the typed data model for the traffic_model entity.
type TrafficModel struct {
}

// TrafficModelListMatch is the typed request payload for TrafficModel.ListTyped.
type TrafficModelListMatch struct {
	Country *string `json:"country,omitempty"`
	PostalCode *string `json:"postal_code,omitempty"`
}

// WindOffshoreShare is the typed data model for the wind_offshore_share entity.
type WindOffshoreShare struct {
}

// WindOffshoreShareLoadMatch is the typed request payload for WindOffshoreShare.LoadTyped.
type WindOffshoreShareLoadMatch struct {
	Country *string `json:"country,omitempty"`
}

// WindOffshoreShareDailyAvg is the typed data model for the wind_offshore_share_daily_avg entity.
type WindOffshoreShareDailyAvg struct {
}

// WindOffshoreShareDailyAvgListMatch is the typed request payload for WindOffshoreShareDailyAvg.ListTyped.
type WindOffshoreShareDailyAvgListMatch struct {
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
}

// WindOnshoreShare is the typed data model for the wind_onshore_share entity.
type WindOnshoreShare struct {
}

// WindOnshoreShareLoadMatch is the typed request payload for WindOnshoreShare.LoadTyped.
type WindOnshoreShareLoadMatch struct {
	Country *string `json:"country,omitempty"`
}

// WindOnshoreShareDailyAvg is the typed data model for the wind_onshore_share_daily_avg entity.
type WindOnshoreShareDailyAvg struct {
}

// WindOnshoreShareDailyAvgListMatch is the typed request payload for WindOnshoreShareDailyAvg.ListTyped.
type WindOnshoreShareDailyAvgListMatch struct {
	Country *string `json:"country,omitempty"`
	Year *int `json:"year,omitempty"`
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
