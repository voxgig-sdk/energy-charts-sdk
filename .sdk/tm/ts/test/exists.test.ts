
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { EnergyChartsSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await EnergyChartsSDK.test()
    equal(null !== testsdk, true)
  })

})
