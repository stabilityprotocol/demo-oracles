import { useRecoilState } from "recoil"
import { oracleAtom } from "../State/Oracle"
import { ethers } from "ethers";
import { oracleContractAddress, stbleTestnet } from "../Blockchain";
import { OracleAbi } from "../Blockchain/oracleAbi";
import { OracleKey } from "./Types";
import { useEffect } from "react";
import { currentBlockAtom } from "../State/CurrentBlock";

export const OracleSync = () => {
    const [ oracleData, setOracleData ] = useRecoilState(oracleAtom)
    const [ currentBlock, setCurrentBlock ] = useRecoilState(currentBlockAtom)

    const getValues = async () => {
        const provider = new ethers.providers.JsonRpcProvider(stbleTestnet.rpcUrls.default.http[0]);

        const oracleContract = new ethers.Contract(
            oracleContractAddress,
            OracleAbi,
            provider
        )
        
        Object.values(OracleKey).forEach(async (oracleKey) => {
            const value = await oracleContract.oracleValues(oracleKey)
            setOracleData((oldData) => {
                return {
                    ...oldData,
                    [oracleKey]: {
                        value: value[0],
                        block: value[1].toNumber()
                    }
                }
            })
        })

    }

    useEffect(() => {
        getValues();
        const interval = setInterval(() => {
            getValues();
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        const provider = new ethers.providers.JsonRpcProvider(stbleTestnet.rpcUrls.default.http[0]);

        provider.getBlockNumber().then((blockNumber) => {
            setCurrentBlock(blockNumber)
        })
        const interval = setInterval(() => {
            provider.getBlockNumber().then((blockNumber) => {
                console.log("Current block: " + blockNumber)
                setCurrentBlock(blockNumber)
            })
        }, 2000);

        return () => clearInterval(interval);
    }, [])


    

    return null
}