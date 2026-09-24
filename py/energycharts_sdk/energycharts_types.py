# Typed models for the EnergyCharts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CbetRequired(TypedDict):
    deprecated: bool


class Cbet(CbetRequired, total=False):
    countries: Any
    unix_seconds: Any


class CbetLoadMatch(TypedDict, total=False):
    country: str
    end: str
    start: str


class CbpfRequired(TypedDict):
    deprecated: bool


class Cbpf(CbpfRequired, total=False):
    countries: Any
    unix_seconds: Any


class CbpfLoadMatch(TypedDict, total=False):
    country: str
    end: str
    start: str


class FrequencyRequired(TypedDict):
    data: list
    deprecated: bool


class Frequency(FrequencyRequired, total=False):
    unix_seconds: Any


class FrequencyListMatch(TypedDict, total=False):
    end: str
    region: str
    start: str


class InstalledModelRequired(TypedDict):
    deprecated: bool
    last_update: Any
    time: list


class InstalledModel(InstalledModelRequired, total=False):
    production_types: Any


class InstalledModelListMatch(TypedDict, total=False):
    country: str
    installation_decommission: bool
    time_step: str


class PriceRequired(TypedDict):
    deprecated: bool
    license_info: str
    unit: str


class Price(PriceRequired, total=False):
    price: float
    unix_seconds: Any


class PriceLoadMatch(TypedDict, total=False):
    bzn: str
    end: str
    start: str


class PublicPowerRequired(TypedDict):
    deprecated: bool


class PublicPower(PublicPowerRequired, total=False):
    production_types: Any
    unix_seconds: Any


class PublicPowerLoadMatch(TypedDict, total=False):
    country: str
    end: str
    start: str
    subtype: str


class PublicPowerForecast(TypedDict):
    deprecated: bool
    forecast_type: str
    forecast_values: list
    production_type: str
    unix_seconds: list


class PublicPowerForecastListMatch(TypedDict, total=False):
    country: str
    end: str
    forecast_type: str
    production_type: str
    start: str


class RenShareDailyAvg(TypedDict):
    data: list
    days: list
    deprecated: bool


class RenShareDailyAvgListMatch(TypedDict, total=False):
    country: str
    year: int


class RenShareModelRequired(TypedDict):
    deprecated: bool
    ren_share: list
    substitute: bool
    unix_seconds: list


class RenShareModel(RenShareModelRequired, total=False):
    solar_share: Any
    wind_offshore_share: Any
    wind_onshore_share: Any


class RenShareModelListMatch(TypedDict, total=False):
    country: str


class SolarShareRequired(TypedDict):
    deprecated: bool


class SolarShare(SolarShareRequired, total=False):
    data: Any
    forecast: Any
    unix_seconds: Any


class SolarShareLoadMatch(TypedDict, total=False):
    country: str


class SolarShareDailyAvg(TypedDict):
    data: list
    days: list
    deprecated: bool


class SolarShareDailyAvgListMatch(TypedDict, total=False):
    country: str
    year: int


class TotalPowerRequired(TypedDict):
    deprecated: bool


class TotalPower(TotalPowerRequired, total=False):
    production_types: Any
    unix_seconds: Any


class TotalPowerLoadMatch(TypedDict, total=False):
    country: str
    end: str
    start: str


class TrafficModelRequired(TypedDict):
    deprecated: bool
    share: list
    substitute: bool
    unix_seconds: list


class TrafficModel(TrafficModelRequired, total=False):
    signal: list


class TrafficModelListMatch(TypedDict, total=False):
    country: str
    postal_code: str


class WindOffshoreShareRequired(TypedDict):
    deprecated: bool


class WindOffshoreShare(WindOffshoreShareRequired, total=False):
    data: Any
    forecast: Any
    unix_seconds: Any


class WindOffshoreShareLoadMatch(TypedDict, total=False):
    country: str


class WindOffshoreShareDailyAvg(TypedDict):
    data: list
    days: list
    deprecated: bool


class WindOffshoreShareDailyAvgListMatch(TypedDict, total=False):
    country: str
    year: int


class WindOnshoreShareRequired(TypedDict):
    deprecated: bool


class WindOnshoreShare(WindOnshoreShareRequired, total=False):
    data: Any
    forecast: Any
    unix_seconds: Any


class WindOnshoreShareLoadMatch(TypedDict, total=False):
    country: str


class WindOnshoreShareDailyAvg(TypedDict):
    data: list
    days: list
    deprecated: bool


class WindOnshoreShareDailyAvgListMatch(TypedDict, total=False):
    country: str
    year: int
