<?php
declare(strict_types=1);

// TrafficModel entity test

require_once __DIR__ . '/../energycharts_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class TrafficModelEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = EnergyChartsSDK::test(null, null);
        $ent = $testsdk->TrafficModel(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = traffic_model_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "traffic_model." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ENERGYCHARTS_TEST_TRAFFIC_MODEL_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $traffic_model_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.traffic_model")));
        $traffic_model_ref01_data = null;
        if (count($traffic_model_ref01_data_raw) > 0) {
            $traffic_model_ref01_data = Helpers::to_map($traffic_model_ref01_data_raw[0][1]);
        }

        // LIST
        $traffic_model_ref01_ent = $client->TrafficModel(null);
        $traffic_model_ref01_match = [];

        [$traffic_model_ref01_list_result, $err] = $traffic_model_ref01_ent->list($traffic_model_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($traffic_model_ref01_list_result);

    }
}

function traffic_model_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/traffic_model/TrafficModelTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = EnergyChartsSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["traffic_model01", "traffic_model02", "traffic_model03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ENERGYCHARTS_TEST_TRAFFIC_MODEL_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ENERGYCHARTS_TEST_TRAFFIC_MODEL_ENTID" => $idmap,
        "ENERGYCHARTS_TEST_LIVE" => "FALSE",
        "ENERGYCHARTS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ENERGYCHARTS_TEST_TRAFFIC_MODEL_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ENERGYCHARTS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new EnergyChartsSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ENERGYCHARTS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ENERGYCHARTS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
