export enum OracleKey {
    MADRID = "MADRID",
    LOS_ANGELES = "LOS_ANGELES",
    TORONTO = "TORONTO",
    NEW_YORK_CITY = "NEW_YORK_CITY",
    ANDORRA_LA_VELLA = "ANDORRA_LA_VELLA",
    SINGAPORE = "SINGAPORE",
    "BTC/USD" = "BTC/USD",
    "ETH/USD" = "ETH/USD",
    "EUR/USD" = "EUR/USD",
    "CAD/USD" = "CAD/USD",
}


export const isWeatherOracle = (oracleType: OracleKey): boolean => {
    return oracleType === OracleKey.MADRID
        || oracleType === OracleKey.LOS_ANGELES
        || oracleType === OracleKey.TORONTO
        || oracleType === OracleKey.NEW_YORK_CITY
        || oracleType === OracleKey.ANDORRA_LA_VELLA
        || oracleType === OracleKey.SINGAPORE;
}

export const isFinanceOracle = (oracleType: OracleKey): boolean => {
    return oracleType === OracleKey["BTC/USD"]
        || oracleType === OracleKey["ETH/USD"]
        || oracleType === OracleKey["EUR/USD"]
        || oracleType === OracleKey["CAD/USD"];
}