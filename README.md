<<<<<<< HEAD
# dodge2
Um sistema para ajudar usuários a identificar, acompanhar e reduzir hábitos compulsivos, através do registro de recaídas, análise de gatilhos e acompanhamento de progresso pessoal.
=======
# Dodge2

Aplicacao web responsiva para registro de recaidas, analise de gatilhos e acompanhamento de progresso pessoal.

## Stack

- `frontend/`: React 19, Vite, React Router, TanStack Query
- `backend/`: Fastify, Zod, Prisma, PostgreSQL
- `tests/e2e/`: Playwright

## Setup local

1. Use Node.js 22 e PostgreSQL 16.
2. Copie `backend/.env.example` e `frontend/.env.example` para arquivos `.env`.
3. Instale dependencias com `npm install`.
4. Gere o client Prisma com `npm run prisma:generate --workspace backend`.
5. Aplique a migracao com `npm run prisma:migrate --workspace backend`.
6. Opcionalmente popule dados de desenvolvimento com `npm run prisma:seed --workspace backend`.

## Scripts principais

- `npm run dev`: sobe backend e frontend em desenvolvimento
- `npm run build`: compila backend e frontend
- `npm run test`: executa testes de backend e frontend
- `npm run e2e`: executa os testes Playwright

## Ambiente

- `backend/.env`: `DATABASE_URL`, `SESSION_SECRET`, `PORT`, `APP_ORIGIN`
- `frontend/.env`: `VITE_API_URL`

## Fluxo rapido de validacao

1. Criar conta ou entrar em `/auth`
2. Registrar uma recaida em `/relapses`
3. Consultar padroes em `/analytics`
4. Revisar o resumo em `/progress`

>>>>>>> 002-reduzir-habitos-compulsivos
