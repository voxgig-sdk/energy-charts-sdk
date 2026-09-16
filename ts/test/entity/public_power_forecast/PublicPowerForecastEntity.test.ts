

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


describe('PublicPowerForecastEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.PublicPowerForecast()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public_power_forecast.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":0},{"active":true,"name":"forecast_type","req":true,"type":"`$STRING`","index$":1},{"active":true,"name":"forecast_values","req":true,"type":"`$ARRAY`","index$":2},{"active":true,"name":"production_type","req":true,"type":"`$STRING`","index$":3},{"active":true,"name":"unix_seconds","req":true,"type":"`$ARRAY`","index$":4}],"name":"public_power_forecast","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"de","kind":"query","name":"country","orig":"country","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"current","kind":"query","name":"forecast_type","orig":"forecast_type","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"example":"solar","kind":"query","name":"production_type","orig":"production_type","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /public_power_forecast","json":"{\"operationId\":\"public_power_forecast_public_power_forecast_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"country\",\"required\":false,\"schema\":{\"default\":\"de\",\"title\":\"Country\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"production_type\",\"required\":false,\"schema\":{\"default\":\"solar\",\"title\":\"Production Type\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"forecast_type\",\"required\":false,\"schema\":{\"default\":\"current\",\"title\":\"Forecast Type\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"forecast_type\":{\"title\":\"Forecast Type\",\"type\":\"string\"},\"forecast_values\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Forecast Values\",\"type\":\"array\"},\"production_type\":{\"title\":\"Production Type\",\"type\":\"string\"},\"unix_seconds\":{\"items\":{\"type\":\"integer\"},\"title\":\"Unix Seconds\",\"type\":\"array\"}},\"required\":[\"unix_seconds\",\"forecast_values\",\"production_type\",\"forecast_type\",\"deprecated\"],\"title\":\"PublicPowerForecastModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/public_power_forecast","segments":[{"lit":"public_power_forecast"}],"select":{"exist":["country","end","forecast_type","production_type","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"public_power_forecast","name__orig":"public_power_forecast","Name":"PublicPowerForecast","name_":"public_power_forecast","name-":"public-power-forecast","NAME":"PUBLIC_POWER_FORECAST","index$":6}, {"active":true,"entity":"public_power_forecast","key$":"BasicPublicPowerForecastFlow","kind":"basic","name":"BasicPublicPowerForecastFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"public_power_forecast_ref01"}}],"index$":0}]}, 'PublicPowerForecast')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_power_forecast_ref01_data = Object.values(setup.data.existing.public_power_forecast)[0] as any

    // LIST
    const public_power_forecast_ref01_ent = client.PublicPowerForecast()
    const public_power_forecast_ref01_match: any = {}

    const public_power_forecast_ref01_list = (await public_power_forecast_ref01_ent.list(public_power_forecast_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public_power_forecast/PublicPowerForecastTestData.json')

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
    ['public_power_forecast01','public_power_forecast02','public_power_forecast03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_PUBLIC_POWER_FORECAST_ENTID']
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
  
