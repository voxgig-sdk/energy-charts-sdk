# EnergyCharts SDK utility: prepare_body
require_relative 'media'
module EnergyChartsUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return EnergyChartsUtilities.raw_body(ctx.reqdata) if EnergyChartsUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
