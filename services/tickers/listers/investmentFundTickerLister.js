import axios from 'axios';
import { z } from 'zod';

import { TickerLister } from './tickerLister';

const URL = 'https://sistemaswebb3-listados.b3.com.br';

const rawTickerInvestmentFundSchema = z.object({
  id: z.number(),
  typeName: z.string().nullable(),
  acronym: z.string(),
  fundName: z.string(),
  tradingName: z.string(),
});

const rawResponseInvestmentFundsSchema = z.object({
  page: z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    totalRecords: z.number(),
  }),
  results: z.array(rawTickerInvestmentFundSchema),
});

const tickerInvestmentFundSchema = z.object({
  id: z.number(),
  type_name: z.string().nullable(),
  acronym: z.string(),
  fund_name: z.string(),
  trading_name: z.string(),
});

export class InvestmentFundTickerLister extends TickerLister {
  // eslint-disable-next-line class-methods-use-this
  async fetchPage({ typeFund, pageNumber, pageSize, language = 'pt-br' }) {
    const paramsB64 = Buffer.from(
      JSON.stringify({ language, pageNumber, pageSize, typeFund })
    ).toString('base64');

    const { data } = await axios.get(
      `${URL}/fundsListedProxy/Search/GetListFunds/${paramsB64}`
    );

    const parsedResponse = rawResponseInvestmentFundsSchema.parse(data);
    const tickers = parsedResponse.results.map((ticker) => {
      return tickerInvestmentFundSchema.parse({
        id: ticker.id,
        type_name: ticker.typeName,
        acronym: ticker.acronym,
        fund_name: ticker.fundName,
        trading_name: ticker.tradingName,
      });
    });

    return {
      page: parsedResponse.page,
      tickers,
    };
  }
}
