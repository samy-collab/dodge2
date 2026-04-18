# Tasks: Sistema de Redução de Hábitos Compulsivos

**Input**: Design documents from `/specs/002-reduzir-habitos-compulsivos/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/openapi.yaml`, `quickstart.md`

**Tests**: Testes são obrigatórios para esta feature, conforme `plan.md`, `research.md` e `quickstart.md`.

**Organization**: Tasks grouped by user story so each story can be implemented and validated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the monorepo structure, toolchain, and local development setup for frontend and backend.

- [X] T001 Create the baseline workspace structure and root package configuration in `package.json`
- [X] T002 [P] Initialize backend TypeScript, Fastify, and Prisma dependencies in `backend/package.json`
- [X] T003 [P] Initialize frontend Vite, React, and testing dependencies in `frontend/package.json`
- [X] T004 [P] Configure TypeScript build settings for the backend in `backend/tsconfig.json`
- [X] T005 [P] Configure Vite, TypeScript, and test tooling for the frontend in `frontend/tsconfig.json`
- [X] T006 [P] Add shared environment examples for backend and frontend in `backend/.env.example`
- [X] T007 [P] Add shared environment examples for backend and frontend in `frontend/.env.example`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish authentication, persistence, validation, and app shell infrastructure that blocks all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T008 Define the core Prisma data model for accounts, relapses, trigger catalogs, emotion catalogs, and link tables in `backend/prisma/schema.prisma`
- [X] T009 Create the initial Prisma migration for the core schema in `backend/prisma/migrations/`
- [X] T010 [P] Implement the Prisma client and database bootstrap in `backend/src/lib/prisma.ts`
- [X] T011 [P] Implement password hashing, session cookie, and auth guard utilities in `backend/src/lib/auth.ts`
- [X] T012 [P] Implement auth request and response schemas from the API contract in `backend/src/api/schemas/auth.ts`
- [X] T013 Implement auth routes for register and login in `backend/src/api/routes/auth.ts`
- [X] T014 [P] Add contract coverage for `/auth/register` and `/auth/login` in `backend/tests/contract/auth.contract.test.ts`
- [X] T015 [P] Add backend integration coverage for authenticated session isolation in `backend/tests/integration/auth-session.test.ts`
- [X] T016 [P] Create the Fastify app bootstrap, route registration, and error handling in `backend/src/app.ts`
- [X] T017 [P] Configure the frontend app shell, router, and query client providers in `frontend/src/app/App.tsx`
- [X] T018 [P] Implement authentication API client and persisted session state in `frontend/src/features/auth/authClient.ts`
- [X] T019 Implement login and registration page flow in `frontend/src/pages/AuthPage.tsx`

**Checkpoint**: Foundation ready - authenticated frontend and backend workflow is available, and all story work can proceed.

---

## Phase 3: User Story 1 - Registrar recaídas com contexto (Priority: P1) 🎯 MVP

**Goal**: Allow an authenticated user to create, review, edit, filter, and remove relapse records with contextual details.

**Independent Test**: Authenticate a user, register a relapse with intensity, triggers, emotions, and notes, confirm it appears in chronological history, then edit and remove the same record without exposing data from another account.

### Tests for User Story 1

- [X] T020 [P] [US1] Add contract coverage for `GET /relapses`, `POST /relapses`, `PATCH /relapses/{relapseId}`, and `DELETE /relapses/{relapseId}` in `backend/tests/contract/relapses.contract.test.ts`
- [X] T021 [P] [US1] Add backend integration coverage for relapse creation, update, deletion, and duplicate-submission protection in `backend/tests/integration/relapses.integration.test.ts`
- [X] T022 [P] [US1] Add frontend integration coverage for relapse form and history filtering in `frontend/tests/integration/relapses-history.test.tsx`
- [X] T023 [P] [US1] Add end-to-end coverage for the relapse registration and history journey in `tests/e2e/relapse-history.spec.ts`

### Implementation for User Story 1

- [X] T024 [P] [US1] Implement relapse request and response schemas from the API contract in `backend/src/api/schemas/relapses.ts`
- [X] T025 [P] [US1] Implement relapse persistence and catalog upsert logic in `backend/src/repositories/relapseRepository.ts`
- [X] T026 [P] [US1] Implement relapse validation rules for past timestamps and duplicate-submission confirmation in `backend/src/domain/relapseRules.ts`
- [X] T027 [US1] Implement relapse create, list, update, and delete services in `backend/src/services/relapseService.ts`
- [X] T028 [US1] Implement authenticated relapse routes with period filtering in `backend/src/api/routes/relapses.ts`
- [X] T029 [P] [US1] Implement frontend relapse API methods in `frontend/src/services/relapsesApi.ts`
- [X] T030 [P] [US1] Implement relapse form state, validation, and submission flow in `frontend/src/features/relapses/RelapseForm.tsx`
- [X] T031 [P] [US1] Implement relapse history list, filters, and item actions in `frontend/src/features/relapses/RelapseHistory.tsx`
- [X] T032 [US1] Compose the relapse capture and history screen in `frontend/src/pages/RelapsesPage.tsx`

