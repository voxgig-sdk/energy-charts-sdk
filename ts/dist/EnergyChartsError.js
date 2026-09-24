"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnergyChartsError = void 0;
class EnergyChartsError extends Error {
    isEnergyChartsError = true;
    sdk = 'EnergyCharts';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.EnergyChartsError = EnergyChartsError;
//# sourceMappingURL=EnergyChartsError.js.map