<?php
declare(strict_types=1);

// EnergyCharts SDK configuration

class EnergyChartsConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
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
              'name' => 'countries',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'unix_seconds',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'cross_border_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'daily_avg_dict' => [
          'fields' => [
            [
              'name' => 'data',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'days',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'daily_avg_dict',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => -1,
                        'kind' => 'query',
                        'name' => 'year',
                        'orig' => 'year',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'frequency' => [
          'fields' => [
            [
              'name' => 'data',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'unix_seconds',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'frequency',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'DE-Freiburg',
                        'kind' => 'query',
                        'name' => 'region',
                        'orig' => 'region',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'installed_model' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'last_update',
              'req' => true,
              'type' => '`$ANY`',
            ],
            [
              'name' => 'production_types',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'time',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'installed_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => false,
                        'kind' => 'query',
                        'name' => 'installation_decommission',
                        'orig' => 'installation_decommission',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 'yearly',
                        'kind' => 'query',
                        'name' => 'time_step',
                        'orig' => 'time_step',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'price' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'license_info',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'price',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'unit',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unix_seconds',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'price',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'DE-LU',
                        'kind' => 'query',
                        'name' => 'bzn',
                        'orig' => 'bzn',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'production_model' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'production_types',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'unix_seconds',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'production_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'subtype',
                        'orig' => 'subtype',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'public_power_forecast' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'forecast_type',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'forecast_values',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'production_type',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unix_seconds',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'public_power_forecast',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'current',
                        'kind' => 'query',
                        'name' => 'forecast_type',
                        'orig' => 'forecast_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'solar',
                        'kind' => 'query',
                        'name' => 'production_type',
                        'orig' => 'production_type',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'ren_share_model' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'ren_share',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'solar_share',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'substitute',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'unix_seconds',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'wind_offshore_share',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'wind_onshore_share',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'ren_share_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'share_model' => [
          'fields' => [
            [
              'name' => 'data',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'forecast',
              'type' => '`$ANY`',
            ],
            [
              'name' => 'unix_seconds',
              'type' => '`$ANY`',
            ],
          ],
          'name' => 'share_model',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'traffic_model' => [
          'fields' => [
            [
              'name' => 'deprecated',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'share',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'signal',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'substitute',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'unix_seconds',
              'req' => true,
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'traffic_model',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 'de',
                        'kind' => 'query',
                        'name' => 'country',
                        'orig' => 'country',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => '',
                        'kind' => 'query',
                        'name' => 'postal_code',
                        'orig' => 'postal_code',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
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
