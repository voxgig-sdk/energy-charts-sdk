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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.energy-charts.info",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cbet": map[string]any{},
				"cbpf": map[string]any{},
				"frequency": map[string]any{},
				"installed_model": map[string]any{},
				"price": map[string]any{},
				"public_power": map[string]any{},
				"public_power_forecast": map[string]any{},
				"ren_share_daily_avg": map[string]any{},
				"ren_share_model": map[string]any{},
				"solar_share": map[string]any{},
				"solar_share_daily_avg": map[string]any{},
				"total_power": map[string]any{},
				"traffic_model": map[string]any{},
				"wind_offshore_share": map[string]any{},
				"wind_offshore_share_daily_avg": map[string]any{},
				"wind_onshore_share": map[string]any{},
				"wind_onshore_share_daily_avg": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cbet": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countries",
						"title": "Countries",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "cbet",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cbet",
								"segments": []any{
									map[string]any{
										"lit": "cbet",
									},
								},
								"parts": []any{
									"cbet",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"cbpf": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "countries",
						"title": "Countries",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "cbpf",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/cbpf",
								"segments": []any{
									map[string]any{
										"lit": "cbpf",
									},
								},
								"parts": []any{
									"cbpf",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
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
								"kind": "http",
								"method": "GET",
								"orig": "/frequency",
								"segments": []any{
									map[string]any{
										"lit": "frequency",
									},
								},
								"parts": []any{
									"frequency",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "region",
											"orig": "region",
											"type": "`$STRING`",
											"kind": "query",
											"example": "DE-Freiburg",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "last_update",
						"title": "Last Update",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "production_types",
						"title": "Production Types",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "time",
						"title": "Time",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "installed_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/installed_power",
								"segments": []any{
									map[string]any{
										"lit": "installed_power",
									},
								},
								"parts": []any{
									"installed_power",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "installation_decommission",
											"orig": "installation_decommission",
											"type": "`$BOOLEAN`",
											"kind": "query",
											"example": false,
										},
										map[string]any{
											"name": "time_step",
											"orig": "time_step",
											"type": "`$STRING`",
											"kind": "query",
											"example": "yearly",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "license_info",
						"title": "License Info",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "unit",
						"title": "Unit",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
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
								"kind": "http",
								"method": "GET",
								"orig": "/price",
								"segments": []any{
									map[string]any{
										"lit": "price",
									},
								},
								"parts": []any{
									"price",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "bzn",
											"orig": "bzn",
											"type": "`$STRING`",
											"kind": "query",
											"example": "DE-LU",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_power": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "production_types",
						"title": "Production Types",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "public_power",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public_power",
								"segments": []any{
									map[string]any{
										"lit": "public_power",
									},
								},
								"parts": []any{
									"public_power",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "subtype",
											"orig": "subtype",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "forecast_type",
						"title": "Forecast Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "forecast_values",
						"title": "Forecast Values",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "production_type",
						"title": "Production Type",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "public_power_forecast",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/public_power_forecast",
								"segments": []any{
									map[string]any{
										"lit": "public_power_forecast",
									},
								},
								"parts": []any{
									"public_power_forecast",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "forecast_type",
											"orig": "forecast_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "current",
											"field": true,
										},
										map[string]any{
											"name": "production_type",
											"orig": "production_type",
											"type": "`$STRING`",
											"kind": "query",
											"example": "solar",
											"field": true,
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ren_share_daily_avg": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of average daily values",
					},
					map[string]any{
						"name": "days",
						"title": "Days",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of days in the format dd.mm.yyyy",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "ren_share_daily_avg",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ren_share_daily_avg",
								"segments": []any{
									map[string]any{
										"lit": "ren_share_daily_avg",
									},
								},
								"parts": []any{
									"ren_share_daily_avg",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": -1,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "ren_share",
						"title": "Ren Share",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "solar_share",
						"title": "Solar Share",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "substitute",
						"title": "Substitute",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "wind_offshore_share",
						"title": "Wind Offshore Share",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "wind_onshore_share",
						"title": "Wind Onshore Share",
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
								"kind": "http",
								"method": "GET",
								"orig": "/ren_share_forecast",
								"segments": []any{
									map[string]any{
										"lit": "ren_share_forecast",
									},
								},
								"parts": []any{
									"ren_share_forecast",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"solar_share": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "forecast",
						"title": "Forecast",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "solar_share",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/solar_share",
								"segments": []any{
									map[string]any{
										"lit": "solar_share",
									},
								},
								"parts": []any{
									"solar_share",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"solar_share_daily_avg": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of average daily values",
					},
					map[string]any{
						"name": "days",
						"title": "Days",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of days in the format dd.mm.yyyy",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "solar_share_daily_avg",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/solar_share_daily_avg",
								"segments": []any{
									map[string]any{
										"lit": "solar_share_daily_avg",
									},
								},
								"parts": []any{
									"solar_share_daily_avg",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": -1,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"total_power": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "production_types",
						"title": "Production Types",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "total_power",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/total_power",
								"segments": []any{
									map[string]any{
										"lit": "total_power",
									},
								},
								"parts": []any{
									"total_power",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "end",
											"orig": "end",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
										map[string]any{
											"name": "start",
											"orig": "start",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "share",
						"title": "Share",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "signal",
						"title": "Signal",
						"type": "`$ARRAY`",
						"short": "0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)",
					},
					map[string]any{
						"name": "substitute",
						"title": "Substitute",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "traffic_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/signal",
								"segments": []any{
									map[string]any{
										"lit": "signal",
									},
								},
								"parts": []any{
									"signal",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "postal_code",
											"orig": "postal_code",
											"type": "`$STRING`",
											"kind": "query",
											"example": "",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wind_offshore_share": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "forecast",
						"title": "Forecast",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "wind_offshore_share",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/wind_offshore_share",
								"segments": []any{
									map[string]any{
										"lit": "wind_offshore_share",
									},
								},
								"parts": []any{
									"wind_offshore_share",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wind_offshore_share_daily_avg": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of average daily values",
					},
					map[string]any{
						"name": "days",
						"title": "Days",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of days in the format dd.mm.yyyy",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "wind_offshore_share_daily_avg",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/wind_offshore_share_daily_avg",
								"segments": []any{
									map[string]any{
										"lit": "wind_offshore_share_daily_avg",
									},
								},
								"parts": []any{
									"wind_offshore_share_daily_avg",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": -1,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wind_onshore_share": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
					map[string]any{
						"name": "forecast",
						"title": "Forecast",
						"type": "`$ANY`",
					},
					map[string]any{
						"name": "unix_seconds",
						"title": "Unix Seconds",
						"type": "`$ANY`",
					},
				},
				"name": "wind_onshore_share",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/wind_onshore_share",
								"segments": []any{
									map[string]any{
										"lit": "wind_onshore_share",
									},
								},
								"parts": []any{
									"wind_onshore_share",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"wind_onshore_share_daily_avg": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "data",
						"title": "Data",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of average daily values",
					},
					map[string]any{
						"name": "days",
						"title": "Days",
						"type": "`$ARRAY`",
						"req": true,
						"short": "List of days in the format dd.mm.yyyy",
					},
					map[string]any{
						"name": "deprecated",
						"title": "Deprecated",
						"type": "`$BOOLEAN`",
						"req": true,
					},
				},
				"name": "wind_onshore_share_daily_avg",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/wind_onshore_share_daily_avg",
								"segments": []any{
									map[string]any{
										"lit": "wind_onshore_share_daily_avg",
									},
								},
								"parts": []any{
									"wind_onshore_share_daily_avg",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "query",
											"example": "de",
										},
										map[string]any{
											"name": "year",
											"orig": "year",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": -1,
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
