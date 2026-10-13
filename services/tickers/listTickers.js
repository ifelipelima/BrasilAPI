import { StockTickerLister } from './listers/stockTickerLister';
import { InvestmentFundTickerLister } from './listers/investmentFundTickerLister';

const stockTickerLister = new StockTickerLister();
const investmentFundTickerLister = new InvestmentFundTickerLister();

export async function listStockTickers() {
  return stockTickerLister.list();
}

export async function listInvestmentFundTickers({ typeFund }) {
  return investmentFundTickerLister.list({ typeFund });
}
