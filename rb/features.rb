# EnergyCharts SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module EnergyChartsFeatures
  def self.make_feature(name)
    case name
    when "base"
      EnergyChartsBaseFeature.new
    when "test"
      EnergyChartsTestFeature.new
    else
      EnergyChartsBaseFeature.new
    end
  end
end
