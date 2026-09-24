

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


describe('WindOnshoreShareDailyAvgEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.WindOnshoreShareDailyAvg()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'wind_onshore_share_daily_avg.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"data":{"a":true,"h":"Data","n":"data","r":true,"sh":"List of average daily values","t":"`$ARRAY`","key$":"data","index$":0},"days":{"a":true,"h":"Days","n":"days","r":true,"sh":"List of days in the format dd.mm.yyyy","t":"`$ARRAY`","key$":"days","index$":1},"deprecated":{"a":true,"h":"Deprecated","n":"deprecated","r":true,"t":"`$BOOLEAN`","key$":"deprecated","index$":2}},"name":"wind_onshore_share_daily_avg","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /wind_onshore_share_daily_avg","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"de","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":-1,"k":"query","n":"year","or":"year","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/wind_onshore_share_daily_avg","q":{"exist":["country","year"]},"r":{},"s":[{"lit":"wind_onshore_share_daily_avg"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"wind_onshore_share_daily_avg","name__orig":"wind_onshore_share_daily_avg","Name":"WindOnshoreShareDailyAvg","name_":"wind_onshore_share_daily_avg","name-":"wind-onshore-share-daily-avg","NAME":"WIND_ONSHORE_SHARE_DAILY_AVG","index$":16}, {"active":true,"entity":"wind_onshore_share_daily_avg","key$":"BasicWindOnshoreShareDailyAvgFlow","kind":"basic","name":"BasicWindOnshoreShareDailyAvgFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"wind_onshore_share_daily_avg_ref01"}}],"index$":0}]}, 'WindOnshoreShareDailyAvg', {"GET /wind_onshore_share_daily_avg":{"protocol":"http","operationId":"wind_onshore_share_daily_avg_wind_onshore_share_daily_avg_get","responses":{"200":{"description":"Successful Response","content":{"application/json":{"schema":{"properties":{"days":{"description":"List of days in the format dd.mm.yyyy","items":{"type":"string"},"key$":"days","title":"Days","type":"array"},"data":{"description":"List of average daily values","items":{"anyOf":[{"type":"number"},{"type":"null"}]},"key$":"data","title":"Data","type":"array"},"deprecated":{"key$":"deprecated","title":"Deprecated","type":"boolean"}},"type":"object","required":["days","data","deprecated"],"title":"DailyAvgDict","x-ref":"#/components/schemas/DailyAvgDict","index$":0}}}},"422":{"description":"Validation Error","content":{"application/json":{"schema":{"properties":{"detail":{"items":{"properties":{"loc":{"items":{"anyOf":[{"type":"string"},{"type":"integer"}]},"type":"array","title":"Location"},"msg":{"type":"string","title":"Message"},"type":{"type":"string","title":"Error Type"}},"type":"object","required":["loc","msg","type"],"title":"ValidationError","x-ref":"#/components/schemas/ValidationError"},"type":"array","title":"Detail"}},"type":"object","title":"HTTPValidationError","x-ref":"#/components/schemas/HTTPValidationError"}}}}},"parameters":[{"name":"country","in":"query","required":false,"schema":{"type":"string","default":"de","title":"Country"},"index$":0},{"name":"year","in":"query","required":false,"schema":{"type":"integer","default":-1,"title":"Year"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let wind_onshore_share_daily_avg_ref01_data = Object.values(setup.data.existing.wind_onshore_share_daily_avg)[0] as any

    // LIST
    const wind_onshore_share_daily_avg_ref01_ent = client.WindOnshoreShareDailyAvg()
    const wind_onshore_share_daily_avg_ref01_match: any = {}

    const wind_onshore_share_daily_avg_ref01_list = (await wind_onshore_share_daily_avg_ref01_ent.list(wind_onshore_share_daily_avg_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/wind_onshore_share_daily_avg/WindOnshoreShareDailyAvgTestData.json')

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
    ['wind_onshore_share_daily_avg01','wind_onshore_share_daily_avg02','wind_onshore_share_daily_avg03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_WIND_ONSHORE_SHARE_DAILY_AVG_ENTID']
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
  
