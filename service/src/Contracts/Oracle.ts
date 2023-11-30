import { ethers, Contract, Wallet } from "ethers";
import { config } from "../Config";
import { OracleABI } from "../ABI/Oracle";
import { injectable } from "inversify";

@injectable()
export class OracleContract {
    private contract: Contract;
    private callQueue: Array<{key: string, value: string}> = [];
    private wallet: Wallet
    private nonce: number = 0;

    constructor() {
        const provider = new ethers.providers.JsonRpcProvider(
            config.RPC_URL
          );

          this.wallet = new ethers.Wallet(config.WALLET_PRIVATE_KEY, provider);

          this.contract =  new ethers.Contract(
            config.ORACLE_ADDRESS,
            OracleABI,
            this.wallet
          );

          this.wallet.getTransactionCount().then((nonce) => {
                this.nonce = nonce + 1;
          })
    }

    async setValue(key: string, value: string): Promise<void> {
        this.callQueue.push({key, value});
        this.handleQueue();
    }

    private async handleQueue(): Promise<void> {
        if (this.callQueue.length > 0) {

            const element = this.callQueue.shift();

            if (!element) {
                return;
            }

            const {key, value} = element;

            

            const nonce = this.nonce;
            this.nonce++;

            console.log(`Setting ${key} to ${value} with nonce ${nonce}`);
        
            await this.contract.setValue(key, value, {nonce: nonce, gasPrice: 0});

        }
    }
}