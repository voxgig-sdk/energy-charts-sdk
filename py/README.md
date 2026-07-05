# EnergyCharts Python SDK



The Python SDK for the EnergyCharts API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CrossBorderModel()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from energycharts_sdk import EnergyChartsSDK

client = EnergyChartsSDK()
```

### 3. Load a crossbordermodel

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    crossbordermodel = client.CrossBorderModel().load()
    print(crossbordermodel)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    crossbordermodel = client.CrossBorderModel().load()
    print(crossbordermodel)
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = EnergyChartsSDK.test()

# Entity ops return the bare record and raise on error.
crossbordermodel = client.CrossBorderModel().load()
# crossbordermodel contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = EnergyChartsSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ENERGY_CHARTS_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### EnergyChartsSDK

```python
from energycharts_sdk import EnergyChartsSDK

client = EnergyChartsSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = EnergyChartsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### EnergyChartsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
| `CrossBorderModel` | `(data) -> CrossBorderModelEntity` | Create a CrossBorderModel entity instance. |
| `DailyAvgDict` | `(data) -> DailyAvgDictEntity` | Create a DailyAvgDict entity instance. |
| `Frequency` | `(data) -> FrequencyEntity` | Create a Frequency entity instance. |
| `InstalledModel` | `(data) -> InstalledModelEntity` | Create an InstalledModel entity instance. |
| `Price` | `(data) -> PriceEntity` | Create a Price entity instance. |
| `ProductionModel` | `(data) -> ProductionModelEntity` | Create a ProductionModel entity instance. |
| `PublicPowerForecast` | `(data) -> PublicPowerForecastEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareModel` | `(data) -> RenShareModelEntity` | Create a RenShareModel entity instance. |
| `ShareModel` | `(data) -> ShareModelEntity` | Create a ShareModel entity instance. |
| `TrafficModel` | `(data) -> TrafficModelEntity` | Create a TrafficModel entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `cross_border_model = client.CrossBorderModel()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `Any` |  |
| `deprecated` | `bool` |  |
| `unix_second` | `Any` |  |

#### Example: Load

```python
cross_border_model = client.CrossBorderModel().load()
```


### DailyAvgDict

Create an instance: `daily_avg_dict = client.DailyAvgDict()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `day` | `list` |  |
| `deprecated` | `bool` |  |

#### Example: List

```python
daily_avg_dicts = client.DailyAvgDict().list()
```


### Frequency

Create an instance: `frequency = client.Frequency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `list` |  |
| `deprecated` | `bool` |  |
| `unix_second` | `Any` |  |

#### Example: List

```python
frequencys = client.Frequency().list()
```


### InstalledModel

Create an instance: `installed_model = client.InstalledModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `last_update` | `Any` |  |
| `production_type` | `Any` |  |
| `time` | `list` |  |

#### Example: List

```python
installed_models = client.InstalledModel().list()
```


### Price

Create an instance: `price = client.Price()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `license_info` | `str` |  |
| `price` | `float` |  |
| `unit` | `str` |  |
| `unix_second` | `Any` |  |

#### Example: Load

```python
price = client.Price().load()
```


### ProductionModel

Create an instance: `production_model = client.ProductionModel()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_type` | `Any` |  |
| `unix_second` | `Any` |  |

#### Example: Load

```python
production_model = client.ProductionModel().load()
```


### PublicPowerForecast

Create an instance: `public_power_forecast = client.PublicPowerForecast()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `forecast_type` | `str` |  |
| `forecast_value` | `list` |  |
| `production_type` | `str` |  |
| `unix_second` | `list` |  |

#### Example: List

```python
public_power_forecasts = client.PublicPowerForecast().list()
```


### RenShareModel

Create an instance: `ren_share_model = client.RenShareModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `ren_share` | `list` |  |
| `solar_share` | `Any` |  |
| `substitute` | `bool` |  |
| `unix_second` | `list` |  |
| `wind_offshore_share` | `Any` |  |
| `wind_onshore_share` | `Any` |  |

#### Example: List

```python
ren_share_models = client.RenShareModel().list()
```


### ShareModel

Create an instance: `share_model = client.ShareModel()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Any` |  |
| `deprecated` | `bool` |  |
| `forecast` | `Any` |  |
| `unix_second` | `Any` |  |

#### Example: Load

```python
share_model = client.ShareModel().load()
```


### TrafficModel

Create an instance: `traffic_model = client.TrafficModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `share` | `list` |  |
| `signal` | `list` |  |
| `substitute` | `bool` |  |
| `unix_second` | `list` |  |

#### Example: List

```python
traffic_models = client.TrafficModel().list()
```


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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── energycharts_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`energycharts_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
crossbordermodel = client.CrossBorderModel()
crossbordermodel.load()

# crossbordermodel.data_get() now returns the crossbordermodel data from the last load
# crossbordermodel.match_get() returns the last match criteria
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
