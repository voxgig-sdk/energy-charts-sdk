# Energy-Charts API

&lt;h4&gt;Timestamp Format Options&lt;/h4&gt; When specifying timestamps, you can choose from the following three formats: &lt;ol&gt; &lt;li&gt;&lt;strong&gt;ISO 8601 Format&lt;/strong&gt;: &lt;ul&gt; &lt;li&gt;This format includes the full date and time, with an optional timezone indicator.&lt;/li&gt; &lt;li&gt;Examples: &lt;ul&gt; &lt;li&gt;&lt;code&gt;2025-01-01T17:00Z&lt;/code&gt; (UTC time)&lt;/li&gt; &lt;li&gt;&lt;code&gt;2025-01-01T18:00+01:00&lt;/code&gt; (Local time offset by +01:00)&lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;li&gt;&lt;strong&gt;Daily Format&lt;/strong&gt;: &lt;ul&gt; &lt;li&gt;This format specifies only the date.&lt;/li&gt; &lt;li&gt;The start time is assumed to be at 00:00 on the specified date in the local timezone of the specified country or bidding zone (bzn).&lt;/li&gt; &lt;li&gt;The end timestamp is interpreted as the last minute of the specified day in the same local timezone.&lt;/li&gt; &lt;li&gt;Example: &lt;ul&gt; &lt;li&gt;&lt;code&gt;2025-01-01&lt;/code&gt; (Starts at 00:00 and ends at 23:59 on January 1, 2025, local time)&lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;li&gt;&lt;strong&gt;UNIX Timestamp&lt;/strong&gt;: &lt;ul&gt; &lt;li&gt;This format specifies the time as the number of seconds since the Unix Epoch (January 1st, 1970, at 00:00 UTC).&lt;/li&gt; &lt;li&gt;Example: &lt;ul&gt; &lt;li&gt;&lt;code&gt;1735686000&lt;/code&gt;&lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ul&gt; &lt;/li&gt; &lt;/ol&gt; &lt;h4&gt;Default Behavior for Timestamps&lt;/h4&gt; If an end timestamp is not explicitly provided, it is assumed to be the same as the start timestamp. For daily formats, this means that one full day will be returned. If also no start timestamp is provided, the current day in the local timezone is used. &lt;h4&gt;Discontinuation of endpoints&lt;/h4&gt; Endpoint discontinuations will be preceded by an announcement at least six months in advance, indicated by setting the &quot;deprecated&quot; status to true. &lt;h4&gt;Data License&lt;/h4&gt; Unless stated otherwise, the data provided by the Energy-Charts API is licensed under the &lt;a href=&quot;https://creativecommons.org/licenses/by/4.0/&quot; target=&quot;_blank&quot;&gt;CC BY 4.0&lt;/a&gt; license. Proper attribution to Energy-Charts.info as the source is required. &lt;details&gt; &lt;summary&gt;&lt;b&gt;New in release v1.5 (2025-10-21)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt; Include stricter rate limitations for public API (please contact &lt;a href=&quot;mailto:leonhard.gandhi@ise.fraunhofer.de&quot;&gt;leonhard.gandhi@ise.fraunhofer.de&lt;/a&gt; for commercial access) &lt;/li&gt; &lt;li&gt;Improved load balancing on concurrent requests&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt; Older Releases &lt;/b&gt;&lt;/summary&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt;v1.4 (2024-07-08)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt;Fix bug with wrong timezone for unix timestamps as input&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt;v1.3 (2024-04-22)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt;Fix bug which hid most recent data for /cbet and /cbpf&lt;/li&gt; &lt;li&gt;Inlcude deprecated tag to all active endpoints&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt;v1.2 (2024-04-16)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt;Allow also input timestamps in day format and UNIX timestamp&lt;/li&gt; &lt;li&gt;Inlcude license info for price data available at /price&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt;v1.1 (2023-10-20)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt;Deprecated /ren_share&lt;/li&gt; &lt;li&gt;Deprecated /ren_share_prognosis and replaced it with /ren_share_forecast&lt;/li&gt; &lt;li&gt;Deprecated /power and replaced it with /public_power&lt;/li&gt; &lt;li&gt;Deprecated /price_spot_market and replaced it with /price&lt;/li&gt; &lt;li&gt;Deprecated /traffic_signal and replaced it with /signal&lt;/li&gt; &lt;li&gt;Added endpoint for cross-border electricity trading (/cbet)&lt;/li&gt; &lt;li&gt;Added endpoint for cross-border physical flow (/cbpf)&lt;/li&gt; &lt;li&gt;Changed response structure of all endpoints to fit with json specification&lt;/li&gt; &lt;li&gt;Simplified the response json structure&lt;/li&gt; &lt;li&gt;Removed unnecessary information from responses like names, descriptions and units&lt;/li&gt; &lt;li&gt;Added typed response schemes to every endpoint&lt;/li&gt; &lt;li&gt;Added example values and example requests to every endpoint&lt;/li&gt; &lt;li&gt;Added postal code to /signal, to consider grid state in future implementations&lt;/li&gt; &lt;li&gt;Responses that return unix timestamps now all return unix seconds&lt;/li&gt; &lt;li&gt;Added error handling for false requests and responses&lt;/li&gt; &lt;li&gt;Added a list of available bidding zones for /price&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;details&gt; &lt;summary&gt;&lt;b&gt;v1.0 (2022-11-30)&lt;/b&gt;&lt;/summary&gt; &lt;ul&gt; &lt;li&gt;Initial release&lt;/li&gt; &lt;/ul&gt; &lt;/details&gt; &lt;/details&gt; &lt;b&gt;Available countries:&lt;/b&gt; &lt;details&gt;&lt;summary&gt;de - Germany (click to show all available countries)&lt;/summary&gt; ch - Switzerland eu - European Union all - Europe al - Albania am - Armenia at - Austria az - Azerbaijan ba - Bosnia-Herzegovina be - Belgium bg - Bulgaria by - Belarus cy - Cyprus cz - Czech Republic dk - Denmark ee - Estonia es - Spain fi - Finland fr - France ge - Georgia gr - Greece hr - Croatia hu - Hungary ie - Ireland it - Italy lt - Lithuania lu - Luxembourg lv - Latvia md - Moldova me - Montenegro mk - North Macedonia mt - Malta nie - North Ireland nl - Netherlands no - Norway pl - Poland pt - Portugal ro - Romania rs - Serbia ru - Russia se - Sweden si - Slovenia sk - Slovak Republic tr - Turkey ua - Ukraine uk - United Kingdom xk - Kosovo &lt;/details&gt; &lt;b&gt;Available bidding zones:&lt;/b&gt; &lt;details&gt;&lt;summary&gt;AT - Austria (click to show all available bidding zones)&lt;/summary&gt; BE - Belgium BG - Bulgaria CH - Switzerland CZ - Czech Republic DE-LU - Germany, Luxembourg DE-AT-LU - Germany, Austria, Luxembourg DK1 - Denmark 1 DK2 - Denmark 2 EE - Estionia ES - Spain FI - Finland FR - France GR - Greece HR - Croatia HU - Hungary IT-Calabria - Italy Calabria IT-Centre-North - Italy Centre North IT-Centre-South - Italy Centre South IT-North - Italy North IT-SACOAC - Italy Sardinia Corsica AC IT-SACODC - Italy Sardinia Corsica DC IT-Sardinia - Italy Sardinia IT-Sicily - Italy Sicily IT-South - Italy South LT - Lithuania LV - Latvia ME - Montenegro NL - Netherlands NO1 - Norway 1 NO2 - Norway 2 NO2NSL - Norway North Sea Link NO3 - Norway 3 NO4 - Norway 4 NO5 - Norway 5 PL - Poland PT - Portugal RO - Romania RS - Serbia SE1 - Sweden 1 SE2 - Sweden 2 SE3 - Sweden 3 SE4 - Sweden 4 SI - Slovenia SK - Slovakia &lt;/details&gt; &lt;b&gt;Hint:&lt;/b&gt; Don&#39;t use the &lt;b&gt;Try it out&lt;/b&gt; button on this documentation page to download large datasets as it might lead to long loading times.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 10 entities and 17 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### CrossBorderModel

