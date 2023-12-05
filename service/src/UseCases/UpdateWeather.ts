import { inject, injectable } from "inversify";
import { IUseCase } from "../Types/IUseCase"
import { WeatherDataProvider } from "../DataProviders/Weather";
import { OracleContract } from "../Contracts/Oracle";


@injectable()
export class UpdateWeather implements IUseCase<void> {

    constructor(
        @inject(WeatherDataProvider) private weatherDataProvider: WeatherDataProvider,
        @inject(OracleContract) private oracleContract: OracleContract,
        ) {

    }

    async execute(): Promise<void> {
    
        const weatherData = await this.weatherDataProvider.getCurrentWeather();
        
        for (let data of weatherData) {
            this.oracleContract.setValue(data.city, data.temperature.toString());
        }
    }
}