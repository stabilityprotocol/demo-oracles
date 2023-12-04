import { Helmet } from "react-helmet";
import { HistoricalTable } from "./components/HistoricalTable";
import { useTranslation } from "react-i18next";


export const Historical = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>{t("pages.historical.title")}</title>
            </Helmet>
            <HistoricalTable />
        </>
    );
}