<?php
declare(strict_types=1);

// EnergyCharts SDK utility: prepare_body

class EnergyChartsPrepareBody
{
    public static function call(EnergyChartsContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
