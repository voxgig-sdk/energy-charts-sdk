# ProjectName SDK exists test

import pytest
from energycharts_sdk import EnergyChartsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = EnergyChartsSDK.test(None, None)
        assert testsdk is not None
