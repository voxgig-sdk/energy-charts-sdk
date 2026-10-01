# EnergyCharts PHP SDK



The PHP SDK for the EnergyCharts API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Cbet()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/energy-charts-sdk
composer config repositories.energy-charts-sdk path ./energy-charts-sdk/php
composer require voxgig-sdk/energy-charts-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'energycharts_sdk.php';

$client = new EnergyChartsSDK();
```

### 3. Load a cbet

```php
try {
    // load() returns the ENTITY — call data_get() for the Cbet record (throws on error).
    $cbet = $client->Cbet()->load();
    print_r($cbet->data_get());
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $publicpower = $client->PublicPower()->load();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = EnergyChartsSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$publicpower = $client->PublicPower()->load();
print_r($publicpower->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new EnergyChartsSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ENERGY_CHARTS_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### EnergyChartsSDK

```php
require_once 'energycharts_sdk.php';
$client = new EnergyChartsSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = EnergyChartsSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### EnergyChartsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Cbet` | `($data): CbetEntity` | Create a Cbet entity instance. |
| `Cbpf` | `($data): CbpfEntity` | Create a Cbpf entity instance. |
| `Frequency` | `($data): FrequencyEntity` | Create a Frequency entity instance. |
| `InstalledModel` | `($data): InstalledModelEntity` | Create an InstalledModel entity instance. |
| `Price` | `($data): PriceEntity` | Create a Price entity instance. |
| `PublicPower` | `($data): PublicPowerEntity` | Create a PublicPower entity instance. |
| `PublicPowerForecast` | `($data): PublicPowerForecastEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareDailyAvg` | `($data): RenShareDailyAvgEntity` | Create a RenShareDailyAvg entity instance. |
| `RenShareModel` | `($data): RenShareModelEntity` | Create a RenShareModel entity instance. |
| `SolarShare` | `($data): SolarShareEntity` | Create a SolarShare entity instance. |
| `SolarShareDailyAvg` | `($data): SolarShareDailyAvgEntity` | Create a SolarShareDailyAvg entity instance. |
| `TotalPower` | `($data): TotalPowerEntity` | Create a TotalPower entity instance. |
| `TrafficModel` | `($data): TrafficModelEntity` | Create a TrafficModel entity instance. |
| `WindOffshoreShare` | `($data): WindOffshoreShareEntity` | Create a WindOffshoreShare entity instance. |
| `WindOffshoreShareDailyAvg` | `($data): WindOffshoreShareDailyAvgEntity` | Create a WindOffshoreShareDailyAvg entity instance. |
| `WindOnshoreShare` | `($data): WindOnshoreShareEntity` | Create a WindOnshoreShare entity instance. |
| `WindOnshoreShareDailyAvg` | `($data): WindOnshoreShareDailyAvgEntity` | Create a WindOnshoreShareDailyAvg entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Cbet

| Field | Description |
| --- | --- |
| `countries` |  |
| `deprecated` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/cbet`

#### Cbpf

| Field | Description |
| --- | --- |
| `countries` |  |
| `deprecated` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/cbpf`

#### Frequency

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `unix_seconds` |  |

Operations: List.

API path: `/frequency`

#### InstalledModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `last_update` |  |
| `production_types` |  |
| `time` |  |

Operations: List.

API path: `/installed_power`

#### Price

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `license_info` |  |
| `price` |  |
| `unit` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/price`

#### PublicPower

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `production_types` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/public_power`

#### PublicPowerForecast

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `forecast_type` |  |
| `forecast_values` |  |
| `production_type` |  |
| `unix_seconds` |  |

Operations: List.

API path: `/public_power_forecast`

#### RenShareDailyAvg

| Field | Description |
| --- | --- |
| `data` | List of average daily values |
| `days` | List of days in the format dd.mm.yyyy |
| `deprecated` |  |

Operations: List.

API path: `/ren_share_daily_avg`

#### RenShareModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `ren_share` |  |
| `solar_share` |  |
| `substitute` |  |
| `unix_seconds` |  |
| `wind_offshore_share` |  |
| `wind_onshore_share` |  |

Operations: List.

API path: `/ren_share_forecast`

#### SolarShare

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `forecast` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/solar_share`

#### SolarShareDailyAvg

| Field | Description |
| --- | --- |
| `data` | List of average daily values |
| `days` | List of days in the format dd.mm.yyyy |
| `deprecated` |  |

Operations: List.

API path: `/solar_share_daily_avg`

#### TotalPower

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `production_types` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/total_power`

#### TrafficModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `share` |  |
| `signal` | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` |  |
| `unix_seconds` |  |

Operations: List.

API path: `/signal`

#### WindOffshoreShare

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `forecast` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/wind_offshore_share`

#### WindOffshoreShareDailyAvg

| Field | Description |
| --- | --- |
| `data` | List of average daily values |
| `days` | List of days in the format dd.mm.yyyy |
| `deprecated` |  |

Operations: List.

API path: `/wind_offshore_share_daily_avg`

#### WindOnshoreShare

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `forecast` |  |
| `unix_seconds` |  |

Operations: Load.

API path: `/wind_onshore_share`

#### WindOnshoreShareDailyAvg

| Field | Description |
| --- | --- |
| `data` | List of average daily values |
| `days` | List of days in the format dd.mm.yyyy |
| `deprecated` |  |

Operations: List.

API path: `/wind_onshore_share_daily_avg`



## Entities


### Cbet

Create an instance: `$cbet = $client->Cbet();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countries` | `mixed` |  |
| `deprecated` | `bool` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Cbet record (throws on error).
$cbet = $client->Cbet()->load();
```


### Cbpf

Create an instance: `$cbpf = $client->Cbpf();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countries` | `mixed` |  |
| `deprecated` | `bool` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Cbpf record (throws on error).
$cbpf = $client->Cbpf()->load();
```


### Frequency

Create an instance: `$frequency = $client->Frequency();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` |  |
| `deprecated` | `bool` |  |
| `unix_seconds` | `mixed` |  |

#### Example: List

```php
// list() returns an array of Frequency records (throws on error).
$frequencys = $client->Frequency()->list();
```


### InstalledModel

Create an instance: `$installed_model = $client->InstalledModel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `last_update` | `mixed` |  |
| `production_types` | `mixed` |  |
| `time` | `array` |  |

#### Example: List

```php
// list() returns an array of InstalledModel records (throws on error).
$installed_models = $client->InstalledModel()->list();
```


### Price

Create an instance: `$price = $client->Price();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `license_info` | `string` |  |
| `price` | `float` |  |
| `unit` | `string` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Price record (throws on error).
$price = $client->Price()->load();
```


### PublicPower

Create an instance: `$public_power = $client->PublicPower();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_types` | `mixed` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the PublicPower record (throws on error).
$public_power = $client->PublicPower()->load();
```


### PublicPowerForecast

Create an instance: `$public_power_forecast = $client->PublicPowerForecast();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `forecast_type` | `string` |  |
| `forecast_values` | `array` |  |
| `production_type` | `string` |  |
| `unix_seconds` | `array` |  |

#### Example: List

```php
// list() returns an array of PublicPowerForecast records (throws on error).
$public_power_forecasts = $client->PublicPowerForecast()->list();
```


### RenShareDailyAvg

Create an instance: `$ren_share_daily_avg = $client->RenShareDailyAvg();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` | List of average daily values |
| `days` | `array` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```php
// list() returns an array of RenShareDailyAvg records (throws on error).
$ren_share_daily_avgs = $client->RenShareDailyAvg()->list();
```


### RenShareModel

Create an instance: `$ren_share_model = $client->RenShareModel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `ren_share` | `array` |  |
| `solar_share` | `mixed` |  |
| `substitute` | `bool` |  |
| `unix_seconds` | `array` |  |
| `wind_offshore_share` | `mixed` |  |
| `wind_onshore_share` | `mixed` |  |

#### Example: List

```php
// list() returns an array of RenShareModel records (throws on error).
$ren_share_models = $client->RenShareModel()->list();
```


### SolarShare

Create an instance: `$solar_share = $client->SolarShare();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `mixed` |  |
| `deprecated` | `bool` |  |
| `forecast` | `mixed` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SolarShare record (throws on error).
$solar_share = $client->SolarShare()->load();
```


### SolarShareDailyAvg

Create an instance: `$solar_share_daily_avg = $client->SolarShareDailyAvg();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` | List of average daily values |
| `days` | `array` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```php
// list() returns an array of SolarShareDailyAvg records (throws on error).
$solar_share_daily_avgs = $client->SolarShareDailyAvg()->list();
```


### TotalPower

Create an instance: `$total_power = $client->TotalPower();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_types` | `mixed` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the TotalPower record (throws on error).
$total_power = $client->TotalPower()->load();
```


### TrafficModel

Create an instance: `$traffic_model = $client->TrafficModel();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `share` | `array` |  |
| `signal` | `array` | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `bool` |  |
| `unix_seconds` | `array` |  |

#### Example: List

```php
// list() returns an array of TrafficModel records (throws on error).
$traffic_models = $client->TrafficModel()->list();
```


### WindOffshoreShare

Create an instance: `$wind_offshore_share = $client->WindOffshoreShare();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `mixed` |  |
| `deprecated` | `bool` |  |
| `forecast` | `mixed` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WindOffshoreShare record (throws on error).
$wind_offshore_share = $client->WindOffshoreShare()->load();
```


### WindOffshoreShareDailyAvg

Create an instance: `$wind_offshore_share_daily_avg = $client->WindOffshoreShareDailyAvg();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` | List of average daily values |
| `days` | `array` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```php
// list() returns an array of WindOffshoreShareDailyAvg records (throws on error).
$wind_offshore_share_daily_avgs = $client->WindOffshoreShareDailyAvg()->list();
```


### WindOnshoreShare

Create an instance: `$wind_onshore_share = $client->WindOnshoreShare();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `mixed` |  |
| `deprecated` | `bool` |  |
| `forecast` | `mixed` |  |
| `unix_seconds` | `mixed` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the WindOnshoreShare record (throws on error).
$wind_onshore_share = $client->WindOnshoreShare()->load();
```


### WindOnshoreShareDailyAvg

Create an instance: `$wind_onshore_share_daily_avg = $client->WindOnshoreShareDailyAvg();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `array` | List of average daily values |
| `days` | `array` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```php
// list() returns an array of WindOnshoreShareDailyAvg records (throws on error).
$wind_onshore_share_daily_avgs = $client->WindOnshoreShareDailyAvg()->list();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── energycharts_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`energycharts_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$publicpower = $client->PublicPower();
$publicpower->load();

// $publicpower->data_get() now returns the publicpower data from the last load
// $publicpower->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
