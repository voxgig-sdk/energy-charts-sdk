<?php
declare(strict_types=1);

// EnergyCharts SDK utility: feature_add

class EnergyChartsFeatureAdd
{
    public static function call(EnergyChartsContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
