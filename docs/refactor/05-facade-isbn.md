# Refatoração 3: Facade no Serviço de ISBN

## Problema identificado

O endpoint de consulta de ISBN (`pages/api/isbn/v1/[isbn].js`) conhece diretamente as implementações de todos os provedores externos de catálogo bibliográfico (`cbl`, `google-books`, `mercado-editorial` e `open-library`).

Além disso, o próprio handler HTTP concentra o mapeamento dos provedores disponíveis (`PROVIDER_MAP`), a resolução da lista de provedores solicitados e a coordenação das consultas concorrentes através de `Promise.any`.

Isso gera acoplamento entre a camada de entrega (API/HTTP) e os provedores externos, ferindo o princípio de responsabilidade única e dificultando a inclusão ou alteração de fontes de dados.

## Estrutura proposta

**Facade - Padrão Estrutural**

O padrão Facade será aplicado para fornecer uma interface simplificada e unificada para a consulta de ISBN, centralizando a coordenação, mapeamento e execução das consultas aos diferentes serviços.

Será criada a classe `IsbnFacade` (disponibilizada no módulo do serviço de ISBN), que encapsula:
- O mapeamento dos provedores suportados;
- A seleção e fallback de provedores;
- A execução concorrente das consultas.

O handler HTTP da API passa a interagir exclusivamente com a Facade, desconhecendo os provedores concretos.

### Diagrama proposto

```mermaid
classDiagram
    class IsbnApiRoute {
        +getBookByIsbn(req, res)
    }
    class IsbnFacade {
        -PROVIDER_MAP
        +search(isbn, providers)
    }
    class CblService {
        +searchInCbl(isbn)
    }
    class GoogleBooksService {
        +searchInGoogleBooks(isbn)
    }
    class MercadoEditorialService {
        +searchInMercadoEditorial(isbn)
    }
    class OpenLibraryService {
        +searchInOpenLibrary(isbn)
    }

    IsbnApiRoute --> IsbnFacade : utiliza
    IsbnFacade --> CblService : delega
    IsbnFacade --> GoogleBooksService : delega
    IsbnFacade --> MercadoEditorialService : delega
    IsbnFacade --> OpenLibraryService : delega