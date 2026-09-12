import { EnergyChartsEntityBase } from '../EnergyChartsEntityBase';
import type { EnergyChartsSDK } from '../EnergyChartsSDK';
import type { Control } from '../types';
import type { PublicPowerForecast, PublicPowerForecastListMatch } from '../EnergyChartsTypes';
declare class PublicPowerForecastEntity extends EnergyChartsEntityBase<PublicPowerForecast> {
    constructor(client: EnergyChartsSDK, entopts: any);
    make(this: PublicPowerForecastEntity): PublicPowerForecastEntity;
    list(this: any, reqmatch?: PublicPowerForecastListMatch, ctrl?: Control): Promise<PublicPowerForecastEntity[]>;
}
export { PublicPowerForecastEntity };
