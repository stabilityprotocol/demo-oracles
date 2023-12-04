import { ethers, Contract, Wallet } from "ethers";
import { config } from "../Config";
import { OracleABI } from "../ABI/Oracle";
import { injectable } from "inversify";
import { exit } from "process";

@injectable()
export class OracleContract {
    private contract: Contract;
    private callQueue: Array<{key: string, value: string}> = [];
    private wallet: Wallet
    private nonce: number | undefined = 0;
    private lastNonce: number | undefined = 0;

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

          this.resyncNonce();
    }

    async setValue(key: string, value: string): Promise<void> {
        this.callQueue.push({key, value});
        this.handleQueue();
    }

    private async handleQueue(): Promise<void> {
        if (!this.nonce) {
            return;
        }
    
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

    private async resyncNonce(): Promise<void> {
        this.nonce = await this.wallet.getTransactionCount();
        this.lastNonce = this.nonce;
        setInterval(async () => {
            console.log("Checking nonce");
            const actuallyNonce = await this.wallet.getTransactionCount();

            if (actuallyNonce === this.lastNonce) {
                this.nonce = actuallyNonce;
                console.log("Nonce is stuck, resyncing");
            }
            this.lastNonce = actuallyNonce;

        }, 30000);
    }
}