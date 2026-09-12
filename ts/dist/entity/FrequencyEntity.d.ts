import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { Frequency, FrequencyListMatch } from '../EnergyChartsTypes';
declare class FrequencyEntity extends EnergyChartsEntityBase<Frequency> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: FrequencyEntity): FrequencyEntity;
    list(this: any, reqmatch?: FrequencyListMatch, ctrl?: Control): Promise<FrequencyEntity[]>;
}
export { FrequencyEntity };
