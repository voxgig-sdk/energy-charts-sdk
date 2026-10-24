

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


describe('InstalledModelEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ENERGY_CHARTS_TEST_LIVE=TRUE.
  afterEach(liveDelay('ENERGY_CHARTS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = EnergyChartsSDK.test()
    const ent = testsdk.InstalledModel()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('installed_model hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of EnergyChartsSDK.test(offline).InstalledModel().stream('list')) { }
    }, /offline/)

    for await (const _item of EnergyChartsSDK.test(offline).InstalledModel()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = EnergyChartsSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.InstalledModel().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of EnergyChartsSDK.test().InstalledModel().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new EnergyChartsSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.InstalledModel().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.InstalledModel().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = EnergyChartsSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.InstalledModel().list({"country":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ENERGY_CHARTS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'installed_model.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deprecated":{"a":true,"h":"Deprecated","n":"deprecated","r":true,"t":"`$BOOLEAN`","key$":"deprecated","index$":0},"last_update":{"a":true,"h":"Last Update","n":"last_update","r":true,"t":"`$ANY`","key$":"last_update","index$":1},"production_types":{"a":true,"h":"Production Types","n":"production_types","r":false,"t":"`$ANY`","key$":"production_types","index$":2},"time":{"a":true,"h":"Time","n":"time","r":true,"t":"`$ARRAY`","key$":"time","index$":3}},"name":"installed_model","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /installed_power","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"de","k":"query","n":"country","or":"country","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":false,"k":"query","n":"installation_decommission","or":"installation_decommission","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"ex":"yearly","k":"query","n":"time_step","or":"time_step","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/installed_power","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"installed_power"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"installed_model","name__orig":"installed_model","Name":"InstalledModel","name_":"installed_model","name-":"installed-model","NAME":"INSTALLED_MODEL","index$":3}, {"active":true,"entity":"installed_model","key$":"BasicInstalledModelFlow","kind":"basic","name":"BasicInstalledModelFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"installed_model_ref01"}}],"index$":0}]}, 'InstalledModel', {"GET /installed_power":{"protocol":"http","parameters":[{"name":"country","in":"query","required":false,"schema":{"type":"string","default":"de","title":"Country"},"index$":0},{"name":"time_step","in":"query","required":false,"schema":{"type":"string","default":"yearly","title":"Time Step"},"index$":1},{"name":"installation_decommission","in":"query","required":false,"schema":{"type":"boolean","default":false,"title":"Installation Decommission"},"index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let installed_model_ref01_data = Object.values(setup.data.existing.installed_model)[0] as any

    // LIST
    const installed_model_ref01_ent = client.InstalledModel()
    const installed_model_ref01_match: any = {}

    const installed_model_ref01_list = (await installed_model_ref01_ent.list(installed_model_ref01_match)).map((e: any) => e.data())


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
      '../../../../.sdk/test/entity/installed_model/InstalledModelTestData.json')

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
    ['installed_model01','installed_model02','installed_model03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ENERGY_CHARTS_TEST_INSTALLED_MODEL_ENTID': idmap,
    'ENERGY_CHARTS_TEST_LIVE': 'FALSE',
    'ENERGY_CHARTS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ENERGY_CHARTS_TEST_INSTALLED_MODEL_ENTID']

  const live = 'TRUE' === env.ENERGY_CHARTS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ENERGY_CHARTS_TEST_INSTALLED_MODEL_ENTID']
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
  
