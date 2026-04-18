# Implementation Plan: Sistema de Redução de Hábitos Compulsivos

**Branch**: `002-reduzir-habitos-compulsivos` | **Date**: 2026-04-18 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-reduzir-habitos-compulsivos/spec.md`

## Summary

Construir uma aplicação web responsiva e privada para registro de recaídas, análise de gatilhos e acompanhamento de progresso pessoal. A implementação será dividida em `frontend/` e `backend/`, com API HTTP autenticada, armazenamento relacional para preservar histórico consistente e uma camada de métricas derivadas para padrões e progresso.

## Technical Context

**Language/Version**: TypeScript 5.x em todo o stack, Node.js 22 LTS  
**Primary Dependencies**: React 19, Vite, React Router, Fastify, Zod, Prisma ORM, TanStack Query  
**Storage**: PostgreSQL 16 para dados transacionais e agregações derivadas  
**Testing**: Vitest, React Testing Library, Playwright, Supertest  
**Target Platform**: Navegadores desktop e mobile modernos; backend em Linux containerizado  
**Project Type**: Aplicação web com frontend e backend separados  
**Performance Goals**: registro de recaída com resposta p95 abaixo de 500 ms; telas de histórico, gatilhos e progresso carregando em até 2 s com base de dados do usuário; atualização de indicadores em até 5 s após alteração de registros  
**Constraints**: privacidade por padrão; dados sensíveis acessíveis apenas ao usuário autenticado; tratamento correto de fuso horário; UX mobile-first; acessibilidade mínima WCAG AA nas jornadas principais; sem recursos sociais ou clínicos na primeira entrega  
**Scale/Scope**: MVP para até 10 mil usuários ativos mensais, até 100 mil recaídas registradas e cerca de 15 telas principais

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- A constituição atual em [.specify/memory/constitution.md](../../.specify/memory/constitution.md) ainda está no template padrão e não define princípios executáveis nem gates formais.
- Gate aplicado para este plano: manter simplicidade arquitetural, cobertura de testes para contratos e jornadas críticas, e preservar privacidade dos dados como requisito obrigatório do produto.
- Status pré-Phase 0: PASS.
- Status pós-Phase 1: PASS. Os artefatos de design mantêm arquitetura simples de duas camadas, contratos explícitos e modelagem coerente com privacidade por usuário.

## Project Structure

### Documentation (this feature)

```text
specs/002-reduzir-habitos-compulsivos/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── openapi.yaml
└── tasks.md
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── api/
│   │   ├── routes/
│   │   └── schemas/
│   ├── domain/
│   ├── services/
│   ├── repositories/
│   └── lib/
└── tests/
    ├── contract/
    ├── integration/
    └── unit/

frontend/
├── src/
│   ├── app/
│   ├── pages/
│   ├── features/
│   │   ├── auth/
│   │   ├── relapses/
│   │   ├── analytics/
│   │   └── progress/
│   ├── components/
│   └── services/
└── tests/
    ├── integration/
    └── unit/

tests/
└── e2e/
```

**Structure Decision**: A feature será implementada como aplicação web com `frontend/` e `backend/` separados para isolar UI, regras de negócio e persistência. Essa divisão é suficiente para o escopo do MVP e evita complexidade desnecessária de múltiplos serviços.

## Complexity Tracking

Nenhuma violação formal de constituição identificada. Nenhuma justificativa adicional de complexidade é necessária neste estágio.
