// EnergyCharts Ts SDK

import { CbetEntity } from './entity/CbetEntity'
import { CbpfEntity } from './entity/CbpfEntity'
import { FrequencyEntity } from './entity/FrequencyEntity'
import { InstalledModelEntity } from './entity/InstalledModelEntity'
import { PriceEntity } from './entity/PriceEntity'
import { PublicPowerEntity } from './entity/PublicPowerEntity'
import { PublicPowerForecastEntity } from './entity/PublicPowerForecastEntity'
import { RenShareDailyAvgEntity } from './entity/RenShareDailyAvgEntity'
import { RenShareModelEntity } from './entity/RenShareModelEntity'
import { SolarShareEntity } from './entity/SolarShareEntity'
import { SolarShareDailyAvgEntity } from './entity/SolarShareDailyAvgEntity'
import { TotalPowerEntity } from './entity/TotalPowerEntity'
import { TrafficModelEntity } from './entity/TrafficModelEntity'
import { WindOffshoreShareEntity } from './entity/WindOffshoreShareEntity'
import { WindOffshoreShareDailyAvgEntity } from './entity/WindOffshoreShareDailyAvgEntity'
import { WindOnshoreShareEntity } from './entity/WindOnshoreShareEntity'
import { WindOnshoreShareDailyAvgEntity } from './entity/WindOnshoreShareDailyAvgEntity'

export type * from './EnergyChartsTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { EnergyChartsEntityBase } from './EnergyChartsEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'



const stdutil = new Utility()


class EnergyChartsSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context
  

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    for (const key of ['_options', '_rootctx', '_features']) {
      Object.defineProperty(this, key, {
        value: (this as any)[key], enumerable: false, writable: true, configurable: true
      })
    }

    const struct = this._utility.struct
    const getpath = struct.getpath

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    // Add features in the resolved order (makeOptions puts an explicit
    // array order first, else defaults to test-first). Ordering matters:
    // the `test` feature installs the base mock transport and the transport
    // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is current,
    // so `test` must be added before them to sit at the base of the chain.
    const extend = this._options.extend || []

    const featureorder = getpath(this._options, '__derived__.featureorder') || []
    for (const fname of featureorder) {
      const fopts = this._options.feature[fname] || {}
      if (fopts.active) {
        // An active name with no generated class is legal when an
        // extend-supplied instance carries that name (station's adopt
        // path): the instance is added below, positioned by its own
        // __after__ entry, so skip it here rather than fail construction.
        if (!this._rootctx.config.hasFeature(fname) &&
          extend.some((f: any) => fname === f.name)) {
          continue
        }
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    }

    for (let f of extend) {
      featureAdd(this._rootctx, f)
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }

  


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    

    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  // Raw endpoint access is operator-controllable, like every entity op.
  // Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
  // either one reaches the same endpoint.
  async direct(fetchargs?: any) {
    if (!this._options.allow.op.includes('direct')) {
      return {
        ok: false,
        err: new Error('EnergyChartsSDK: direct: operation not allowed by' +
          ' SDK option allow.op value: "' + this._options.allow.op + '"'),
      }
    }

    return this._rawRequest(fetchargs)
  }


  // Ungated request path shared by direct() and graphql(), each of which
  // checks its own allow.op token first. Private, rather than a flag on
  // fetchargs: a caller-supplied marker would let anyone opt straight back
  // out of the gate by passing it.
  async _rawRequest(fetchargs?: any) {
    const utility = this._utility

    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: utility.clean(ctx, fetched) }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err: utility.clean(ctx, err) }
    }
  }



  async graphql(query: string, variables?: any, ctrl?: any) {
    const options = this._options

    if (!options.allow.op.includes('graphql')) {
      return {
        ok: false,
        err: new Error('EnergyChartsSDK: graphql: operation not allowed by' +
          ' SDK option allow.op value: "' + options.allow.op + '"'),
      }
    }

    const res: any = await this._rawRequest({
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: { query, variables: variables || {} },
      ctrl,
    })

    if (res instanceof Error) {
      return res
    }

    // Errors are read BEFORE any status check: a GraphQL parse or validation
    // failure comes back as HTTP 400 carrying the standard { errors: [...] }
    // body, and the raw path represents a non-2xx as { ok: false } with no
    // err — so returning early on status would discard the server's own
    // diagnostics, which are the only useful part of that response.
    const errors = null == res.data ? undefined : res.data.errors

    if (null != errors && Array.isArray(errors) && 0 < errors.length) {
      const first = errors[0] || {}
      const err: any = new Error('EnergyChartsSDK: graphql: ' +
        (first.message || 'graphql error'))
      err.graphql = errors
      return { ok: false, status: res.status, headers: res.headers, err, data: res.data }
    }

    return res
  }



  // Entity access: `client.Cbet().list()` / `client.Cbet().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Cbet(entopts?: Record<string, any>) {
    const self = this
    return new CbetEntity(self, entopts)
  }


  // Entity access: `client.Cbpf().list()` / `client.Cbpf().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Cbpf(entopts?: Record<string, any>) {
    const self = this
    return new CbpfEntity(self, entopts)
  }


  // Entity access: `client.Frequency().list()` / `client.Frequency().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Frequency(entopts?: Record<string, any>) {
    const self = this
    return new FrequencyEntity(self, entopts)
  }


  // Entity access: `client.InstalledModel().list()` / `client.InstalledModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  InstalledModel(entopts?: Record<string, any>) {
    const self = this
    return new InstalledModelEntity(self, entopts)
  }


  // Entity access: `client.Price().list()` / `client.Price().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  Price(entopts?: Record<string, any>) {
    const self = this
    return new PriceEntity(self, entopts)
  }


  // Entity access: `client.PublicPower().list()` / `client.PublicPower().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PublicPower(entopts?: Record<string, any>) {
    const self = this
    return new PublicPowerEntity(self, entopts)
  }


  // Entity access: `client.PublicPowerForecast().list()` / `client.PublicPowerForecast().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  PublicPowerForecast(entopts?: Record<string, any>) {
    const self = this
    return new PublicPowerForecastEntity(self, entopts)
  }


  // Entity access: `client.RenShareDailyAvg().list()` / `client.RenShareDailyAvg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RenShareDailyAvg(entopts?: Record<string, any>) {
    const self = this
    return new RenShareDailyAvgEntity(self, entopts)
  }


  // Entity access: `client.RenShareModel().list()` / `client.RenShareModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  RenShareModel(entopts?: Record<string, any>) {
    const self = this
    return new RenShareModelEntity(self, entopts)
  }


  // Entity access: `client.SolarShare().list()` / `client.SolarShare().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SolarShare(entopts?: Record<string, any>) {
    const self = this
    return new SolarShareEntity(self, entopts)
  }


  // Entity access: `client.SolarShareDailyAvg().list()` / `client.SolarShareDailyAvg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  SolarShareDailyAvg(entopts?: Record<string, any>) {
    const self = this
    return new SolarShareDailyAvgEntity(self, entopts)
  }


  // Entity access: `client.TotalPower().list()` / `client.TotalPower().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TotalPower(entopts?: Record<string, any>) {
    const self = this
    return new TotalPowerEntity(self, entopts)
  }


  // Entity access: `client.TrafficModel().list()` / `client.TrafficModel().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  TrafficModel(entopts?: Record<string, any>) {
    const self = this
    return new TrafficModelEntity(self, entopts)
  }


  // Entity access: `client.WindOffshoreShare().list()` / `client.WindOffshoreShare().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WindOffshoreShare(entopts?: Record<string, any>) {
    const self = this
    return new WindOffshoreShareEntity(self, entopts)
  }


  // Entity access: `client.WindOffshoreShareDailyAvg().list()` / `client.WindOffshoreShareDailyAvg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WindOffshoreShareDailyAvg(entopts?: Record<string, any>) {
    const self = this
    return new WindOffshoreShareDailyAvgEntity(self, entopts)
  }


  // Entity access: `client.WindOnshoreShare().list()` / `client.WindOnshoreShare().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WindOnshoreShare(entopts?: Record<string, any>) {
    const self = this
    return new WindOnshoreShareEntity(self, entopts)
  }


  // Entity access: `client.WindOnshoreShareDailyAvg().list()` / `client.WindOnshoreShareDailyAvg().load({ id })`.
  // The argument is the entity OPTIONS object (passed to the entity
  // constructor as entopts), not initial entity data.
  WindOnshoreShareDailyAvg(entopts?: Record<string, any>) {
    const self = this
    return new WindOnshoreShareDailyAvgEntity(self, entopts)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new EnergyChartsSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return EnergyChartsSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'EnergyCharts' }
  }

  toString() {
    return 'EnergyCharts ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = EnergyChartsSDK


export {
  stdutil,
  config,
  

  BaseFeature,
  EnergyChartsEntityBase,

  EnergyChartsSDK,
  SDK,
}


