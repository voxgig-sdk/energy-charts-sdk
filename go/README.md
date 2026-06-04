# EnergyCharts Golang SDK

The Golang SDK for the EnergyCharts API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/energy-charts-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/energy-charts-sdk/go=../path/to/github.com/voxgig-sdk/energy-charts-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"

    sdk "github.com/voxgig-sdk/energy-charts-sdk/go"
    "github.com/voxgig-sdk/energy-charts-sdk/go/core"
)

func main() {
    client := sdk.NewEnergyChartsSDK(map[string]any{})
```

### 3. Load a crossbordermodel

```go
    result, err = client.CrossBorderModel(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
ENERGY-CHARTS_TEST_LIVE=TRUE
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
| `InstalledModel` | `(data map[string]any) EnergyChartsEntity` | Create a InstalledModel entity instance. |
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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
| `country` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```go
result, err := client.CrossBorderModel(nil).Load(map[string]any{"id": "cross_border_model_id"}, nil)
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
| `data` | ``$ARRAY`` |  |
| `day` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |

#### Example: List

```go
results, err := client.DailyAvgDict(nil).List(nil, nil)
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
| `data` | ``$ARRAY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: List

```go
results, err := client.Frequency(nil).List(nil, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `last_update` | ``$ANY`` |  |
| `production_type` | ``$ANY`` |  |
| `time` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.InstalledModel(nil).List(nil, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `license_info` | ``$STRING`` |  |
| `price` | ``$NUMBER`` |  |
| `unit` | ``$STRING`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```go
result, err := client.Price(nil).Load(map[string]any{"id": "price_id"}, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `production_type` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```go
result, err := client.ProductionModel(nil).Load(map[string]any{"id": "production_model_id"}, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast_type` | ``$STRING`` |  |
| `forecast_value` | ``$ARRAY`` |  |
| `production_type` | ``$STRING`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.PublicPowerForecast(nil).List(nil, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `ren_share` | ``$ARRAY`` |  |
| `solar_share` | ``$ANY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |
| `wind_offshore_share` | ``$ANY`` |  |
| `wind_onshore_share` | ``$ANY`` |  |

#### Example: List

```go
results, err := client.RenShareModel(nil).List(nil, nil)
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
| `data` | ``$ANY`` |  |
| `deprecated` | ``$BOOLEAN`` |  |
| `forecast` | ``$ANY`` |  |
| `unix_second` | ``$ANY`` |  |

#### Example: Load

```go
result, err := client.ShareModel(nil).Load(map[string]any{"id": "share_model_id"}, nil)
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
| `deprecated` | ``$BOOLEAN`` |  |
| `share` | ``$ARRAY`` |  |
| `signal` | ``$ARRAY`` |  |
| `substitute` | ``$BOOLEAN`` |  |
| `unix_second` | ``$ARRAY`` |  |

#### Example: List

```go
results, err := client.TrafficModel(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
