import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { CrossBorderModel, CrossBorderModelLoadMatch } from '../EnergyChartsTypes';
declare class CrossBorderModelEntity extends EnergyChartsEntityBase<CrossBorderModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: CrossBorderModelEntity): CrossBorderModelEntity;
    load(this: any, reqmatch?: CrossBorderModelLoadMatch, ctrl?: Control): Promise<CrossBorderModelEntity>;
}
export { CrossBorderModelEntity };
