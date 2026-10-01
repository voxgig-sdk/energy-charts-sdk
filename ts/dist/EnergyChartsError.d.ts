import { Context } from './Context';
declare class EnergyChartsError extends Error {
    isEnergyChartsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    result?: any;
    spec?: any;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
    toJSON(): {
        sdk: string;
        code: string;
        message: string;
        status: number;
        result: any;
        spec: any;
    };
}
export { EnergyChartsError };
