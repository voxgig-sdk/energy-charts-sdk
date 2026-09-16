

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


describe('ShareModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.ShareModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'share_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":false,"type":"`$ANY`","index$":0},{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"forecast","req":false,"type":"`$ANY`","index$":2},{"active":true,"name":"unix_seconds","req":false,"type":"`$ANY`","index$":3}],"name":"share_model","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /solar_share","json":"{\"operationId\":\"solar_share_solar_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/solar_share","segments":[{"lit":"solar_share"}],"select":{"exist":["country"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /wind_offshore_share","json":"{\"operationId\":\"wind_offshore_share_wind_offshore_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wind_offshore_share","segments":[{"lit":"wind_offshore_share"}],"select":{"exist":["country"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /wind_onshore_share","json":"{\"operationId\":\"wind_onshore_share_wind_onshore_share_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Data\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast\":{\"anyOf\":[{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Forecast\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"deprecated\"],\"title\":\"ShareModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wind_onshore_share","segments":[{"lit":"wind_onshore_share"}],"select":{"exist":["country"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"share_model","name__orig":"share_model","Name":"ShareModel","name_":"share_model","name-":"share-model","NAME":"SHARE_MODEL","index$":8}, {"active":true,"entity":"share_model","key$":"BasicShareModelFlow","kind":"basic","name":"BasicShareModelFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"share_model_ref01","srcdatavar":"share_model_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-share_model_ref01"}}],"index$":0}]}, 'ShareModel')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let share_model_ref01_data = Object.values(setup.data.existing.share_model)[0] as any

    // LOAD
    const share_model_ref01_ent = client.ShareModel()
    const share_model_ref01_match_dt0: any = {}
    const share_model_ref01_data_dt0 = (await share_model_ref01_ent.load(share_model_ref01_match_dt0)).data()
    assert(null != share_model_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/share_model/ShareModelTestData.json')

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
    ['share_model01','share_model02','share_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_SHARE_MODEL_ENTID']
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
  
