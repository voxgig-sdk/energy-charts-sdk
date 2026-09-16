

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


describe('DailyAvgDictEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.DailyAvgDict()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'daily_avg_dict.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":true,"short":"List of average daily values","type":"`$ARRAY`","index$":0},{"active":true,"name":"days","req":true,"short":"List of days in the format dd.mm.yyyy","type":"`$ARRAY`","index$":1},{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":2}],"name":"daily_avg_dict","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":-1,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /ren_share_daily_avg","json":"{\"operationId\":\"ren_share_daily_avg_ren_share_daily_avg_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"default\":-1,\"title\":\"Year\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"List of average daily values\",\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"days\":{\"description\":\"List of days in the format dd.mm.yyyy\",\"items\":{\"type\":\"string\"},\"title\":\"Days\",\"type\":\"array\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"}},\"required\":[\"days\",\"data\",\"deprecated\"],\"title\":\"DailyAvgDict\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ren_share_daily_avg","segments":[{"lit":"ren_share_daily_avg"}],"select":{"exist":["country","year"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":-1,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /solar_share_daily_avg","json":"{\"operationId\":\"solar_share_daily_avg_solar_share_daily_avg_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"default\":-1,\"title\":\"Year\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"List of average daily values\",\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"days\":{\"description\":\"List of days in the format dd.mm.yyyy\",\"items\":{\"type\":\"string\"},\"title\":\"Days\",\"type\":\"array\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"}},\"required\":[\"days\",\"data\",\"deprecated\"],\"title\":\"DailyAvgDict\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/solar_share_daily_avg","segments":[{"lit":"solar_share_daily_avg"}],"select":{"exist":["country","year"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":-1,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /wind_offshore_share_daily_avg","json":"{\"operationId\":\"wind_offshore_share_daily_avg_wind_offshore_share_daily_avg_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"default\":-1,\"title\":\"Year\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"List of average daily values\",\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"days\":{\"description\":\"List of days in the format dd.mm.yyyy\",\"items\":{\"type\":\"string\"},\"title\":\"Days\",\"type\":\"array\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"}},\"required\":[\"days\",\"data\",\"deprecated\"],\"title\":\"DailyAvgDict\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wind_offshore_share_daily_avg","segments":[{"lit":"wind_offshore_share_daily_avg"}],"select":{"exist":["country","year"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":2},{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":-1,"kind":"query","name":"year","orig":"year","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /wind_onshore_share_daily_avg","json":"{\"operationId\":\"wind_onshore_share_daily_avg_wind_onshore_share_daily_avg_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"year\",\"required\":false,\"schema\":{\"default\":-1,\"title\":\"Year\",\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"description\":\"List of average daily values\",\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"days\":{\"description\":\"List of days in the format dd.mm.yyyy\",\"items\":{\"type\":\"string\"},\"title\":\"Days\",\"type\":\"array\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"}},\"required\":[\"days\",\"data\",\"deprecated\"],\"title\":\"DailyAvgDict\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/wind_onshore_share_daily_avg","segments":[{"lit":"wind_onshore_share_daily_avg"}],"select":{"exist":["country","year"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":3}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"daily_avg_dict","name__orig":"daily_avg_dict","Name":"DailyAvgDict","name_":"daily_avg_dict","name-":"daily-avg-dict","NAME":"DAILY_AVG_DICT","index$":1}, {"active":true,"entity":"daily_avg_dict","key$":"BasicDailyAvgDictFlow","kind":"basic","name":"BasicDailyAvgDictFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"daily_avg_dict_ref01"}}],"index$":0}]}, 'DailyAvgDict')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let daily_avg_dict_ref01_data = Object.values(setup.data.existing.daily_avg_dict)[0] as any

    // LIST
    const daily_avg_dict_ref01_ent = client.DailyAvgDict()
    const daily_avg_dict_ref01_match: any = {}

    const daily_avg_dict_ref01_list = (await daily_avg_dict_ref01_ent.list(daily_avg_dict_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/daily_avg_dict/DailyAvgDictTestData.json')

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
    ['daily_avg_dict01','daily_avg_dict02','daily_avg_dict03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_DAILY_AVG_DICT_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_DAILY_AVG_DICT_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_DAILY_AVG_DICT_ENTID']
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
  
