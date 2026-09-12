import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { RenShareModel, RenShareModelListMatch } from '../EnergyChartsTypes';
declare class RenShareModelEntity extends EnergyChartsEntityBase<RenShareModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: RenShareModelEntity): RenShareModelEntity;
    list(this: any, reqmatch?: RenShareModelListMatch, ctrl?: Control): Promise<RenShareModelEntity[]>;
}
export { RenShareModelEntity };
