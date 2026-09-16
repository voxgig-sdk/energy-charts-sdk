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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ShareModelEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ENERGY_CHARTS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.EnergyChartsSDK.test();
        const ent = testsdk.ShareModel();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'share_model.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "data", "req": false, "type": "`$ANY`", "index$": 0 }, { "active": true, "name": "deprecated", "req": true, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "name": "forecast", "req": false, "type": "`$ANY`", "index$": 2 }, { "active": true, "name": "unix_seconds", "req": false, "type": "`$ANY`", "index$": 3 }], "name": "share_model", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "de", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /solar_share", "json": "{\"operationId\":\"solar_share_solar_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/solar_share", "segments": [{ "lit": "solar_share" }], "select": { "exist": ["country"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "query": [{ "active": true, "example": "de", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /wind_offshore_share", "json": "{\"operationId\":\"wind_offshore_share_wind_offshore_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/wind_offshore_share", "segments": [{ "lit": "wind_offshore_share" }], "select": { "exist": ["country"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }, { "active": true, "args": { "query": [{ "active": true, "example": "de", "kind": "query", "name": "country", "orig": "country", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /wind_onshore_share", "json": "{\"operationId\":\"wind_onshore_share_wind_onshore_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/wind_onshore_share", "segments": [{ "lit": "wind_onshore_share" }], "select": { "exist": ["country"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 2 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "share_model", "name__orig": "share_model", "Name": "ShareModel", "name_": "share_model", "name-": "share-model", "NAME": "SHARE_MODEL", "index$": 8 }, { "active": true, "entity": "share_model", "key$": "BasicShareModelFlow", "kind": "basic", "name": "BasicShareModelFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "share_model_ref01", "srcdatavar": "share_model_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-share_model_ref01" } }], "index$": 0 }] }, 'ShareModel');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let share_model_ref01_data = Object.values(setup.data.existing.share_model)[0];
        // LOAD
        const share_model_ref01_ent = client.ShareModel();
        const share_model_ref01_match_dt0 = {};
        const share_model_ref01_data_dt0 = (await share_model_ref01_ent.load(share_model_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != share_model_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/share_model/ShareModelTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.EnergyChartsSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['share_model01', 'share_model02', 'share_model03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID': idmap,
        'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
        'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID'];
    const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID'];
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
//# sourceMappingURL=ShareModelEntity.test.js.map