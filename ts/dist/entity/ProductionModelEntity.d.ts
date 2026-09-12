import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { ProductionModel, ProductionModelLoadMatch } from '../EnergyChartsTypes';
declare class ProductionModelEntity extends EnergyChartsEntityBase<ProductionModel> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: ProductionModelEntity): ProductionModelEntity;
    load(this: any, reqmatch?: ProductionModelLoadMatch, ctrl?: Control): Promise<ProductionModelEntity>;
}
export { ProductionModelEntity };
