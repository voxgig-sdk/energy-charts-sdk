# EnergyCharts TypeScript SDK Reference

Complete API reference for the EnergyCharts TypeScript SDK.


## EnergyChartsSDK

### Constructor

```ts
new EnergyChartsSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `EnergyChartsSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = EnergyChartsSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `EnergyChartsSDK` instance in test mode.


### Instance Methods

#### `CrossBorderModel(data?: object)`

Create a new `CrossBorderModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrossBorderModelEntity` instance.

#### `DailyAvgDict(data?: object)`

Create a new `DailyAvgDict` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DailyAvgDictEntity` instance.

#### `Frequency(data?: object)`

Create a new `Frequency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FrequencyEntity` instance.

#### `InstalledModel(data?: object)`

Create a new `InstalledModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `InstalledModelEntity` instance.

#### `Price(data?: object)`

Create a new `Price` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PriceEntity` instance.

#### `ProductionModel(data?: object)`

Create a new `ProductionModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ProductionModelEntity` instance.

#### `PublicPowerForecast(data?: object)`

Create a new `PublicPowerForecast` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicPowerForecastEntity` instance.

#### `RenShareModel(data?: object)`

Create a new `RenShareModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RenShareModelEntity` instance.

#### `ShareModel(data?: object)`

Create a new `ShareModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ShareModelEntity` instance.

#### `TrafficModel(data?: object)`

Create a new `TrafficModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrafficModelEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `EnergyChartsSDK.test()`.

**Returns:** `EnergyChartsSDK` instance in test mode.


---

## CrossBorderModelEntity

```ts
const cross_border_model = client.CrossBorderModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.CrossBorderModel().load({ id: 'cross_border_model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrossBorderModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DailyAvgDictEntity

```ts
const daily_avg_dict = client.DailyAvgDict()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `day` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DailyAvgDict().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DailyAvgDictEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FrequencyEntity

```ts
const frequency = client.Frequency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ARRAY`` | Yes |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Frequency().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FrequencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## InstalledModelEntity

```ts
const installed_model = client.InstalledModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `last_update` | ``$ANY`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `time` | ``$ARRAY`` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.InstalledModel().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `InstalledModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PriceEntity

```ts
const price = client.Price()
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Price().load({ id: 'price_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PriceEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ProductionModelEntity

```ts
const production_model = client.ProductionModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `production_type` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ProductionModel().load({ id: 'production_model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ProductionModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicPowerForecastEntity

```ts
const public_power_forecast = client.PublicPowerForecast()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.PublicPowerForecast().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicPowerForecastEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## RenShareModelEntity

```ts
const ren_share_model = client.RenShareModel()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RenShareModel().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RenShareModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ShareModelEntity

```ts
const share_model = client.ShareModel()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | ``$ANY`` | No |  |
| `deprecated` | ``$BOOLEAN`` | Yes |  |
| `forecast` | ``$ANY`` | No |  |
| `unix_second` | ``$ANY`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ShareModel().load({ id: 'share_model_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ShareModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TrafficModelEntity

```ts
const traffic_model = client.TrafficModel()
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.TrafficModel().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TrafficModelEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new EnergyChartsSDK({
  feature: {
    test: { active: true },
  }
})
```

