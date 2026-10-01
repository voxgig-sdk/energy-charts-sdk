import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "cbet",
    "accessor": "Cbet",
    "op": "load",
    "method": "GET",
    "path": "/cbet",
    "args": [],
    "select": {
      "country": "v1",
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "countries": [
        {
          "data": [
            1
          ],
          "name": "x"
        }
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "cbpf",
    "accessor": "Cbpf",
    "op": "load",
    "method": "GET",
    "path": "/cbpf",
    "args": [],
    "select": {
      "country": "v1",
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "countries": [
        {
          "data": [
            1
          ],
          "name": "x"
        }
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "frequency",
    "accessor": "Frequency",
    "op": "list",
    "method": "GET",
    "path": "/frequency",
    "args": [],
    "select": {
      "end": "v1",
      "region": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "region",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "data": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "installed_model",
    "accessor": "InstalledModel",
    "op": "list",
    "method": "GET",
    "path": "/installed_power",
    "args": [],
    "select": {
      "country": "v1",
      "installation_decommission": "v1",
      "time_step": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "time_step",
      "installation_decommission"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "time": [
        "x"
      ],
      "production_types": [
        {
          "data": [
            1
          ],
          "name": "x"
        }
      ],
      "last_update": 1,
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "price",
    "accessor": "Price",
    "op": "load",
    "method": "GET",
    "path": "/price",
    "args": [],
    "select": {
      "bzn": "v1",
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "bzn",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "license_info": "x",
      "unix_seconds": [
        1
      ],
      "price": [
        1
      ],
      "unit": "x",
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "public_power",
    "accessor": "PublicPower",
    "op": "load",
    "method": "GET",
    "path": "/public_power",
    "args": [],
    "select": {
      "country": "v1",
      "end": "v1",
      "start": "v1",
      "subtype": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "start",
      "end",
      "subtype"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "production_types": [
        {
          "data": [
            1
          ],
          "name": "x"
        }
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "public_power_forecast",
    "accessor": "PublicPowerForecast",
    "op": "list",
    "method": "GET",
    "path": "/public_power_forecast",
    "args": [],
    "select": {
      "country": "v1",
      "end": "v1",
      "forecast_type": "v1",
      "production_type": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "production_type",
      "forecast_type",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "forecast_values": [
        1
      ],
      "production_type": "x",
      "forecast_type": "x",
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "ren_share_daily_avg",
    "accessor": "RenShareDailyAvg",
    "op": "list",
    "method": "GET",
    "path": "/ren_share_daily_avg",
    "args": [],
    "select": {
      "country": "v1",
      "year": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "year"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "days": [
        "x"
      ],
      "data": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "ren_share_model",
    "accessor": "RenShareModel",
    "op": "list",
    "method": "GET",
    "path": "/ren_share_forecast",
    "args": [],
    "select": {
      "country": "v1"
    },
    "headers": [],
    "query": [
      "country"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "ren_share": [
        1
      ],
      "solar_share": [
        1
      ],
      "wind_onshore_share": [
        1
      ],
      "wind_offshore_share": [
        1
      ],
      "substitute": true,
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "solar_share",
    "accessor": "SolarShare",
    "op": "load",
    "method": "GET",
    "path": "/solar_share",
    "args": [],
    "select": {
      "country": "v1"
    },
    "headers": [],
    "query": [
      "country"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "data": [
        1
      ],
      "forecast": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "solar_share_daily_avg",
    "accessor": "SolarShareDailyAvg",
    "op": "list",
    "method": "GET",
    "path": "/solar_share_daily_avg",
    "args": [],
    "select": {
      "country": "v1",
      "year": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "year"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "days": [
        "x"
      ],
      "data": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "total_power",
    "accessor": "TotalPower",
    "op": "load",
    "method": "GET",
    "path": "/total_power",
    "args": [],
    "select": {
      "country": "v1",
      "end": "v1",
      "start": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "start",
      "end"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "production_types": [
        {
          "data": [
            1
          ],
          "name": "x"
        }
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "traffic_model",
    "accessor": "TrafficModel",
    "op": "list",
    "method": "GET",
    "path": "/signal",
    "args": [],
    "select": {
      "country": "v1",
      "postal_code": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "postal_code"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "share": [
        1
      ],
      "signal": [
        1
      ],
      "substitute": true,
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "wind_offshore_share",
    "accessor": "WindOffshoreShare",
    "op": "load",
    "method": "GET",
    "path": "/wind_offshore_share",
    "args": [],
    "select": {
      "country": "v1"
    },
    "headers": [],
    "query": [
      "country"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "data": [
        1
      ],
      "forecast": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "wind_offshore_share_daily_avg",
    "accessor": "WindOffshoreShareDailyAvg",
    "op": "list",
    "method": "GET",
    "path": "/wind_offshore_share_daily_avg",
    "args": [],
    "select": {
      "country": "v1",
      "year": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "year"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "days": [
        "x"
      ],
      "data": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "wind_onshore_share",
    "accessor": "WindOnshoreShare",
    "op": "load",
    "method": "GET",
    "path": "/wind_onshore_share",
    "args": [],
    "select": {
      "country": "v1"
    },
    "headers": [],
    "query": [
      "country"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "unix_seconds": [
        1
      ],
      "data": [
        1
      ],
      "forecast": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  },
  {
    "entity": "wind_onshore_share_daily_avg",
    "accessor": "WindOnshoreShareDailyAvg",
    "op": "list",
    "method": "GET",
    "path": "/wind_onshore_share_daily_avg",
    "args": [],
    "select": {
      "country": "v1",
      "year": "v1"
    },
    "headers": [],
    "query": [
      "country",
      "year"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "days": [
        "x"
      ],
      "data": [
        1
      ],
      "deprecated": true
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
