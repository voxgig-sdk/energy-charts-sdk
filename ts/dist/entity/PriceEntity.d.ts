import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { Price, PriceLoadMatch } from '../EnergyChartsTypes';
declare class PriceEntity extends EnergyChartsEntityBase<Price> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: PriceEntity): PriceEntity;
    load(this: any, reqmatch?: PriceLoadMatch, ctrl?: Control): Promise<PriceEntity>;
}
export { PriceEntity };
