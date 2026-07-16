<?php
declare(strict_types=1);

// EnergyCharts SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class EnergyChartsSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new EnergyChartsUtility();
        $this->_utility = $utility;

        $config = EnergyChartsConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = EnergyChartsHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = EnergyChartsHelpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, EnergyChartsFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return EnergyChartsUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = EnergyChartsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = EnergyChartsHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = EnergyChartsHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new EnergyChartsSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = EnergyChartsHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = EnergyChartsHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_cross_border_model = null;

    // Canonical facade: $client->CrossBorderModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->cross_border_model()
    // resolves here too.
    public function CrossBorderModel($data = null)
    {
        require_once __DIR__ . '/entity/cross_border_model_entity.php';
        if ($data === null) {
            if ($this->_cross_border_model === null) {
                $this->_cross_border_model = new CrossBorderModelEntity($this, null);
            }
            return $this->_cross_border_model;
        }
        return new CrossBorderModelEntity($this, $data);
    }


    private $_daily_avg_dict = null;

    // Canonical facade: $client->DailyAvgDict()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->daily_avg_dict()
    // resolves here too.
    public function DailyAvgDict($data = null)
    {
        require_once __DIR__ . '/entity/daily_avg_dict_entity.php';
        if ($data === null) {
            if ($this->_daily_avg_dict === null) {
                $this->_daily_avg_dict = new DailyAvgDictEntity($this, null);
            }
            return $this->_daily_avg_dict;
        }
        return new DailyAvgDictEntity($this, $data);
    }


    private $_frequency = null;

    // Canonical facade: $client->Frequency()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->frequency()
    // resolves here too.
    public function Frequency($data = null)
    {
        require_once __DIR__ . '/entity/frequency_entity.php';
        if ($data === null) {
            if ($this->_frequency === null) {
                $this->_frequency = new FrequencyEntity($this, null);
            }
            return $this->_frequency;
        }
        return new FrequencyEntity($this, $data);
    }


    private $_installed_model = null;

    // Canonical facade: $client->InstalledModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->installed_model()
    // resolves here too.
    public function InstalledModel($data = null)
    {
        require_once __DIR__ . '/entity/installed_model_entity.php';
        if ($data === null) {
            if ($this->_installed_model === null) {
                $this->_installed_model = new InstalledModelEntity($this, null);
            }
            return $this->_installed_model;
        }
        return new InstalledModelEntity($this, $data);
    }


    private $_price = null;

    // Canonical facade: $client->Price()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->price()
    // resolves here too.
    public function Price($data = null)
    {
        require_once __DIR__ . '/entity/price_entity.php';
        if ($data === null) {
            if ($this->_price === null) {
                $this->_price = new PriceEntity($this, null);
            }
            return $this->_price;
        }
        return new PriceEntity($this, $data);
    }


    private $_production_model = null;

    // Canonical facade: $client->ProductionModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->production_model()
    // resolves here too.
    public function ProductionModel($data = null)
    {
        require_once __DIR__ . '/entity/production_model_entity.php';
        if ($data === null) {
            if ($this->_production_model === null) {
                $this->_production_model = new ProductionModelEntity($this, null);
            }
            return $this->_production_model;
        }
        return new ProductionModelEntity($this, $data);
    }


    private $_public_power_forecast = null;

    // Canonical facade: $client->PublicPowerForecast()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->public_power_forecast()
    // resolves here too.
    public function PublicPowerForecast($data = null)
    {
        require_once __DIR__ . '/entity/public_power_forecast_entity.php';
        if ($data === null) {
            if ($this->_public_power_forecast === null) {
                $this->_public_power_forecast = new PublicPowerForecastEntity($this, null);
            }
            return $this->_public_power_forecast;
        }
        return new PublicPowerForecastEntity($this, $data);
    }


    private $_ren_share_model = null;

    // Canonical facade: $client->RenShareModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->ren_share_model()
    // resolves here too.
    public function RenShareModel($data = null)
    {
        require_once __DIR__ . '/entity/ren_share_model_entity.php';
        if ($data === null) {
            if ($this->_ren_share_model === null) {
                $this->_ren_share_model = new RenShareModelEntity($this, null);
            }
            return $this->_ren_share_model;
        }
        return new RenShareModelEntity($this, $data);
    }


    private $_share_model = null;

    // Canonical facade: $client->ShareModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->share_model()
    // resolves here too.
    public function ShareModel($data = null)
    {
        require_once __DIR__ . '/entity/share_model_entity.php';
        if ($data === null) {
            if ($this->_share_model === null) {
                $this->_share_model = new ShareModelEntity($this, null);
            }
            return $this->_share_model;
        }
        return new ShareModelEntity($this, $data);
    }


    private $_traffic_model = null;

    // Canonical facade: $client->TrafficModel()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->traffic_model()
    // resolves here too.
    public function TrafficModel($data = null)
    {
        require_once __DIR__ . '/entity/traffic_model_entity.php';
        if ($data === null) {
            if ($this->_traffic_model === null) {
                $this->_traffic_model = new TrafficModelEntity($this, null);
            }
            return $this->_traffic_model;
        }
        return new TrafficModelEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new EnergyChartsSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
