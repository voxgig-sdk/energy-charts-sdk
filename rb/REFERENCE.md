# EnergyCharts Ruby SDK Reference

Complete API reference for the EnergyCharts Ruby SDK.


## EnergyChartsSDK

### Constructor

```ruby
require_relative 'energy-charts_sdk'

client = EnergyChartsSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EnergyChartsSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = EnergyChartsSDK.test
```


### Instance Methods

#### `CrossBorderModel(data = nil)`

Create a new `CrossBorderModel` entity instance. Pass `nil` for no initial data.

#### `DailyAvgDict(data = nil)`

Create a new `DailyAvgDict` entity instance. Pass `nil` for no initial data.

#### `Frequency(data = nil)`

Create a new `Frequency` entity instance. Pass `nil` for no initial data.

#### `InstalledModel(data = nil)`

Create a new `InstalledModel` entity instance. Pass `nil` for no initial data.

#### `Price(data = nil)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `ProductionModel(data = nil)`

Create a new `ProductionModel` entity instance. Pass `nil` for no initial data.

#### `PublicPowerForecast(data = nil)`

Create a new `PublicPowerForecast` entity instance. Pass `nil` for no initial data.

#### `RenShareModel(data = nil)`

Create a new `RenShareModel` entity instance. Pass `nil` for no initial data.

#### `ShareModel(data = nil)`

Create a new `ShareModel` entity instance. Pass `nil` for no initial data.

#### `TrafficModel(data = nil)`

Create a new `TrafficModel` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## CrossBorderModelEntity

```ruby
cross_border_model = client.CrossBorderModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.CrossBorderModel.load({ "id" => "cross_border_model_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CrossBorderModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DailyAvgDictEntity

```ruby
daily_avg_dict = client.DailyAvgDict
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `day` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.DailyAvgDict.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DailyAvgDictEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FrequencyEntity

```ruby
frequency = client.Frequency
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.Frequency.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FrequencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## InstalledModelEntity

```ruby
installed_model = client.InstalledModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `last_update` | ``$ANY`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `time` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.InstalledModel.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `InstalledModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PriceEntity

```ruby
price = client.Price
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `license_info` | ``$STRING`` | Yes |  |
| `price` | ``$NUMBER`` | No |  |
| `unit` | ``$STRING`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Price.load({ "id" => "price_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductionModelEntity

```ruby
production_model = client.ProductionModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ProductionModel.load({ "id" => "production_model_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductionModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicPowerForecastEntity

```ruby
public_power_forecast = client.PublicPowerForecast
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast_type` | ``$STRING`` | Yes |  |
| `forecast_value` | ``$ARRAY`` | Yes |  |
| `production_type` | ``$STRING`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.PublicPowerForecast.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicPowerForecastEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## RenShareModelEntity

```ruby
ren_share_model = client.RenShareModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `ren_share` | ``$ARRAY`` | Yes |  |
| `solar_share` | ``$ANY`` | No |  |
| `substitute` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |
| `wind_offshore_share` | ``$ANY`` | No |  |
| `wind_onshore_share` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.RenShareModel.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `RenShareModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ShareModelEntity

```ruby
share_model = client.ShareModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ShareModel.load({ "id" => "share_model_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ShareModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TrafficModelEntity

```ruby
traffic_model = client.TrafficModel
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `share` | ``$ARRAY`` | Yes |  |
| `signal` | ``$ARRAY`` | No |  |
| `substitute` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.TrafficModel.list(nil)
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TrafficModelEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = EnergyChartsSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

