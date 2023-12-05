import { inject, injectable } from "inversify";
import { IUseCase } from "../Types/IUseCase"
import { FinanceDataProvider } from "../DataProviders/Finance";
import { OracleContract } from "../Contracts/Oracle";


@injectable()
export class UpdateFinance implements IUseCase<void> {

    constructor(
        @inject(FinanceDataProvider) private financeDataProvider: FinanceDataProvider,
        @inject(OracleContract) private oracleContract: OracleContract,
        ) {

    }

    async execute(): Promise<void> {
        const financeData = await this.financeDataProvider.getCurrentFinance();
        

        for (let data of financeData) {
            this.oracleContract.setValue(data.pair, data.price);
        }
    }
}