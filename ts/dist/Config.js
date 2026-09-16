"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'EnergyCharts',
        slug: "energy-charts",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.energy-charts.info",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            cross_border_model: {},
            daily_avg_dict: {},
            frequency: {},
            installed_model: {},
            price: {},
            production_model: {},
            public_power_forecast: {},
            ren_share_model: {},
            share_model: {},
            traffic_model: {},
        }
    };
    entity = {
        "cross_border_model": {
            "fields": [
                {
                    "name": "countries",
                    "type": "`$ANY`"
                },
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "unix_seconds",
                    "type": "`$ANY`"
                }
            ],
            "name": "cross_border_model",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cbet",
                            "segments": [
                                {
                                    "lit": "cbet"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "end",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cbet"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cbpf",
                            "segments": [
                                {
                                    "lit": "cbpf"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "end",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "cbpf"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "daily_avg_dict": {
            "fields": [
                {
                    "name": "data",
                    "req": true,
                    "short": "List of average daily values",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "days",
                    "req": true,
                    "short": "List of days in the format dd.mm.yyyy",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "daily_avg_dict",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -1,
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ren_share_daily_avg",
                            "segments": [
                                {
                                    "lit": "ren_share_daily_avg"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "ren_share_daily_avg"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -1,
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/solar_share_daily_avg",
                            "segments": [
                                {
                                    "lit": "solar_share_daily_avg"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "solar_share_daily_avg"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -1,
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/wind_offshore_share_daily_avg",
                            "segments": [
                                {
                                    "lit": "wind_offshore_share_daily_avg"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "wind_offshore_share_daily_avg"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": -1,
                                        "kind": "query",
                                        "name": "year",
                                        "orig": "year",
                                        "type": "`$INTEGER`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/wind_onshore_share_daily_avg",
                            "segments": [
                                {
                                    "lit": "wind_onshore_share_daily_avg"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "year"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "wind_onshore_share_daily_avg"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "frequency": {
            "fields": [
                {
                    "name": "data",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "unix_seconds",
                    "type": "`$ANY`"
                }
            ],
            "name": "frequency",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "DE-Freiburg",
                                        "kind": "query",
                                        "name": "region",
                                        "orig": "region",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/frequency",
                            "segments": [
                                {
                                    "lit": "frequency"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "end",
                                    "region",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "frequency"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "installed_model": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "last_update",
                    "req": true,
                    "type": "`$ANY`"
                },
                {
                    "name": "production_types",
                    "type": "`$ANY`"
                },
                {
                    "name": "time",
                    "req": true,
                    "type": "`$ARRAY`"
                }
            ],
            "name": "installed_model",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": false,
                                        "kind": "query",
                                        "name": "installation_decommission",
                                        "orig": "installation_decommission",
                                        "type": "`$BOOLEAN`"
                                    },
                                    {
                                        "example": "yearly",
                                        "kind": "query",
                                        "name": "time_step",
                                        "orig": "time_step",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/installed_power",
                            "segments": [
                                {
                                    "lit": "installed_power"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "installation_decommission",
                                    "time_step"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "installed_power"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "price": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "license_info",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "price",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "unit",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "unix_seconds",
                    "type": "`$ANY`"
                }
            ],
            "name": "price",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "DE-LU",
                                        "kind": "query",
                                        "name": "bzn",
                                        "orig": "bzn",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/price",
                            "segments": [
                                {
                                    "lit": "price"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "bzn",
                                    "end",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.price`"
                            },
                            "parts": [
                                "price"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "production_model": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "production_types",
                    "type": "`$ANY`"
                },
                {
                    "name": "unix_seconds",
                    "type": "`$ANY`"
                }
            ],
            "name": "production_model",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "subtype",
                                        "orig": "subtype",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public_power",
                            "segments": [
                                {
                                    "lit": "public_power"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "end",
                                    "start",
                                    "subtype"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "public_power"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/total_power",
                            "segments": [
                                {
                                    "lit": "total_power"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "end",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "total_power"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "public_power_forecast": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "forecast_type",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "forecast_values",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "production_type",
                    "req": true,
                    "type": "`$STRING`"
                },
                {
                    "name": "unix_seconds",
                    "req": true,
                    "type": "`$ARRAY`"
                }
            ],
            "name": "public_power_forecast",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "end",
                                        "orig": "end",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "current",
                                        "kind": "query",
                                        "name": "forecast_type",
                                        "orig": "forecast_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "solar",
                                        "kind": "query",
                                        "name": "production_type",
                                        "orig": "production_type",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "start",
                                        "orig": "start",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/public_power_forecast",
                            "segments": [
                                {
                                    "lit": "public_power_forecast"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "end",
                                    "forecast_type",
                                    "production_type",
                                    "start"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "public_power_forecast"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "ren_share_model": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "ren_share",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "solar_share",
                    "type": "`$ANY`"
                },
                {
                    "name": "substitute",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "unix_seconds",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "wind_offshore_share",
                    "type": "`$ANY`"
                },
                {
                    "name": "wind_onshore_share",
                    "type": "`$ANY`"
                }
            ],
            "name": "ren_share_model",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/ren_share_forecast",
                            "segments": [
                                {
                                    "lit": "ren_share_forecast"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "ren_share_forecast"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "share_model": {
            "fields": [
                {
                    "name": "data",
                    "type": "`$ANY`"
                },
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "forecast",
                    "type": "`$ANY`"
                },
                {
                    "name": "unix_seconds",
                    "type": "`$ANY`"
                }
            ],
            "name": "share_model",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/solar_share",
                            "segments": [
                                {
                                    "lit": "solar_share"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "solar_share"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/wind_offshore_share",
                            "segments": [
                                {
                                    "lit": "wind_offshore_share"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "wind_offshore_share"
                            ]
                        },
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/wind_onshore_share",
                            "segments": [
                                {
                                    "lit": "wind_onshore_share"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "wind_onshore_share"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "traffic_model": {
            "fields": [
                {
                    "name": "deprecated",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "share",
                    "req": true,
                    "type": "`$ARRAY`"
                },
                {
                    "name": "signal",
                    "short": "0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "substitute",
                    "req": true,
                    "type": "`$BOOLEAN`"
                },
                {
                    "name": "unix_seconds",
                    "req": true,
                    "type": "`$ARRAY`"
                }
            ],
            "name": "traffic_model",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {
                                "query": [
                                    {
                                        "example": "de",
                                        "kind": "query",
                                        "name": "country",
                                        "orig": "country",
                                        "type": "`$STRING`"
                                    },
                                    {
                                        "example": "",
                                        "kind": "query",
                                        "name": "postal_code",
                                        "orig": "postal_code",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/signal",
                            "segments": [
                                {
                                    "lit": "signal"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "country",
                                    "postal_code"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "signal"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map