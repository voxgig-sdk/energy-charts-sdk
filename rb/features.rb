# EnergyCharts SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module EnergyChartsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EnergyChartsBaseFeature.new
    when "ratelimit"
      EnergyChartsRatelimitFeature.new
    when "retry"
      EnergyChartsRetryFeature.new
    when "test"
      EnergyChartsTestFeature.new
    when "timeout"
      EnergyChartsTimeoutFeature.new
    else
      EnergyChartsBaseFeature.new
    end
  end
end
