# EnergyCharts SDK utility: feature_add
module EnergyChartsUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
