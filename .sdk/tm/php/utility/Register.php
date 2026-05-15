<?php
declare(strict_types=1);

// EnergyCharts SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

EnergyChartsUtility::setRegistrar(function (EnergyChartsUtility $u): void {
    $u->clean = [EnergyChartsClean::class, 'call'];
    $u->done = [EnergyChartsDone::class, 'call'];
    $u->make_error = [EnergyChartsMakeError::class, 'call'];
    $u->feature_add = [EnergyChartsFeatureAdd::class, 'call'];
    $u->feature_hook = [EnergyChartsFeatureHook::class, 'call'];
    $u->feature_init = [EnergyChartsFeatureInit::class, 'call'];
    $u->fetcher = [EnergyChartsFetcher::class, 'call'];
    $u->make_fetch_def = [EnergyChartsMakeFetchDef::class, 'call'];
    $u->make_context = [EnergyChartsMakeContext::class, 'call'];
    $u->make_options = [EnergyChartsMakeOptions::class, 'call'];
    $u->make_request = [EnergyChartsMakeRequest::class, 'call'];
    $u->make_response = [EnergyChartsMakeResponse::class, 'call'];
    $u->make_result = [EnergyChartsMakeResult::class, 'call'];
    $u->make_point = [EnergyChartsMakePoint::class, 'call'];
    $u->make_spec = [EnergyChartsMakeSpec::class, 'call'];
    $u->make_url = [EnergyChartsMakeUrl::class, 'call'];
    $u->param = [EnergyChartsParam::class, 'call'];
    $u->prepare_auth = [EnergyChartsPrepareAuth::class, 'call'];
    $u->prepare_body = [EnergyChartsPrepareBody::class, 'call'];
    $u->prepare_headers = [EnergyChartsPrepareHeaders::class, 'call'];
    $u->prepare_method = [EnergyChartsPrepareMethod::class, 'call'];
    $u->prepare_params = [EnergyChartsPrepareParams::class, 'call'];
    $u->prepare_path = [EnergyChartsPreparePath::class, 'call'];
    $u->prepare_query = [EnergyChartsPrepareQuery::class, 'call'];
    $u->result_basic = [EnergyChartsResultBasic::class, 'call'];
    $u->result_body = [EnergyChartsResultBody::class, 'call'];
    $u->result_headers = [EnergyChartsResultHeaders::class, 'call'];
    $u->transform_request = [EnergyChartsTransformRequest::class, 'call'];
    $u->transform_response = [EnergyChartsTransformResponse::class, 'call'];
});
