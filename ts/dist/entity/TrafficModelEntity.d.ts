import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { TrafficModel, TrafficModelListMatch } from '../EnergyChartsTypes';
declare class TrafficModelEntity extends EnergyChartsEntityBase<TrafficModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: TrafficModelEntity): TrafficModelEntity;
    list(this: any, reqmatch?: TrafficModelListMatch, ctrl?: Control): Promise<TrafficModelEntity[]>;
}
export { TrafficModelEntity };
