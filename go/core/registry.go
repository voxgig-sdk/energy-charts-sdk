package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCrossBorderModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewDailyAvgDictEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewFrequencyEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewInstalledModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewPriceEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewProductionModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewPublicPowerForecastEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewRenShareModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewShareModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewTrafficModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

