

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EnergyChartsSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('CrossBorderModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.CrossBorderModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'cross_border_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"countries","req":false,"type":"`$ANY`","index$":0},{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"unix_seconds","req":false,"type":"`$ANY`","index$":2}],"name":"cross_border_model","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /cbet","json":"{\"operationId\":\"cross_border_electricity_trading_cbet_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"countries\":{\"anyOf\":[{\"items\":{\"properties\":{\"data\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"}},\"required\":[\"name\",\"data\"],\"title\":\"NamedData\",\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Countries\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"CrossBorderModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cbet","segments":[{"lit":"cbet"}],"select":{"exist":["country","end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /cbpf","json":"{\"operationId\":\"cross_border_physical_flows_cbpf_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"countries\":{\"anyOf\":[{\"items\":{\"properties\":{\"data\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"}},\"required\":[\"name\",\"data\"],\"title\":\"NamedData\",\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Countries\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"CrossBorderModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/cbpf","segments":[{"lit":"cbpf"}],"select":{"exist":["country","end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"cross_border_model","name__orig":"cross_border_model","Name":"CrossBorderModel","name_":"cross_border_model","name-":"cross-border-model","NAME":"CROSS_BORDER_MODEL","index$":0}, {"active":true,"entity":"cross_border_model","key$":"BasicCrossBorderModelFlow","kind":"basic","name":"BasicCrossBorderModelFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"cross_border_model_ref01","srcdatavar":"cross_border_model_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-cross_border_model_ref01"}}],"index$":0}]}, 'CrossBorderModel')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let cross_border_model_ref01_data = Object.values(setup.data.existing.cross_border_model)[0] as any

    // LOAD
    const cross_border_model_ref01_ent = client.CrossBorderModel()
    const cross_border_model_ref01_match_dt0: any = {}
    const cross_border_model_ref01_data_dt0 = (await cross_border_model_ref01_ent.load(cross_border_model_ref01_match_dt0)).data()
    assert(null != cross_border_model_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/cross_border_model/CrossBorderModelTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = EnergyChartsSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['cross_border_model01','cross_border_model02','cross_border_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_CROSS_BORDER_MODEL_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_CROSS_BORDER_MODEL_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_CROSS_BORDER_MODEL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new EnergyChartsSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
