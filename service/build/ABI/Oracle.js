"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleABI = void 0;
exports.OracleABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "value",
                "type": "string"
            }
        ],
        "name": "setValue",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "key",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "value",
                "type": "string"
            }
        ],
        "name": "ValueSet",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "oracleValues",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
//# sourceMappingURL=Oracle.js.map