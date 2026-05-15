package voxgigenergychartssdk

import (
	"github.com/voxgig-sdk/energy-charts-sdk/core"
	"github.com/voxgig-sdk/energy-charts-sdk/entity"
	"github.com/voxgig-sdk/energy-charts-sdk/feature"
	_ "github.com/voxgig-sdk/energy-charts-sdk/utility"
)

// Type aliases preserve external API.
type EnergyChartsSDK = core.EnergyChartsSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type EnergyChartsEntity = core.EnergyChartsEntity
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
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCrossBorderModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewCrossBorderModelEntity(client, entopts)
	}
	core.NewDailyAvgDictEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewDailyAvgDictEntity(client, entopts)
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
	core.NewProductionModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewProductionModelEntity(client, entopts)
	}
	core.NewPublicPowerForecastEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewPublicPowerForecastEntity(client, entopts)
	}
	core.NewRenShareModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewRenShareModelEntity(client, entopts)
	}
	core.NewShareModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewShareModelEntity(client, entopts)
	}
	core.NewTrafficModelEntityFunc = func(client *core.EnergyChartsSDK, entopts map[string]any) core.EnergyChartsEntity {
		return entity.NewTrafficModelEntity(client, entopts)
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
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
