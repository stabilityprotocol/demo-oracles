import { env } from "./Utils/Env";

export const config = {
    OPEN_WEATHER_API_KEY: env("OPEN_WEATHER_API_KEY"),
    RPC_URL: env("RPC_URL"),
    ORACLE_ADDRESS: env("ORACLE_ADDRESS"),
    WALLET_PRIVATE_KEY: env("WALLET_PRIVATE_KEY"),
}