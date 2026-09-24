import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { PublicPower, PublicPowerLoadMatch } from '../EnergyChartsTypes';
declare class PublicPowerEntity extends EnergyChartsEntityBase<PublicPower> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: PublicPowerEntity): PublicPowerEntity;
    load(this: any, reqmatch?: PublicPowerLoadMatch, ctrl?: Control): Promise<PublicPowerEntity>;
}
export { PublicPowerEntity };
