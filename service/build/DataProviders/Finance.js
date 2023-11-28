"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceDataProvider = exports.Pair = void 0;
const inversify_1 = require("inversify");
const zod_1 = require("zod");
var Pair;
(function (Pair) {
    Pair["BTC/USD"] = "BTC/USD";
    Pair["ETH/USD"] = "ETH/USD";
    Pair["EUR/USD"] = "EUR/USD";
    Pair["USD/CAD"] = "USD/CAD";
})(Pair = exports.Pair || (exports.Pair = {}));
const pairSchemas = Object.values(Pair).reduce((acc, pair) => {
    return Object.assign(Object.assign({}, acc), { [pair]: zod_1.z.object({
            c: zod_1.z.array(zod_1.z.string().regex(/^\d+(\.\d+)?$/)).length(2),
        }) });
}, {});
const responseKrakenSchema = zod_1.z.object({
    error: zod_1.z.array(zod_1.z.string()).length(0),
    result: zod_1.z.object(pairSchemas),
});
let FinanceDataProvider = class FinanceDataProvider {
    async getCurrentFinance() {
        const pairs = Object.values(Pair);
        const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pairs.join(',')}`);
        const data = await response.json();
        const parsedData = responseKrakenSchema.parse(data);
        return pairs.map(pair => {
            return {
                pair,
                price: parsedData.result[pair].c[0]
            };
        });
    }
};
FinanceDataProvider = __decorate([
    (0, inversify_1.injectable)()
], FinanceDataProvider);
exports.FinanceDataProvider = FinanceDataProvider;
//# sourceMappingURL=Finance.js.map