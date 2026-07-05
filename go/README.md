# EnergyCharts Golang SDK



The Golang SDK for the EnergyCharts API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.CrossBorderModel(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/energy-charts-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/energy-charts-sdk/go=../energy-charts-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/energy-charts-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single crossbordermodel — the value is the loaded record.
    crossbordermodel, err := client.CrossBorderModel(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(crossbordermodel)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
crossbordermodel, err := client.CrossBorderModel(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = crossbordermodel
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

crossbordermodel, err := client.CrossBorderModel(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(crossbordermodel) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewEnergyChartsSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewEnergyChartsSDK

```go
func NewEnergyChartsSDK(options map[string]any) *EnergyChartsSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *EnergyChartsSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### EnergyChartsSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `CrossBorderModel` | `(data map[string]any) EnergyChartsEntity` | Create a CrossBorderModel entity instance. |
| `DailyAvgDict` | `(data map[string]any) EnergyChartsEntity` | Create a DailyAvgDict entity instance. |
| `Frequency` | `(data map[string]any) EnergyChartsEntity` | Create a Frequency entity instance. |
| `InstalledModel` | `(data map[string]any) EnergyChartsEntity` | Create an InstalledModel entity instance. |
| `Price` | `(data map[string]any) EnergyChartsEntity` | Create a Price entity instance. |
| `ProductionModel` | `(data map[string]any) EnergyChartsEntity` | Create a ProductionModel entity instance. |
| `PublicPowerForecast` | `(data map[string]any) EnergyChartsEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareModel` | `(data map[string]any) EnergyChartsEntity` | Create a RenShareModel entity instance. |
| `ShareModel` | `(data map[string]any) EnergyChartsEntity` | Create a ShareModel entity instance. |
| `TrafficModel` | `(data map[string]any) EnergyChartsEntity` | Create a TrafficModel entity instance. |

### Entity interface (EnergyChartsEntity)

All entities implement the `EnergyChartsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    crossbordermodel, err := client.CrossBorderModel(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // crossbordermodel is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### CrossBorderModel

| Field | Description |
| --- | --- |
| `"country"` |  |
| `"deprecated"` |  |
| `"unix_second"` |  |

Operations: Load.

API path: `/cbet`

#### DailyAvgDict

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"day"` |  |
| `"deprecated"` |  |

Operations: List.

API path: `/ren_share_daily_avg`

#### Frequency

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"unix_second"` |  |

Operations: List.

API path: `/frequency`

#### InstalledModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"last_update"` |  |
| `"production_type"` |  |
| `"time"` |  |

Operations: List.

API path: `/installed_power`

#### Price

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"license_info"` |  |
| `"price"` |  |
| `"unit"` |  |
| `"unix_second"` |  |

Operations: Load.

API path: `/price`

#### ProductionModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"production_type"` |  |
| `"unix_second"` |  |

Operations: Load.

API path: `/public_power`

#### PublicPowerForecast

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"forecast_type"` |  |
| `"forecast_value"` |  |
| `"production_type"` |  |
| `"unix_second"` |  |

Operations: List.

API path: `/public_power_forecast`

#### RenShareModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"ren_share"` |  |
| `"solar_share"` |  |
| `"substitute"` |  |
| `"unix_second"` |  |
| `"wind_offshore_share"` |  |
| `"wind_onshore_share"` |  |

Operations: List.

API path: `/ren_share_forecast`

#### ShareModel

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"forecast"` |  |
| `"unix_second"` |  |

Operations: Load.

API path: `/solar_share`

#### TrafficModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"share"` |  |
| `"signal"` |  |
| `"substitute"` |  |
| `"unix_second"` |  |

Operations: List.

API path: `/signal`



## Entities


### CrossBorderModel

Create an instance: `cross_border_model := client.CrossBorderModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country` | `any` |  |
| `deprecated` | `bool` |  |
| `unix_second` | `any` |  |

#### Example: Load

```go
cross_border_model, err := client.CrossBorderModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cross_border_model) // the loaded record
```


### DailyAvgDict

Create an instance: `daily_avg_dict := client.DailyAvgDict(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `day` | `[]any` |  |
| `deprecated` | `bool` |  |

#### Example: List

```go
daily_avg_dicts, err := client.DailyAvgDict(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(daily_avg_dicts) // the array of records
```


### Frequency

Create an instance: `frequency := client.Frequency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` |  |
| `deprecated` | `bool` |  |
| `unix_second` | `any` |  |

#### Example: List

```go
frequencys, err := client.Frequency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(frequencys) // the array of records
```


### InstalledModel

Create an instance: `installed_model := client.InstalledModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `last_update` | `any` |  |
| `production_type` | `any` |  |
| `time` | `[]any` |  |

#### Example: List

```go
installed_models, err := client.InstalledModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(installed_models) // the array of records
```


### Price

Create an instance: `price := client.Price(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `license_info` | `string` |  |
| `price` | `float64` |  |
| `unit` | `string` |  |
| `unix_second` | `any` |  |

#### Example: Load

```go
price, err := client.Price(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(price) // the loaded record
```


### ProductionModel

Create an instance: `production_model := client.ProductionModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_type` | `any` |  |
| `unix_second` | `any` |  |

#### Example: Load

```go
production_model, err := client.ProductionModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(production_model) // the loaded record
```


### PublicPowerForecast

Create an instance: `public_power_forecast := client.PublicPowerForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `forecast_type` | `string` |  |
| `forecast_value` | `[]any` |  |
| `production_type` | `string` |  |
| `unix_second` | `[]any` |  |

#### Example: List

```go
public_power_forecasts, err := client.PublicPowerForecast(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(public_power_forecasts) // the array of records
```


### RenShareModel

Create an instance: `ren_share_model := client.RenShareModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `ren_share` | `[]any` |  |
| `solar_share` | `any` |  |
| `substitute` | `bool` |  |
| `unix_second` | `[]any` |  |
| `wind_offshore_share` | `any` |  |
| `wind_onshore_share` | `any` |  |

#### Example: List

```go
ren_share_models, err := client.RenShareModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ren_share_models) // the array of records
```


### ShareModel

Create an instance: `share_model := client.ShareModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any` |  |
| `deprecated` | `bool` |  |
| `forecast` | `any` |  |
| `unix_second` | `any` |  |

#### Example: Load

```go
share_model, err := client.ShareModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(share_model) // the loaded record
```


### TrafficModel

Create an instance: `traffic_model := client.TrafficModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `share` | `[]any` |  |
| `signal` | `[]any` |  |
| `substitute` | `bool` |  |
| `unix_second` | `[]any` |  |

#### Example: List

```go
traffic_models, err := client.TrafficModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(traffic_models) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/energy-charts-sdk/go/
├── energy-charts.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/energy-charts-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
crossbordermodel := client.CrossBorderModel(nil)
crossbordermodel.Load(nil, nil)

// crossbordermodel.Data() now returns the crossbordermodel data from the last load
// crossbordermodel.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
