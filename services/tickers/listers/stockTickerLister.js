import axios from 'axios';
import { z } from 'zod';

import { TickerLister } from './tickerLister';

const URL = 'https://sistemaswebb3-listados.b3.com.br';

const rawStockTickerSchema = z.object({
  codeCVM: z.string(),
  issuingCompany: z.string(),
  companyName: z.string(),
  tradingName: z.string(),
  cnpj: z.string(),
  marketIndicator: z.string(),
  typeBDR: z.string(),
  dateListing: z.string(),
  status: z.string(),
  segment: z.string(),
  segmentEng: z.string(),
  type: z.string(),
  market: z.string(),
});

const rawResponseStocksSchema = z.object({
  page: z.object({
    pageNumber: z.number(),
    pageSize: z.number(),
    totalPages: z.number(),
    totalRecords: z.number(),
  }),
  results: z.array(rawStockTickerSchema),
});

const stockTickerSchema = z.object({
  code_CVM: z.string(),
  issuing_company: z.string(),
  company_name: z.string(),
  trading_name: z.string(),
  cnpj: z.string(),
  market_indicator: z.string(),
  type_BDR: z.string(),
  date_listing: z.string(),
  status: z.string(),
  segment: z.string(),
  segment_eng: z.string(),
  type: z.string(),
  market: z.string(),
});

export class StockTickerLister extends TickerLister {
  // eslint-disable-next-line class-methods-use-this
  async fetchPage({ pageNumber, pageSize, language = 'pt-br' }) {
    const paramsB64 = Buffer.from(
      JSON.stringify({ language, pageNumber, pageSize })
    ).toString('base64');

    const { data } = await axios.get(
      `${URL}/listedCompaniesProxy/CompanyCall/GetInitialCompanies/${paramsB64}`
    );

    const parsedResponse = rawResponseStocksSchema.parse(data);
    const tickers = parsedResponse.results.map((ticker) => {
      return stockTickerSchema.parse({
        code_CVM: ticker.codeCVM,
        issuing_company: ticker.issuingCompany,
        company_name: ticker.companyName,
        trading_name: ticker.tradingName,
        cnpj: ticker.cnpj,
        market_indicator: ticker.marketIndicator,
        type_BDR: ticker.typeBDR,
        date_listing: ticker.dateListing,
        status: ticker.status,
        segment: ticker.segment,
        segment_eng: ticker.segmentEng,
        type: ticker.type,
        market: ticker.market,
      });
    });

    return {
      page: parsedResponse.page,
      tickers,
    };
  }
}
