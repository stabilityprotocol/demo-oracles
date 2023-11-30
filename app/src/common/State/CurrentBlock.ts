import { atom } from "recoil";

export const currentBlockAtom = atom<number>({
    key: "currentBlockState",
    default: 0,
  });
  
  