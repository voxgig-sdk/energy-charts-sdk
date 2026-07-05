<?php
declare(strict_types=1);

// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CrossBorderModel entity data model. */
class CrossBorderModel
{
    public mixed $country = null;
    public bool $deprecated;
    public mixed $unix_second = null;
}

/** Request payload for CrossBorderModel#load. */
class CrossBorderModelLoadMatch
{
    public mixed $country = null;
    public ?bool $deprecated = null;
    public mixed $unix_second = null;
}

/** DailyAvgDict entity data model. */
class DailyAvgDict
{
    public array $data;
    public array $day;
    public bool $deprecated;
}

/** Request payload for DailyAvgDict#list. */
class DailyAvgDictListMatch
{
    public ?array $data = null;
    public ?array $day = null;
    public ?bool $deprecated = null;
}

/** Frequency entity data model. */
class Frequency
{
    public array $data;
    public bool $deprecated;
    public mixed $unix_second = null;
}

/** Request payload for Frequency#list. */
class FrequencyListMatch
{
    public ?array $data = null;
    public ?bool $deprecated = null;
    public mixed $unix_second = null;
}

/** InstalledModel entity data model. */
class InstalledModel
{
    public bool $deprecated;
    public mixed $last_update;
    public mixed $production_type = null;
    public array $time;
}

/** Request payload for InstalledModel#list. */
class InstalledModelListMatch
{
    public ?bool $deprecated = null;
    public mixed $last_update = null;
    public mixed $production_type = null;
    public ?array $time = null;
}

/** Price entity data model. */
class Price
{
    public bool $deprecated;
    public string $license_info;
    public ?float $price = null;
    public string $unit;
    public mixed $unix_second = null;
}

/** Request payload for Price#load. */
class PriceLoadMatch
{
    public ?bool $deprecated = null;
    public ?string $license_info = null;
    public ?float $price = null;
    public ?string $unit = null;
    public mixed $unix_second = null;
}

/** ProductionModel entity data model. */
class ProductionModel
{
    public bool $deprecated;
    public mixed $production_type = null;
    public mixed $unix_second = null;
}

/** Request payload for ProductionModel#load. */
class ProductionModelLoadMatch
{
    public ?bool $deprecated = null;
    public mixed $production_type = null;
    public mixed $unix_second = null;
}

/** PublicPowerForecast entity data model. */
class PublicPowerForecast
{
    public bool $deprecated;
    public string $forecast_type;
    public array $forecast_value;
    public string $production_type;
    public array $unix_second;
}

/** Request payload for PublicPowerForecast#list. */
class PublicPowerForecastListMatch
{
    public ?bool $deprecated = null;
    public ?string $forecast_type = null;
    public ?array $forecast_value = null;
    public ?string $production_type = null;
    public ?array $unix_second = null;
}

/** RenShareModel entity data model. */
class RenShareModel
{
    public bool $deprecated;
    public array $ren_share;
    public mixed $solar_share = null;
    public bool $substitute;
    public array $unix_second;
    public mixed $wind_offshore_share = null;
    public mixed $wind_onshore_share = null;
}

/** Request payload for RenShareModel#list. */
class RenShareModelListMatch
{
    public ?bool $deprecated = null;
    public ?array $ren_share = null;
    public mixed $solar_share = null;
    public ?bool $substitute = null;
    public ?array $unix_second = null;
    public mixed $wind_offshore_share = null;
    public mixed $wind_onshore_share = null;
}

/** ShareModel entity data model. */
class ShareModel
{
    public mixed $data = null;
    public bool $deprecated;
    public mixed $forecast = null;
    public mixed $unix_second = null;
}

/** Request payload for ShareModel#load. */
class ShareModelLoadMatch
{
    public mixed $data = null;
    public ?bool $deprecated = null;
    public mixed $forecast = null;
    public mixed $unix_second = null;
}

/** TrafficModel entity data model. */
class TrafficModel
{
    public bool $deprecated;
    public array $share;
    public ?array $signal = null;
    public bool $substitute;
    public array $unix_second;
}

/** Request payload for TrafficModel#list. */
class TrafficModelListMatch
{
    public ?bool $deprecated = null;
    public ?array $share = null;
    public ?array $signal = null;
    public ?bool $substitute = null;
    public ?array $unix_second = null;
}

