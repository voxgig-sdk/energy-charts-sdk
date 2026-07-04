# Typed models for the EnergyCharts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
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


class CrossBorderModelRequired(TypedDict):
    deprecated: bool


class CrossBorderModel(CrossBorderModelRequired, total=False):
    country: Any
    unix_second: Any


class CrossBorderModelLoadMatch(TypedDict, total=False):
    country: Any
    deprecated: bool
    unix_second: Any


class DailyAvgDict(TypedDict):
    data: list
    day: list
    deprecated: bool


class DailyAvgDictListMatch(TypedDict, total=False):
    data: list
    day: list
    deprecated: bool


class FrequencyRequired(TypedDict):
    data: list
    deprecated: bool


class Frequency(FrequencyRequired, total=False):
    unix_second: Any


class FrequencyListMatch(TypedDict, total=False):
    data: list
    deprecated: bool
    unix_second: Any


class InstalledModelRequired(TypedDict):
    deprecated: bool
    last_update: Any
    time: list


class InstalledModel(InstalledModelRequired, total=False):
    production_type: Any


class InstalledModelListMatch(TypedDict, total=False):
    deprecated: bool
    last_update: Any
    production_type: Any
    time: list


class PriceRequired(TypedDict):
    deprecated: bool
    license_info: str
    unit: str


class Price(PriceRequired, total=False):
    price: float
    unix_second: Any


class PriceLoadMatch(TypedDict, total=False):
    deprecated: bool
    license_info: str
    price: float
    unit: str
    unix_second: Any


class ProductionModelRequired(TypedDict):
    deprecated: bool


class ProductionModel(ProductionModelRequired, total=False):
    production_type: Any
    unix_second: Any


class ProductionModelLoadMatch(TypedDict, total=False):
    deprecated: bool
    production_type: Any
    unix_second: Any


class PublicPowerForecast(TypedDict):
    deprecated: bool
    forecast_type: str
    forecast_value: list
    production_type: str
    unix_second: list


class PublicPowerForecastListMatch(TypedDict, total=False):
    deprecated: bool
    forecast_type: str
    forecast_value: list
    production_type: str
    unix_second: list


class RenShareModelRequired(TypedDict):
    deprecated: bool
    ren_share: list
    substitute: bool
    unix_second: list


class RenShareModel(RenShareModelRequired, total=False):
    solar_share: Any
    wind_offshore_share: Any
    wind_onshore_share: Any


class RenShareModelListMatch(TypedDict, total=False):
    deprecated: bool
    ren_share: list
    solar_share: Any
    substitute: bool
    unix_second: list
    wind_offshore_share: Any
    wind_onshore_share: Any


class ShareModelRequired(TypedDict):
    deprecated: bool


class ShareModel(ShareModelRequired, total=False):
    data: Any
    forecast: Any
    unix_second: Any


class ShareModelLoadMatch(TypedDict, total=False):
    data: Any
    deprecated: bool
    forecast: Any
    unix_second: Any


class TrafficModelRequired(TypedDict):
    deprecated: bool
    share: list
    substitute: bool
    unix_second: list


class TrafficModel(TrafficModelRequired, total=False):
    signal: list


class TrafficModelListMatch(TypedDict, total=False):
    deprecated: bool
    share: list
    signal: list
    substitute: bool
    unix_second: list
