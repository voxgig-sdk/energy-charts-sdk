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
    countries: Any
    unix_seconds: Any


class CrossBorderModelLoadMatch(TypedDict, total=False):
    country: str
    end: str
    start: str


class DailyAvgDict(TypedDict):
    data: list
    days: list
    deprecated: bool


class DailyAvgDictListMatch(TypedDict, total=False):
    country: str
    year: int


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


class ProductionModelRequired(TypedDict):
    deprecated: bool


class ProductionModel(ProductionModelRequired, total=False):
    production_types: Any
    unix_seconds: Any


class ProductionModelLoadMatch(TypedDict, total=False):
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


class ShareModelRequired(TypedDict):
    deprecated: bool


class ShareModel(ShareModelRequired, total=False):
    data: Any
    forecast: Any
    unix_seconds: Any


class ShareModelLoadMatch(TypedDict, total=False):
    country: str


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
