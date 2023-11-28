"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const env = (variable, fallback) => {
    if (process.env[variable])
        return process.env[variable];
    if (fallback)
        return fallback;
    throw new Error(`Environment variable ${variable} is not defined`);
};
exports.env = env;
//# sourceMappingURL=Env.js.map