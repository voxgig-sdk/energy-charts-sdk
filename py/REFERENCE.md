# EnergyCharts Python SDK Reference

Complete API reference for the EnergyCharts Python SDK.


## EnergyChartsSDK

### Constructor

```python
from energy-charts_sdk import EnergyChartsSDK

client = EnergyChartsSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
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

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## CrossBorderModelEntity

```python
cross_border_model = client.CrossBorderModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.CrossBorderModel().load({"id": "cross_border_model_id"})
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
| `data` | ``$ARRAY`` | Yes |  |
| `day` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.DailyAvgDict().list({})
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
| `data` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Frequency().list({})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `last_update` | ``$ANY`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `time` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.InstalledModel().list({})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `license_info` | ``$STRING`` | Yes |  |
| `price` | ``$NUMBER`` | No |  |
| `unit` | ``$STRING`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Price().load({"id": "price_id"})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ProductionModel().load({"id": "production_model_id"})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast_type` | ``$STRING`` | Yes |  |
| `forecast_value` | ``$ARRAY`` | Yes |  |
| `production_type` | ``$STRING`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.PublicPowerForecast().list({})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `ren_share` | ``$ARRAY`` | Yes |  |
| `solar_share` | ``$ANY`` | No |  |
| `substitute` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |
| `wind_offshore_share` | ``$ANY`` | No |  |
| `wind_onshore_share` | ``$ANY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.RenShareModel().list({})
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
| `data` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.ShareModel().load({"id": "share_model_id"})
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
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `share` | ``$ARRAY`` | Yes |  |
| `signal` | ``$ARRAY`` | No |  |
| `substitute` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.TrafficModel().list({})
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

