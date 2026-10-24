"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "cbet",
        "accessor": "Cbet",
        "op": "load",
        "method": "GET",
        "path": "/cbet",
        "args": [],
        "select": {
            "country": "de",
            "end": "",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "unix_seconds": [
                1
            ],
            "countries": [
                {
                    "name": "x",
                    "data": [
                        1
                    ]
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
            "country": "de",
            "end": "",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "unix_seconds": [
                1
            ],
            "countries": [
                {
                    "name": "x",
                    "data": [
                        1
                    ]
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
            "end": "",
            "region": "DE-Freiburg",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "region",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "region",
                "wire": "region"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
            "country": "de",
            "installation_decommission": "v1",
            "time_step": "yearly"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "time_step",
            "installation_decommission"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "installation_decommission",
                "wire": "installation_decommission"
            },
            {
                "name": "time_step",
                "wire": "time_step"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "time": [
                "x"
            ],
            "production_types": [
                {
                    "name": "x",
                    "data": [
                        1
                    ]
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
            "bzn": "DE-LU",
            "end": "",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "bzn",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "bzn",
                "wire": "bzn"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
            "country": "de",
            "end": "",
            "start": "",
            "subtype": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "start",
            "end",
            "subtype"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            },
            {
                "name": "subtype",
                "wire": "subtype"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "unix_seconds": [
                1
            ],
            "production_types": [
                {
                    "name": "x",
                    "data": [
                        1
                    ]
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
            "country": "de",
            "end": "",
            "forecast_type": "current",
            "production_type": "solar",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "production_type",
            "forecast_type",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "forecast_type",
                "wire": "forecast_type"
            },
            {
                "name": "production_type",
                "wire": "production_type"
            },
            {
                "name": "start",
                "wire": "start"
            }
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
            "country": "de",
            "year": -1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "year"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "year",
                "wire": "year"
            }
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
            "country": "de"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            }
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
            "country": "de"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            }
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
            "country": "de",
            "year": -1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "year"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "year",
                "wire": "year"
            }
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
            "country": "de",
            "end": "",
            "start": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "start",
            "end"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "end",
                "wire": "end"
            },
            {
                "name": "start",
                "wire": "start"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "unix_seconds": [
                1
            ],
            "production_types": [
                {
                    "name": "x",
                    "data": [
                        1
                    ]
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
            "country": "de",
            "postal_code": ""
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "postal_code"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "postal_code",
                "wire": "postal_code"
            }
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
            "country": "de"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            }
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
            "country": "de",
            "year": -1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "year"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "year",
                "wire": "year"
            }
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
            "country": "de"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            }
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
            "country": "de",
            "year": -1
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "country",
            "year"
        ],
        "queryArgs": [
            {
                "name": "country",
                "wire": "country"
            },
            {
                "name": "year",
                "wire": "year"
            }
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
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map