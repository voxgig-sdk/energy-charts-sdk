
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'EnergyCharts',
        slug: "energy-charts",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
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
 retry:     {
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
 test:     {
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
 timeout:     {
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

  }


  options = {
    base: "https://api.energy-charts.info",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        cbet: {
        },
  
        cbpf: {
        },
  
        frequency: {
        },
  
        installed_model: {
        },
  
        price: {
        },
  
        public_power: {
        },
  
        public_power_forecast: {
        },
  
        ren_share_daily_avg: {
        },
  
        ren_share_model: {
        },
  
        solar_share: {
        },
  
        solar_share_daily_avg: {
        },
  
        total_power: {
        },
  
        traffic_model: {
        },
  
        wind_offshore_share: {
        },
  
        wind_offshore_share_daily_avg: {
        },
  
        wind_onshore_share: {
        },
  
        wind_onshore_share_daily_avg: {
        },
  
    }
  }


  entity = {
    "cbet": {
      "fields": [
        {
          "name": "countries",
          "title": "Countries",
          "type": "`$ANY`"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "cbet",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/cbet",
              "segments": [
                {
                  "lit": "cbet"
                }
              ],
              "parts": [
                "cbet"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "end",
                  "start"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "cbpf": {
      "fields": [
        {
          "name": "countries",
          "title": "Countries",
          "type": "`$ANY`"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "cbpf",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/cbpf",
              "segments": [
                {
                  "lit": "cbpf"
                }
              ],
              "parts": [
                "cbpf"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "end",
                  "start"
                ]
              }
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
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
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
              "kind": "http",
              "method": "GET",
              "orig": "/frequency",
              "segments": [
                {
                  "lit": "frequency"
                }
              ],
              "parts": [
                "frequency"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "region",
                    "orig": "region",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "DE-Freiburg"
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "end",
                  "region",
                  "start"
                ]
              }
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
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "last_update",
          "title": "Last Update",
          "type": "`$ANY`",
          "req": true
        },
        {
          "name": "production_types",
          "title": "Production Types",
          "type": "`$ANY`"
        },
        {
          "name": "time",
          "title": "Time",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "name": "installed_model",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/installed_power",
              "segments": [
                {
                  "lit": "installed_power"
                }
              ],
              "parts": [
                "installed_power"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "installation_decommission",
                    "orig": "installation_decommission",
                    "type": "`$BOOLEAN`",
                    "kind": "query",
                    "example": false
                  },
                  {
                    "name": "time_step",
                    "orig": "time_step",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "yearly"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "installation_decommission",
                  "time_step"
                ]
              }
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
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "license_info",
          "title": "License Info",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "price",
          "title": "Price",
          "type": "`$NUMBER`"
        },
        {
          "name": "unit",
          "title": "Unit",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
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
              "kind": "http",
              "method": "GET",
              "orig": "/price",
              "segments": [
                {
                  "lit": "price"
                }
              ],
              "parts": [
                "price"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "bzn",
                    "orig": "bzn",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "DE-LU"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "bzn",
                  "end",
                  "start"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "public_power": {
      "fields": [
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "production_types",
          "title": "Production Types",
          "type": "`$ANY`"
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "public_power",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public_power",
              "segments": [
                {
                  "lit": "public_power"
                }
              ],
              "parts": [
                "public_power"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "subtype",
                    "orig": "subtype",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "end",
                  "start",
                  "subtype"
                ]
              }
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
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "forecast_type",
          "title": "Forecast Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "forecast_values",
          "title": "Forecast Values",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "production_type",
          "title": "Production Type",
          "type": "`$STRING`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "name": "public_power_forecast",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/public_power_forecast",
              "segments": [
                {
                  "lit": "public_power_forecast"
                }
              ],
              "parts": [
                "public_power_forecast"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "forecast_type",
                    "orig": "forecast_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "current"
                  },
                  {
                    "name": "production_type",
                    "orig": "production_type",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "solar"
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "end",
                  "forecast_type",
                  "production_type",
                  "start"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "ren_share_daily_avg": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of average daily values"
        },
        {
          "name": "days",
          "title": "Days",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of days in the format dd.mm.yyyy"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "ren_share_daily_avg",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/ren_share_daily_avg",
              "segments": [
                {
                  "lit": "ren_share_daily_avg"
                }
              ],
              "parts": [
                "ren_share_daily_avg"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": -1
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "year"
                ]
              }
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
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "ren_share",
          "title": "Ren Share",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "solar_share",
          "title": "Solar Share",
          "type": "`$ANY`"
        },
        {
          "name": "substitute",
          "title": "Substitute",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "wind_offshore_share",
          "title": "Wind Offshore Share",
          "type": "`$ANY`"
        },
        {
          "name": "wind_onshore_share",
          "title": "Wind Onshore Share",
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
              "kind": "http",
              "method": "GET",
              "orig": "/ren_share_forecast",
              "segments": [
                {
                  "lit": "ren_share_forecast"
                }
              ],
              "parts": [
                "ren_share_forecast"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "solar_share": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ANY`"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "forecast",
          "title": "Forecast",
          "type": "`$ANY`"
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "solar_share",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/solar_share",
              "segments": [
                {
                  "lit": "solar_share"
                }
              ],
              "parts": [
                "solar_share"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "solar_share_daily_avg": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of average daily values"
        },
        {
          "name": "days",
          "title": "Days",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of days in the format dd.mm.yyyy"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "solar_share_daily_avg",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/solar_share_daily_avg",
              "segments": [
                {
                  "lit": "solar_share_daily_avg"
                }
              ],
              "parts": [
                "solar_share_daily_avg"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": -1
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "year"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "total_power": {
      "fields": [
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "production_types",
          "title": "Production Types",
          "type": "`$ANY`"
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "total_power",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/total_power",
              "segments": [
                {
                  "lit": "total_power"
                }
              ],
              "parts": [
                "total_power"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "end",
                    "orig": "end",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  },
                  {
                    "name": "start",
                    "orig": "start",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "end",
                  "start"
                ]
              }
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
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "share",
          "title": "Share",
          "type": "`$ARRAY`",
          "req": true
        },
        {
          "name": "signal",
          "title": "Signal",
          "type": "`$ARRAY`",
          "short": "0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)"
        },
        {
          "name": "substitute",
          "title": "Substitute",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ARRAY`",
          "req": true
        }
      ],
      "name": "traffic_model",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/signal",
              "segments": [
                {
                  "lit": "signal"
                }
              ],
              "parts": [
                "signal"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "postal_code",
                    "orig": "postal_code",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": ""
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "postal_code"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wind_offshore_share": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ANY`"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "forecast",
          "title": "Forecast",
          "type": "`$ANY`"
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "wind_offshore_share",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/wind_offshore_share",
              "segments": [
                {
                  "lit": "wind_offshore_share"
                }
              ],
              "parts": [
                "wind_offshore_share"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wind_offshore_share_daily_avg": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of average daily values"
        },
        {
          "name": "days",
          "title": "Days",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of days in the format dd.mm.yyyy"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "wind_offshore_share_daily_avg",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/wind_offshore_share_daily_avg",
              "segments": [
                {
                  "lit": "wind_offshore_share_daily_avg"
                }
              ],
              "parts": [
                "wind_offshore_share_daily_avg"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": -1
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "year"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wind_onshore_share": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ANY`"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        },
        {
          "name": "forecast",
          "title": "Forecast",
          "type": "`$ANY`"
        },
        {
          "name": "unix_seconds",
          "title": "Unix Seconds",
          "type": "`$ANY`"
        }
      ],
      "name": "wind_onshore_share",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/wind_onshore_share",
              "segments": [
                {
                  "lit": "wind_onshore_share"
                }
              ],
              "parts": [
                "wind_onshore_share"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  }
                ]
              },
              "select": {
                "exist": [
                  "country"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "wind_onshore_share_daily_avg": {
      "fields": [
        {
          "name": "data",
          "title": "Data",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of average daily values"
        },
        {
          "name": "days",
          "title": "Days",
          "type": "`$ARRAY`",
          "req": true,
          "short": "List of days in the format dd.mm.yyyy"
        },
        {
          "name": "deprecated",
          "title": "Deprecated",
          "type": "`$BOOLEAN`",
          "req": true
        }
      ],
      "name": "wind_onshore_share_daily_avg",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/wind_onshore_share_daily_avg",
              "segments": [
                {
                  "lit": "wind_onshore_share_daily_avg"
                }
              ],
              "parts": [
                "wind_onshore_share_daily_avg"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "query": [
                  {
                    "name": "country",
                    "orig": "country",
                    "type": "`$STRING`",
                    "kind": "query",
                    "example": "de"
                  },
                  {
                    "name": "year",
                    "orig": "year",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": -1
                  }
                ]
              },
              "select": {
                "exist": [
                  "country",
                  "year"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

