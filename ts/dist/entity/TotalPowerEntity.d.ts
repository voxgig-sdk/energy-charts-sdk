import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { TotalPower, TotalPowerLoadMatch } from '../EnergyChartsTypes';
declare class TotalPowerEntity extends EnergyChartsEntityBase<TotalPower> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: TotalPowerEntity): TotalPowerEntity;
    load(this: any, reqmatch?: TotalPowerLoadMatch, ctrl?: Control): Promise<TotalPowerEntity>;
}
export { TotalPowerEntity };
