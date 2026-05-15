-- EnergyCharts SDK error

local EnergyChartsError = {}
EnergyChartsError.__index = EnergyChartsError


function EnergyChartsError.new(code, msg, ctx)
  local self = setmetatable({}, EnergyChartsError)
  self.is_sdk_error = true
  self.sdk = "EnergyCharts"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function EnergyChartsError:error()
  return self.msg
end


function EnergyChartsError:__tostring()
  return self.msg
end


return EnergyChartsError
