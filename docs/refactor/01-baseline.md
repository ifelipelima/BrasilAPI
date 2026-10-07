# Baseline da Versão Original

Estado inicial do BrasilAPI antes da realização das refatorações. A versão identificada acima será utilizada como referência para comparar o sistema antes e depois das alterações realizadas no trabalho.

## 1. Identificação do sistema

**Projeto:** BrasilAPI

**Repositório utilizado:**  
https://github.com/ifelipelima/BrasilAPI

**Repositório original:**  
https://github.com/BrasilAPI/BrasilAPI

**Commit utilizado como baseline:**  
`0104c49c94017e47560615c8713ba7686ae2e381`

## 2. Ambiente de execução

A versão original do BrasilAPI foi validada em ambiente local antes da realização das refatorações.

**Sistema operacional:** Windows 11 Home

**Node.js:** `v22.17.0`

**npm:** `11.13.0`

**Git:** `2.51.0.windows.1`

## 3. Validação da versão original

### 3.1 Instalação

```bash
npm ci
```

### 3.2 Testes automatizados

Os testes existentes no projeto foram executados com o comando `npm test`.

#### Resultado da execução

| Item               | Resultado |
| ------------------ | --------: |
| Arquivos de teste  |        59 |
| Arquivos aprovados |        50 |
| Arquivos com falha |         2 |
| Arquivos ignorados |         7 |
| Testes             |       540 |
| Testes aprovados   |       460 |
| Testes com falha   |         3 |
| Testes ignorados   |        77 |
| Duração            |  158,19 s |

Foram identificadas **três falhas** na versão original do sistema.

#### Falha 1: Dias úteis de agosto de 2026

**Arquivo:** `tests/diasuteis-v1.test.js`  
**Teste:** `Agosto 2026 (dias úteis de segunda a sexta)`

#### Falha 2: Inclusão de feriado nacional

**Arquivo:** `tests/diasuteis-v1.test.js`  
**Teste:** `incluirFeriadosNacionais=false: inclui feriado`

#### Falha 3: Consulta de ISBN inexistente

**Arquivo:** `tests/isbn-v1.test.js`  
**Teste:** `Utilizando um ISBN válido não existente: 9788549173447`

As três falhas foram identificadas antes de qualquer refatoração realizada e fazem parte do estado inicial conhecido da versão original do sistema.

### 3.3 Build da aplicação

A compilação da versão original foi validada com o comando:

`npx next build --no-lint`

O build foi concluído com sucesso.

### 3.4 Execução da aplicação

A versão original foi executada em ambiente de desenvolvimento com o comando:

`npm run dev`

A aplicação iniciou corretamente em `http://localhost:3000`.
