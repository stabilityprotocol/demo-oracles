import { injectable } from "inversify";
import { z } from "zod";

export enum Pair {
    "BTC/USD" = "BTC/USD",
    "ETH/USD" = "ETH/USD",
    "EUR/USD" = "EUR/USD",
    "USD/CAD" = "USD/CAD",
}

const pairSchemas = Object.values(Pair).reduce((acc, pair) => {
    return {
      ...acc,
      [pair]: z.object({
        c: z.array(z.string().regex(/^\d+(\.\d+)?$/)).length(2),
      }),
    };
  }, {} as Record<Pair, z.ZodObject<{ c: z.ZodArray<z.ZodString> }>>);

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

    public async getCurrentFinance(): Promise<PairPrice[]> {
        const pairs = Object.values(Pair);

        const response = await fetch(`https://api.kraken.com/0/public/Ticker?pair=${pairs.join(',')}`);
        const data = await response.json();


        const parsedData = responseKrakenSchema.parse(data);

        return  pairs.map(pair => {
            return {
                pair,
                price: parsedData.result[pair].c[0]
            }
        });
    }
}

