<?php
declare(strict_types=1);

// EnergyCharts SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class EnergyChartsFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new EnergyChartsBaseFeature();
            case "test":
                return new EnergyChartsTestFeature();
            default:
                return new EnergyChartsBaseFeature();
        }
    }
}
