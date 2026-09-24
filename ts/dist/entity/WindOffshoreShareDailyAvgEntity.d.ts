import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { WindOffshoreShareDailyAvg, WindOffshoreShareDailyAvgListMatch } from '../EnergyChartsTypes';
declare class WindOffshoreShareDailyAvgEntity extends EnergyChartsEntityBase<WindOffshoreShareDailyAvg> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: WindOffshoreShareDailyAvgEntity): WindOffshoreShareDailyAvgEntity;
    list(this: any, reqmatch?: WindOffshoreShareDailyAvgListMatch, ctrl?: Control): Promise<WindOffshoreShareDailyAvgEntity[]>;
}
export { WindOffshoreShareDailyAvgEntity };
