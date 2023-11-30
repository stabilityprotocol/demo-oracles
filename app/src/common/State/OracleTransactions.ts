import { atom } from "recoil";

export type OracleTransaction = {
    hash: string;
    oracleKey: string;
    value: string;
    blockNumber: number;
    timestamp: number;
}

export const oracleTransactionsAtom = atom<OracleTransaction[]>({
  key: "oracleTransactionsState",
  default: [],
});

