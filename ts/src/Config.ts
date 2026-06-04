
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.energy-charts.info',

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      cross_border_model: {
      },

      daily_avg_dict: {
      },

      frequency: {
      },

      installed_model: {
      },

      price: {
      },

      production_model: {
      },

      public_power_forecast: {
      },

      ren_share_model: {
      },

      share_model: {
      },

      traffic_model: {
      },

    }
  }


  entity = {
    "cross_border_model": {
      "fields": [
        {
          "name": "country",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "deprecated",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 1
        },
        {
          "name": "unix_second",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "cross_border_model",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/cbet",
              "parts": [
                "cbet"
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/cbpf",
              "parts": [
                "cbpf"
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
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "day",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "deprecated",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "daily_avg_dict",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": -1,
                    "kind": "query",
                    "name": "year",
                    "orig": "year",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/ren_share_daily_avg",
              "parts": [
                "ren_share_daily_avg"
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": -1,
                    "kind": "query",
                    "name": "year",
                    "orig": "year",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/solar_share_daily_avg",
              "parts": [
                "solar_share_daily_avg"
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": -1,
                    "kind": "query",
                    "name": "year",
                    "orig": "year",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/wind_offshore_share_daily_avg",
              "parts": [
                "wind_offshore_share_daily_avg"
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
              "active": true,
              "index$": 2
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": -1,
                    "kind": "query",
                    "name": "year",
                    "orig": "year",
                    "reqd": false,
                    "type": "`$INTEGER`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/wind_onshore_share_daily_avg",
              "parts": [
                "wind_onshore_share_daily_avg"
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
              "active": true,
              "index$": 3
            }
          ],
          "input": "data",
          "key$": "list"
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
          "type": "`$ARRAY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "deprecated",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 1
        },
        {
          "name": "unix_second",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "frequency",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "DE-Freiburg",
                    "kind": "query",
                    "name": "region",
                    "orig": "region",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/frequency",
              "parts": [
                "frequency"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "last_update",
          "req": true,
          "type": "`$ANY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "production_type",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "time",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "installed_model",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": false,
                    "kind": "query",
                    "name": "installation_decommission",
                    "orig": "installation_decommission",
                    "reqd": false,
                    "type": "`$BOOLEAN`",
                    "active": true
                  },
                  {
                    "example": "yearly",
                    "kind": "query",
                    "name": "time_step",
                    "orig": "time_step",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/installed_power",
              "parts": [
                "installed_power"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "license_info",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "price",
          "req": false,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "unit",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "unix_second",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "price",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/price",
              "parts": [
                "price"
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
                "res": "`body`"
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "production_type",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "unix_second",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        }
      ],
      "name": "production_model",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "subtype",
                    "orig": "subtype",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/public_power",
              "parts": [
                "public_power"
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/total_power",
              "parts": [
                "total_power"
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
              "active": true,
              "index$": 1
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "forecast_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "forecast_value",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "production_type",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 3
        },
        {
          "name": "unix_second",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "public_power_forecast",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "current",
                    "kind": "query",
                    "name": "forecast_type",
                    "orig": "forecast_type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "solar",
                    "kind": "query",
                    "name": "production_type",
                    "orig": "production_type",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/public_power_forecast",
              "parts": [
                "public_power_forecast"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "ren_share",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "solar_share",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "substitute",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        },
        {
          "name": "unix_second",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 4
        },
        {
          "name": "wind_offshore_share",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 5
        },
        {
          "name": "wind_onshore_share",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 6
        }
      ],
      "name": "ren_share_model",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/ren_share_forecast",
              "parts": [
                "ren_share_forecast"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 0
        },
        {
          "name": "deprecated",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 1
        },
        {
          "name": "forecast",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "unix_second",
          "req": false,
          "type": "`$ANY`",
          "active": true,
          "index$": 3
        }
      ],
      "name": "share_model",
      "op": {
        "load": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/solar_share",
              "parts": [
                "solar_share"
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
              "active": true,
              "index$": 0
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/wind_offshore_share",
              "parts": [
                "wind_offshore_share"
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
              "active": true,
              "index$": 1
            },
            {
              "args": {
                "query": [
                  {
                    "example": "de",
                    "kind": "query",
                    "name": "country",
                    "orig": "country",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/wind_onshore_share",
              "parts": [
                "wind_onshore_share"
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
              "active": true,
              "index$": 2
            }
          ],
          "input": "data",
          "key$": "load"
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
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 0
        },
        {
          "name": "share",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 1
        },
        {
          "name": "signal",
          "req": false,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 2
        },
        {
          "name": "substitute",
          "req": true,
          "type": "`$BOOLEAN`",
          "active": true,
          "index$": 3
        },
        {
          "name": "unix_second",
          "req": true,
          "type": "`$ARRAY`",
          "active": true,
          "index$": 4
        }
      ],
      "name": "traffic_model",
      "op": {
        "list": {
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
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  },
                  {
                    "example": "",
                    "kind": "query",
                    "name": "postal_code",
                    "orig": "postal_code",
                    "reqd": false,
                    "type": "`$STRING`",
                    "active": true
                  }
                ]
              },
              "method": "GET",
              "orig": "/signal",
              "parts": [
                "signal"
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
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "list"
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
  config
}

