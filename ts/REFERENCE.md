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

#### `Cbet(data?: object)`

Create a new `Cbet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CbetEntity` instance.

#### `Cbpf(data?: object)`

Create a new `Cbpf` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CbpfEntity` instance.

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

#### `PublicPower(data?: object)`

Create a new `PublicPower` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicPowerEntity` instance.

#### `PublicPowerForecast(data?: object)`

Create a new `PublicPowerForecast` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicPowerForecastEntity` instance.

#### `RenShareDailyAvg(data?: object)`

Create a new `RenShareDailyAvg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RenShareDailyAvgEntity` instance.

#### `RenShareModel(data?: object)`

Create a new `RenShareModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `RenShareModelEntity` instance.

#### `SolarShare(data?: object)`

Create a new `SolarShare` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SolarShareEntity` instance.

#### `SolarShareDailyAvg(data?: object)`

Create a new `SolarShareDailyAvg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SolarShareDailyAvgEntity` instance.

#### `TotalPower(data?: object)`

Create a new `TotalPower` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TotalPowerEntity` instance.

#### `TrafficModel(data?: object)`

Create a new `TrafficModel` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TrafficModelEntity` instance.

#### `WindOffshoreShare(data?: object)`

Create a new `WindOffshoreShare` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WindOffshoreShareEntity` instance.

#### `WindOffshoreShareDailyAvg(data?: object)`

Create a new `WindOffshoreShareDailyAvg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WindOffshoreShareDailyAvgEntity` instance.

#### `WindOnshoreShare(data?: object)`

Create a new `WindOnshoreShare` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WindOnshoreShareEntity` instance.

#### `WindOnshoreShareDailyAvg(data?: object)`

Create a new `WindOnshoreShareDailyAvg` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WindOnshoreShareDailyAvgEntity` instance.

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

## CbetEntity

```ts
const cbet = client.Cbet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cbet().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CbetEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CbpfEntity

```ts
const cbpf = client.Cbpf()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `countries` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Cbpf().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CbpfEntity` instance with the same client and
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
| `data` | `any[]` | Yes |  |
| `deprecated` | `boolean` | Yes |  |
| `unix_seconds` | `any` | No |  |

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
| `deprecated` | `boolean` | Yes |  |
| `last_update` | `any` | Yes |  |
| `production_types` | `any` | No |  |
| `time` | `any[]` | Yes |  |

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
| `deprecated` | `boolean` | Yes |  |
| `license_info` | `string` | Yes |  |
| `price` | `number` | No |  |
| `unit` | `string` | Yes |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Price().load()
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

## PublicPowerEntity

```ts
const public_power = client.PublicPower()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `boolean` | Yes |  |
| `production_types` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.PublicPower().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicPowerEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `forecast_type` | `string` | Yes |  |
| `forecast_values` | `any[]` | Yes |  |
| `production_type` | `string` | Yes |  |
| `unix_seconds` | `any[]` | Yes |  |

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

## RenShareDailyAvgEntity

```ts
const ren_share_daily_avg = client.RenShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | List of average daily values |
| `days` | `any[]` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.RenShareDailyAvg().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `RenShareDailyAvgEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `ren_share` | `any[]` | Yes |  |
| `solar_share` | `any` | No |  |
| `substitute` | `boolean` | Yes |  |
| `unix_seconds` | `any[]` | Yes |  |
| `wind_offshore_share` | `any` | No |  |
| `wind_onshore_share` | `any` | No |  |

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

## SolarShareEntity

```ts
const solar_share = client.SolarShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SolarShare().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SolarShareEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SolarShareDailyAvgEntity

```ts
const solar_share_daily_avg = client.SolarShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | List of average daily values |
| `days` | `any[]` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SolarShareDailyAvg().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SolarShareDailyAvgEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TotalPowerEntity

```ts
const total_power = client.TotalPower()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deprecated` | `boolean` | Yes |  |
| `production_types` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.TotalPower().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TotalPowerEntity` instance with the same client and
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
| `deprecated` | `boolean` | Yes |  |
| `share` | `any[]` | Yes |  |
| `signal` | `any[]` | No | 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share) |
| `substitute` | `boolean` | Yes |  |
| `unix_seconds` | `any[]` | Yes |  |

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

## WindOffshoreShareEntity

```ts
const wind_offshore_share = client.WindOffshoreShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WindOffshoreShare().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WindOffshoreShareEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WindOffshoreShareDailyAvgEntity

```ts
const wind_offshore_share_daily_avg = client.WindOffshoreShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | List of average daily values |
| `days` | `any[]` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WindOffshoreShareDailyAvg().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WindOffshoreShareDailyAvgEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WindOnshoreShareEntity

```ts
const wind_onshore_share = client.WindOnshoreShare()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any` | No |  |
| `deprecated` | `boolean` | Yes |  |
| `forecast` | `any` | No |  |
| `unix_seconds` | `any` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.WindOnshoreShare().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WindOnshoreShareEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WindOnshoreShareDailyAvgEntity

```ts
const wind_onshore_share_daily_avg = client.WindOnshoreShareDailyAvg()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `data` | `any[]` | Yes | List of average daily values |
| `days` | `any[]` | Yes | List of days in the format dd.mm.yyyy |
| `deprecated` | `boolean` | Yes |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.WindOnshoreShareDailyAvg().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WindOnshoreShareDailyAvgEntity` instance with the same client and
options.

#### `client()`

Return the parent `EnergyChartsSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```ts
const client = new EnergyChartsSDK({
  feature: {
    ratelimit: { active: true },
    retry: { active: true },
    test: { active: true },
    timeout: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

