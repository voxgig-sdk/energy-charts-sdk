import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { RenShareDailyAvg, RenShareDailyAvgListMatch } from '../EnergyChartsTypes';
declare class RenShareDailyAvgEntity extends EnergyChartsEntityBase<RenShareDailyAvg> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: RenShareDailyAvgEntity): RenShareDailyAvgEntity;
    list(this: any, reqmatch?: RenShareDailyAvgListMatch, ctrl?: Control): Promise<RenShareDailyAvgEntity[]>;
}
export { RenShareDailyAvgEntity };
