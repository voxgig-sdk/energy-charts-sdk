import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { WindOnshoreShare, WindOnshoreShareLoadMatch } from '../EnergyChartsTypes';
declare class WindOnshoreShareEntity extends EnergyChartsEntityBase<WindOnshoreShare> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: WindOnshoreShareEntity): WindOnshoreShareEntity;
    load(this: any, reqmatch?: WindOnshoreShareLoadMatch, ctrl?: Control): Promise<WindOnshoreShareEntity>;
}
export { WindOnshoreShareEntity };
