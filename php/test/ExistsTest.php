<?php
declare(strict_types=1);

// EnergyCharts SDK exists test

require_once __DIR__ . '/../energycharts_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = EnergyChartsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
