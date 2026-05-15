<?php
declare(strict_types=1);

// EnergyCharts SDK utility: result_body

class EnergyChartsResultBody
{
    public static function call(EnergyChartsContext $ctx): ?EnergyChartsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
