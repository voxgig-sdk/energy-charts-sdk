package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "EnergyCharts",
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
						"active": true,
						"name": "country",
						"req": false,
						"type": "`$ANY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
				},
				"name": "cross_border_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"daily_avg_dict": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "day",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 2,
					},
				},
				"name": "daily_avg_dict",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 2,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": -1,
											"kind": "query",
											"name": "year",
											"orig": "year",
											"reqd": false,
											"type": "`$INTEGER`",
										},
									},
								},
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
								"index$": 3,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"frequency": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
				},
				"name": "frequency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "DE-Freiburg",
											"kind": "query",
											"name": "region",
											"orig": "region",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"installed_model": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "last_update",
						"req": true,
						"type": "`$ANY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "production_type",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "time",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 3,
					},
				},
				"name": "installed_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": false,
											"kind": "query",
											"name": "installation_decommission",
											"orig": "installation_decommission",
											"reqd": false,
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"active": true,
											"example": "yearly",
											"kind": "query",
											"name": "time_step",
											"orig": "time_step",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"price": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "license_info",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "price",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "unit",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": false,
						"type": "`$ANY`",
						"index$": 4,
					},
				},
				"name": "price",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "DE-LU",
											"kind": "query",
											"name": "bzn",
											"orig": "bzn",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"production_model": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "production_type",
						"req": false,
						"type": "`$ANY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
				},
				"name": "production_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "subtype",
											"orig": "subtype",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public_power_forecast": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "forecast_type",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "forecast_value",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "production_type",
						"req": true,
						"type": "`$STRING`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 4,
					},
				},
				"name": "public_power_forecast",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "current",
											"kind": "query",
											"name": "forecast_type",
											"orig": "forecast_type",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "solar",
											"kind": "query",
											"name": "production_type",
											"orig": "production_type",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"ren_share_model": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "ren_share",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "solar_share",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "substitute",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 4,
					},
					map[string]any{
						"active": true,
						"name": "wind_offshore_share",
						"req": false,
						"type": "`$ANY`",
						"index$": 5,
					},
					map[string]any{
						"active": true,
						"name": "wind_onshore_share",
						"req": false,
						"type": "`$ANY`",
						"index$": 6,
					},
				},
				"name": "ren_share_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"share_model": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "data",
						"req": false,
						"type": "`$ANY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "forecast",
						"req": false,
						"type": "`$ANY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": false,
						"type": "`$ANY`",
						"index$": 3,
					},
				},
				"name": "share_model",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 1,
							},
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 2,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"traffic_model": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "deprecated",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "share",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "signal",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "substitute",
						"req": true,
						"type": "`$BOOLEAN`",
						"index$": 3,
					},
					map[string]any{
						"active": true,
						"name": "unix_second",
						"req": true,
						"type": "`$ARRAY`",
						"index$": 4,
					},
				},
				"name": "traffic_model",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "de",
											"kind": "query",
											"name": "country",
											"orig": "country",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "",
											"kind": "query",
											"name": "postal_code",
											"orig": "postal_code",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
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
								"index$": 0,
							},
						},
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
