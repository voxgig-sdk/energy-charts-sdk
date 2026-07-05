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

#### `CrossBorderModel(data=None)`

Create a new `CrossBorderModelEntity` instance. Pass `None` for no initial data.

#### `DailyAvgDict(data=None)`

Create a new `DailyAvgDictEntity` instance. Pass `None` for no initial data.

#### `Frequency(data=None)`

Create a new `FrequencyEntity` instance. Pass `None` for no initial data.

#### `InstalledModel(data=None)`

Create a new `InstalledModelEntity` instance. Pass `None` for no initial data.

#### `Price(data=None)`

Create a new `PriceEntity` instance. Pass `None` for no initial data.

#### `ProductionModel(data=None)`

Create a new `ProductionModelEntity` instance. Pass `None` for no initial data.

#### `PublicPowerForecast(data=None)`

Create a new `PublicPowerForecastEntity` instance. Pass `None` for no initial data.

#### `RenShareModel(data=None)`

Create a new `RenShareModelEntity` instance. Pass `None` for no initial data.

#### `ShareModel(data=None)`

Create a new `ShareModelEntity` instance. Pass `None` for no initial data.

#### `TrafficModel(data=None)`

Create a new `TrafficModelEntity` instance. Pass `None` for no initial data.

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

## CrossBorderModelEntity

```python
cross_border_model = client.CrossBorderModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `unix_second` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.CrossBorderModel().load()
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

Create a new `CrossBorderModelEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DailyAvgDictEntity

```python
daily_avg_dict = client.DailyAvgDict()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `list` | Yes |  |
| `day` | `list` | Yes |  |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DailyAvgDict().list()
for daily_avg_dict in results:
    print(daily_avg_dict)
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

Create a new `DailyAvgDictEntity` instance with the same options.

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
| `unix_second` | `Any` | No |  |

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
| `production_type` | `Any` | No |  |
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
| `unix_second` | `Any` | No |  |

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

## ProductionModelEntity

```python
production_model = client.ProductionModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `production_type` | `Any` | No |  |
| `unix_second` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ProductionModel().load()
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

Create a new `ProductionModelEntity` instance with the same options.

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
| `forecast_value` | `list` | Yes |  |
| `production_type` | `str` | Yes |  |
| `unix_second` | `list` | Yes |  |

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
| `unix_second` | `list` | Yes |  |
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

## ShareModelEntity

```python
share_model = client.ShareModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `Any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `Any` | No |  |
| `unix_second` | `Any` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ShareModel().load()
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

Create a new `ShareModelEntity` instance with the same options.

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
| `signal` | `list` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_second` | `list` | Yes |  |

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

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = EnergyChartsSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

