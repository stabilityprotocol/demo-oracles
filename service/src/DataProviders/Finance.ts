import { injectable } from "inversify";
import { z } from "zod";
import { exhaustiveCheck } from "../Utils/Enum";
import fetch from "node-fetch";

export enum KrakenPair {
    "BTC/USD" = "BTC/USD",
    "ETH/USD" = "ETH/USD",
    "EUR/USD" = "EUR/USD",
    "USD/CAD" = "USD/CAD",
}

export enum Pair {
    "BTC/USD" = "BTC/USD",
    "ETH/USD" = "ETH/USD",
    "EUR/USD" = "EUR/USD",
    "CAD/USD" = "CAD/USD",
}

const pairSchemas = Object.values(KrakenPair).reduce((acc, pair) => {
    return {
      ...acc,
      [pair]: z.object({
        c: z.array(z.string().regex(/^\d+(\.\d+)?$/)).length(2),
      }),
    };
  }, {} as Record<KrakenPair, z.ZodObject<{ c: z.ZodArray<z.ZodString> }>>);

const responseKrakenSchema = z.object({
    error: z.array(z.string()).length(0),
    result: z.object(pairSchemas),
});

export interface PairPrice {
    pair: Pair;
    price: string;
}

@injectable()
export class FinanceDataProvider {

    public pairToKrakenPair(pair: Pair): KrakenPair {
        switch (pair) {
            case Pair["BTC/USD"]:
                return KrakenPair["BTC/USD"];
            case Pair["ETH/USD"]:
                return KrakenPair["ETH/USD"];
            case Pair["EUR/USD"]:
                return KrakenPair["EUR/USD"];
            case Pair["CAD/USD"]:
                return KrakenPair["USD/CAD"];
            default:
                return exhaustiveCheck(pair);
        }
    }

    public krakenPairToPair(krakenPair: KrakenPair): Pair {
        switch (krakenPair) {
            case KrakenPair["BTC/USD"]:
                return Pair["BTC/USD"];
            case KrakenPair["ETH/USD"]:
                return Pair["ETH/USD"];
            case KrakenPair["EUR/USD"]:
                return Pair["EUR/USD"];
            case KrakenPair["USD/CAD"]:
                return Pair["CAD/USD"];
            default:
                return exhaustiveCheck(krakenPair);
        }
    }

    public async getCurrentFinance(): Promise<PairPrice[]> {
        const pairs = Object.values(Pair);

        const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pairs.map(this.pairToKrakenPair.bind(this)).join(',')}`);
        const data = await response.json();


        const parsedData = responseKrakenSchema.parse(data);

        return  pairs.map(pair => {
            const krakenPair = this.pairToKrakenPair(pair);

            if (pair === Pair["CAD/USD"]) {
                return {
                    pair,
                    price: (1 / parseFloat(parsedData.result[krakenPair].c[0])).toString()
                }
            }

            return {
                pair,
                price: parsedData.result[krakenPair].c[0]
            }
        });
    }
}

