# EnergyCharts PHP SDK Reference

Complete API reference for the EnergyCharts PHP SDK.


## EnergyChartsSDK

### Constructor

```php
require_once __DIR__ . '/energycharts_sdk.php';

$client = new EnergyChartsSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EnergyChartsSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = EnergyChartsSDK::test();
```


### Instance Methods

#### `CrossBorderModel($data = null)`

Create a new `CrossBorderModelEntity` instance. Pass `null` for no initial data.

#### `DailyAvgDict($data = null)`

Create a new `DailyAvgDictEntity` instance. Pass `null` for no initial data.

#### `Frequency($data = null)`

Create a new `FrequencyEntity` instance. Pass `null` for no initial data.

#### `InstalledModel($data = null)`

Create a new `InstalledModelEntity` instance. Pass `null` for no initial data.

#### `Price($data = null)`

Create a new `PriceEntity` instance. Pass `null` for no initial data.

#### `ProductionModel($data = null)`

Create a new `ProductionModelEntity` instance. Pass `null` for no initial data.

#### `PublicPowerForecast($data = null)`

Create a new `PublicPowerForecastEntity` instance. Pass `null` for no initial data.

#### `RenShareModel($data = null)`

Create a new `RenShareModelEntity` instance. Pass `null` for no initial data.

#### `ShareModel($data = null)`

Create a new `ShareModelEntity` instance. Pass `null` for no initial data.

#### `TrafficModel($data = null)`

Create a new `TrafficModelEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): EnergyChartsUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## CrossBorderModelEntity

```php
$cross_border_model = $client->CrossBorderModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `mixed` | No |  |
| `deprecated` | `bool` | Yes |  |
| `unix_second` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->CrossBorderModel()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CrossBorderModelEntity`

Create a new `CrossBorderModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DailyAvgDictEntity

```php
$daily_avg_dict = $client->DailyAvgDict();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `day` | `array` | Yes |  |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DailyAvgDict()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DailyAvgDictEntity`

Create a new `DailyAvgDictEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FrequencyEntity

```php
$frequency = $client->Frequency();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `array` | Yes |  |
| `deprecated` | `bool` | Yes |  |
| `unix_second` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Frequency()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FrequencyEntity`

Create a new `FrequencyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## InstalledModelEntity

```php
$installed_model = $client->InstalledModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `last_update` | `mixed` | Yes |  |
| `production_type` | `mixed` | No |  |
| `time` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->InstalledModel()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): InstalledModelEntity`

Create a new `InstalledModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PriceEntity

```php
$price = $client->Price();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `license_info` | `string` | Yes |  |
| `price` | `float` | No |  |
| `unit` | `string` | Yes |  |
| `unix_second` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Price()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PriceEntity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductionModelEntity

```php
$production_model = $client->ProductionModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `production_type` | `mixed` | No |  |
| `unix_second` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ProductionModel()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductionModelEntity`

Create a new `ProductionModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PublicPowerForecastEntity

```php
$public_power_forecast = $client->PublicPowerForecast();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `forecast_type` | `string` | Yes |  |
| `forecast_value` | `array` | Yes |  |
| `production_type` | `string` | Yes |  |
| `unix_second` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->PublicPowerForecast()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PublicPowerForecastEntity`

Create a new `PublicPowerForecastEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## RenShareModelEntity

```php
$ren_share_model = $client->RenShareModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `ren_share` | `array` | Yes |  |
| `solar_share` | `mixed` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_second` | `array` | Yes |  |
| `wind_offshore_share` | `mixed` | No |  |
| `wind_onshore_share` | `mixed` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->RenShareModel()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): RenShareModelEntity`

Create a new `RenShareModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ShareModelEntity

```php
$share_model = $client->ShareModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `mixed` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `mixed` | No |  |
| `unix_second` | `mixed` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ShareModel()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ShareModelEntity`

Create a new `ShareModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TrafficModelEntity

```php
$traffic_model = $client->TrafficModel();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `share` | `array` | Yes |  |
| `signal` | `array` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_second` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->TrafficModel()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TrafficModelEntity`

Create a new `TrafficModelEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new EnergyChartsSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

