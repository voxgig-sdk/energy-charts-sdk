# EnergyCharts SDK

European electricity data — production, prices, cross-border flows and renewable share from Fraunhofer ISE

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Energy-Charts API

[Energy-Charts](https://www.energy-charts.info/) is an open electricity data service operated by the [Fraunhofer Institute for Solar Energy Systems (ISE)](https://www.ise.fraunhofer.de/). It exposes the same time-series that power the Energy-Charts dashboards used by researchers, journalists and grid analysts across Europe.

What you get from the API:

- Generation by source (solar, wind on/offshore, nuclear, hydro, fossil, biomass) for European bidding zones
- Day-ahead spot prices in EUR/MWh per bidding zone
- Cross-border physical flows and scheduled exchanges between zones
- Installed capacity by technology and renewable share of generation / load
- Grid frequency samples and public-power forecasts

No API key is required and responses are JSON. Data updates follow the cadence of the upstream TSO and market operator feeds (typically 15-minute or hourly resolution).

## Try it

**TypeScript**
```bash
npm install energy-charts
```

**Python**
```bash
pip install energy-charts-sdk
```

**PHP**
```bash
composer require voxgig/energy-charts-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/energy-charts-sdk/go
```

**Ruby**
```bash
gem install energy-charts-sdk
```

**Lua**
```bash
luarocks install energy-charts-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { EnergyChartsSDK } from 'energy-charts'

const client = new EnergyChartsSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o energy-charts-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "energy-charts": {
      "command": "/abs/path/to/energy-charts-mcp"
    }
  }
}
```

## Entities

The API exposes 10 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **CrossBorderModel** | Physical cross-border electricity flows between bidding zones, returned by the cross-border endpoints (e.g. `/cbpf`). | `/cbet` |
| **DailyAvgDict** | Daily averaged values keyed by date, used by endpoints that summarise a metric per day. | `/ren_share_daily_avg` |
| **Frequency** | Grid frequency samples for the European synchronous area, served by `/frequency`. | `/frequency` |
| **InstalledModel** | Installed generation capacity broken down by technology and year, served by `/installed_power`. | `/installed_power` |
| **Price** | Day-ahead spot market prices in EUR/MWh per bidding zone, served by `/price` (e.g. `/price?bzn=DE-LU`). | `/price` |
| **ProductionModel** | Electricity generation time-series by production type for a country or bidding zone, served by `/public_power` and related endpoints. | `/public_power` |
| **PublicPowerForecast** | Forecast of public net electricity generation served by the public-power forecast endpoint. | `/public_power_forecast` |
| **RenShareModel** | Renewable share of generation or load over a time window, served by the renewable-share endpoints. | `/ren_share_forecast` |
| **ShareModel** | Per-source share of generation as fractions or percentages over a time range. | `/solar_share` |
| **TrafficModel** | Scheduled commercial exchanges / traffic between bidding zones. | `/signal` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from energycharts_sdk import EnergyChartsSDK

client = EnergyChartsSDK({})


# Load a specific crossbordermodel
crossbordermodel, err = client.CrossBorderModel(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'energycharts_sdk.php';

$client = new EnergyChartsSDK([]);


// Load a specific crossbordermodel
[$crossbordermodel, $err] = $client->CrossBorderModel(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/energy-charts-sdk/go"

client := sdk.NewEnergyChartsSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "EnergyCharts_sdk"

client = EnergyChartsSDK.new({})


# Load a specific crossbordermodel
crossbordermodel, err = client.CrossBorderModel(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("energy-charts_sdk")

local client = sdk.new({})


-- Load a specific crossbordermodel
local crossbordermodel, err = client:CrossBorderModel(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = EnergyChartsSDK.test()
const result = await client.CrossBorderModel().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = EnergyChartsSDK.test(None, None)
result, err = client.CrossBorderModel(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = EnergyChartsSDK::test(null, null);
[$result, $err] = $client->CrossBorderModel(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.CrossBorderModel(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = EnergyChartsSDK.test(nil, nil)
result, err = client.CrossBorderModel(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:CrossBorderModel(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Energy-Charts API

- Upstream: [https://www.energy-charts.info/](https://www.energy-charts.info/)
- API docs: [https://api.energy-charts.info/](https://api.energy-charts.info/)

- Data is published under the [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/) licence (CC BY 4.0).
- Attribute responses to Fraunhofer ISE / Energy-Charts.info when redistributing or visualising the data.
- Underlying data is sourced from ENTSO-E and other TSO/market operators; their terms may apply to bulk reuse.
- No authentication is required and CORS is enabled, so the API is usable directly from browser apps.

---

Generated from the Energy-Charts API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
