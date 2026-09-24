# EnergyCharts Ruby SDK Reference

Complete API reference for the EnergyCharts Ruby SDK.


## EnergyChartsSDK

### Constructor

```ruby
require_relative 'EnergyCharts_sdk'

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

#### `Cbet(data = nil)`

Create a new `Cbet` entity instance. Pass `nil` for no initial data.

#### `Cbpf(data = nil)`

Create a new `Cbpf` entity instance. Pass `nil` for no initial data.

#### `Frequency(data = nil)`

Create a new `Frequency` entity instance. Pass `nil` for no initial data.

#### `InstalledModel(data = nil)`

Create a new `InstalledModel` entity instance. Pass `nil` for no initial data.

#### `Price(data = nil)`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `PublicPower(data = nil)`

Create a new `PublicPower` entity instance. Pass `nil` for no initial data.

#### `PublicPowerForecast(data = nil)`

Create a new `PublicPowerForecast` entity instance. Pass `nil` for no initial data.

#### `RenShareDailyAvg(data = nil)`

Create a new `RenShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `RenShareModel(data = nil)`

Create a new `RenShareModel` entity instance. Pass `nil` for no initial data.

#### `SolarShare(data = nil)`

Create a new `SolarShare` entity instance. Pass `nil` for no initial data.

#### `SolarShareDailyAvg(data = nil)`

Create a new `SolarShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `TotalPower(data = nil)`

Create a new `TotalPower` entity instance. Pass `nil` for no initial data.

#### `TrafficModel(data = nil)`

Create a new `TrafficModel` entity instance. Pass `nil` for no initial data.

#### `WindOffshoreShare(data = nil)`

Create a new `WindOffshoreShare` entity instance. Pass `nil` for no initial data.

#### `WindOffshoreShareDailyAvg(data = nil)`

Create a new `WindOffshoreShareDailyAvg` entity instance. Pass `nil` for no initial data.

#### `WindOnshoreShare(data = nil)`

Create a new `WindOnshoreShare` entity instance. Pass `nil` for no initial data.

#### `WindOnshoreShareDailyAvg(data = nil)`

Create a new `WindOnshoreShareDailyAvg` entity instance. Pass `nil` for no initial data.

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

## CbetEntity

```ruby
cbet = client.Cbet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `Object` | No |  |
| `deprecated` | `Boolean` | Yes |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cbet.load()
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

Create a new `CbetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CbpfEntity

```ruby
cbpf = client.Cbpf
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `Object` | No |  |
| `deprecated` | `Boolean` | Yes |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Cbpf.load()
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

Create a new `CbpfEntity` instance with the same client and
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
| `data` | `Array` | Yes |  |
| `deprecated` | `Boolean` | Yes |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Frequency.list
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
| `deprecated` | `Boolean` | Yes |  |
| `last_update` | `Object` | Yes |  |
| `production_types` | `Object` | No |  |
| `time` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.InstalledModel.list
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
| `deprecated` | `Boolean` | Yes |  |
| `license_info` | `String` | Yes |  |
| `price` | `Float` | No |  |
| `unit` | `String` | Yes |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Price.load()
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

## PublicPowerEntity

```ruby
public_power = client.PublicPower
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `Boolean` | Yes |  |
| `production_types` | `Object` | No |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.PublicPower.load()
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

Create a new `PublicPowerEntity` instance with the same client and
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
| `deprecated` | `Boolean` | Yes |  |
| `forecast_type` | `String` | Yes |  |
| `forecast_values` | `Array` | Yes |  |
| `production_type` | `String` | Yes |  |
| `unix_seconds` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.PublicPowerForecast.list
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

## RenShareDailyAvgEntity

```ruby
ren_share_daily_avg = client.RenShareDailyAvg
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | Yes | List of average daily values |
| `days` | `Array` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RenShareDailyAvg.list
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

Create a new `RenShareDailyAvgEntity` instance with the same client and
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
| `deprecated` | `Boolean` | Yes |  |
| `ren_share` | `Array` | Yes |  |
| `solar_share` | `Object` | No |  |
| `substitute` | `Boolean` | Yes |  |
| `unix_seconds` | `Array` | Yes |  |
| `wind_offshore_share` | `Object` | No |  |
| `wind_onshore_share` | `Object` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.RenShareModel.list
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

## SolarShareEntity

```ruby
solar_share = client.SolarShare
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Object` | No |  |
| `deprecated` | `Boolean` | Yes |  |
| `forecast` | `Object` | No |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SolarShare.load()
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

Create a new `SolarShareEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SolarShareDailyAvgEntity

```ruby
solar_share_daily_avg = client.SolarShareDailyAvg
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | Yes | List of average daily values |
| `days` | `Array` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SolarShareDailyAvg.list
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

Create a new `SolarShareDailyAvgEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TotalPowerEntity

```ruby
total_power = client.TotalPower
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `Boolean` | Yes |  |
| `production_types` | `Object` | No |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.TotalPower.load()
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

Create a new `TotalPowerEntity` instance with the same client and
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
| `deprecated` | `Boolean` | Yes |  |
| `share` | `Array` | Yes |  |
| `signal` | `Array` | No | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `Boolean` | Yes |  |
| `unix_seconds` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.TrafficModel.list
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

## WindOffshoreShareEntity

```ruby
wind_offshore_share = client.WindOffshoreShare
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Object` | No |  |
| `deprecated` | `Boolean` | Yes |  |
| `forecast` | `Object` | No |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WindOffshoreShare.load()
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

Create a new `WindOffshoreShareEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WindOffshoreShareDailyAvgEntity

```ruby
wind_offshore_share_daily_avg = client.WindOffshoreShareDailyAvg
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | Yes | List of average daily values |
| `days` | `Array` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.WindOffshoreShareDailyAvg.list
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

Create a new `WindOffshoreShareDailyAvgEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WindOnshoreShareEntity

```ruby
wind_onshore_share = client.WindOnshoreShare
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Object` | No |  |
| `deprecated` | `Boolean` | Yes |  |
| `forecast` | `Object` | No |  |
| `unix_seconds` | `Object` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.WindOnshoreShare.load()
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

Create a new `WindOnshoreShareEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WindOnshoreShareDailyAvgEntity

```ruby
wind_onshore_share_daily_avg = client.WindOnshoreShareDailyAvg
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Array` | Yes | List of average daily values |
| `days` | `Array` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `Boolean` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.WindOnshoreShareDailyAvg.list
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

Create a new `WindOnshoreShareDailyAvgEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = EnergyChartsSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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

