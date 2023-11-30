import { atom } from "recoil";

export type OracleStateType = {
  [oracleKey: string]: {
    value: string;
    block: number;
  }
};

export const oracleAtom = atom<OracleStateType>({
  key: "oracleState",
  default: {
  },
});

