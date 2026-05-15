<?php
declare(strict_types=1);

// EnergyCharts SDK utility: result_headers

class EnergyChartsResultHeaders
{
    public static function call(EnergyChartsContext $ctx): ?EnergyChartsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
