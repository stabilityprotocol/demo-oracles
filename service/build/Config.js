"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const Env_1 = require("./Utils/Env");
exports.config = {
    OPEN_WEATHER_API_KEY: (0, Env_1.env)("OPEN_WEATHER_API_KEY"),
    RPC_URL: (0, Env_1.env)("RPC_URL"),
    ORACLE_ADDRESS: (0, Env_1.env)("ORACLE_ADDRESS"),
    WALLET_PRIVATE_KEY: (0, Env_1.env)("WALLET_PRIVATE_KEY"),
};
//# sourceMappingURL=Config.js.map