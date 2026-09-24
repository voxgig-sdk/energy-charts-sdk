
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EnergyChartsSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = EnergyChartsSDK.test()
    equal(testsdk instanceof EnergyChartsSDK, true,
      'EnergyChartsSDK.test() must return a client synchronously')
  })

})
