package core

type EnergyChartsError struct {
	IsEnergyChartsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewEnergyChartsError(code string, msg string, ctx *Context) *EnergyChartsError {
	return &EnergyChartsError{
		IsEnergyChartsError: true,
		Sdk:              "EnergyCharts",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *EnergyChartsError) Error() string {
	return e.Msg
}
