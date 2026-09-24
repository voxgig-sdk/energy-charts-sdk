<?php
declare(strict_types=1);

// Typed models for the EnergyCharts SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cbet entity data model. */
class Cbet
{
    public mixed $countries = null;
    public bool $deprecated;
    public mixed $unix_seconds = null;
}

/** Request payload for Cbet#load. */
class CbetLoadMatch
{
    public ?string $country = null;
    public ?string $end = null;
    public ?string $start = null;
}

/** Cbpf entity data model. */
class Cbpf
{
    public mixed $countries = null;
    public bool $deprecated;
    public mixed $unix_seconds = null;
}

/** Request payload for Cbpf#load. */
class CbpfLoadMatch
{
    public ?string $country = null;
    public ?string $end = null;
    public ?string $start = null;
}

/** Frequency entity data model. */
class Frequency
{
    public array $data;
    public bool $deprecated;
    public mixed $unix_seconds = null;
}

/** Request payload for Frequency#list. */
class FrequencyListMatch
{
    public ?string $end = null;
    public ?string $region = null;
    public ?string $start = null;
}

/** InstalledModel entity data model. */
class InstalledModel
{
    public bool $deprecated;
    public mixed $last_update;
    public mixed $production_types = null;
    public array $time;
}

/** Request payload for InstalledModel#list. */
class InstalledModelListMatch
{
    public ?string $country = null;
    public ?bool $installation_decommission = null;
    public ?string $time_step = null;
}

/** Price entity data model. */
class Price
{
    public bool $deprecated;
    public string $license_info;
    public ?float $price = null;
    public string $unit;
    public mixed $unix_seconds = null;
}

/** Request payload for Price#load. */
class PriceLoadMatch
{
    public ?string $bzn = null;
    public ?string $end = null;
    public ?string $start = null;
}

/** PublicPower entity data model. */
class PublicPower
{
    public bool $deprecated;
    public mixed $production_types = null;
    public mixed $unix_seconds = null;
}

/** Request payload for PublicPower#load. */
class PublicPowerLoadMatch
{
    public ?string $country = null;
    public ?string $end = null;
    public ?string $start = null;
    public ?string $subtype = null;
}

/** PublicPowerForecast entity data model. */
class PublicPowerForecast
{
    public bool $deprecated;
    public string $forecast_type;
    public array $forecast_values;
    public string $production_type;
    public array $unix_seconds;
}

/** Request payload for PublicPowerForecast#list. */
class PublicPowerForecastListMatch
{
    public ?string $country = null;
    public ?string $end = null;
    public ?string $forecast_type = null;
    public ?string $production_type = null;
    public ?string $start = null;
}

/** RenShareDailyAvg entity data model. */
class RenShareDailyAvg
{
    public array $data;
    public array $days;
    public bool $deprecated;
}

/** Request payload for RenShareDailyAvg#list. */
class RenShareDailyAvgListMatch
{
    public ?string $country = null;
    public ?int $year = null;
}

/** RenShareModel entity data model. */
class RenShareModel
{
    public bool $deprecated;
    public array $ren_share;
    public mixed $solar_share = null;
    public bool $substitute;
    public array $unix_seconds;
    public mixed $wind_offshore_share = null;
    public mixed $wind_onshore_share = null;
}

/** Request payload for RenShareModel#list. */
class RenShareModelListMatch
{
    public ?string $country = null;
}

/** SolarShare entity data model. */
class SolarShare
{
    public mixed $data = null;
    public bool $deprecated;
    public mixed $forecast = null;
    public mixed $unix_seconds = null;
}

/** Request payload for SolarShare#load. */
class SolarShareLoadMatch
{
    public ?string $country = null;
}

/** SolarShareDailyAvg entity data model. */
class SolarShareDailyAvg
{
    public array $data;
    public array $days;
    public bool $deprecated;
}

/** Request payload for SolarShareDailyAvg#list. */
class SolarShareDailyAvgListMatch
{
    public ?string $country = null;
    public ?int $year = null;
}

/** TotalPower entity data model. */
class TotalPower
{
    public bool $deprecated;
    public mixed $production_types = null;
    public mixed $unix_seconds = null;
}

/** Request payload for TotalPower#load. */
class TotalPowerLoadMatch
{
    public ?string $country = null;
    public ?string $end = null;
    public ?string $start = null;
}

/** TrafficModel entity data model. */
class TrafficModel
{
    public bool $deprecated;
    public array $share;
    public ?array $signal = null;
    public bool $substitute;
    public array $unix_seconds;
}

/** Request payload for TrafficModel#list. */
class TrafficModelListMatch
{
    public ?string $country = null;
    public ?string $postal_code = null;
}

/** WindOffshoreShare entity data model. */
class WindOffshoreShare
{
    public mixed $data = null;
    public bool $deprecated;
    public mixed $forecast = null;
    public mixed $unix_seconds = null;
}

/** Request payload for WindOffshoreShare#load. */
class WindOffshoreShareLoadMatch
{
    public ?string $country = null;
}

/** WindOffshoreShareDailyAvg entity data model. */
class WindOffshoreShareDailyAvg
{
    public array $data;
    public array $days;
    public bool $deprecated;
}

/** Request payload for WindOffshoreShareDailyAvg#list. */
class WindOffshoreShareDailyAvgListMatch
{
    public ?string $country = null;
    public ?int $year = null;
}

/** WindOnshoreShare entity data model. */
class WindOnshoreShare
{
    public mixed $data = null;
    public bool $deprecated;
    public mixed $forecast = null;
    public mixed $unix_seconds = null;
}

/** Request payload for WindOnshoreShare#load. */
class WindOnshoreShareLoadMatch
{
    public ?string $country = null;
}

/** WindOnshoreShareDailyAvg entity data model. */
class WindOnshoreShareDailyAvg
{
    public array $data;
    public array $days;
    public bool $deprecated;
}

/** Request payload for WindOnshoreShareDailyAvg#list. */
class WindOnshoreShareDailyAvgListMatch
{
    public ?string $country = null;
    public ?int $year = null;
}

