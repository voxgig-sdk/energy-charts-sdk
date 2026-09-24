import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { SolarShareDailyAvg, SolarShareDailyAvgListMatch } from '../EnergyChartsTypes';
declare class SolarShareDailyAvgEntity extends EnergyChartsEntityBase<SolarShareDailyAvg> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: SolarShareDailyAvgEntity): SolarShareDailyAvgEntity;
    list(this: any, reqmatch?: SolarShareDailyAvgListMatch, ctrl?: Control): Promise<SolarShareDailyAvgEntity[]>;
}
export { SolarShareDailyAvgEntity };
