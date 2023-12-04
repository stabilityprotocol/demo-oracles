import 'dotenv/config'
import 'reflect-metadata'
import { WeatherDataProvider } from "./DataProviders/Weather";

import { Container } from "inversify";
import { UpdateWeather } from './UseCases/UpdateWeather';
import { CronjobsTasks } from './Cronjobs/Cronjob';
import { UpdateFinance } from './UseCases/UpdateFinance';
import { FinanceDataProvider } from './DataProviders/Finance';
import { OracleContract } from './Contracts/Oracle';

export const container = new Container();


container.bind(UpdateWeather).toSelf().inSingletonScope();
container.bind(WeatherDataProvider).toSelf().inSingletonScope();
container.bind(UpdateFinance).toSelf().inSingletonScope();
container.bind(FinanceDataProvider).toSelf().inSingletonScope();
container.bind(CronjobsTasks).toSelf().inSingletonScope();
container.bind(OracleContract).toSelf().inSingletonScope();

const cronjobsTasks = container.get(CronjobsTasks);

cronjobsTasks.start();

