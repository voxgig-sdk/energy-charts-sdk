<?php
declare(strict_types=1);

// EnergyCharts SDK configuration

class EnergyChartsConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "EnergyCharts",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.energy-charts.info",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "cross_border_model" => [],
                    "daily_avg_dict" => [],
                    "frequency" => [],
                    "installed_model" => [],
                    "price" => [],
                    "production_model" => [],
                    "public_power_forecast" => [],
                    "ren_share_model" => [],
                    "share_model" => [],
                    "traffic_model" => [],
                ],
            ],
            "entity" => [
        'cross_border_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'country',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
          ],
          'name' => 'cross_border_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/cbet',
                  'parts' => [
                    'cbet',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/cbpf',
                  'parts' => [
                    'cbpf',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'daily_avg_dict' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'data',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'day',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 2,
            ],
          ],
          'name' => 'daily_avg_dict',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/ren_share_daily_avg',
                  'parts' => [
                    'ren_share_daily_avg',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/solar_share_daily_avg',
                  'parts' => [
                    'solar_share_daily_avg',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/wind_offshore_share_daily_avg',
                  'parts' => [
                    'wind_offshore_share_daily_avg',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 2,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/wind_onshore_share_daily_avg',
                  'parts' => [
                    'wind_onshore_share_daily_avg',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'year',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 3,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'frequency' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'data',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
          ],
          'name' => 'frequency',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'DE-Freiburg',
                        'kind' => 'query',
                        'name' => 'region',
                        'orig' => 'region',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/frequency',
                  'parts' => [
                    'frequency',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'region',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'installed_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'last_update',
              'req' => true,
              'type' => '`$ANY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'production_type',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'time',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 3,
            ],
          ],
          'name' => 'installed_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'installation_decommission',
                        'orig' => 'installation_decommission',
                        'reqd' => false,
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'active' => true,
                        'example' => 'yearly',
                        'kind' => 'query',
                        'name' => 'time_step',
                        'orig' => 'time_step',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/installed_power',
                  'parts' => [
                    'installed_power',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'installation_decommission',
                      'time_step',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'price' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'license_info',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'price',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'unit',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 4,
            ],
          ],
          'name' => 'price',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'DE-LU',
                        'kind' => 'query',
                        'name' => 'bzn',
                        'orig' => 'bzn',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/price',
                  'parts' => [
                    'price',
                  ],
                  'select' => [
                    'exist' => [
                      'bzn',
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.price`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'production_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'production_type',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
          ],
          'name' => 'production_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'subtype',
                        'orig' => 'subtype',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/public_power',
                  'parts' => [
                    'public_power',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'end',
                      'start',
                      'subtype',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/total_power',
                  'parts' => [
                    'total_power',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'end',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'public_power_forecast' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'forecast_type',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'forecast_value',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'production_type',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
          ],
          'name' => 'public_power_forecast',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'current',
                        'kind' => 'query',
                        'name' => 'forecast_type',
                        'orig' => 'forecast_type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'solar',
                        'kind' => 'query',
                        'name' => 'production_type',
                        'orig' => 'production_type',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/public_power_forecast',
                  'parts' => [
                    'public_power_forecast',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'end',
                      'forecast_type',
                      'production_type',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ren_share_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'ren_share',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'solar_share',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'substitute',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'wind_offshore_share',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'wind_onshore_share',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 6,
            ],
          ],
          'name' => 'ren_share_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/ren_share_forecast',
                  'parts' => [
                    'ren_share_forecast',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'share_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'data',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'forecast',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => false,
              'type' => '`$ANY`',
              'index$' => 3,
            ],
          ],
          'name' => 'share_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/solar_share',
                  'parts' => [
                    'solar_share',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/wind_offshore_share',
                  'parts' => [
                    'wind_offshore_share',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/wind_onshore_share',
                  'parts' => [
                    'wind_onshore_share',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 2,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'traffic_model' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'share',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'signal',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'substitute',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'unix_second',
              'req' => true,
              'type' => '`$ARRAY`',
              'index$' => 4,
            ],
          ],
          'name' => 'traffic_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/signal',
                  'parts' => [
                    'signal',
                  ],
                  'select' => [
                    'exist' => [
                      'country',
                      'postal_code',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return EnergyChartsFeatures::make_feature($name);
    }
}
