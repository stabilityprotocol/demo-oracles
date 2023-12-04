import { useTranslation } from "react-i18next";
import { OracleKey } from "../../common/Oracle/Types";
import { OracleValueWrapper, OverviewWrapper } from "./Styles";
import { OracleValue } from "./components/OracleValue";
import { Helmet } from 'react-helmet';

export const Overview = () => {
    const { t } = useTranslation();

    return (
        <>   
            <Helmet>
                <title>{t("pages.overview.title")}</title>
            </Helmet>
            <OverviewWrapper>
                <OracleValueWrapper>
                    <OracleValue type={OracleKey["BTC/USD"]}/>
                    <OracleValue type={OracleKey["ETH/USD"]}/>
                    <OracleValue type={OracleKey.LOS_ANGELES}/>
                    <OracleValue type={OracleKey.ANDORRA_LA_VELLA}/>
                    <OracleValue type={OracleKey.MADRID}/>
                    <OracleValue type={OracleKey.NEW_YORK_CITY}/>
                    <OracleValue type={OracleKey.TORONTO}/>
                    <OracleValue type={OracleKey["CAD/USD"]}/>
                    <OracleValue type={OracleKey["EUR/USD"]}/>
                    <OracleValue type={OracleKey.SINGAPORE}/>
                </OracleValueWrapper>
               
            </OverviewWrapper>
        </>
    );
}