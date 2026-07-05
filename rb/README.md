# EnergyCharts Ruby SDK



The Ruby SDK for the EnergyCharts API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.CrossBorderModel` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/energy-charts-sdk/releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "EnergyCharts_sdk"

client = EnergyChartsSDK.new
```

### 3. Load a crossbordermodel

```ruby
begin
  # load returns the bare CrossBorderModel record (raises on error).
  crossbordermodel = client.CrossBorderModel.load()
  puts crossbordermodel
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  crossbordermodel = client.CrossBorderModel.load()
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = EnergyChartsSDK.test

# Entity ops return the bare mock record (raises on error).
crossbordermodel = client.CrossBorderModel.load()
puts crossbordermodel
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = EnergyChartsSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### EnergyChartsSDK

```ruby
require_relative "EnergyCharts_sdk"
client = EnergyChartsSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = EnergyChartsSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EnergyChartsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `EnergyChartsError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `cross_border_model = client.CrossBorderModel`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `Object` |  |
| `deprecated` | `Boolean` |  |
| `unix_second` | `Object` |  |

#### Example: Load

```ruby
# load returns the bare CrossBorderModel record (raises on error).
cross_border_model = client.CrossBorderModel.load()
```


### DailyAvgDict

Create an instance: `daily_avg_dict = client.DailyAvgDict`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `day` | `Array` |  |
| `deprecated` | `Boolean` |  |

#### Example: List

```ruby
# list returns an Array of DailyAvgDict records (raises on error).
daily_avg_dicts = client.DailyAvgDict.list
```


### Frequency

Create an instance: `frequency = client.Frequency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Array` |  |
| `deprecated` | `Boolean` |  |
| `unix_second` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of Frequency records (raises on error).
frequencys = client.Frequency.list
```


### InstalledModel

Create an instance: `installed_model = client.InstalledModel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `last_update` | `Object` |  |
| `production_type` | `Object` |  |
| `time` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of InstalledModel records (raises on error).
installed_models = client.InstalledModel.list
```


### Price

Create an instance: `price = client.Price`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `license_info` | `String` |  |
| `price` | `Float` |  |
| `unit` | `String` |  |
| `unix_second` | `Object` |  |

#### Example: Load

```ruby
# load returns the bare Price record (raises on error).
price = client.Price.load()
```


### ProductionModel

Create an instance: `production_model = client.ProductionModel`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `production_type` | `Object` |  |
| `unix_second` | `Object` |  |

#### Example: Load

```ruby
# load returns the bare ProductionModel record (raises on error).
production_model = client.ProductionModel.load()
```


### PublicPowerForecast

Create an instance: `public_power_forecast = client.PublicPowerForecast`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `forecast_type` | `String` |  |
| `forecast_value` | `Array` |  |
| `production_type` | `String` |  |
| `unix_second` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of PublicPowerForecast records (raises on error).
public_power_forecasts = client.PublicPowerForecast.list
```


### RenShareModel

Create an instance: `ren_share_model = client.RenShareModel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `ren_share` | `Array` |  |
| `solar_share` | `Object` |  |
| `substitute` | `Boolean` |  |
| `unix_second` | `Array` |  |
| `wind_offshore_share` | `Object` |  |
| `wind_onshore_share` | `Object` |  |

#### Example: List

```ruby
# list returns an Array of RenShareModel records (raises on error).
ren_share_models = client.RenShareModel.list
```


### ShareModel

Create an instance: `share_model = client.ShareModel`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `Object` |  |
| `deprecated` | `Boolean` |  |
| `forecast` | `Object` |  |
| `unix_second` | `Object` |  |

#### Example: Load

```ruby
# load returns the bare ShareModel record (raises on error).
share_model = client.ShareModel.load()
```


### TrafficModel

Create an instance: `traffic_model = client.TrafficModel`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `Boolean` |  |
| `share` | `Array` |  |
| `signal` | `Array` |  |
| `substitute` | `Boolean` |  |
| `unix_second` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of TrafficModel records (raises on error).
traffic_models = client.TrafficModel.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── EnergyCharts_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`EnergyCharts_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
crossbordermodel = client.CrossBorderModel
crossbordermodel.load()

# crossbordermodel.data_get now returns the crossbordermodel data from the last load
# crossbordermodel.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
