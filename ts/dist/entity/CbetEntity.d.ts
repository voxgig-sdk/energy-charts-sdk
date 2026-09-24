import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { Cbet, CbetLoadMatch } from '../EnergyChartsTypes';
declare class CbetEntity extends EnergyChartsEntityBase<Cbet> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: CbetEntity): CbetEntity;
    load(this: any, reqmatch?: CbetLoadMatch, ctrl?: Control): Promise<CbetEntity>;
}
export { CbetEntity };
