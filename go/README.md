# EnergyCharts Golang SDK



The Golang SDK for the EnergyCharts API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Cbet(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/energy-charts-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Tags](https://github.com/voxgig-sdk/energy-charts-sdk/tags) for the available versions.

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
Each operation returns `(value, error)` — the value is the entity, and for
`List` a `[]any` of entities, one per record (there is no `{ok, data}`
wrapper), so check `err` and read a record through the entity's
`Data()`.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/energy-charts-sdk/go"
)

func main() {
    client := sdk.New()

    // Load a single cbet — the value is the entity; Data() reads its record.
    cbet, err := client.Cbet(nil).Load(nil, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(cbet.(sdk.Entity).Data())
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
publicpower, err := client.PublicPower(nil).Load(nil, nil)
if err != nil {
    // handle err
    return
}
_ = publicpower
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

publicPower, err := client.PublicPower(nil).Load(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(publicPower.(sdk.Entity).Data()) // the entity's mock record
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
| `Cbet` | `(data map[string]any) EnergyChartsEntity` | Create a Cbet entity instance. |
| `Cbpf` | `(data map[string]any) EnergyChartsEntity` | Create a Cbpf entity instance. |
| `Frequency` | `(data map[string]any) EnergyChartsEntity` | Create a Frequency entity instance. |
| `InstalledModel` | `(data map[string]any) EnergyChartsEntity` | Create an InstalledModel entity instance. |
| `Price` | `(data map[string]any) EnergyChartsEntity` | Create a Price entity instance. |
| `PublicPower` | `(data map[string]any) EnergyChartsEntity` | Create a PublicPower entity instance. |
| `PublicPowerForecast` | `(data map[string]any) EnergyChartsEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareDailyAvg` | `(data map[string]any) EnergyChartsEntity` | Create a RenShareDailyAvg entity instance. |
| `RenShareModel` | `(data map[string]any) EnergyChartsEntity` | Create a RenShareModel entity instance. |
| `SolarShare` | `(data map[string]any) EnergyChartsEntity` | Create a SolarShare entity instance. |
| `SolarShareDailyAvg` | `(data map[string]any) EnergyChartsEntity` | Create a SolarShareDailyAvg entity instance. |
| `TotalPower` | `(data map[string]any) EnergyChartsEntity` | Create a TotalPower entity instance. |
| `TrafficModel` | `(data map[string]any) EnergyChartsEntity` | Create a TrafficModel entity instance. |
| `WindOffshoreShare` | `(data map[string]any) EnergyChartsEntity` | Create a WindOffshoreShare entity instance. |
| `WindOffshoreShareDailyAvg` | `(data map[string]any) EnergyChartsEntity` | Create a WindOffshoreShareDailyAvg entity instance. |
| `WindOnshoreShare` | `(data map[string]any) EnergyChartsEntity` | Create a WindOnshoreShare entity instance. |
| `WindOnshoreShareDailyAvg` | `(data map[string]any) EnergyChartsEntity` | Create a WindOnshoreShareDailyAvg entity instance. |

### Entity interface (EnergyChartsEntity)

All entities implement the `EnergyChartsEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria, and return it. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria, one per record. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity, whose `Data()` reads its record (`map[string]any`) |
| `List` | a `[]any` of entities, one per record |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    cbet, err := client.Cbet(nil).Load(nil, nil)
    if err != nil { /* handle */ }
    // cbet is the entity; cbet.(sdk.Entity).Data() reads its record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Cbet

| Field | Description |
| --- | --- |
| `"countries"` |  |
| `"deprecated"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/cbet`

#### Cbpf

| Field | Description |
| --- | --- |
| `"countries"` |  |
| `"deprecated"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/cbpf`

#### Frequency

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"unix_seconds"` |  |

Operations: List.

API path: `/frequency`

#### InstalledModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"last_update"` |  |
| `"production_types"` |  |
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
| `"unix_seconds"` |  |

Operations: Load.

API path: `/price`

#### PublicPower

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"production_types"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/public_power`

#### PublicPowerForecast

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"forecast_type"` |  |
| `"forecast_values"` |  |
| `"production_type"` |  |
| `"unix_seconds"` |  |

Operations: List.

API path: `/public_power_forecast`

#### RenShareDailyAvg

| Field | Description |
| --- | --- |
| `"data"` | List of average daily values |
| `"days"` | List of days in the format dd.mm.yyyy |
| `"deprecated"` |  |

Operations: List.

API path: `/ren_share_daily_avg`

#### RenShareModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"ren_share"` |  |
| `"solar_share"` |  |
| `"substitute"` |  |
| `"unix_seconds"` |  |
| `"wind_offshore_share"` |  |
| `"wind_onshore_share"` |  |

Operations: List.

API path: `/ren_share_forecast`

#### SolarShare

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"forecast"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/solar_share`

#### SolarShareDailyAvg

| Field | Description |
| --- | --- |
| `"data"` | List of average daily values |
| `"days"` | List of days in the format dd.mm.yyyy |
| `"deprecated"` |  |

Operations: List.

API path: `/solar_share_daily_avg`

#### TotalPower

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"production_types"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/total_power`

#### TrafficModel

| Field | Description |
| --- | --- |
| `"deprecated"` |  |
| `"share"` |  |
| `"signal"` | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `"substitute"` |  |
| `"unix_seconds"` |  |

Operations: List.

API path: `/signal`

#### WindOffshoreShare

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"forecast"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/wind_offshore_share`

#### WindOffshoreShareDailyAvg

| Field | Description |
| --- | --- |
| `"data"` | List of average daily values |
| `"days"` | List of days in the format dd.mm.yyyy |
| `"deprecated"` |  |

Operations: List.

API path: `/wind_offshore_share_daily_avg`

#### WindOnshoreShare

| Field | Description |
| --- | --- |
| `"data"` |  |
| `"deprecated"` |  |
| `"forecast"` |  |
| `"unix_seconds"` |  |

Operations: Load.

API path: `/wind_onshore_share`

#### WindOnshoreShareDailyAvg

| Field | Description |
| --- | --- |
| `"data"` | List of average daily values |
| `"days"` | List of days in the format dd.mm.yyyy |
| `"deprecated"` |  |

Operations: List.

API path: `/wind_onshore_share_daily_avg`



## Entities


### Cbet

Create an instance: `cbet := client.Cbet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countries` | `any` |  |
| `deprecated` | `bool` |  |
| `unix_seconds` | `any` |  |

#### Example: Load

```go
cbet, err := client.Cbet(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cbet.(sdk.Entity).Data()) // the loaded entity's record
```


### Cbpf

Create an instance: `cbpf := client.Cbpf(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `countries` | `any` |  |
| `deprecated` | `bool` |  |
| `unix_seconds` | `any` |  |

#### Example: Load

```go
cbpf, err := client.Cbpf(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(cbpf.(sdk.Entity).Data()) // the loaded entity's record
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
| `unix_seconds` | `any` |  |

#### Example: List

```go
frequencys, err := client.Frequency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range frequencys.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### InstalledModel

Create an instance: `installedModel := client.InstalledModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `last_update` | `any` |  |
| `production_types` | `any` |  |
| `time` | `[]any` |  |

#### Example: List

```go
installedModels, err := client.InstalledModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range installedModels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
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
| `unix_seconds` | `any` |  |

#### Example: Load

```go
price, err := client.Price(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(price.(sdk.Entity).Data()) // the loaded entity's record
```


### PublicPower

Create an instance: `publicPower := client.PublicPower(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_types` | `any` |  |
| `unix_seconds` | `any` |  |

#### Example: Load

```go
publicPower, err := client.PublicPower(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(publicPower.(sdk.Entity).Data()) // the loaded entity's record
```


### PublicPowerForecast

Create an instance: `publicPowerForecast := client.PublicPowerForecast(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `forecast_type` | `string` |  |
| `forecast_values` | `[]any` |  |
| `production_type` | `string` |  |
| `unix_seconds` | `[]any` |  |

#### Example: List

```go
publicPowerForecasts, err := client.PublicPowerForecast(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range publicPowerForecasts.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RenShareDailyAvg

Create an instance: `renShareDailyAvg := client.RenShareDailyAvg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` | List of average daily values |
| `days` | `[]any` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```go
renShareDailyAvgs, err := client.RenShareDailyAvg(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range renShareDailyAvgs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### RenShareModel

Create an instance: `renShareModel := client.RenShareModel(nil)`

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
| `unix_seconds` | `[]any` |  |
| `wind_offshore_share` | `any` |  |
| `wind_onshore_share` | `any` |  |

#### Example: List

```go
renShareModels, err := client.RenShareModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range renShareModels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### SolarShare

Create an instance: `solarShare := client.SolarShare(nil)`

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
| `unix_seconds` | `any` |  |

#### Example: Load

```go
solarShare, err := client.SolarShare(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(solarShare.(sdk.Entity).Data()) // the loaded entity's record
```


### SolarShareDailyAvg

Create an instance: `solarShareDailyAvg := client.SolarShareDailyAvg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` | List of average daily values |
| `days` | `[]any` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```go
solarShareDailyAvgs, err := client.SolarShareDailyAvg(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range solarShareDailyAvgs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### TotalPower

Create an instance: `totalPower := client.TotalPower(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `production_types` | `any` |  |
| `unix_seconds` | `any` |  |

#### Example: Load

```go
totalPower, err := client.TotalPower(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(totalPower.(sdk.Entity).Data()) // the loaded entity's record
```


### TrafficModel

Create an instance: `trafficModel := client.TrafficModel(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `bool` |  |
| `share` | `[]any` |  |
| `signal` | `[]any` | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `bool` |  |
| `unix_seconds` | `[]any` |  |

#### Example: List

```go
trafficModels, err := client.TrafficModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range trafficModels.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### WindOffshoreShare

Create an instance: `windOffshoreShare := client.WindOffshoreShare(nil)`

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
| `unix_seconds` | `any` |  |

#### Example: Load

```go
windOffshoreShare, err := client.WindOffshoreShare(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(windOffshoreShare.(sdk.Entity).Data()) // the loaded entity's record
```


### WindOffshoreShareDailyAvg

Create an instance: `windOffshoreShareDailyAvg := client.WindOffshoreShareDailyAvg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` | List of average daily values |
| `days` | `[]any` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```go
windOffshoreShareDailyAvgs, err := client.WindOffshoreShareDailyAvg(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range windOffshoreShareDailyAvgs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```


### WindOnshoreShare

Create an instance: `windOnshoreShare := client.WindOnshoreShare(nil)`

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
| `unix_seconds` | `any` |  |

#### Example: Load

```go
windOnshoreShare, err := client.WindOnshoreShare(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(windOnshoreShare.(sdk.Entity).Data()) // the loaded entity's record
```


### WindOnshoreShareDailyAvg

Create an instance: `windOnshoreShareDailyAvg := client.WindOnshoreShareDailyAvg(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `[]any` | List of average daily values |
| `days` | `[]any` | List of days in the format dd.mm.yyyy |
| `deprecated` | `bool` |  |

#### Example: List

```go
windOnshoreShareDailyAvgs, err := client.WindOnshoreShareDailyAvg(nil).List(nil, nil)
if err != nil {
    panic(err)
}
// A []any of entities, one per record.
for _, item := range windOnshoreShareDailyAvgs.([]any) {
    fmt.Println(item.(sdk.Entity).Data())
}
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

An operation returns the entity, and its `Data()` returns the record. Use
`core.ToMapAny()` to safely cast that record, or data nested in it, to
`map[string]any`: it returns `nil` for anything else, an entity included.

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
publicpower := client.PublicPower(nil)
publicpower.Load(nil, nil)

// publicpower.Data() now returns the publicpower data from the last load
// publicpower.Match() returns the last match criteria
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
