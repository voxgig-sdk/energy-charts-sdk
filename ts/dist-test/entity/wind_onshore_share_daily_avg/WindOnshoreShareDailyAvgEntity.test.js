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
(0, node_test_1.describe)('WindOnshoreShareDailyAvgEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ENERGY_CHARTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EnergyChartsSDK.test();
        const ent = testsdk.WindOnshoreShareDailyAvg();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('wind_onshore_share_daily_avg hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.EnergyChartsSDK.test(offline).WindOnshoreShareDailyAvg().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.EnergyChartsSDK.test(offline).WindOnshoreShareDailyAvg()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.EnergyChartsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.WindOnshoreShareDailyAvg().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.EnergyChartsSDK.test().WindOnshoreShareDailyAvg().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.EnergyChartsSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.WindOnshoreShareDailyAvg().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.WindOnshoreShareDailyAvg().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.EnergyChartsSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.WindOnshoreShareDailyAvg().list({ "country": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'wind_onshore_share_daily_avg.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "data": { "a": true, "h": "Data", "n": "data", "r": true, "sh": "List of average daily values", "t": "`$ARRAY`", "key$": "data", "index$": 0 }, "days": { "a": true, "h": "Days", "n": "days", "r": true, "sh": "List of days in the format dd.mm.yyyy", "t": "`$ARRAY`", "key$": "days", "index$": 1 }, "deprecated": { "a": true, "h": "Deprecated", "n": "deprecated", "r": true, "t": "`$BOOLEAN`", "key$": "deprecated", "index$": 2 } }, "name": "wind_onshore_share_daily_avg", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /wind_onshore_share_daily_avg", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "de", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": -1, "k": "query", "n": "year", "or": "year", "r": false, "t": "`$INTEGER`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/wind_onshore_share_daily_avg", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "wind_onshore_share_daily_avg" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "wind_onshore_share_daily_avg", "name__orig": "wind_onshore_share_daily_avg", "Name": "WindOnshoreShareDailyAvg", "name_": "wind_onshore_share_daily_avg", "name-": "wind-onshore-share-daily-avg", "NAME": "WIND_ONSHORE_SHARE_DAILY_AVG", "index$": 16 }, { "active": true, "entity": "wind_onshore_share_daily_avg", "key$": "BasicWindOnshoreShareDailyAvgFlow", "kind": "basic", "name": "BasicWindOnshoreShareDailyAvgFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "wind_onshore_share_daily_avg_ref01" } }], "index$": 0 }] }, 'WindOnshoreShareDailyAvg', { "GET /wind_onshore_share_daily_avg": { "protocol": "http", "parameters": [{ "name": "country", "in": "query", "required": false, "schema": { "type": "string", "default": "de", "title": "Country" }, "index$": 0 }, { "name": "year", "in": "query", "required": false, "schema": { "type": "integer", "default": -1, "title": "Year" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let wind_onshore_share_daily_avg_ref01_data = Object.values(setup.data.existing.wind_onshore_share_daily_avg)[0];
        // LIST
        const wind_onshore_share_daily_avg_ref01_ent = client.WindOnshoreShareDailyAvg();
        const wind_onshore_share_daily_avg_ref01_match = {};
        const wind_onshore_share_daily_avg_ref01_list = (await wind_onshore_share_daily_avg_ref01_ent.list(wind_onshore_share_daily_avg_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/wind_onshore_share_daily_avg/WindOnshoreShareDailyAvgTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EnergyChartsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['wind_onshore_share_daily_avg01', 'wind_onshore_share_daily_avg02', 'wind_onshore_share_daily_avg03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID': idmap,
        'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
        'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID'];
    const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID'];
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
//# sourceMappingURL=WindOnshoreShareDailyAvgEntity.test.js.map