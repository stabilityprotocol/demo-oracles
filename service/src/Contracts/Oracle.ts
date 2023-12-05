import { ethers } from "ethers";
import { config } from "../Config";
import { injectable } from "inversify";
import { OracleABI } from "../ABI/Oracle";

@injectable()
export class OracleContract {
    private provider: ethers.providers.JsonRpcProvider;

    constructor() {
        this.provider = new ethers.providers.JsonRpcProvider(
            config.RPC_URL
          );

    }

    async setValue(key: string, value: string): Promise<void> {

        const wallet = ethers.Wallet.createRandom().connect(this.provider);

        const contract = new ethers.Contract(
            config.ORACLE_ADDRESS,
            OracleABI,
            wallet);

            
        console.log(`Setting ${key} to ${value} with address ${wallet.address}`);
        await contract.setValue(key, value, {nonce: 0, gasPrice: 0});
    } 
}