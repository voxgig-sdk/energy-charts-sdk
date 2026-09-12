import { Context } from './Context';
declare class EnergyChartsError extends Error {
    isEnergyChartsError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { EnergyChartsError };
