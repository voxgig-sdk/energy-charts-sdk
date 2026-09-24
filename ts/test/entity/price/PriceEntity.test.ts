

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


describe('PriceEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.Price()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'price.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deprecated":{"a":true,"h":"Deprecated","n":"deprecated","r":true,"t":"`$BOOLEAN`","key$":"deprecated","index$":0},"license_info":{"a":true,"h":"License Info","n":"license_info","r":true,"t":"`$STRING`","key$":"license_info","index$":1},"price":{"a":true,"h":"Price","n":"price","r":false,"t":"`$NUMBER`","key$":"price","index$":2},"unit":{"a":true,"h":"Unit","n":"unit","r":true,"t":"`$STRING`","key$":"unit","index$":3},"unix_seconds":{"a":true,"h":"Unix Seconds","n":"unix_seconds","r":false,"t":"`$ANY`","key$":"unix_seconds","index$":4}},"name":"price","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /price","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"DE-LU","k":"query","n":"bzn","or":"bzn","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/price","q":{"exist":["bzn","end","start"]},"r":{},"s":[{"lit":"price"}],"t":{"req":"`reqdata`","res":"`body.price`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"price","name__orig":"price","Name":"Price","name_":"price","name-":"price","NAME":"PRICE","index$":4}, {"active":true,"entity":"price","key$":"BasicPriceFlow","kind":"basic","name":"BasicPriceFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"price_ref01","srcdatavar":"price_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-price_ref01"}}],"index$":0}]}, 'Price', {"GET /price":{"protocol":"http","operationId":"day_ahead_price_price_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"license_info":{"key$":"license_info","title":"License Info","type":"string"},"unix_seconds":{"anyOf":[{"items":{"type":"integer"},"type":"array"},{"type":"null"}],"key$":"unix_seconds","title":"Unix Seconds"},"price":{"anyOf":[{"items":{"anyOf":[{"type":"number"},{"type":"null"}]},"type":"array"},{"type":"null"}],"key$":"price","title":"Price"},"unit":{"key$":"unit","title":"Unit","type":"string"},"deprecated":{"key$":"deprecated","title":"Deprecated","type":"boolean"}},"type":"object","required":["license_info","unit","deprecated"],"title":"PriceModel","x-ref":"#/components/schemas/PriceModel","index$":0}}}},"404":{"description":"No price data available for that bidding zone/time range"},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"bzn","in":"query","required":false,"schema":{"type":"string","default":"DE-LU","title":"Bzn"},"index$":0},{"name":"start","in":"query","required":false,"schema":{"type":"string","default":"","title":"Start"},"index$":1},{"name":"end","in":"query","required":false,"schema":{"type":"string","default":"","title":"End"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let price_ref01_data = Object.values(setup.data.existing.price)[0] as any

    // LOAD
    const price_ref01_ent = client.Price()
    const price_ref01_match_dt0: any = {}
    const price_ref01_data_dt0 = (await price_ref01_ent.load(price_ref01_match_dt0)).data()
    assert(null != price_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/price/PriceTestData.json')

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
    ['price01','price02','price03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_PRICE_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_PRICE_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_PRICE_ENTID']
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
  
