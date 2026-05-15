<?php
declare(strict_types=1);

// EnergyCharts SDK utility: prepare_headers

class EnergyChartsPrepareHeaders
{
    public static function call(EnergyChartsContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
