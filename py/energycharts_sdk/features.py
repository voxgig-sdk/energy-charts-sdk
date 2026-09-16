# EnergyCharts SDK feature factory

from energycharts_sdk.feature.base_feature import EnergyChartsBaseFeature
from energycharts_sdk.feature.ratelimit_feature import EnergyChartsRatelimitFeature
from energycharts_sdk.feature.retry_feature import EnergyChartsRetryFeature
from energycharts_sdk.feature.test_feature import EnergyChartsTestFeature
from energycharts_sdk.feature.timeout_feature import EnergyChartsTimeoutFeature


_FEATURES = {
    "base": lambda: EnergyChartsBaseFeature(),
    "ratelimit": lambda: EnergyChartsRatelimitFeature(),
    "retry": lambda: EnergyChartsRetryFeature(),
    "test": lambda: EnergyChartsTestFeature(),
    "timeout": lambda: EnergyChartsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
