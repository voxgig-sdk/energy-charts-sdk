"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PublicPowerForecastEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ENERGY_CHARTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EnergyChartsSDK.test();
        const ent = testsdk.PublicPowerForecast();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('public_power_forecast hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.EnergyChartsSDK.test(offline).PublicPowerForecast().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.EnergyChartsSDK.test(offline).PublicPowerForecast()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.EnergyChartsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.PublicPowerForecast().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.EnergyChartsSDK.test().PublicPowerForecast().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.EnergyChartsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.PublicPowerForecast().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.PublicPowerForecast().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EnergyChartsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.PublicPowerForecast().list({ "country": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'public_power_forecast.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deprecated": { "a": true, "h": "Deprecated", "n": "deprecated", "r": true, "t": "`$BOOLEAN`", "key$": "deprecated", "index$": 0 }, "forecast_type": { "a": true, "h": "Forecast Type", "n": "forecast_type", "r": true, "t": "`$STRING`", "key$": "forecast_type", "index$": 1 }, "forecast_values": { "a": true, "h": "Forecast Values", "n": "forecast_values", "r": true, "t": "`$ARRAY`", "key$": "forecast_values", "index$": 2 }, "production_type": { "a": true, "h": "Production Type", "n": "production_type", "r": true, "t": "`$STRING`", "key$": "production_type", "index$": 3 }, "unix_seconds": { "a": true, "h": "Unix Seconds", "n": "unix_seconds", "r": true, "t": "`$ARRAY`", "key$": "unix_seconds", "index$": 4 } }, "name": "public_power_forecast", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /public_power_forecast", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "de", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "", "k": "query", "n": "end", "or": "end", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "current", "k": "query", "n": "forecast_type", "or": "forecast_type", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": "solar", "k": "query", "n": "production_type", "or": "production_type", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "ex": "", "k": "query", "n": "start", "or": "start", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/public_power_forecast", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "public_power_forecast" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "public_power_forecast", "name__orig": "public_power_forecast", "Name": "PublicPowerForecast", "name_": "public_power_forecast", "name-": "public-power-forecast", "NAME": "PUBLIC_POWER_FORECAST", "index$": 6 }, { "active": true, "entity": "public_power_forecast", "key$": "BasicPublicPowerForecastFlow", "kind": "basic", "name": "BasicPublicPowerForecastFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "public_power_forecast_ref01" } }], "index$": 0 }] }, 'PublicPowerForecast', { "GET /public_power_forecast": { "protocol": "http", "parameters": [{ "name": "country", "in": "query", "required": false, "schema": { "type": "string", "default": "de", "title": "Country" }, "index$": 0 }, { "name": "production_type", "in": "query", "required": false, "schema": { "type": "string", "default": "solar", "title": "Production Type" }, "index$": 1 }, { "name": "forecast_type", "in": "query", "required": false, "schema": { "type": "string", "default": "current", "title": "Forecast Type" }, "index$": 2 }, { "name": "start", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "Start" }, "index$": 3 }, { "name": "end", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "End" }, "index$": 4 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let public_power_forecast_ref01_data = Object.values(setup.data.existing.public_power_forecast)[0];
        // LIST
        const public_power_forecast_ref01_ent = client.PublicPowerForecast();
        const public_power_forecast_ref01_match = {};
        const public_power_forecast_ref01_list = (await public_power_forecast_ref01_ent.list(public_power_forecast_ref01_match)).map((e) => e.data());
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/public_power_forecast/PublicPowerForecastTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EnergyChartsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['public_power_forecast01', 'public_power_forecast02', 'public_power_forecast03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID': idmap,
        'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
        'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID'];
    const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.EnergyChartsSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ENERGY_CHARTS_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PublicPowerForecastEntity.test.js.map