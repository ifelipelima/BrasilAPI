## Diagnóstico do Sistema

### Problemas gerais do repositório

Durante a análise do BrasilAPI, identificamos alguns problemas recorrentes relacionados à organização das integrações, responsabilidades e fluxos de processamento.

- **Acoplamento com implementações concretas e fontes externas:** diferentes módulos conhecem diretamente formatos, provedores ou implementações específicas, aumentando o impacto de alterações nessas dependências.

- **Dificuldade de extensão dos fluxos existentes:** em diferentes partes do sistema, a inclusão de novos comportamentos, fontes ou variações exige modificar diretamente fluxos já existentes.

- **Concentração de decisões de orquestração:** alguns módulos acumulam a responsabilidade de selecionar, combinar e coordenar diferentes implementações ou etapas de processamento.

- **Baixo reaproveitamento de estruturas e comportamentos semelhantes:** existem fluxos e operações com etapas comuns que são implementados diretamente por cada caso, aumentando duplicação e dificultando reutilização.

A partir dessa visão geral, buscamos mitigar esses problemas a partir das ocorrências mais relevantes identificadas no código da aplicação.

### Principais problemas identificados

#### 1. Integração rígida com múltiplas fontes de dados bancários

`services/banco-central/index.js`

O serviço concentra a integração e a escolha entre diferentes fontes de dados, o que torna o fluxo mais acoplado e difícil de estender.

**Evidências:**

- `getBanksData()` define diretamente a sequência de obtenção e fallback entre o CSV do Banco Central, snapshot local e `banksList`:

```js
try {
  const response = await getCsvAsJson(...);
  banksData = formatCsvFile(response);
} catch (err) {
  banksData = latestSnapshot || banksList;
}
```

- `enrichBanksWithHeadquartersAddress()` tenta obter endereços primeiro pelos dados do Banco Central e depois pelo serviço de CNPJ, mantendo essa sequência fixa dentro do método.

- `parseAddress()` conhece diferentes formatos retornados pelas fontes externas:

```js
const street = ENDERECO || logradouro || null;
const city = MUNICIPIO || municipio || null;
const state = UF || uf || null;
const zipCode = formatZipCode(CEP || cep);
```

- O mesmo módulo também concentra cache, fallback, matching, enriquecimento de endereço e inclusão de logotipos.

**Aspectos atingidos:** acoplamento, coesão, extensibilidade e manutenção.

---

#### 2. Composição rígida dos diferentes tipos de feriados

**Arquivo:** `services/holidays/index.js`

O serviço possui diferentes regras de geração de feriados, mas a função `getHolidays()` conhece e executa diretamente cada uma delas.

**Evidências:**

- `getHolidays()` depende explicitamente de cada tipo de feriado:

```js
const easterHolidays = getEasterHolidays(year);
const nationalHolidays = getNationalHolidays(year);
const stateHolidays = getStateHolidays(year, state);

return sortByDate([...easterHolidays, ...nationalHolidays, ...stateHolidays]);
```

- Cada categoria possui sua própria lógica de obtenção:

  - `getEasterHolidays()` calcula feriados móveis;
  - `getNationalHolidays()` monta os feriados nacionais;
  - `getStateHolidays()` recupera os feriados estaduais.

- Todas essas funções produzem coleções de feriados que posteriormente são combinadas pelo fluxo principal.

- A inclusão de uma nova categoria, como feriados municipais, exigiria criar a nova implementação e também modificar `getHolidays()` para adicioná-la à composição.

- Os objetos de feriado possuem uma estrutura semelhante, com propriedades como `date`, `name`, `type` e, em alguns casos, `weekday`.

**Aspectos atingidos:** extensibilidade, acoplamento e manutenção.

---

#### 3. Acoplamento do endpoint ISBN aos provedores externos

**Arquivos:** `pages/api/isbn/v1/[isbn].js` e `services/isbn/`

O endpoint de ISBN conhece diretamente as implementações dos diferentes provedores utilizados para realizar a consulta, concentrando também a seleção e coordenação dessas fontes.

**Evidências:**

- O handler importa diretamente os provedores CBL, Google Books, Mercado Editorial e Open Library:

```js
import searchInCbl from '@/services/isbn/cbl';
import searchInGoogleBooks from '@/services/isbn/googleBooks';
import searchInMercadoEditorial from '@/services/isbn/mercadoEditorial';
import searchInOpenLibrary from '@/services/isbn/openLibrary';
```

- O próprio endpoint mantém o mapeamento entre os nomes dos provedores e suas implementações:

```js
const PROVIDER_MAP = {
  cbl: searchInCbl,
  'google-books': searchInGoogleBooks,
  'mercado-editorial': searchInMercadoEditorial,
  'open-library': searchInOpenLibrary,
};
```

- O handler também é responsável por selecionar os provedores, executar as consultas e coordenar seus resultados.

- Adicionar ou remover um provedor exige modificar diretamente o endpoint.

- Os serviços dos diferentes provedores possuem estruturas semelhantes de tratamento de erros e adaptação das respostas.

**Aspectos atingidos:** acoplamento, separação de responsabilidades, extensibilidade e manutenção.

---

#### 4. Duplicação do fluxo de paginação de tickers

**Arquivo:** `services/tickers/listTickers.js`

O serviço possui fluxos praticamente iguais para listar tickers de ações e de fundos de investimento, variando principalmente a função utilizada para buscar cada página.

**Evidências:**

- `listStockTickers()` e `listInvestmentFundTickers()` repetem a mesma sequência de processamento:

  - busca da primeira página;
  - cálculo da quantidade total de páginas;
  - criação das requisições restantes;
  - execução com `Promise.all`;
  - agregação dos resultados.

- Em ambos os fluxos aparece uma estrutura semelhante:

```js
const totalPages = Math.ceil(page.totalRecords / PAGE_SIZE);
const promises = [];

for (let i = 2; i <= totalPages; i += 1) {
  promises.push(...);
}

const results = await Promise.all(promises);

for (let i = 0; i < results.length; i += 1) {
  const { tickers: newTickers } = results[i];
  tickers.push(...newTickers);
}

return tickers;
```

- A principal variação entre os fluxos está na forma de buscar uma página, utilizando `fetchStockTickers()` ou `fetchInvestmentFundTickers()`.

**Aspectos atingidos:** duplicação de código, manutenção, reutilização e extensibilidade.