import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { WindOnshoreShareDailyAvg, WindOnshoreShareDailyAvgListMatch } from '../EnergyChartsTypes';
declare class WindOnshoreShareDailyAvgEntity extends EnergyChartsEntityBase<WindOnshoreShareDailyAvg> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: WindOnshoreShareDailyAvgEntity): WindOnshoreShareDailyAvgEntity;
    list(this: any, reqmatch?: WindOnshoreShareDailyAvgListMatch, ctrl?: Control): Promise<WindOnshoreShareDailyAvgEntity[]>;
}
export { WindOnshoreShareDailyAvgEntity };
