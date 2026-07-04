// EnergyCharts Ts SDK

import { CrossBorderModelEntity } from './entity/CrossBorderModelEntity'
import { DailyAvgDictEntity } from './entity/DailyAvgDictEntity'
import { FrequencyEntity } from './entity/FrequencyEntity'
import { InstalledModelEntity } from './entity/InstalledModelEntity'
import { PriceEntity } from './entity/PriceEntity'
import { ProductionModelEntity } from './entity/ProductionModelEntity'
import { PublicPowerForecastEntity } from './entity/PublicPowerForecastEntity'
import { RenShareModelEntity } from './entity/RenShareModelEntity'
import { ShareModelEntity } from './entity/ShareModelEntity'
import { TrafficModelEntity } from './entity/TrafficModelEntity'

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

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
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

    // Build spec directly from SDK options + user-provided fetch args.
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

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
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
        return { ok: false, err: fetched }
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
      return { ok: false, err }
    }
  }



  _cross_border_model?: CrossBorderModelEntity

  // Idiomatic facade: `client.cross_border_model.list()` / `client.cross_border_model.load({ id })`.
  get cross_border_model(): CrossBorderModelEntity {
    return (this._cross_border_model ??= new CrossBorderModelEntity(this, undefined))
  }

  /** @deprecated Use `client.cross_border_model` instead. */
  CrossBorderModel(data?: any) {
    const self = this
    return new CrossBorderModelEntity(self,data)
  }


  _daily_avg_dict?: DailyAvgDictEntity

  // Idiomatic facade: `client.daily_avg_dict.list()` / `client.daily_avg_dict.load({ id })`.
  get daily_avg_dict(): DailyAvgDictEntity {
    return (this._daily_avg_dict ??= new DailyAvgDictEntity(this, undefined))
  }

  /** @deprecated Use `client.daily_avg_dict` instead. */
  DailyAvgDict(data?: any) {
    const self = this
    return new DailyAvgDictEntity(self,data)
  }


  _frequency?: FrequencyEntity

  // Idiomatic facade: `client.frequency.list()` / `client.frequency.load({ id })`.
  get frequency(): FrequencyEntity {
    return (this._frequency ??= new FrequencyEntity(this, undefined))
  }

  /** @deprecated Use `client.frequency` instead. */
  Frequency(data?: any) {
    const self = this
    return new FrequencyEntity(self,data)
  }


  _installed_model?: InstalledModelEntity

  // Idiomatic facade: `client.installed_model.list()` / `client.installed_model.load({ id })`.
  get installed_model(): InstalledModelEntity {
    return (this._installed_model ??= new InstalledModelEntity(this, undefined))
  }

  /** @deprecated Use `client.installed_model` instead. */
  InstalledModel(data?: any) {
    const self = this
    return new InstalledModelEntity(self,data)
  }


  _price?: PriceEntity

  // Idiomatic facade: `client.price.list()` / `client.price.load({ id })`.
  get price(): PriceEntity {
    return (this._price ??= new PriceEntity(this, undefined))
  }

  /** @deprecated Use `client.price` instead. */
  Price(data?: any) {
    const self = this
    return new PriceEntity(self,data)
  }


  _production_model?: ProductionModelEntity

  // Idiomatic facade: `client.production_model.list()` / `client.production_model.load({ id })`.
  get production_model(): ProductionModelEntity {
    return (this._production_model ??= new ProductionModelEntity(this, undefined))
  }

  /** @deprecated Use `client.production_model` instead. */
  ProductionModel(data?: any) {
    const self = this
    return new ProductionModelEntity(self,data)
  }


  _public_power_forecast?: PublicPowerForecastEntity

  // Idiomatic facade: `client.public_power_forecast.list()` / `client.public_power_forecast.load({ id })`.
  get public_power_forecast(): PublicPowerForecastEntity {
    return (this._public_power_forecast ??= new PublicPowerForecastEntity(this, undefined))
  }

  /** @deprecated Use `client.public_power_forecast` instead. */
  PublicPowerForecast(data?: any) {
    const self = this
    return new PublicPowerForecastEntity(self,data)
  }


  _ren_share_model?: RenShareModelEntity

  // Idiomatic facade: `client.ren_share_model.list()` / `client.ren_share_model.load({ id })`.
  get ren_share_model(): RenShareModelEntity {
    return (this._ren_share_model ??= new RenShareModelEntity(this, undefined))
  }

  /** @deprecated Use `client.ren_share_model` instead. */
  RenShareModel(data?: any) {
    const self = this
    return new RenShareModelEntity(self,data)
  }


  _share_model?: ShareModelEntity

  // Idiomatic facade: `client.share_model.list()` / `client.share_model.load({ id })`.
  get share_model(): ShareModelEntity {
    return (this._share_model ??= new ShareModelEntity(this, undefined))
  }

  /** @deprecated Use `client.share_model` instead. */
  ShareModel(data?: any) {
    const self = this
    return new ShareModelEntity(self,data)
  }


  _traffic_model?: TrafficModelEntity

  // Idiomatic facade: `client.traffic_model.list()` / `client.traffic_model.load({ id })`.
  get traffic_model(): TrafficModelEntity {
    return (this._traffic_model ??= new TrafficModelEntity(this, undefined))
  }

  /** @deprecated Use `client.traffic_model` instead. */
  TrafficModel(data?: any) {
    const self = this
    return new TrafficModelEntity(self,data)
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

  BaseFeature,
  EnergyChartsEntityBase,

  EnergyChartsSDK,
  SDK,
}


