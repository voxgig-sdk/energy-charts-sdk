# EnergyCharts SDK feature factory

from feature.base_feature import EnergyChartsBaseFeature
from feature.test_feature import EnergyChartsTestFeature


def _make_feature(name):
    features = {
        "base": lambda: EnergyChartsBaseFeature(),
        "test": lambda: EnergyChartsTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
