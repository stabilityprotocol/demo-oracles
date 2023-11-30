"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinance = void 0;
const inversify_1 = require("inversify");
const Finance_1 = require("../DataProviders/Finance");
const Oracle_1 = require("../Contracts/Oracle");
let UpdateFinance = class UpdateFinance {
    constructor(financeDataProvider, oracleContract) {
        this.financeDataProvider = financeDataProvider;
        this.oracleContract = oracleContract;
    }
    async execute() {
        const financeData = await this.financeDataProvider.getCurrentFinance();
        for (let data of financeData) {
            await this.oracleContract.setValue(data.pair, data.price);
        }
    }
};
UpdateFinance = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(Finance_1.FinanceDataProvider)),
    __param(1, (0, inversify_1.inject)(Oracle_1.OracleContract)),
    __metadata("design:paramtypes", [Finance_1.FinanceDataProvider,
        Oracle_1.OracleContract])
], UpdateFinance);
exports.UpdateFinance = UpdateFinance;
//# sourceMappingURL=UpdateFinance.js.map