**Checkpoint**: User Story 1 is functional and independently testable as the MVP increment.

---

## Phase 4: User Story 2 - Identificar padrões e gatilhos (Priority: P2)

**Goal**: Turn stored relapse context into trigger and pattern insights that the user can explore safely.

**Independent Test**: With multiple relapse records saved for one user, open the analytics view and verify recurring triggers, emotional states, and context patterns are shown with their supporting episodes, while sparse datasets return a clear insufficient-data state.

### Tests for User Story 2

- [X] T033 [P] [US2] Add contract coverage for `GET /analytics/triggers` in `backend/tests/contract/analytics.contract.test.ts`
- [X] T034 [P] [US2] Add backend unit coverage for trigger aggregation and minimum-data thresholds in `backend/tests/unit/trigger-patterns.test.ts`
- [X] T035 [P] [US2] Add frontend integration coverage for analytics loading, insufficient-data, and drilldown states in `frontend/tests/integration/analytics-page.test.tsx`
- [X] T036 [P] [US2] Add end-to-end coverage for recurring-trigger analysis in `tests/e2e/analytics.spec.ts`

### Implementation for User Story 2

- [X] T037 [P] [US2] Implement analytics response schemas from the API contract in `backend/src/api/schemas/analytics.ts`
- [X] T038 [P] [US2] Implement trigger and context aggregation queries in `backend/src/repositories/analyticsRepository.ts`
- [X] T039 [P] [US2] Implement recurring-pattern calculations and insufficient-data rules in `backend/src/domain/triggerInsights.ts`
- [X] T040 [US2] Implement trigger analytics service and supporting-relapse detail mapping in `backend/src/services/analyticsService.ts`
- [X] T041 [US2] Implement the authenticated analytics route in `backend/src/api/routes/analytics.ts`
- [X] T042 [P] [US2] Implement frontend analytics API methods in `frontend/src/services/analyticsApi.ts`
- [X] T043 [P] [US2] Implement recurring trigger cards and supporting-episode drilldown UI in `frontend/src/features/analytics/TriggerInsightsPanel.tsx`
- [X] T044 [US2] Compose the analytics page with period filters and empty-state messaging in `frontend/src/pages/AnalyticsPage.tsx`

**Checkpoint**: User Story 2 is independently functional on top of authenticated user data.

---

## Phase 5: User Story 3 - Acompanhar progresso pessoal (Priority: P3)

**Goal**: Show progress indicators, streaks, and period comparisons derived from the authenticated user’s relapse history.

**Independent Test**: With relapse records spread across time, open the progress view, change the period filter, and verify the UI updates relapse counts, average intervals, current streak, and best streak using only that user’s data.

### Tests for User Story 3

- [X] T045 [P] [US3] Add contract coverage for `GET /progress/summary` in `backend/tests/contract/progress.contract.test.ts`
- [X] T046 [P] [US3] Add backend unit coverage for streak and period summary calculations in `backend/tests/unit/progress-summary.test.ts`
- [X] T047 [P] [US3] Add frontend integration coverage for progress summary filters and comparison states in `frontend/tests/integration/progress-page.test.tsx`
- [X] T048 [P] [US3] Add end-to-end coverage for the personal progress journey in `tests/e2e/progress.spec.ts`

### Implementation for User Story 3

- [X] T049 [P] [US3] Implement progress response schemas from the API contract in `backend/src/api/schemas/progress.ts`
- [X] T050 [P] [US3] Implement period summary queries for relapse frequency and interval calculations in `backend/src/repositories/progressRepository.ts`
- [X] T051 [P] [US3] Implement streak and comparative progress calculations in `backend/src/domain/progressMetrics.ts`
- [X] T052 [US3] Implement the progress summary service in `backend/src/services/progressService.ts`
- [X] T053 [US3] Implement the authenticated progress route in `backend/src/api/routes/progress.ts`
- [X] T054 [P] [US3] Implement frontend progress API methods in `frontend/src/services/progressApi.ts`
- [X] T055 [P] [US3] Implement progress KPI cards and period comparison charts in `frontend/src/features/progress/ProgressSummaryPanel.tsx`
- [X] T056 [US3] Compose the progress page with period filtering in `frontend/src/pages/ProgressPage.tsx`

**Checkpoint**: User Story 3 is independently functional and validates personal progress tracking.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finish cross-story quality, documentation, and release validation work.

