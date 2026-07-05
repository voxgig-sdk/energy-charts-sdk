# EnergyCharts Lua SDK



The Lua SDK for the EnergyCharts API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:CrossBorderModel()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("energy-charts_sdk")

local client = sdk.new()
```

### 3. Load a crossbordermodel

```lua
local crossbordermodel, err = client:CrossBorderModel():load()
if err then error(err) end
print(crossbordermodel)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local crossbordermodel, err = client:CrossBorderModel():load()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:CrossBorderModel():load()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### EnergyChartsSDK

```lua
local sdk = require("energy-charts_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EnergyChartsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local cross_border_model, err = client:CrossBorderModel():load()
    if err then error(err) end
    -- cross_border_model is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local cross_border_model = client:CrossBorderModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `any` |  |
| `deprecated` | `boolean` |  |
| `unix_second` | `any` |  |

#### Example: Load

```lua
local cross_border_model, err = client:CrossBorderModel():load()
```


### DailyAvgDict

Create an instance: `local daily_avg_dict = client:DailyAvgDict(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `day` | `table` |  |
| `deprecated` | `boolean` |  |

#### Example: List

```lua
local daily_avg_dicts, err = client:DailyAvgDict():list()
```


### Frequency

Create an instance: `local frequency = client:Frequency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `table` |  |
| `deprecated` | `boolean` |  |
| `unix_second` | `any` |  |

#### Example: List

```lua
local frequencys, err = client:Frequency():list()
```


### InstalledModel

Create an instance: `local installed_model = client:InstalledModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `last_update` | `any` |  |
| `production_type` | `any` |  |
| `time` | `table` |  |

#### Example: List

```lua
local installed_models, err = client:InstalledModel():list()
```


### Price

Create an instance: `local price = client:Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `license_info` | `string` |  |
| `price` | `number` |  |
| `unit` | `string` |  |
| `unix_second` | `any` |  |

#### Example: Load

```lua
local price, err = client:Price():load()
```


### ProductionModel

Create an instance: `local production_model = client:ProductionModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `production_type` | `any` |  |
| `unix_second` | `any` |  |

#### Example: Load

```lua
local production_model, err = client:ProductionModel():load()
```


### PublicPowerForecast

Create an instance: `local public_power_forecast = client:PublicPowerForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `forecast_type` | `string` |  |
| `forecast_value` | `table` |  |
| `production_type` | `string` |  |
| `unix_second` | `table` |  |

#### Example: List

```lua
local public_power_forecasts, err = client:PublicPowerForecast():list()
```


### RenShareModel

Create an instance: `local ren_share_model = client:RenShareModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `ren_share` | `table` |  |
| `solar_share` | `any` |  |
| `substitute` | `boolean` |  |
| `unix_second` | `table` |  |
| `wind_offshore_share` | `any` |  |
| `wind_onshore_share` | `any` |  |

#### Example: List

```lua
local ren_share_models, err = client:RenShareModel():list()
```


### ShareModel

Create an instance: `local share_model = client:ShareModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any` |  |
| `deprecated` | `boolean` |  |
| `forecast` | `any` |  |
| `unix_second` | `any` |  |

#### Example: Load

```lua
local share_model, err = client:ShareModel():load()
```


### TrafficModel

Create an instance: `local traffic_model = client:TrafficModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `share` | `table` |  |
| `signal` | `table` |  |
| `substitute` | `boolean` |  |
| `unix_second` | `table` |  |

#### Example: List

```lua
local traffic_models, err = client:TrafficModel():list()
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── energy-charts_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`energy-charts_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local crossbordermodel = client:CrossBorderModel()
crossbordermodel:load()

-- crossbordermodel:data_get() now returns the crossbordermodel data from the last load
-- crossbordermodel:match_get() returns the last match criteria
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
