# EnergyCharts TypeScript SDK



The TypeScript SDK for the EnergyCharts API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.CrossBorderModel()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/energy-charts-sdk/releases](https://github.com/voxgig-sdk/energy-charts-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { EnergyChartsSDK } from '@voxgig-sdk/energy-charts'

const client = new EnergyChartsSDK()
```

### 3. Load a crossbordermodel

`load()` returns the entity directly and throws on failure:

```ts
try {
  const crossbordermodel = await client.CrossBorderModel().load()
  console.log(crossbordermodel)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const crossbordermodel = await client.CrossBorderModel().load()
  console.log(crossbordermodel)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = EnergyChartsSDK.test()

const crossbordermodel = await client.CrossBorderModel().load()
// crossbordermodel is a bare entity populated with mock response data
console.log(crossbordermodel)
```

You can also use the instance method:

```ts
const client = new EnergyChartsSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.CrossBorderModel()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new EnergyChartsSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ENERGY_CHARTS_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### EnergyChartsSDK

#### Constructor

```ts
new EnergyChartsSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `CrossBorderModel(data?)` | `CrossBorderModelEntity` | Create a CrossBorderModel entity instance. |
| `DailyAvgDict(data?)` | `DailyAvgDictEntity` | Create a DailyAvgDict entity instance. |
| `Frequency(data?)` | `FrequencyEntity` | Create a Frequency entity instance. |
| `InstalledModel(data?)` | `InstalledModelEntity` | Create an InstalledModel entity instance. |
| `Price(data?)` | `PriceEntity` | Create a Price entity instance. |
| `ProductionModel(data?)` | `ProductionModelEntity` | Create a ProductionModel entity instance. |
| `PublicPowerForecast(data?)` | `PublicPowerForecastEntity` | Create a PublicPowerForecast entity instance. |
| `RenShareModel(data?)` | `RenShareModelEntity` | Create a RenShareModel entity instance. |
| `ShareModel(data?)` | `ShareModelEntity` | Create a ShareModel entity instance. |
| `TrafficModel(data?)` | `TrafficModelEntity` | Create a TrafficModel entity instance. |
| `tester(testopts?, sdkopts?)` | `EnergyChartsSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `EnergyChartsSDK.test(testopts?, sdkopts?)` | `EnergyChartsSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): EnergyChartsSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### CrossBorderModel

| Field | Description |
| --- | --- |
| `country` |  |
| `deprecated` |  |
| `unix_second` |  |

Operations: load.

API path: `/cbet`

#### DailyAvgDict

| Field | Description |
| --- | --- |
| `data` |  |
| `day` |  |
| `deprecated` |  |

Operations: list.

API path: `/ren_share_daily_avg`

#### Frequency

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `unix_second` |  |

Operations: list.

API path: `/frequency`

#### InstalledModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `last_update` |  |
| `production_type` |  |
| `time` |  |

Operations: list.

API path: `/installed_power`

#### Price

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `license_info` |  |
| `price` |  |
| `unit` |  |
| `unix_second` |  |

Operations: load.

API path: `/price`

#### ProductionModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `production_type` |  |
| `unix_second` |  |

Operations: load.

API path: `/public_power`

#### PublicPowerForecast

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `forecast_type` |  |
| `forecast_value` |  |
| `production_type` |  |
| `unix_second` |  |

Operations: list.

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

Operations: list.

API path: `/ren_share_forecast`

#### ShareModel

| Field | Description |
| --- | --- |
| `data` |  |
| `deprecated` |  |
| `forecast` |  |
| `unix_second` |  |

Operations: load.

API path: `/solar_share`

#### TrafficModel

| Field | Description |
| --- | --- |
| `deprecated` |  |
| `share` |  |
| `signal` |  |
| `substitute` |  |
| `unix_second` |  |

Operations: list.

API path: `/signal`



## Entities


### CrossBorderModel

Create an instance: `const cross_border_model = client.CrossBorderModel()`

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

```ts
const cross_border_model = await client.CrossBorderModel().load()
```


### DailyAvgDict

Create an instance: `const daily_avg_dict = client.DailyAvgDict()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `day` | `any[]` |  |
| `deprecated` | `boolean` |  |

#### Example: List

```ts
const daily_avg_dicts = await client.DailyAvgDict().list()
```


### Frequency

Create an instance: `const frequency = client.Frequency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `data` | `any[]` |  |
| `deprecated` | `boolean` |  |
| `unix_second` | `any` |  |

#### Example: List

```ts
const frequencys = await client.Frequency().list()
```


### InstalledModel

Create an instance: `const installed_model = client.InstalledModel()`

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
| `time` | `any[]` |  |

#### Example: List

```ts
const installed_models = await client.InstalledModel().list()
```


### Price

Create an instance: `const price = client.Price()`

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

```ts
const price = await client.Price().load()
```


### ProductionModel

Create an instance: `const production_model = client.ProductionModel()`

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

```ts
const production_model = await client.ProductionModel().load()
```


### PublicPowerForecast

Create an instance: `const public_power_forecast = client.PublicPowerForecast()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `forecast_type` | `string` |  |
| `forecast_value` | `any[]` |  |
| `production_type` | `string` |  |
| `unix_second` | `any[]` |  |

#### Example: List

```ts
const public_power_forecasts = await client.PublicPowerForecast().list()
```


### RenShareModel

Create an instance: `const ren_share_model = client.RenShareModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `ren_share` | `any[]` |  |
| `solar_share` | `any` |  |
| `substitute` | `boolean` |  |
| `unix_second` | `any[]` |  |
| `wind_offshore_share` | `any` |  |
| `wind_onshore_share` | `any` |  |

#### Example: List

```ts
const ren_share_models = await client.RenShareModel().list()
```


### ShareModel

Create an instance: `const share_model = client.ShareModel()`

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

```ts
const share_model = await client.ShareModel().load()
```


### TrafficModel

Create an instance: `const traffic_model = client.TrafficModel()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deprecated` | `boolean` |  |
| `share` | `any[]` |  |
| `signal` | `any[]` |  |
| `substitute` | `boolean` |  |
| `unix_second` | `any[]` |  |

#### Example: List

```ts
const traffic_models = await client.TrafficModel().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
energy-charts/
├── src/
│   ├── EnergyChartsSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { EnergyChartsSDK } from '@voxgig-sdk/energy-charts'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const crossbordermodel = client.CrossBorderModel()
await crossbordermodel.load()

// crossbordermodel.data() now returns the crossbordermodel data from the last `load`
// crossbordermodel.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
