import { CrossBorderModelEntity } from './entity/CrossBorderModelEntity';
import { DailyAvgDictEntity } from './entity/DailyAvgDictEntity';
import { FrequencyEntity } from './entity/FrequencyEntity';
import { InstalledModelEntity } from './entity/InstalledModelEntity';
import { PriceEntity } from './entity/PriceEntity';
import { ProductionModelEntity } from './entity/ProductionModelEntity';
import { PublicPowerForecastEntity } from './entity/PublicPowerForecastEntity';
import { RenShareModelEntity } from './entity/RenShareModelEntity';
import { ShareModelEntity } from './entity/ShareModelEntity';
import { TrafficModelEntity } from './entity/TrafficModelEntity';
export type * from './EnergyChartsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { EnergyChartsEntityBase } from './EnergyChartsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class EnergyChartsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CrossBorderModel(entopts?: Record<string, any>): CrossBorderModelEntity;
    DailyAvgDict(entopts?: Record<string, any>): DailyAvgDictEntity;
    Frequency(entopts?: Record<string, any>): FrequencyEntity;
    InstalledModel(entopts?: Record<string, any>): InstalledModelEntity;
    Price(entopts?: Record<string, any>): PriceEntity;
    ProductionModel(entopts?: Record<string, any>): ProductionModelEntity;
    PublicPowerForecast(entopts?: Record<string, any>): PublicPowerForecastEntity;
    RenShareModel(entopts?: Record<string, any>): RenShareModelEntity;
    ShareModel(entopts?: Record<string, any>): ShareModelEntity;
    TrafficModel(entopts?: Record<string, any>): TrafficModelEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): EnergyChartsSDK;
    tester(testopts?: any, sdkopts?: any): EnergyChartsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof EnergyChartsSDK;
export { stdutil, config, BaseFeature, EnergyChartsEntityBase, EnergyChartsSDK, SDK, };