Results: Successful Response.

SDK operations: `load`.

### DailyAvgDict

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `data`: List of average daily values
- `days`: List of days in the format dd.mm.yyyy

### Frequency

Results: Successful Response.

SDK operations: `list`.

### InstalledModel

Results: Successful Response.

SDK operations: `list`.

### Price

Results: Successful Response.

SDK operations: `load`.

### ProductionModel

Results: Successful Response.

SDK operations: `load`.

### PublicPowerForecast

Results: Successful Response.

SDK operations: `list`.

### RenShareModel

Results: Successful Response.

SDK operations: `list`.

### ShareModel

Results: Successful Response.

SDK operations: `load`.

### TrafficModel

Results: Successful Response.

SDK operations: `list`.

Key fields to recognise:

- `signal`: 0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| CrossBorderModel | `load` | `GET /cbet` | See reference |
| CrossBorderModel | `load` | `GET /cbpf` | See reference |
| DailyAvgDict | `list` | `GET /ren_share_daily_avg` | See reference |
| DailyAvgDict | `list` | `GET /solar_share_daily_avg` | See reference |
| DailyAvgDict | `list` | `GET /wind_offshore_share_daily_avg` | See reference |
| DailyAvgDict | `list` | `GET /wind_onshore_share_daily_avg` | See reference |
| Frequency | `list` | `GET /frequency` | See reference |
| InstalledModel | `list` | `GET /installed_power` | See reference |
| Price | `load` | `GET /price` | See reference |
| ProductionModel | `load` | `GET /public_power` | See reference |
| ProductionModel | `load` | `GET /total_power` | See reference |
| PublicPowerForecast | `list` | `GET /public_power_forecast` | See reference |
| RenShareModel | `list` | `GET /ren_share_forecast` | See reference |
| ShareModel | `load` | `GET /solar_share` | See reference |
| ShareModel | `load` | `GET /wind_offshore_share` | See reference |
| ShareModel | `load` | `GET /wind_onshore_share` | See reference |
| TrafficModel | `list` | `GET /signal` | See reference |

## Connect to the API

- API server: `https://api.energy-charts.info`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `energy-charts_list`: List records for an entity. Supported entities: `daily_avg_dict`, `frequency`, `installed_model`, `public_power_forecast`, `ren_share_model`, `traffic_model`.
- `energy-charts_load`: Load one record for an entity. Supported entities: `cross_border_model`, `price`, `production_model`, `share_model`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

