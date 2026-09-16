

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


describe('FrequencyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.Frequency()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'frequency.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"data","req":true,"type":"`$ARRAY`","index$":0},{"active":true,"name":"deprecated","req":true,"type":"`$BOOLEAN`","index$":1},{"active":true,"name":"unix_seconds","req":false,"type":"`$ANY`","index$":2}],"name":"frequency","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":"","kind":"query","name":"end","orig":"end","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":"DE-Freiburg","kind":"query","name":"region","orig":"region","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":"","kind":"query","name":"start","orig":"start","reqd":false,"type":"`$STRING`","index$":2}]},"contract":{"id":"GET /frequency","json":"{\"operationId\":\"frequency_frequency_get\",\"parameters\":[{\"in\":\"query\",\"name\":\"region\",\"required\":false,\"schema\":{\"default\":\"DE-Freiburg\",\"title\":\"Region\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"start\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"Start\",\"type\":\"string\"}},{\"in\":\"query\",\"name\":\"end\",\"required\":false,\"schema\":{\"default\":\"\",\"title\":\"End\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"data\":{\"items\":{\"anyOf\":[{\"type\":\"number\"},{\"type\":\"null\"}]},\"title\":\"Data\",\"type\":\"array\"},\"deprecated\":{\"title\":\"Deprecated\",\"type\":\"boolean\"},\"unix_seconds\":{\"anyOf\":[{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},{\"type\":\"null\"}],\"title\":\"Unix Seconds\"}},\"required\":[\"data\",\"deprecated\"],\"title\":\"FrequencyModel\",\"type\":\"object\"}}},\"description\":\"Successful Response\"},\"422\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"detail\":{\"items\":{\"properties\":{\"loc\":{\"items\":{\"anyOf\":[{\"type\":\"string\"},{\"type\":\"integer\"}]},\"title\":\"Location\",\"type\":\"array\"},\"msg\":{\"title\":\"Message\",\"type\":\"string\"},\"type\":{\"title\":\"Error Type\",\"type\":\"string\"}},\"required\":[\"loc\",\"msg\",\"type\"],\"title\":\"ValidationError\",\"type\":\"object\"},\"title\":\"Detail\",\"type\":\"array\"}},\"title\":\"HTTPValidationError\",\"type\":\"object\"}}},\"description\":\"Validation Error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/frequency","segments":[{"lit":"frequency"}],"select":{"exist":["end","region","start"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"frequency","name__orig":"frequency","Name":"Frequency","name_":"frequency","name-":"frequency","NAME":"FREQUENCY","index$":2}, {"active":true,"entity":"frequency","key$":"BasicFrequencyFlow","kind":"basic","name":"BasicFrequencyFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"frequency_ref01"}}],"index$":0}]}, 'Frequency')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let frequency_ref01_data = Object.values(setup.data.existing.frequency)[0] as any

    // LIST
    const frequency_ref01_ent = client.Frequency()
    const frequency_ref01_match: any = {}

    const frequency_ref01_list = (await frequency_ref01_ent.list(frequency_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/frequency/FrequencyTestData.json')

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
    ['frequency01','frequency02','frequency03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_FREQUENCY_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_FREQUENCY_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_FREQUENCY_ENTID']
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
  
