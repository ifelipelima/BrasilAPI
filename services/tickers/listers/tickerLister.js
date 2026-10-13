const PAGE_SIZE = 120;

export class TickerLister {
  constructor(pageSize = PAGE_SIZE) {
    this.pageSize = pageSize;
  }

  async fetchPage() {
    throw new Error(`${this.constructor.name} deve implementar fetchPage()`);
  }

  async list(options = {}) {
    const { tickers, page } = await this.fetchPage({
      pageNumber: 1,
      pageSize: this.pageSize,
      ...options,
    });

    const totalPages = Math.ceil(page.totalRecords / this.pageSize);
    const promises = [];

    for (let i = 2; i <= totalPages; i += 1) {
      promises.push(
        this.fetchPage({
          pageNumber: i,
          pageSize: this.pageSize,
          ...options,
        })
      );
    }

    const results = await Promise.all(promises);

    for (let i = 0; i < results.length; i += 1) {
      const { tickers: newTickers } = results[i];
      tickers.push(...newTickers);
    }

    return tickers;
  }
}
