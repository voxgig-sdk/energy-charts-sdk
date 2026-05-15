# EnergyCharts SDK utility: make_context
require_relative '../core/context'
module EnergyChartsUtilities
  MakeContext = ->(ctxmap, basectx) {
    EnergyChartsContext.new(ctxmap, basectx)
  }
end
