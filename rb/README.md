# EnergyCharts Ruby SDK



The Ruby SDK for the EnergyCharts API — an entity-oriented client using idiomatic Ruby conventions.

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
  result = client.crossbordermodel.load({ "id" => "example_id" })
  puts result
rescue => err
  warn "load failed: #{err}"
end
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
  warn result["err"]
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

result = client.crossbordermodel.load({ "id" => "test01" })
# result contains mock response data
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
| `InstalledModel` | `(data) -> InstalledModelEntity` | Create a InstalledModel entity instance. |
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
| `list` | `(reqmatch, ctrl) -> Array` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
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

Create an instance: `const cross_border_model = client.cross_border_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const cross_border_model = await client.cross_border_model.load({ id: 'cross_border_model_id' })
```


### DailyAvgDict

Create an instance: `const daily_avg_dict = client.daily_avg_dict`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `day` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |

#### Example: List

```ts
const daily_avg_dicts = await client.daily_avg_dict.list()
```


### Frequency

Create an instance: `const frequency = client.frequency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: List

```ts
const frequencys = await client.frequency.list()
```


### InstalledModel

Create an instance: `const installed_model = client.installed_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `last_update` | ``$ANY`` |  |
| `production_type` | ``$ANY`` |  |
| `time` | ``$ARRAY`` |  |

#### Example: List

```ts
const installed_models = await client.installed_model.list()
```


### Price

Create an instance: `const price = client.price`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `license_info` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |
| `unit` | ``$STRING`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const price = await client.price.load({ id: 'price_id' })
```


### ProductionModel

Create an instance: `const production_model = client.production_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `production_type` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const production_model = await client.production_model.load({ id: 'production_model_id' })
```


### PublicPowerForecast

Create an instance: `const public_power_forecast = client.public_power_forecast`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast_type` | ``$STRING`` |  |
| `forecast_value` | ``$ARRAY`` |  |
| `production_type` | ``$STRING`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```ts
const public_power_forecasts = await client.public_power_forecast.list()
```


### RenShareModel

Create an instance: `const ren_share_model = client.ren_share_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `ren_share` | ``$ARRAY`` |  |
| `solar_share` | ``$ANY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |
| `wind_offshore_share` | ``$ANY`` |  |
| `wind_onshore_share` | ``$ANY`` |  |

#### Example: List

```ts
const ren_share_models = await client.ren_share_model.list()
```


### ShareModel

Create an instance: `const share_model = client.share_model`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```ts
const share_model = await client.share_model.load({ id: 'share_model_id' })
```


### TrafficModel

Create an instance: `const traffic_model = client.traffic_model`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` |  |
| `share` | ``$ARRAY`` |  |
| `signal` | ``$ARRAY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```ts
const traffic_models = await client.traffic_model.list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

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
crossbordermodel = client.crossbordermodel
crossbordermodel.load({ "id" => "example_id" })

# crossbordermodel.data_get now returns the loaded crossbordermodel data
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
