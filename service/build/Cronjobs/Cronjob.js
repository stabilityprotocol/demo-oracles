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
exports.CronjobsTasks = void 0;
const cron_1 = require("cron");
const inversify_1 = require("inversify");
const UpdateWeather_1 = require("../UseCases/UpdateWeather");
const UpdateFinance_1 = require("../UseCases/UpdateFinance");
let CronjobsTasks = class CronjobsTasks {
    constructor(updateWeather, updateFinance) {
        this.updateWeather = updateWeather;
        this.updateFinance = updateFinance;
        this.weatherTask = new cron_1.CronJob('*/10 * * * * *', this.updateWeatherTask.bind(this));
        this.financeTask = new cron_1.CronJob('*/10 * * * * *', this.updateFinanceTask.bind(this));
    }
    start() {
        this.weatherTask.start();
        this.financeTask.start();
    }
    async updateWeatherTask() {
        this.updateWeather.execute();
    }
    async updateFinanceTask() {
        this.updateFinance.execute();
    }
};
CronjobsTasks = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(UpdateWeather_1.UpdateWeather)),
    __param(1, (0, inversify_1.inject)(UpdateFinance_1.UpdateFinance)),
    __metadata("design:paramtypes", [UpdateWeather_1.UpdateWeather, UpdateFinance_1.UpdateFinance])
], CronjobsTasks);
exports.CronjobsTasks = CronjobsTasks;
//# sourceMappingURL=Cronjob.js.map