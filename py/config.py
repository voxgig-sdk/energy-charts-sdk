# EnergyCharts SDK configuration


def make_config():
    return {
        "main": {
            "name": "EnergyCharts",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.energy-charts.info",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "cross_border_model": {},
                "daily_avg_dict": {},
                "frequency": {},
                "installed_model": {},
                "price": {},
                "production_model": {},
                "public_power_forecast": {},
                "ren_share_model": {},
                "share_model": {},
                "traffic_model": {},
            },
        },
        "entity": {
      "cross_border_model": {
        "fields": [
          {
            "active": True,
            "name": "country",
            "req": False,
            "type": "`$ANY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
        ],
        "name": "cross_border_model",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cbet",
                "parts": [
                  "cbet",
                ],
                "select": {
                  "exist": [
                    "country",
                    "end",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/cbpf",
                "parts": [
                  "cbpf",
                ],
                "select": {
                  "exist": [
                    "country",
                    "end",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "daily_avg_dict": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "day",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 2,
          },
        ],
        "name": "daily_avg_dict",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -1,
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ren_share_daily_avg",
                "parts": [
                  "ren_share_daily_avg",
                ],
                "select": {
                  "exist": [
                    "country",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -1,
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/solar_share_daily_avg",
                "parts": [
                  "solar_share_daily_avg",
                ],
                "select": {
                  "exist": [
                    "country",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -1,
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/wind_offshore_share_daily_avg",
                "parts": [
                  "wind_offshore_share_daily_avg",
                ],
                "select": {
                  "exist": [
                    "country",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": -1,
                      "kind": "query",
                      "name": "year",
                      "orig": "year",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/wind_onshore_share_daily_avg",
                "parts": [
                  "wind_onshore_share_daily_avg",
                ],
                "select": {
                  "exist": [
                    "country",
                    "year",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 3,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "frequency": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
        ],
        "name": "frequency",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "DE-Freiburg",
                      "kind": "query",
                      "name": "region",
                      "orig": "region",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/frequency",
                "parts": [
                  "frequency",
                ],
                "select": {
                  "exist": [
                    "end",
                    "region",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "installed_model": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "last_update",
            "req": True,
            "type": "`$ANY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "production_type",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "time",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 3,
          },
        ],
        "name": "installed_model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": False,
                      "kind": "query",
                      "name": "installation_decommission",
                      "orig": "installation_decommission",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": "yearly",
                      "kind": "query",
                      "name": "time_step",
                      "orig": "time_step",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/installed_power",
                "parts": [
                  "installed_power",
                ],
                "select": {
                  "exist": [
                    "country",
                    "installation_decommission",
                    "time_step",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "price": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "license_info",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "price",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "unit",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": False,
            "type": "`$ANY`",
            "index$": 4,
          },
        ],
        "name": "price",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "DE-LU",
                      "kind": "query",
                      "name": "bzn",
                      "orig": "bzn",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/price",
                "parts": [
                  "price",
                ],
                "select": {
                  "exist": [
                    "bzn",
                    "end",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.price`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "production_model": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "production_type",
            "req": False,
            "type": "`$ANY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
        ],
        "name": "production_model",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "subtype",
                      "orig": "subtype",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public_power",
                "parts": [
                  "public_power",
                ],
                "select": {
                  "exist": [
                    "country",
                    "end",
                    "start",
                    "subtype",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/total_power",
                "parts": [
                  "total_power",
                ],
                "select": {
                  "exist": [
                    "country",
                    "end",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "public_power_forecast": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "forecast_type",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "forecast_value",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "production_type",
            "req": True,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 4,
          },
        ],
        "name": "public_power_forecast",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "end",
                      "orig": "end",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "current",
                      "kind": "query",
                      "name": "forecast_type",
                      "orig": "forecast_type",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "solar",
                      "kind": "query",
                      "name": "production_type",
                      "orig": "production_type",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/public_power_forecast",
                "parts": [
                  "public_power_forecast",
                ],
                "select": {
                  "exist": [
                    "country",
                    "end",
                    "forecast_type",
                    "production_type",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "ren_share_model": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "ren_share",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "solar_share",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "substitute",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "wind_offshore_share",
            "req": False,
            "type": "`$ANY`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "wind_onshore_share",
            "req": False,
            "type": "`$ANY`",
            "index$": 6,
          },
        ],
        "name": "ren_share_model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/ren_share_forecast",
                "parts": [
                  "ren_share_forecast",
                ],
                "select": {
                  "exist": [
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "share_model": {
        "fields": [
          {
            "active": True,
            "name": "data",
            "req": False,
            "type": "`$ANY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "forecast",
            "req": False,
            "type": "`$ANY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": False,
            "type": "`$ANY`",
            "index$": 3,
          },
        ],
        "name": "share_model",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/solar_share",
                "parts": [
                  "solar_share",
                ],
                "select": {
                  "exist": [
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/wind_offshore_share",
                "parts": [
                  "wind_offshore_share",
                ],
                "select": {
                  "exist": [
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/wind_onshore_share",
                "parts": [
                  "wind_onshore_share",
                ],
                "select": {
                  "exist": [
                    "country",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "traffic_model": {
        "fields": [
          {
            "active": True,
            "name": "deprecated",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "share",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "signal",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "substitute",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "unix_second",
            "req": True,
            "type": "`$ARRAY`",
            "index$": 4,
          },
        ],
        "name": "traffic_model",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "de",
                      "kind": "query",
                      "name": "country",
                      "orig": "country",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "",
                      "kind": "query",
                      "name": "postal_code",
                      "orig": "postal_code",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/signal",
                "parts": [
                  "signal",
                ],
                "select": {
                  "exist": [
                    "country",
                    "postal_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
