<?php
declare(strict_types=1);

// EnergyCharts SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class EnergyChartsMakeContext
{
    public static function call(array $ctxmap, ?EnergyChartsContext $basectx): EnergyChartsContext
    {
        return new EnergyChartsContext($ctxmap, $basectx);
    }
}
