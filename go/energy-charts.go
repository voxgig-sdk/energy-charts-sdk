package voxgigenergychartssdk

import (
	"github.com/voxgig-sdk/energy-charts-sdk/go/core"
	"github.com/voxgig-sdk/energy-charts-sdk/go/entity"
	"github.com/voxgig-sdk/energy-charts-sdk/go/feature"
	_ "github.com/voxgig-sdk/energy-charts-sdk/go/utility"
)

// Type aliases preserve external API.
type EnergyChartsSDK = core.EnergyChartsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EnergyChartsEntity = core.EnergyChartsEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type EnergyChartsError = core.EnergyChartsError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewCbetEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewCbetEntity(client, entopts)
	}
	core.NewCbpfEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewCbpfEntity(client, entopts)
	}
	core.NewFrequencyEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewFrequencyEntity(client, entopts)
	}
	core.NewInstalledModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewInstalledModelEntity(client, entopts)
	}
	core.NewPriceEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewPriceEntity(client, entopts)
	}
	core.NewPublicPowerEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewPublicPowerEntity(client, entopts)
	}
	core.NewPublicPowerForecastEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewPublicPowerForecastEntity(client, entopts)
	}
	core.NewRenShareDailyAvgEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewRenShareDailyAvgEntity(client, entopts)
	}
	core.NewRenShareModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewRenShareModelEntity(client, entopts)
	}
	core.NewSolarShareEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewSolarShareEntity(client, entopts)
	}
	core.NewSolarShareDailyAvgEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewSolarShareDailyAvgEntity(client, entopts)
	}
	core.NewTotalPowerEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewTotalPowerEntity(client, entopts)
	}
	core.NewTrafficModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewTrafficModelEntity(client, entopts)
	}
	core.NewWindOffshoreShareEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewWindOffshoreShareEntity(client, entopts)
	}
	core.NewWindOffshoreShareDailyAvgEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewWindOffshoreShareDailyAvgEntity(client, entopts)
	}
	core.NewWindOnshoreShareEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewWindOnshoreShareEntity(client, entopts)
	}
	core.NewWindOnshoreShareDailyAvgEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewWindOnshoreShareDailyAvgEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewEnergyChartsSDK = core.NewEnergyChartsSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewEnergyChartsSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *EnergyChartsSDK  { return NewEnergyChartsSDK(nil) }
func Test() *EnergyChartsSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature
