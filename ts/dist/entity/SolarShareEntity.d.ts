import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { SolarShare, SolarShareLoadMatch } from '../EnergyChartsTypes';
declare class SolarShareEntity extends EnergyChartsEntityBase<SolarShare> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: SolarShareEntity): SolarShareEntity;
    load(this: any, reqmatch?: SolarShareLoadMatch, ctrl?: Control): Promise<SolarShareEntity>;
}
export { SolarShareEntity };
