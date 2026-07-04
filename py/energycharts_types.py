# Typed models for the EnergyCharts SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CrossBorderModel:
    deprecated: bool
    country: Optional[Any] = None
    unix_second: Optional[Any] = None


@dataclass
class CrossBorderModelLoadMatch:
    country: Optional[Any] = None
    deprecated: Optional[bool] = None
    unix_second: Optional[Any] = None


@dataclass
class DailyAvgDict:
    data: list
    day: list
    deprecated: bool


@dataclass
class DailyAvgDictListMatch:
    data: Optional[list] = None
    day: Optional[list] = None
    deprecated: Optional[bool] = None


@dataclass
class Frequency:
    data: list
    deprecated: bool
    unix_second: Optional[Any] = None


@dataclass
class FrequencyListMatch:
    data: Optional[list] = None
    deprecated: Optional[bool] = None
    unix_second: Optional[Any] = None


@dataclass
class InstalledModel:
    deprecated: bool
    last_update: Any
    time: list
    production_type: Optional[Any] = None


@dataclass
class InstalledModelListMatch:
    deprecated: Optional[bool] = None
    last_update: Optional[Any] = None
    production_type: Optional[Any] = None
    time: Optional[list] = None


@dataclass
class Price:
    deprecated: bool
    license_info: str
    unit: str
    price: Optional[float] = None
    unix_second: Optional[Any] = None


@dataclass
class PriceLoadMatch:
    deprecated: Optional[bool] = None
    license_info: Optional[str] = None
    price: Optional[float] = None
    unit: Optional[str] = None
    unix_second: Optional[Any] = None


@dataclass
class ProductionModel:
    deprecated: bool
    production_type: Optional[Any] = None
    unix_second: Optional[Any] = None


@dataclass
class ProductionModelLoadMatch:
    deprecated: Optional[bool] = None
    production_type: Optional[Any] = None
    unix_second: Optional[Any] = None


@dataclass
class PublicPowerForecast:
    deprecated: bool
    forecast_type: str
    forecast_value: list
    production_type: str
    unix_second: list


@dataclass
class PublicPowerForecastListMatch:
    deprecated: Optional[bool] = None
    forecast_type: Optional[str] = None
    forecast_value: Optional[list] = None
    production_type: Optional[str] = None
    unix_second: Optional[list] = None


@dataclass
class RenShareModel:
    deprecated: bool
    ren_share: list
    substitute: bool
    unix_second: list
    solar_share: Optional[Any] = None
    wind_offshore_share: Optional[Any] = None
    wind_onshore_share: Optional[Any] = None


@dataclass
class RenShareModelListMatch:
    deprecated: Optional[bool] = None
    ren_share: Optional[list] = None
    solar_share: Optional[Any] = None
    substitute: Optional[bool] = None
    unix_second: Optional[list] = None
    wind_offshore_share: Optional[Any] = None
    wind_onshore_share: Optional[Any] = None


@dataclass
class ShareModel:
    deprecated: bool
    data: Optional[Any] = None
    forecast: Optional[Any] = None
    unix_second: Optional[Any] = None


@dataclass
class ShareModelLoadMatch:
    data: Optional[Any] = None
    deprecated: Optional[bool] = None
    forecast: Optional[Any] = None
    unix_second: Optional[Any] = None


@dataclass
class TrafficModel:
    deprecated: bool
    share: list
    substitute: bool
    unix_second: list
    signal: Optional[list] = None


@dataclass
class TrafficModelListMatch:
    deprecated: Optional[bool] = None
    share: Optional[list] = None
    signal: Optional[list] = None
    substitute: Optional[bool] = None
    unix_second: Optional[list] = None

