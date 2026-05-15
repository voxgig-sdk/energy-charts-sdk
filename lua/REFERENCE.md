# EnergyCharts Lua SDK Reference

Complete API reference for the EnergyCharts Lua SDK.


## EnergyChartsSDK

### Constructor

```lua
local sdk = require("energy-charts_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
```


### Instance Methods

#### `CrossBorderModel(data)`

Create a new `CrossBorderModel` entity instance. Pass `nil` for no initial data.

#### `DailyAvgDict(data)`

Create a new `DailyAvgDict` entity instance. Pass `nil` for no initial data.

#### `Frequency(data)`

Create a new `Frequency` entity instance. Pass `nil` for no initial data.

#### `InstalledModel(data)`

Create a new `InstalledModel` entity instance. Pass `nil` for no initial data.

#### `Price(data)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `ProductionModel(data)`

Create a new `ProductionModel` entity instance. Pass `nil` for no initial data.

#### `PublicPowerForecast(data)`

Create a new `PublicPowerForecast` entity instance. Pass `nil` for no initial data.

#### `RenShareModel(data)`

Create a new `RenShareModel` entity instance. Pass `nil` for no initial data.

#### `ShareModel(data)`

Create a new `ShareModel` entity instance. Pass `nil` for no initial data.

#### `TrafficModel(data)`

Create a new `TrafficModel` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## CrossBorderModelEntity

```lua
local cross_border_model = client:CrossBorderModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:CrossBorderModel(nil):load({ id = "cross_border_model_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CrossBorderModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DailyAvgDictEntity

```lua
local daily_avg_dict = client:DailyAvgDict(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `day` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DailyAvgDict(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DailyAvgDictEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FrequencyEntity

```lua
local frequency = client:Frequency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Frequency(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FrequencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## InstalledModelEntity

```lua
local installed_model = client:InstalledModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `last_update` | ``$ANY`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `time` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:InstalledModel(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstalledModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PriceEntity

```lua
local price = client:Price(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Price(nil):load({ id = "price_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductionModelEntity

```lua
local production_model = client:ProductionModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ProductionModel(nil):load({ id = "production_model_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductionModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicPowerForecastEntity

```lua
local public_power_forecast = client:PublicPowerForecast(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PublicPowerForecast(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicPowerForecastEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## RenShareModelEntity

```lua
local ren_share_model = client:RenShareModel(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RenShareModel(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenShareModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ShareModelEntity

```lua
local share_model = client:ShareModel(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ShareModel(nil):load({ id = "share_model_id" }, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ShareModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TrafficModelEntity

```lua
local traffic_model = client:TrafficModel(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:TrafficModel(nil):list(nil, nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrafficModelEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

