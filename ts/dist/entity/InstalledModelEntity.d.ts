import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { InstalledModel, InstalledModelListMatch } from '../EnergyChartsTypes';
declare class InstalledModelEntity extends EnergyChartsEntityBase<InstalledModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: InstalledModelEntity): InstalledModelEntity;
    list(this: any, reqmatch?: InstalledModelListMatch, ctrl?: Control): Promise<InstalledModelEntity[]>;
}
export { InstalledModelEntity };
