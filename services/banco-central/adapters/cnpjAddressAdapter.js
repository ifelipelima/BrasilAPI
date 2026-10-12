import { formatZipCode } from './addressAdapterUtils';

export class CnpjAddressAdapter {
  static adapt(data = {}) {
    const address = {
      street: data.logradouro || null,
      number: data.numero || null,
      complement: data.complemento || null,
      district: data.bairro || null,
      city: data.municipio || null,
      state: data.uf || null,
      zipCode: formatZipCode(data.cep),
    };

    return Object.values(address).some(Boolean) ? address : null;
  }
}
