# EnergyCharts PHP SDK



The PHP SDK for the EnergyCharts API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/energy-charts-sdk/releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'energycharts_sdk.php';

$client = new EnergyChartsSDK();
```

### 3. Load a crossbordermodel

```php
try {
    $result = $client->crossbordermodel()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
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
    echo "Error: " . $result["err"]->getMessage();
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

$result = $client->crossbordermodel()->load(["id" => "test01"]);
// $result contains mock response data
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
| `CrossBorderModel` | `($data): CrossBorderModelEntity` | Create a CrossBorderModel entity instance. |
| `DailyAvgDict` | `($data): DailyAvgDictEntity` | Create a DailyAvgDict entity instance. |
| `Frequency` | `($data): FrequencyEntity` | Create a Frequency entity instance. |
| `InstalledModel` | `($data): InstalledModelEntity` | Create a InstalledModel entity instance. |
| `Price` | `($data): PriceEntity` | Create a Price entity instance. |
| `ProductionModel` | `($data): ProductionModelEntity` | Create a ProductionModel entity instance. |
| `PublicPowerForecast` | `($data): PublicPowerForecastEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareModel` | `($data): RenShareModelEntity` | Create a RenShareModel entity instance. |
| `ShareModel` | `($data): ShareModelEntity` | Create a ShareModel entity instance. |
| `TrafficModel` | `($data): TrafficModelEntity` | Create a TrafficModel entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
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

#### CrossBorderModel

| Field | Description |
| --- | --- |
| `country` |  |
| `deprecated` |  |
| `unix_second` |  |

Operations: Load.

API path: `/cbet`

#### DailyAvgDict

| Field | Description |
| --- | --- |
| `data` |  |
| `day` |  |
| `deprecated` |  |

Operations: List.

API path: `/ren_share_daily_avg`

#### Frequency

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `unix_second` |  |

Operations: List.

API path: `/frequency`

#### InstalledModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `last_update` |  |
| `production_type` |  |
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
| `unix_second` |  |

Operations: Load.

API path: `/price`

#### ProductionModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `production_type` |  |
| `unix_second` |  |

Operations: Load.

API path: `/public_power`

#### PublicPowerForecast

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `forecast_type` |  |
| `forecast_value` |  |
| `production_type` |  |
| `unix_second` |  |

Operations: List.

API path: `/public_power_forecast`

#### RenShareModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `ren_share` |  |
| `solar_share` |  |
| `substitute` |  |
| `unix_second` |  |
| `wind_offshore_share` |  |
| `wind_onshore_share` |  |

Operations: List.

API path: `/ren_share_forecast`

#### ShareModel

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `forecast` |  |
| `unix_second` |  |

Operations: Load.

API path: `/solar_share`

#### TrafficModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `share` |  |
| `signal` |  |
| `substitute` |  |
| `unix_second` |  |

Operations: List.

API path: `/signal`



## Entities


### CrossBorderModel

Create an instance: `const cross_border_model = client.cross_border_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const cross_border_model = await client.cross_border_model.load({ id: 'cross_border_model_id' })
```


### DailyAvgDict

Create an instance: `const daily_avg_dict = client.daily_avg_dict`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `day` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |

#### Example: List

```ts
const daily_avg_dicts = await client.daily_avg_dict.list()
```


### Frequency

Create an instance: `const frequency = client.frequency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: List

```ts
const frequencys = await client.frequency.list()
```


### InstalledModel

Create an instance: `const installed_model = client.installed_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `last_update` | ``$ANY`` |  |
| `production_type` | ``$ANY`` |  |
| `time` | ``$ARRAY`` |  |

#### Example: List

```ts
const installed_models = await client.installed_model.list()
```


### Price

Create an instance: `const price = client.price`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `license_info` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |
| `unit` | ``$STRING`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const price = await client.price.load({ id: 'price_id' })
```


### ProductionModel

Create an instance: `const production_model = client.production_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `production_type` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const production_model = await client.production_model.load({ id: 'production_model_id' })
```


### PublicPowerForecast

Create an instance: `const public_power_forecast = client.public_power_forecast`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast_type` | ``$STRING`` |  |
| `forecast_value` | ``$ARRAY`` |  |
| `production_type` | ``$STRING`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```ts
const public_power_forecasts = await client.public_power_forecast.list()
```


### RenShareModel

Create an instance: `const ren_share_model = client.ren_share_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `ren_share` | ``$ARRAY`` |  |
| `solar_share` | ``$ANY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |
| `wind_offshore_share` | ``$ANY`` |  |
| `wind_onshore_share` | ``$ANY`` |  |

#### Example: List

```ts
const ren_share_models = await client.ren_share_model.list()
```


### ShareModel

Create an instance: `const share_model = client.share_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const share_model = await client.share_model.load({ id: 'share_model_id' })
```


### TrafficModel

Create an instance: `const traffic_model = client.traffic_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `share` | ``$ARRAY`` |  |
| `signal` | ``$ARRAY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```ts
const traffic_models = await client.traffic_model.list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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
$crossbordermodel = $client->crossbordermodel();
$crossbordermodel->load(["id" => "example_id"]);

// $crossbordermodel->dataGet() now returns the loaded crossbordermodel data
// $crossbordermodel->matchGet() returns the last match criteria
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
