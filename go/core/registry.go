package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCbetEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewCbpfEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewFrequencyEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewInstalledModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewPriceEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewPublicPowerEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewPublicPowerForecastEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewRenShareDailyAvgEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewRenShareModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewSolarShareEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewSolarShareDailyAvgEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewTotalPowerEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewTrafficModelEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewWindOffshoreShareEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewWindOffshoreShareDailyAvgEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewWindOnshoreShareEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

var NewWindOnshoreShareDailyAvgEntityFunc func(client *EnergyChartsSDK, entopts map[string]any) EnergyChartsEntity

