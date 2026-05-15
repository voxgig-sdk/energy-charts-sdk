
import { Context } from './Context'


class EnergyChartsError extends Error {

  isEnergyChartsError = true

  sdk = 'EnergyCharts'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  EnergyChartsError
}

