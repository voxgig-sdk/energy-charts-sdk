

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('RenShareModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.RenShareModel()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ren_share_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deprecated":{"a":true,"h":"Deprecated","n":"deprecated","r":true,"t":"`$BOOLEAN`","key$":"deprecated","index$":0},"ren_share":{"a":true,"h":"Ren Share","n":"ren_share","r":true,"t":"`$ARRAY`","key$":"ren_share","index$":1},"solar_share":{"a":true,"h":"Solar Share","n":"solar_share","r":false,"t":"`$ANY`","key$":"solar_share","index$":2},"substitute":{"a":true,"h":"Substitute","n":"substitute","r":true,"t":"`$BOOLEAN`","key$":"substitute","index$":3},"unix_seconds":{"a":true,"h":"Unix Seconds","n":"unix_seconds","r":true,"t":"`$ARRAY`","key$":"unix_seconds","index$":4},"wind_offshore_share":{"a":true,"h":"Wind Offshore Share","n":"wind_offshore_share","r":false,"t":"`$ANY`","key$":"wind_offshore_share","index$":5},"wind_onshore_share":{"a":true,"h":"Wind Onshore Share","n":"wind_onshore_share","r":false,"t":"`$ANY`","key$":"wind_onshore_share","index$":6}},"name":"ren_share_model","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /ren_share_forecast","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"de","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/ren_share_forecast","q":{"exist":["country"]},"r":{},"s":[{"lit":"ren_share_forecast"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ren_share_model","name__orig":"ren_share_model","Name":"RenShareModel","name_":"ren_share_model","name-":"ren-share-model","NAME":"REN_SHARE_MODEL","index$":8}, {"active":true,"entity":"ren_share_model","key$":"BasicRenShareModelFlow","kind":"basic","name":"BasicRenShareModelFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"ren_share_model_ref01"}}],"index$":0}]}, 'RenShareModel', {"GET /ren_share_forecast":{"protocol":"http","operationId":"renewable_share_forecast_ren_share_forecast_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"unix_seconds":{"items":{"type":"integer"},"key$":"unix_seconds","title":"Unix Seconds","type":"array"},"ren_share":{"items":{"anyOf":[{"type":"number"},{"type":"null"}]},"key$":"ren_share","title":"Ren Share","type":"array"},"solar_share":{"anyOf":[{"items":{"type":"number"},"type":"array"},{"type":"null"}],"key$":"solar_share","title":"Solar Share"},"wind_onshore_share":{"anyOf":[{"items":{"type":"number"},"type":"array"},{"type":"null"}],"key$":"wind_onshore_share","title":"Wind Onshore Share"},"wind_offshore_share":{"anyOf":[{"items":{"type":"number"},"type":"array"},{"type":"null"}],"key$":"wind_offshore_share","title":"Wind Offshore Share"},"substitute":{"key$":"substitute","title":"Substitute","type":"boolean"},"deprecated":{"key$":"deprecated","title":"Deprecated","type":"boolean"}},"type":"object","required":["unix_seconds","ren_share","substitute","deprecated"],"title":"RenShareModel","x-ref":"#/components/schemas/RenShareModel","index$":0}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"country","in":"query","required":false,"schema":{"type":"string","default":"de","title":"Country"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ren_share_model_ref01_data = Object.values(setup.data.existing.ren_share_model)[0] as any

    // LIST
    const ren_share_model_ref01_ent = client.RenShareModel()
    const ren_share_model_ref01_match: any = {}

    const ren_share_model_ref01_list = (await ren_share_model_ref01_ent.list(ren_share_model_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ren_share_model/RenShareModelTestData.json')

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
    ['ren_share_model01','ren_share_model02','ren_share_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_REN_SHARE_MODEL_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_REN_SHARE_MODEL_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_REN_SHARE_MODEL_ENTID']
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
  
