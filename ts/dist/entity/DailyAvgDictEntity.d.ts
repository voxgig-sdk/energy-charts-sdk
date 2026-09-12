import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { DailyAvgDict, DailyAvgDictListMatch } from '../EnergyChartsTypes';
declare class DailyAvgDictEntity extends EnergyChartsEntityBase<DailyAvgDict> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: DailyAvgDictEntity): DailyAvgDictEntity;
    list(this: any, reqmatch?: DailyAvgDictListMatch, ctrl?: Control): Promise<DailyAvgDictEntity[]>;
}
export { DailyAvgDictEntity };
