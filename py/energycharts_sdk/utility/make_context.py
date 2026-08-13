# EnergyCharts SDK utility: make_context

from energycharts_sdk.core.context import EnergyChartsContext


def make_context_util(ctxmap, basectx):
    return EnergyChartsContext(ctxmap, basectx)
