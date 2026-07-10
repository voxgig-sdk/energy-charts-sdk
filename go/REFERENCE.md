# EnergyCharts Golang SDK Reference

Complete API reference for the EnergyCharts Golang SDK.


## EnergyChartsSDK

### Constructor

```go
func NewEnergyChartsSDK(options map[string]any) *EnergyChartsSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *EnergyChartsSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *EnergyChartsSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `CrossBorderModel(data map[string]any) EnergyChartsEntity`

Create a new `CrossBorderModel` entity instance. Pass `nil` for no initial data.

#### `DailyAvgDict(data map[string]any) EnergyChartsEntity`

Create a new `DailyAvgDict` entity instance. Pass `nil` for no initial data.

#### `Frequency(data map[string]any) EnergyChartsEntity`

Create a new `Frequency` entity instance. Pass `nil` for no initial data.

#### `InstalledModel(data map[string]any) EnergyChartsEntity`

Create a new `InstalledModel` entity instance. Pass `nil` for no initial data.

#### `Price(data map[string]any) EnergyChartsEntity`

Create a new `Price` entity instance. Pass `nil` for no initial data.

#### `ProductionModel(data map[string]any) EnergyChartsEntity`

Create a new `ProductionModel` entity instance. Pass `nil` for no initial data.

#### `PublicPowerForecast(data map[string]any) EnergyChartsEntity`

Create a new `PublicPowerForecast` entity instance. Pass `nil` for no initial data.

#### `RenShareModel(data map[string]any) EnergyChartsEntity`

Create a new `RenShareModel` entity instance. Pass `nil` for no initial data.

#### `ShareModel(data map[string]any) EnergyChartsEntity`

Create a new `ShareModel` entity instance. Pass `nil` for no initial data.

#### `TrafficModel(data map[string]any) EnergyChartsEntity`

Create a new `TrafficModel` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## CrossBorderModelEntity

```go
crossBorderModel := client.CrossBorderModel(nil)
fmt.Println(crossBorderModel.GetName()) // "cross_border_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | `any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `unix_second` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.CrossBorderModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CrossBorderModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DailyAvgDictEntity

```go
dailyAvgDict := client.DailyAvgDict(nil)
fmt.Println(dailyAvgDict.GetName()) // "daily_avg_dict"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | Yes |  |
| `day` | `[]any` | Yes |  |
| `deprecated` | `bool` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DailyAvgDict(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DailyAvgDictEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FrequencyEntity

```go
frequency := client.Frequency(nil)
fmt.Println(frequency.GetName()) // "frequency"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `[]any` | Yes |  |
| `deprecated` | `bool` | Yes |  |
| `unix_second` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Frequency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FrequencyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## InstalledModelEntity

```go
installedModel := client.InstalledModel(nil)
fmt.Println(installedModel.GetName()) // "installed_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `last_update` | `any` | Yes |  |
| `production_type` | `any` | No |  |
| `time` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.InstalledModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `InstalledModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PriceEntity

```go
price := client.Price(nil)
fmt.Println(price.GetName()) // "price"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `license_info` | `string` | Yes |  |
| `price` | `float64` | No |  |
| `unit` | `string` | Yes |  |
| `unix_second` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Price(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PriceEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ProductionModelEntity

```go
productionModel := client.ProductionModel(nil)
fmt.Println(productionModel.GetName()) // "production_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `production_type` | `any` | No |  |
| `unix_second` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ProductionModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ProductionModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicPowerForecastEntity

```go
publicPowerForecast := client.PublicPowerForecast(nil)
fmt.Println(publicPowerForecast.GetName()) // "public_power_forecast"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `forecast_type` | `string` | Yes |  |
| `forecast_value` | `[]any` | Yes |  |
| `production_type` | `string` | Yes |  |
| `unix_second` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.PublicPowerForecast(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicPowerForecastEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## RenShareModelEntity

```go
renShareModel := client.RenShareModel(nil)
fmt.Println(renShareModel.GetName()) // "ren_share_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `ren_share` | `[]any` | Yes |  |
| `solar_share` | `any` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_second` | `[]any` | Yes |  |
| `wind_offshore_share` | `any` | No |  |
| `wind_onshore_share` | `any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.RenShareModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `RenShareModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ShareModelEntity

```go
shareModel := client.ShareModel(nil)
fmt.Println(shareModel.GetName()) // "share_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `bool` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_second` | `any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ShareModel(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ShareModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TrafficModelEntity

```go
trafficModel := client.TrafficModel(nil)
fmt.Println(trafficModel.GetName()) // "traffic_model"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `bool` | Yes |  |
| `share` | `[]any` | Yes |  |
| `signal` | `[]any` | No |  |
| `substitute` | `bool` | Yes |  |
| `unix_second` | `[]any` | Yes |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.TrafficModel(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TrafficModelEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewEnergyChartsSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

