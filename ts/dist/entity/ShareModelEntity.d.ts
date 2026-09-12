import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { ShareModel, ShareModelLoadMatch } from '../EnergyChartsTypes';
declare class ShareModelEntity extends EnergyChartsEntityBase<ShareModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: ShareModelEntity): ShareModelEntity;
    load(this: any, reqmatch?: ShareModelLoadMatch, ctrl?: Control): Promise<ShareModelEntity>;
}
export { ShareModelEntity };
