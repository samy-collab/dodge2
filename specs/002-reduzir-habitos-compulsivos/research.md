# Research: Sistema de Redução de Hábitos Compulsivos

## Decision 1: Aplicação web responsiva com frontend e backend separados

- **Decision**: Adotar uma arquitetura web com `frontend/` e `backend/` separados, conectados por API HTTP autenticada.
- **Rationale**: O produto precisa combinar registro rápido, visualização histórica e análises derivadas com boa experiência em desktop e mobile. Essa divisão mantém a UI independente da lógica de domínio e facilita testes de contrato, integração e evolução futura.
- **Alternatives considered**:
  - Aplicação monolítica server-rendered: mais simples no curto prazo, mas menos flexível para jornadas interativas de histórico e dashboards.
  - Aplicação mobile nativa: aumentaria custo e tempo de entrega para um MVP ainda sem validação de produto.

## Decision 2: Stack principal em TypeScript end-to-end

- **Decision**: Usar TypeScript 5.x no frontend e backend.
- **Rationale**: O domínio exige consistência entre payloads de API, validação de formulários e cálculos derivados. Compartilhar linguagem e tipos reduz desalinhamentos entre camadas e acelera o ciclo de implementação inicial.
- **Alternatives considered**:
  - Python no backend e TypeScript no frontend: viável, mas com maior custo de sincronização entre contratos.
  - Kotlin ou Rust no backend: oferecem robustez, porém aumentam atrito de setup para um repositório greenfield sem base prévia.

## Decision 3: Fastify + Zod para API e validação de contratos

- **Decision**: Implementar a API com Fastify e esquemas validados por Zod.
- **Rationale**: O sistema precisa de rotas enxutas para CRUD de recaídas e endpoints analíticos. Fastify oferece estrutura simples e boa performance, enquanto Zod mantém validações próximas dos contratos e reaproveitáveis entre camadas.
- **Alternatives considered**:
  - Express: ecossistema maduro, mas menos opinativo para tipagem e validação.
  - NestJS: mais completo, porém adiciona complexidade estrutural desnecessária para o MVP.

## Decision 4: PostgreSQL para histórico sensível e consultas analíticas

- **Decision**: Persistir dados em PostgreSQL 16.
- **Rationale**: O produto precisa de consistência transacional para histórico de recaídas, relacionamentos claros entre usuário, gatilhos e emoções, além de consultas agregadas para progresso e padrões. PostgreSQL atende bem esses dois lados no mesmo banco.
- **Alternatives considered**:
  - SQLite: simples para protótipo local, mas limitada para concorrência, acesso remoto e evolução do produto.
  - Banco documental: flexibiliza esquema, mas piora integridade relacional e agregações controladas por usuário.

## Decision 5: Indicadores derivados calculados no backend

- **Decision**: Calcular frequência, sequências sem recaída e padrões recorrentes no backend, a partir do histórico persistido.
- **Rationale**: Isso garante uma única fonte de verdade para regras de progresso e evita inconsistência entre telas. Também permite reprocessar indicadores após edição ou remoção de registros.
- **Alternatives considered**:
  - Cálculos no frontend: simplifica backend, mas gera duplicação de lógica e risco de divergência.
  - Materialização pesada desde o início: anteciparia complexidade operacional sem necessidade comprovada no MVP.

## Decision 6: Privacidade por padrão com autenticação first-party

- **Decision**: Exigir autenticação do usuário e isolar todos os dados por titular, com sessão autenticada em todas as rotas protegidas.
- **Rationale**: O domínio trata dados pessoais sensíveis. Mesmo no MVP, o produto precisa garantir que histórico, gatilhos e progresso sejam acessíveis apenas ao próprio usuário.
- **Alternatives considered**:
  - Aplicação totalmente anônima em dispositivo único: simplifica acesso, mas dificulta continuidade entre dispositivos e recuperação segura de conta.
  - Recursos compartilhados ou sociais: fora de escopo e incompatíveis com a premissa de privacidade da versão inicial.

## Decision 7: Estratégia de testes por camada

- **Decision**: Adotar testes unitários para regras de domínio, testes de contrato para API, testes de integração para persistência e testes end-to-end para as jornadas P1 a P3.
- **Rationale**: O risco principal está em perda de consistência entre registros, análises e progresso. Cobrir por camada protege regras críticas sem depender apenas de testes manuais.
- **Alternatives considered**:
  - Apenas testes end-to-end: cobertura frágil para regressões de regras de cálculo.
  - Apenas unit tests: insuficiente para validar contratos e jornadas completas.
