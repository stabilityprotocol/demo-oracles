import { useRecoilState } from "recoil";
import { oracleTransactionsAtom } from "../State/OracleTransactions";
import { explorerApi, oracleContractAddress } from "../Blockchain";
import { ethers } from "ethers";
import { z } from "zod";
import { OracleAbi } from "../Blockchain/oracleAbi";
import { useEffect } from "react";

const explorerTransactionSchema = z.object({
  timestamp: z.string().transform((val) => new Date(val)).transform((val) => val.getTime()),
  hash: z.string(),
  block: z.number(),
  raw_input: z.string(),
});

const explorerResponseSchema = z.object({
  items: z.array(explorerTransactionSchema),
});

const oracleInterface = new ethers.utils.Interface(OracleAbi);

export const OracleTransactions = () => {
  const [_, setTransactions] = useRecoilState(
    oracleTransactionsAtom
  );

  const getTransactions = async () => {
    const response = await fetch(
      `${explorerApi}/addresses/${oracleContractAddress}/transactions?filterTo=to`
    );

    const data = await response.json();

    const parsedData = explorerResponseSchema.parse(data);

    const transactionsRows = parsedData.items.map((item) => {
      const parsedInput = oracleInterface.parseTransaction({
        data: item.raw_input,
      });
      const oracleKey = parsedInput.args[0];
      const value = parsedInput.args[1];

      return {
        hash: item.hash,
        oracleKey,
        value,
        blockNumber: item.block,
        timestamp: item.timestamp,
      };
    });

    console.log(transactionsRows);
    setTransactions(transactionsRows);
  };

  useEffect(() => {
    getTransactions();
    const interval = setInterval(() => {
      getTransactions();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return null;
};
