# EnergyCharts SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

EnergyChartsUtility.registrar = ->(u) {
  u.clean = EnergyChartsUtilities::Clean
  u.done = EnergyChartsUtilities::Done
  u.make_error = EnergyChartsUtilities::MakeError
  u.feature_add = EnergyChartsUtilities::FeatureAdd
  u.feature_hook = EnergyChartsUtilities::FeatureHook
  u.feature_init = EnergyChartsUtilities::FeatureInit
  u.fetcher = EnergyChartsUtilities::Fetcher
  u.make_fetch_def = EnergyChartsUtilities::MakeFetchDef
  u.make_context = EnergyChartsUtilities::MakeContext
  u.make_options = EnergyChartsUtilities::MakeOptions
  u.make_request = EnergyChartsUtilities::MakeRequest
  u.make_response = EnergyChartsUtilities::MakeResponse
  u.make_result = EnergyChartsUtilities::MakeResult
  u.make_point = EnergyChartsUtilities::MakePoint
  u.make_spec = EnergyChartsUtilities::MakeSpec
  u.make_url = EnergyChartsUtilities::MakeUrl
  u.param = EnergyChartsUtilities::Param
  u.prepare_auth = EnergyChartsUtilities::PrepareAuth
  u.prepare_body = EnergyChartsUtilities::PrepareBody
  u.prepare_headers = EnergyChartsUtilities::PrepareHeaders
  u.prepare_method = EnergyChartsUtilities::PrepareMethod
  u.prepare_params = EnergyChartsUtilities::PrepareParams
  u.prepare_path = EnergyChartsUtilities::PreparePath
  u.prepare_query = EnergyChartsUtilities::PrepareQuery
  u.result_basic = EnergyChartsUtilities::ResultBasic
  u.result_body = EnergyChartsUtilities::ResultBody
  u.result_headers = EnergyChartsUtilities::ResultHeaders
  u.transform_request = EnergyChartsUtilities::TransformRequest
  u.transform_response = EnergyChartsUtilities::TransformResponse
}
