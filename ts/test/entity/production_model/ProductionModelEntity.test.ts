

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


describe('ProductionModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.ProductionModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'production_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":0},{"active":true,"name":"production_types","req":false,"type":"`$ANY`","index$":1},{"active":true,"name":"unix_seconds","req":false,"type":"`$ANY`","index$":2}],"name":"production_model","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"","kind":"query","name":"subtype","orig":"subtype","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /public_power","json":"{\"operationId\":\"public_power_public_power_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"subtype\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Subtype\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"production_types\":{\"anyOf\":[{\"items\":{\"properties\":{\"data\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"}},\"required\":[\"name\",\"data\"],\"title\":\"NamedData\",\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Production Types\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ProductionModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public_power","segments":[{"lit":"public_power"}],"select":{"exist":["country","end","start","subtype"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /total_power","json":"{\"operationId\":\"total_power_total_power_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"production_types\":{\"anyOf\":[{\"items\":{\"properties\":{\"data\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"name\":{\"title\":\"Name\",\"type\":\"string\"}},\"required\":[\"name\",\"data\"],\"title\":\"NamedData\",\"type\":\"object\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Production Types\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ProductionModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/total_power","segments":[{"lit":"total_power"}],"select":{"exist":["country","end","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"production_model","name__orig":"production_model","Name":"ProductionModel","name_":"production_model","name-":"production-model","NAME":"PRODUCTION_MODEL","index$":5}, {"active":true,"entity":"production_model","key$":"BasicProductionModelFlow","kind":"basic","name":"BasicProductionModelFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"production_model_ref01","srcdatavar":"production_model_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-production_model_ref01"}}],"index$":0}]}, 'ProductionModel')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let production_model_ref01_data = Object.values(setup.data.existing.production_model)[0] as any

    // LOAD
    const production_model_ref01_ent = client.ProductionModel()
    const production_model_ref01_match_dt0: any = {}
    const production_model_ref01_data_dt0 = (await production_model_ref01_ent.load(production_model_ref01_match_dt0)).data()
    assert(null != production_model_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/production_model/ProductionModelTestData.json')

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
    ['production_model01','production_model02','production_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_PRODUCTION_MODEL_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_PRODUCTION_MODEL_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_PRODUCTION_MODEL_ENTID']
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
  
