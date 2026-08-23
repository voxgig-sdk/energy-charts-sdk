package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "EnergyCharts",
			"slug": "energy-charts",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.energy-charts.info",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cross_border_model": map[string]any{},
				"daily_avg_dict": map[string]any{},
				"frequency": map[string]any{},
				"installed_model": map[string]any{},
				"price": map[string]any{},
				"production_model": map[string]any{},
				"public_power_forecast": map[string]any{},
				"ren_share_model": map[string]any{},
				"share_model": map[string]any{},
				"traffic_model": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cross_border_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countries",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "unix_seconds",
						"type": "`$ANY`",
					},
				},
				"name": "cross_border_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cbet",
								"parts": []any{
									"cbet",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/cbpf",
								"parts": []any{
									"cbpf",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"daily_avg_dict": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"req": true,
						"short": "List of average daily values",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "days",
						"req": true,
						"short": "List of days in the format dd.mm.yyyy",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
				},
				"name": "daily_avg_dict",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ren_share_daily_avg",
								"parts": []any{
									"ren_share_daily_avg",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/solar_share_daily_avg",
								"parts": []any{
									"solar_share_daily_avg",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/wind_offshore_share_daily_avg",
								"parts": []any{
									"wind_offshore_share_daily_avg",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/wind_onshore_share_daily_avg",
								"parts": []any{
									"wind_onshore_share_daily_avg",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"year",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"frequency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "unix_seconds",
						"type": "`$ANY`",
					},
				},
				"name": "frequency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "DE-Freiburg",
											"kind": "query",
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/frequency",
								"parts": []any{
									"frequency",
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"region",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"installed_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "last_update",
						"req": true,
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "production_types",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "time",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "installed_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": false,
											"kind": "query",
											"name": "installation_decommission",
											"orig": "installation_decommission",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": "yearly",
											"kind": "query",
											"name": "time_step",
											"orig": "time_step",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/installed_power",
								"parts": []any{
									"installed_power",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"installation_decommission",
										"time_step",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "license_info",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "unit",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unix_seconds",
						"type": "`$ANY`",
					},
				},
				"name": "price",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "DE-LU",
											"kind": "query",
											"name": "bzn",
											"orig": "bzn",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/price",
								"parts": []any{
									"price",
								},
								"select": map[string]any{
									"exist": []any{
										"bzn",
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.price`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"production_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "production_types",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"type": "`$ANY`",
					},
				},
				"name": "production_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "subtype",
											"orig": "subtype",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public_power",
								"parts": []any{
									"public_power",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"end",
										"start",
										"subtype",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/total_power",
								"parts": []any{
									"total_power",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"end",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_power_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "forecast_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "forecast_values",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "production_type",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unix_seconds",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "public_power_forecast",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "current",
											"kind": "query",
											"name": "forecast_type",
											"orig": "forecast_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "solar",
											"kind": "query",
											"name": "production_type",
											"orig": "production_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/public_power_forecast",
								"parts": []any{
									"public_power_forecast",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"end",
										"forecast_type",
										"production_type",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ren_share_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "ren_share",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "solar_share",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "substitute",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "unix_seconds",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "wind_offshore_share",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "wind_onshore_share",
						"type": "`$ANY`",
					},
				},
				"name": "ren_share_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/ren_share_forecast",
								"parts": []any{
									"ren_share_forecast",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"share_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "forecast",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"type": "`$ANY`",
					},
				},
				"name": "share_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/solar_share",
								"parts": []any{
									"solar_share",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/wind_offshore_share",
								"parts": []any{
									"wind_offshore_share",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/wind_onshore_share",
								"parts": []any{
									"wind_onshore_share",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"traffic_model": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "share",
						"req": true,
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "signal",
						"short": "0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "substitute",
						"req": true,
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "unix_seconds",
						"req": true,
						"type": "`$ARRAY`",
					},
				},
				"name": "traffic_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "",
											"kind": "query",
											"name": "postal_code",
											"orig": "postal_code",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/signal",
								"parts": []any{
									"signal",
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"postal_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
