

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { EnergyChartsSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('TotalPowerEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.TotalPower()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EnergyChartsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.TotalPower().load({"country":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'total_power.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deprecated":{"a":true,"h":"Deprecated","n":"deprecated","r":true,"t":"`$BOOLEAN`","key$":"deprecated","index$":0},"production_types":{"a":true,"h":"Production Types","n":"production_types","r":false,"t":"`$ANY`","key$":"production_types","index$":1},"unix_seconds":{"a":true,"h":"Unix Seconds","n":"unix_seconds","r":false,"t":"`$ANY`","key$":"unix_seconds","index$":2}},"name":"total_power","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /total_power","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"de","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"","k":"query","n":"end","or":"end","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"","k":"query","n":"start","or":"start","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/total_power","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"total_power"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"total_power","name__orig":"total_power","Name":"TotalPower","name_":"total_power","name-":"total-power","NAME":"TOTAL_POWER","index$":11}, {"active":true,"entity":"total_power","key$":"BasicTotalPowerFlow","kind":"basic","name":"BasicTotalPowerFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"total_power_ref01","srcdatavar":"total_power_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-total_power_ref01"}}],"index$":0}]}, 'TotalPower', {"GET /total_power":{"protocol":"http","parameters":[{"name":"country","in":"query","required":false,"schema":{"type":"string","default":"de","title":"Country"},"index$":0},{"name":"start","in":"query","required":false,"schema":{"type":"string","default":"","title":"Start"},"index$":1},{"name":"end","in":"query","required":false,"schema":{"type":"string","default":"","title":"End"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let total_power_ref01_data = Object.values(setup.data.existing.total_power)[0] as any

    // LOAD
    const total_power_ref01_ent = client.TotalPower()
    const total_power_ref01_match_dt0: any = {}
    const total_power_ref01_data_dt0 = (await total_power_ref01_ent.load(total_power_ref01_match_dt0)).data()
    assert(null != total_power_ref01_data_dt0)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/total_power/TotalPowerTestData.json')

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
    ['total_power01','total_power02','total_power03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_TOTAL_POWER_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_TOTAL_POWER_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_TOTAL_POWER_ENTID']
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
  
