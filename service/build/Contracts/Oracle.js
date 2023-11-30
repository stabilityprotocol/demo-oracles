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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleContract = void 0;
const ethers_1 = require("ethers");
const Config_1 = require("../Config");
const Oracle_1 = require("../ABI/Oracle");
const inversify_1 = require("inversify");
let OracleContract = class OracleContract {
    constructor() {
        this.callQueue = [];
        this.nonce = 0;
        const provider = new ethers_1.ethers.providers.JsonRpcProvider(Config_1.config.RPC_URL);
        this.wallet = new ethers_1.ethers.Wallet(Config_1.config.WALLET_PRIVATE_KEY, provider);
        this.contract = new ethers_1.ethers.Contract(Config_1.config.ORACLE_ADDRESS, Oracle_1.OracleABI, this.wallet);
        this.wallet.getTransactionCount().then((nonce) => {
            this.nonce = nonce + 1;
        });
    }
    async setValue(key, value) {
        this.callQueue.push({ key, value });
        this.handleQueue();
    }
    async handleQueue() {
        if (this.callQueue.length > 0) {
            const element = this.callQueue.shift();
            if (!element) {
                return;
            }
            const { key, value } = element;
            const nonce = this.nonce;
            this.nonce++;
            console.log(`Setting ${key} to ${value} with nonce ${nonce}`);
            await this.contract.setValue(key, value, { nonce: nonce, gasPrice: 0 });
        }
    }
};
OracleContract = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], OracleContract);
exports.OracleContract = OracleContract;
//# sourceMappingURL=Oracle.js.map