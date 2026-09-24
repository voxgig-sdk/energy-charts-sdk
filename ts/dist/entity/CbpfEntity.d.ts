import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { Cbpf, CbpfLoadMatch } from '../EnergyChartsTypes';
declare class CbpfEntity extends EnergyChartsEntityBase<Cbpf> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: CbpfEntity): CbpfEntity;
    load(this: any, reqmatch?: CbpfLoadMatch, ctrl?: Control): Promise<CbpfEntity>;
}
export { CbpfEntity };
