import { useRecoilState } from "recoil";
import CloudyIcon from "../../../../assets/cloudy.png"
import BitcoinIcon from "../../../../assets/bitcoin.png"
import EthereumIcon from "../../../../assets/ethereum.png"
import EuroIcon from "../../../../assets/euro.png"
import CanadianDollarIcon from "../../../../assets/canadian-dollar.png"
import { OracleKey, isFinanceOracle, isWeatherOracle } from "../../../../common/Oracle/Types";
import { OracleLinkToBlock, OracleNumber, OracleNumberUnit, OracleNumberWrapper, OracleTitle, OracleTitleWrapper, OracleValueIcon, OracleValueUnitWrapper, OracleValueWrapper } from "./Styles";
import { oracleAtom } from "../../../../common/State/Oracle";
import { useMemo } from "react";
import { currentBlockAtom } from "../../../../common/State/CurrentBlock";
import { stbleTestnet } from "../../../../common/Blockchain"



export const OracleValue = (
    props: {type: OracleKey}
) => {

    const [ oracleState ] = useRecoilState(oracleAtom);
    const [ currentBlock ] = useRecoilState(currentBlockAtom);

    const oracleData = useMemo(() => {
        return oracleState[props.type] ?? {
            value: "0.00",
            blockNumber: 0,
        }
    }, [oracleState, props.type]);

    const oracleUnit = useMemo(() => {
        if (isWeatherOracle(props.type)) {
            return "°F";
        }
        if (isFinanceOracle(props.type)) {
            return "$";
        }

        return "";
    }, [props.type]);

    const oracleTitle = useMemo(() => {
        switch (props.type) {
            case OracleKey["BTC/USD"]:
                return "BTC/USD";
            case OracleKey["ETH/USD"]:
                return "ETH/USD";
            case OracleKey.LOS_ANGELES:
                return "Los Angeles";
            case OracleKey.ANDORRA_LA_VELLA:
                return "Andorra La Vella";
            case OracleKey.MADRID:
                return "Madrid";
            case OracleKey.NEW_YORK_CITY:
                return "NYC";
            case OracleKey.TORONTO:
                return "Toronto";
            case OracleKey.SINGAPORE:
                return "Singapore";
            case OracleKey["CAD/USD"]:
                return "CAD/USD";
            case OracleKey["EUR/USD"]:
                return "EUR/USD";

            default:
                return "";
        }
    }, [props.type]);

    const oracleValue = useMemo(() => {
        return parseFloat(oracleData.value).toFixed(2);
    }, [oracleData.value])

    const oracleIcon = useMemo(() => {
        switch (props.type) {
            case OracleKey["BTC/USD"]:
                return BitcoinIcon;
            case OracleKey["ETH/USD"]:
                return EthereumIcon;
            case OracleKey.LOS_ANGELES:
                return CloudyIcon;
            case OracleKey.ANDORRA_LA_VELLA:
                return CloudyIcon;
            case OracleKey.MADRID:
                return CloudyIcon;
            case OracleKey.NEW_YORK_CITY:
                return CloudyIcon;
            case OracleKey.TORONTO:
                return CloudyIcon;
            case OracleKey.SINGAPORE:
                return CloudyIcon;
            case OracleKey["CAD/USD"]:
                return CanadianDollarIcon;
            case OracleKey["EUR/USD"]:
                return EuroIcon;
            default:
                return "";
        }
    }, [props.type]);

    const blocksAgo = useMemo(() => {
        return currentBlock - oracleData.block;
    }, [props.type, currentBlock, oracleData.block]);

    const urlToBlock = useMemo(() => {
        return `${stbleTestnet.blockExplorers?.default.url}block/${oracleData.block}`
    }, [oracleData.block]);

    return (
        <OracleValueWrapper>
            <OracleTitleWrapper>
                <OracleValueIcon src={oracleIcon} />
                <OracleTitle>{oracleTitle}</OracleTitle>
            </OracleTitleWrapper>

            <OracleNumberWrapper>
                <OracleValueUnitWrapper>
                    <OracleNumber>{oracleValue}</OracleNumber>
                    <OracleNumberUnit>{oracleUnit}</OracleNumberUnit>
                </OracleValueUnitWrapper>
                <OracleLinkToBlock href={urlToBlock} target="_blank">{blocksAgo} blocks ago</OracleLinkToBlock>
            </OracleNumberWrapper>
        </OracleValueWrapper>
    );
}