# Quickstart: Sistema de Redução de Hábitos Compulsivos

## Objetivo

Preparar o ambiente de desenvolvimento e validar o MVP web com backend, frontend e testes principais.

## Pré-requisitos

- Node.js 22 LTS
- PostgreSQL 16
- `npm` ou `pnpm`
- Variáveis de ambiente para banco de dados e autenticação

## Estrutura esperada

- `backend/` para API, domínio e persistência
- `frontend/` para interface do usuário
- `tests/e2e/` para jornadas críticas

## Passos iniciais

1. Instalar dependências do frontend e backend.
2. Configurar variáveis de ambiente para ambos os projetos.
3. Criar o banco de dados local e aplicar migrações iniciais.
4. Popular dados mínimos de desenvolvimento: um usuário e catálogos base de gatilhos e emoções.
5. Iniciar backend e frontend em modo de desenvolvimento.

## Fluxos a validar primeiro

1. Cadastro ou login do usuário.
2. Registro de recaída com intensidade, gatilhos, emoções e observações.
3. Edição e remoção de recaídas já registradas.
4. Visualização do histórico por ordem cronológica e com filtro por período.
5. Consulta da análise de gatilhos recorrentes.
6. Consulta da visão de progresso com sequência atual e melhor sequência.

## Estratégia mínima de testes

- Testes unitários para cálculo de sequência, frequência e agrupamento de gatilhos.
- Testes de contrato para endpoints de recaídas, análise e progresso.
- Testes de integração para persistência e atualização de indicadores após edição e exclusão.
- Testes end-to-end cobrindo as histórias P1, P2 e P3.

## Critérios para encerrar a primeira implementação

- Usuário autenticado consegue registrar, editar, listar e remover recaídas.
- Histórico, análise e progresso permanecem consistentes após mutações.
- Jornadas principais funcionam em viewport mobile e desktop.
- Dados de um usuário não ficam visíveis para outro usuário autenticado.
