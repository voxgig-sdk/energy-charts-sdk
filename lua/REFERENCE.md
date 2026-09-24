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
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Cbet(data)`

Create a new `Cbet` entity instance. Pass `nil` for no initial data.

#### `Cbpf(data)`

Create a new `Cbpf` entity instance. Pass `nil` for no initial data.

#### `Frequency(data)`

Create a new `Frequency` entity instance. Pass `nil` for no initial data.

#### `InstalledModel(data)`

Create a new `InstalledModel` entity instance. Pass `nil` for no initial data.

#### `Price(data)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `PublicPower(data)`

Create a new `PublicPower` entity instance. Pass `nil` for no initial data.

#### `PublicPowerForecast(data)`

Create a new `PublicPowerForecast` entity instance. Pass `nil` for no initial data.

#### `RenShareDailyAvg(data)`

Create a new `RenShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `RenShareModel(data)`

Create a new `RenShareModel` entity instance. Pass `nil` for no initial data.

#### `SolarShare(data)`

Create a new `SolarShare` entity instance. Pass `nil` for no initial data.

#### `SolarShareDailyAvg(data)`

Create a new `SolarShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `TotalPower(data)`

Create a new `TotalPower` entity instance. Pass `nil` for no initial data.

#### `TrafficModel(data)`

Create a new `TrafficModel` entity instance. Pass `nil` for no initial data.

#### `WindOffshoreShare(data)`

Create a new `WindOffshoreShare` entity instance. Pass `nil` for no initial data.

#### `WindOffshoreShareDailyAvg(data)`

Create a new `WindOffshoreShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `WindOnshoreShare(data)`

Create a new `WindOnshoreShare` entity instance. Pass `nil` for no initial data.

#### `WindOnshoreShareDailyAvg(data)`

Create a new `WindOnshoreShareDailyAvg` entity instance. Pass `nil` for no initial data.

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

## CbetEntity

```lua
local cbet = client:Cbet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cbet():load()
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

Create a new `CbetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CbpfEntity

```lua
local cbpf = client:Cbpf(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Cbpf():load()
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

Create a new `CbpfEntity` instance with the same client and
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
| `data` | `table` | Yes |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Frequency():list()
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
| `deprecated` | `boolean` | Yes |  |
| `last_update` | `any` | Yes |  |
| `production_types` | `any` | No |  |
| `time` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:InstalledModel():list()
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
| `deprecated` | `boolean` | Yes |  |
| `license_info` | `string` | Yes |  |
| `price` | `number` | No |  |
| `unit` | `string` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Price():load()
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

## PublicPowerEntity

```lua
local public_power = client:PublicPower(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `boolean` | Yes |  |
| `production_types` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:PublicPower():load()
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

Create a new `PublicPowerEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `forecast_type` | `string` | Yes |  |
| `forecast_values` | `table` | Yes |  |
| `production_type` | `string` | Yes |  |
| `unix_seconds` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:PublicPowerForecast():list()
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

## RenShareDailyAvgEntity

```lua
local ren_share_daily_avg = client:RenShareDailyAvg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes | List of average daily values |
| `days` | `table` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RenShareDailyAvg():list()
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

Create a new `RenShareDailyAvgEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `ren_share` | `table` | Yes |  |
| `solar_share` | `any` | No |  |
| `substitute` | `boolean` | Yes |  |
| `unix_seconds` | `table` | Yes |  |
| `wind_offshore_share` | `any` | No |  |
| `wind_onshore_share` | `any` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:RenShareModel():list()
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

## SolarShareEntity

```lua
local solar_share = client:SolarShare(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SolarShare():load()
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

Create a new `SolarShareEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SolarShareDailyAvgEntity

```lua
local solar_share_daily_avg = client:SolarShareDailyAvg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes | List of average daily values |
| `days` | `table` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SolarShareDailyAvg():list()
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

Create a new `SolarShareDailyAvgEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TotalPowerEntity

```lua
local total_power = client:TotalPower(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `boolean` | Yes |  |
| `production_types` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:TotalPower():load()
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

Create a new `TotalPowerEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `share` | `table` | Yes |  |
| `signal` | `table` | No | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `boolean` | Yes |  |
| `unix_seconds` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:TrafficModel():list()
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

## WindOffshoreShareEntity

```lua
local wind_offshore_share = client:WindOffshoreShare(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WindOffshoreShare():load()
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

Create a new `WindOffshoreShareEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WindOffshoreShareDailyAvgEntity

```lua
local wind_offshore_share_daily_avg = client:WindOffshoreShareDailyAvg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes | List of average daily values |
| `days` | `table` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WindOffshoreShareDailyAvg():list()
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

Create a new `WindOffshoreShareDailyAvgEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WindOnshoreShareEntity

```lua
local wind_onshore_share = client:WindOnshoreShare(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:WindOnshoreShare():load()
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

Create a new `WindOnshoreShareEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WindOnshoreShareDailyAvgEntity

```lua
local wind_onshore_share_daily_avg = client:WindOnshoreShareDailyAvg(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `table` | Yes | List of average daily values |
| `days` | `table` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:WindOnshoreShareDailyAvg():list()
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

Create a new `WindOnshoreShareDailyAvgEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

