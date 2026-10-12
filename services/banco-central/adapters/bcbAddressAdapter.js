import { formatZipCode } from './addressAdapterUtils';

export class BcbAddressAdapter {
  static adapt(data = {}) {
    const address = {
      street: data.ENDERECO || null,
      number: null,
      complement: data.COMPLEMENTO || null,
      district: data.BAIRRO || null,
      city: data.MUNICIPIO || null,
      state: data.UF || null,
      zipCode: formatZipCode(data.CEP),
    };

    return Object.values(address).some(Boolean) ? address : null;
  }
}
