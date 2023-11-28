import { CronJob } from 'cron';
import { inject, injectable } from 'inversify';
import { UpdateWeather } from '../UseCases/UpdateWeather';
import { UpdateFinance } from '../UseCases/UpdateFinance';

@injectable()
export class CronjobsTasks{
    private weatherTask: CronJob;
    private financeTask: CronJob;
    
    constructor(@inject(UpdateWeather) private updateWeather: UpdateWeather, @inject(UpdateFinance) private updateFinance: UpdateFinance) {
        this.weatherTask = new CronJob('*/10 * * * * *', this.updateWeatherTask.bind(this));
        this.financeTask = new CronJob('*/10 * * * * *', this.updateFinanceTask.bind(this));
    }

    start(){
        this.weatherTask.start();
        this.financeTask.start();
    }

    async updateWeatherTask() {
        this.updateWeather.execute();
    }

    async updateFinanceTask() {
        this.updateFinance.execute();
    }
} 