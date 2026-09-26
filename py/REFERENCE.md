# EnergyCharts Python SDK Reference

Complete API reference for the EnergyCharts Python SDK.


## EnergyChartsSDK

### Constructor

```python
from energycharts_sdk import EnergyChartsSDK

client = EnergyChartsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EnergyChartsSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = EnergyChartsSDK.test()
```


### Instance Methods

#### `Cbet(data=None)`

Create a new `CbetEntity` instance. Pass `None` for no initial data.

#### `Cbpf(data=None)`

Create a new `CbpfEntity` instance. Pass `None` for no initial data.

#### `Frequency(data=None)`

Create a new `FrequencyEntity` instance. Pass `None` for no initial data.

#### `InstalledModel(data=None)`

Create a new `InstalledModelEntity` instance. Pass `None` for no initial data.

#### `Price(data=None)`

Create a new `PriceEntity` instance. Pass `None` for no initial data.

#### `PublicPower(data=None)`

Create a new `PublicPowerEntity` instance. Pass `None` for no initial data.

#### `PublicPowerForecast(data=None)`

Create a new `PublicPowerForecastEntity` instance. Pass `None` for no initial data.

#### `RenShareDailyAvg(data=None)`

Create a new `RenShareDailyAvgEntity` instance. Pass `None` for no initial data.

#### `RenShareModel(data=None)`

Create a new `RenShareModelEntity` instance. Pass `None` for no initial data.

#### `SolarShare(data=None)`

Create a new `SolarShareEntity` instance. Pass `None` for no initial data.

#### `SolarShareDailyAvg(data=None)`

Create a new `SolarShareDailyAvgEntity` instance. Pass `None` for no initial data.

#### `TotalPower(data=None)`

Create a new `TotalPowerEntity` instance. Pass `None` for no initial data.

#### `TrafficModel(data=None)`

Create a new `TrafficModelEntity` instance. Pass `None` for no initial data.

#### `WindOffshoreShare(data=None)`

Create a new `WindOffshoreShareEntity` instance. Pass `None` for no initial data.

#### `WindOffshoreShareDailyAvg(data=None)`

Create a new `WindOffshoreShareDailyAvgEntity` instance. Pass `None` for no initial data.

#### `WindOnshoreShare(data=None)`

Create a new `WindOnshoreShareEntity` instance. Pass `None` for no initial data.

#### `WindOnshoreShareDailyAvg(data=None)`

Create a new `WindOnshoreShareDailyAvgEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## CbetEntity

```python
cbet = client.Cbet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cbet().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CbetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CbpfEntity

```python
cbpf = client.Cbpf()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Cbpf().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CbpfEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FrequencyEntity

```python
frequency = client.Frequency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes |  |
| `deprecated` | `bool` | Yes |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Frequency().list()
for frequency in results:
    print(frequency)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FrequencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## InstalledModelEntity

```python
installed_model = client.InstalledModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `last_update` | `Any` | Yes |  |
| `production_types` | `Any` | No |  |
| `time` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.InstalledModel().list()
for installed_model in results:
    print(installed_model)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `InstalledModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PriceEntity

```python
price = client.Price()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `license_info` | `str` | Yes |  |
| `price` | `float` | No |  |
| `unit` | `str` | Yes |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Price().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicPowerEntity

```python
public_power = client.PublicPower()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `production_types` | `Any` | No |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.PublicPower().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicPowerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicPowerForecastEntity

```python
public_power_forecast = client.PublicPowerForecast()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `forecast_type` | `str` | Yes |  |
| `forecast_values` | `list` | Yes |  |
| `production_type` | `str` | Yes |  |
| `unix_seconds` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.PublicPowerForecast().list()
for public_power_forecast in results:
    print(public_power_forecast)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicPowerForecastEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RenShareDailyAvgEntity

```python
ren_share_daily_avg = client.RenShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | List of average daily values |
| `days` | `list` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RenShareDailyAvg().list()
for ren_share_daily_avg in results:
    print(ren_share_daily_avg)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenShareDailyAvgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## RenShareModelEntity

```python
ren_share_model = client.RenShareModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `ren_share` | `list` | Yes |  |
| `solar_share` | `Any` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_seconds` | `list` | Yes |  |
| `wind_offshore_share` | `Any` | No |  |
| `wind_onshore_share` | `Any` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.RenShareModel().list()
for ren_share_model in results:
    print(ren_share_model)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `RenShareModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SolarShareEntity

```python
solar_share = client.SolarShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `Any` | No |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SolarShare().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SolarShareEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SolarShareDailyAvgEntity

```python
solar_share_daily_avg = client.SolarShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | List of average daily values |
| `days` | `list` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SolarShareDailyAvg().list()
for solar_share_daily_avg in results:
    print(solar_share_daily_avg)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SolarShareDailyAvgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TotalPowerEntity

```python
total_power = client.TotalPower()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `production_types` | `Any` | No |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.TotalPower().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TotalPowerEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TrafficModelEntity

```python
traffic_model = client.TrafficModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `share` | `list` | Yes |  |
| `signal` | `list` | No | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `bool` | Yes |  |
| `unix_seconds` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.TrafficModel().list()
for traffic_model in results:
    print(traffic_model)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TrafficModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WindOffshoreShareEntity

```python
wind_offshore_share = client.WindOffshoreShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `Any` | No |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WindOffshoreShare().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WindOffshoreShareEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WindOffshoreShareDailyAvgEntity

```python
wind_offshore_share_daily_avg = client.WindOffshoreShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | List of average daily values |
| `days` | `list` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WindOffshoreShareDailyAvg().list()
for wind_offshore_share_daily_avg in results:
    print(wind_offshore_share_daily_avg)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WindOffshoreShareDailyAvgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WindOnshoreShareEntity

```python
wind_onshore_share = client.WindOnshoreShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `Any` | No |  |
| `unix_seconds` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.WindOnshoreShare().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WindOnshoreShareEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WindOnshoreShareDailyAvgEntity

```python
wind_onshore_share_daily_avg = client.WindOnshoreShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes | List of average daily values |
| `days` | `list` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.WindOnshoreShareDailyAvg().list()
for wind_onshore_share_daily_avg in results:
    print(wind_onshore_share_daily_avg)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WindOnshoreShareDailyAvgEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = EnergyChartsSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

Rate limiting.

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

Retry.

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

Test transport.

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

Timeout.

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

