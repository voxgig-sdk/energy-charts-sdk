import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { WindOffshoreShare, WindOffshoreShareLoadMatch } from '../EnergyChartsTypes';
declare class WindOffshoreShareEntity extends EnergyChartsEntityBase<WindOffshoreShare> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: WindOffshoreShareEntity): WindOffshoreShareEntity;
    load(this: any, reqmatch?: WindOffshoreShareLoadMatch, ctrl?: Control): Promise<WindOffshoreShareEntity>;
}
export { WindOffshoreShareEntity };
