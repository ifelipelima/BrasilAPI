import { Promise } from 'bluebird';

import searchInCbl from './cbl';
import searchInGoogleBooks from './googleBooks';
import searchInMercadoEditorial from './mercadoEditorial';
import searchInOpenLibrary from './openLibrary';

export class IsbnFacade {
  constructor() {
    this.providers = {
      cbl: searchInCbl,
      'google-books': searchInGoogleBooks,
      'mercado-editorial': searchInMercadoEditorial,
      'open-library': searchInOpenLibrary,
    };
  }

  async search(isbn, providers = null) {
    const allProviders = Object.values(this.providers);
    let promises = [];

    if (!providers || providers.length === 0) {
      promises = allProviders;
    } else {
      promises = providers
        .map((provider) => this.providers[provider])
        .filter(Boolean);

      if (promises.length === 0) {
        promises = allProviders;
      }
    }

    return Promise.any(promises.map((providerFn) => providerFn(isbn)));
  }
}

export default new IsbnFacade();
