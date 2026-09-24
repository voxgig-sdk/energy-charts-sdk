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
(0, node_test_1.describe)('TrafficModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ENERGY_CHARTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EnergyChartsSDK.test();
        const ent = testsdk.TrafficModel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'traffic_model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deprecated": { "a": true, "h": "Deprecated", "n": "deprecated", "r": true, "t": "`$BOOLEAN`", "key$": "deprecated", "index$": 0 }, "share": { "a": true, "h": "Share", "n": "share", "r": true, "t": "`$ARRAY`", "key$": "share", "index$": 1 }, "signal": { "a": true, "h": "Signal", "n": "signal", "r": false, "sh": "0: Red (low renewable share) 1: Yellow (average renewable share) 2: Green (high renewable share)", "t": "`$ARRAY`", "key$": "signal", "index$": 2 }, "substitute": { "a": true, "h": "Substitute", "n": "substitute", "r": true, "t": "`$BOOLEAN`", "key$": "substitute", "index$": 3 }, "unix_seconds": { "a": true, "h": "Unix Seconds", "n": "unix_seconds", "r": true, "t": "`$ARRAY`", "key$": "unix_seconds", "index$": 4 } }, "name": "traffic_model", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /signal", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "de", "k": "query", "n": "country", "or": "country", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "", "k": "query", "n": "postal_code", "or": "postal_code", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/signal", "q": { "exist": ["country", "postal_code"] }, "r": {}, "s": [{ "lit": "signal" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "traffic_model", "name__orig": "traffic_model", "Name": "TrafficModel", "name_": "traffic_model", "name-": "traffic-model", "NAME": "TRAFFIC_MODEL", "index$": 12 }, { "active": true, "entity": "traffic_model", "key$": "BasicTrafficModelFlow", "kind": "basic", "name": "BasicTrafficModelFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "traffic_model_ref01" } }], "index$": 0 }] }, 'TrafficModel', { "GET /signal": { "protocol": "http", "operationId": "traffic_signal_signal_get", "responses": { "200": { "description": "Successful Response", "content": { "application/json": { "schema": { "properties": { "unix_seconds": { "items": { "type": "integer" }, "key$": "unix_seconds", "title": "Unix Seconds", "type": "array" }, "share": { "items": { "anyOf": [{ "type": "number" }, { "type": "null" }] }, "key$": "share", "title": "Share", "type": "array" }, "signal": { "description": "\n    0: Red (low renewable share)\n    1: Yellow (average renewable share)\n    2: Green (high renewable share)\n    ", "items": { "anyOf": [{ "type": "integer" }, { "type": "null" }] }, "key$": "signal", "title": "Signal", "type": "array" }, "substitute": { "key$": "substitute", "title": "Substitute", "type": "boolean" }, "deprecated": { "key$": "deprecated", "title": "Deprecated", "type": "boolean" } }, "type": "object", "required": ["unix_seconds", "share", "substitute", "deprecated"], "title": "TrafficModel", "x-ref": "#/components/schemas/TrafficModel", "index$": 0 } } } }, "422": { "description": "Validation Error", "content": { "application/json": { "schema": { "properties": { "detail": { "items": { "properties": { "loc": { "items": { "anyOf": [{ "type": "string" }, { "type": "integer" }] }, "type": "array", "title": "Location" }, "msg": { "type": "string", "title": "Message" }, "type": { "type": "string", "title": "Error Type" } }, "type": "object", "required": ["loc", "msg", "type"], "title": "ValidationError", "x-ref": "#/components/schemas/ValidationError" }, "type": "array", "title": "Detail" } }, "type": "object", "title": "HTTPValidationError", "x-ref": "#/components/schemas/HTTPValidationError" } } } } }, "parameters": [{ "name": "country", "in": "query", "required": false, "schema": { "type": "string", "default": "de", "title": "Country" }, "index$": 0 }, { "name": "postal_code", "in": "query", "required": false, "schema": { "type": "string", "default": "", "title": "Postal Code" }, "index$": 1 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let traffic_model_ref01_data = Object.values(setup.data.existing.traffic_model)[0];
        // LIST
        const traffic_model_ref01_ent = client.TrafficModel();
        const traffic_model_ref01_match = {};
        const traffic_model_ref01_list = (await traffic_model_ref01_ent.list(traffic_model_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/traffic_model/TrafficModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EnergyChartsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['traffic_model01', 'traffic_model02', 'traffic_model03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ENERGY_CHARTS_TEST_TRAFFIC_MODEL_ENTID': idmap,
        'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
        'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ENERGY_CHARTS_TEST_TRAFFIC_MODEL_ENTID'];
    const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ENERGY_CHARTS_TEST_TRAFFIC_MODEL_ENTID'];
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
//# sourceMappingURL=TrafficModelEntity.test.js.map