- [X] T057 [P] Add backend seed data for local development and test scenarios in `backend/prisma/seed.ts`
- [X] T058 [P] Add responsive navigation and authenticated route shell shared by relapse, analytics, and progress pages in `frontend/src/components/AppShell.tsx`
- [X] T059 [P] Add accessibility and mobile interaction refinements for the main user journeys in `frontend/src/styles/app.css`
- [X] T060 [P] Document local setup, scripts, and environment usage in `README.md`
- [X] T061 Run the quickstart validation flow and record any required adjustments in `specs/002-reduzir-habitos-compulsivos/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies, can start immediately.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and on relapse data existing for validation scenarios.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and on relapse data existing for validation scenarios.
- **Polish (Phase 6)**: Depends on the user stories selected for the release being complete.

### User Story Dependencies

- **US1**: Starts after Foundational and delivers the MVP.
- **US2**: Can be implemented after Foundational, but is easier to validate once US1 relapse capture is available.
- **US3**: Can be implemented after Foundational, but is easier to validate once US1 relapse capture is available.

### Within Each User Story

- Tests should be written first and verified as failing before implementation.
- API schemas and domain rules should be completed before services and routes.
- Backend endpoints should be in place before frontend page composition.
- End-to-end validation should run after backend and frontend implementation for the story is complete.

### Parallel Opportunities

- `T002` through `T007` can run in parallel after `T001`.
- `T010` through `T018` can run in parallel once the Prisma schema is defined.
- In US1, `T020` through `T023` can run in parallel, then `T024` through `T026`, then `T029` through `T031`.
- In US2, `T033` through `T036` can run in parallel, then `T037` through `T039`, then `T042` and `T043`.
- In US3, `T045` through `T048` can run in parallel, then `T049` through `T051`, then `T054` and `T055`.
- `T057` through `T060` can run in parallel in the Polish phase.

---

## Parallel Example: User Story 1

```bash
# Launch test work for User Story 1 together:
Task: "Add contract coverage for relapses endpoints in backend/tests/contract/relapses.contract.test.ts"
Task: "Add backend integration coverage for relapse lifecycle in backend/tests/integration/relapses.integration.test.ts"
Task: "Add frontend integration coverage for relapse form and history filtering in frontend/tests/integration/relapses-history.test.tsx"
Task: "Add end-to-end coverage for the relapse registration and history journey in tests/e2e/relapse-history.spec.ts"

# Launch backend and frontend building blocks for User Story 1 together:
Task: "Implement relapse request and response schemas in backend/src/api/schemas/relapses.ts"
Task: "Implement relapse persistence and catalog upsert logic in backend/src/repositories/relapseRepository.ts"
Task: "Implement relapse validation rules in backend/src/domain/relapseRules.ts"
```

---

## Parallel Example: User Story 2

```bash
# Launch analytics test work together:
Task: "Add contract coverage for GET /analytics/triggers in backend/tests/contract/analytics.contract.test.ts"
Task: "Add backend unit coverage for trigger aggregation in backend/tests/unit/trigger-patterns.test.ts"
Task: "Add frontend integration coverage for analytics page states in frontend/tests/integration/analytics-page.test.tsx"
Task: "Add end-to-end coverage for recurring-trigger analysis in tests/e2e/analytics.spec.ts"

# Launch analytics implementation building blocks together:
Task: "Implement analytics response schemas in backend/src/api/schemas/analytics.ts"
Task: "Implement trigger and context aggregation queries in backend/src/repositories/analyticsRepository.ts"
Task: "Implement recurring-pattern calculations in backend/src/domain/triggerInsights.ts"
```

---

## Parallel Example: User Story 3

```bash
# Launch progress test work together:
Task: "Add contract coverage for GET /progress/summary in backend/tests/contract/progress.contract.test.ts"
Task: "Add backend unit coverage for streak and period summary calculations in backend/tests/unit/progress-summary.test.ts"
Task: "Add frontend integration coverage for progress page states in frontend/tests/integration/progress-page.test.tsx"
Task: "Add end-to-end coverage for the personal progress journey in tests/e2e/progress.spec.ts"

# Launch progress implementation building blocks together:
Task: "Implement progress response schemas in backend/src/api/schemas/progress.ts"
Task: "Implement period summary queries in backend/src/repositories/progressRepository.ts"
Task: "Implement streak and comparative progress calculations in backend/src/domain/progressMetrics.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Validate the relapse registration and history flow independently before expanding scope.

### Incremental Delivery

1. Ship authenticated foundation plus relapse capture and history as the MVP.
2. Add trigger analytics once relapse data is flowing and validate insufficient-data behavior.
3. Add progress tracking once analytics and relapse history are stable.
4. Finish polish, accessibility, seed data, and quickstart validation before release.

### Parallel Team Strategy

1. One stream handles repository and app setup while another prepares auth and database foundations after `T001`.
2. After Phase 2, one developer can own US1, another US2, and another US3 with minimal file overlap.
3. Polish tasks can be split between documentation, UI refinement, and local validation.

---

## Notes

- Every task follows the required checklist format with task ID, optional `[P]`, and `[US#]` label when applicable.
- File paths follow the structure defined in `plan.md`.
- US1 is the suggested MVP scope because it delivers the first complete user value loop and enables all later insights.
