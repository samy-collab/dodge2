# Data Model: Sistema de Redução de Hábitos Compulsivos

## 1. UserAccount

### Purpose

Representa o titular dos dados e o limite de isolamento de privacidade do sistema.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | UUID | Sim | Identificador imutável |
| `email` | string | Sim | Único, formato válido, usado para autenticação |
| `password_hash` | string | Sim | Nunca exposto fora do backend |
| `display_name` | string | Sim | 2 a 80 caracteres |
| `timezone` | string | Sim | IANA timezone válida |
| `created_at` | datetime | Sim | Definido na criação |
| `updated_at` | datetime | Sim | Atualizado a cada alteração |
| `last_login_at` | datetime | Não | Atualizado após login bem-sucedido |

### Relationships

- 1 `UserAccount` para N `RelapseEvent`
- 1 `UserAccount` para N `TriggerCatalogItem`
- 1 `UserAccount` para N `EmotionCatalogItem`

### Validation Notes

- Toda consulta de domínio deve ser filtrada por `user_id`.
- `timezone` é obrigatória para calcular corretamente sequência sem recaída e agregações por período.

## 2. RelapseEvent

### Purpose

Registro principal do domínio, descrevendo um episódio de recaída e seu contexto.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | UUID | Sim | Identificador imutável |
| `user_id` | UUID | Sim | Referência ao titular |
| `occurred_at` | datetime | Sim | Pode ser passado, mas não futuro além de tolerância operacional |
| `recorded_at` | datetime | Sim | Timestamp de criação do registro |
| `intensity` | integer | Sim | Escala de 1 a 5 |
| `notes` | text | Não | Até 2000 caracteres |
| `location_context` | string | Não | Até 120 caracteres |
| `activity_context` | string | Não | Até 120 caracteres |
| `updated_at` | datetime | Sim | Atualizado em edição |
| `deleted_at` | datetime | Não | Usado para exclusão lógica, se adotada |

### Relationships

- N `RelapseEvent` para 1 `UserAccount`
- N `RelapseEvent` para N `TriggerCatalogItem` via `RelapseTriggerLink`
- N `RelapseEvent` para N `EmotionCatalogItem` via `RelapseEmotionLink`

### Validation Notes

- `occurred_at` e `recorded_at` não podem ser nulos.
- Duplicidade acidental deve ser mitigada por validação de confirmação quando houver submissões consecutivas com mesmos dados essenciais.

### State Transitions

`created` -> `updated` -> `deleted`

## 3. TriggerCatalogItem

### Purpose

Lista de gatilhos observáveis reutilizáveis por usuário, permitindo agregação consistente ao longo do tempo.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | UUID | Sim | Identificador imutável |
| `user_id` | UUID | Sim | Dono do item |
| `label` | string | Sim | 1 a 60 caracteres |
| `normalized_label` | string | Sim | Usado para evitar duplicatas equivalentes |
| `created_at` | datetime | Sim | Definido na criação |
| `archived_at` | datetime | Não | Permite ocultar gatilhos sem perder histórico |

### Relationships

- 1 `TriggerCatalogItem` para N `RelapseTriggerLink`

### Validation Notes

- `normalized_label` deve ser único por usuário.

## 4. EmotionCatalogItem

### Purpose

Lista de estados emocionais associados a episódios, para apoiar análise de padrões.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `id` | UUID | Sim | Identificador imutável |
| `user_id` | UUID | Sim | Dono do item |
| `label` | string | Sim | 1 a 40 caracteres |
| `normalized_label` | string | Sim | Usado para deduplicação por usuário |
| `created_at` | datetime | Sim | Definido na criação |

### Relationships

- 1 `EmotionCatalogItem` para N `RelapseEmotionLink`

### Validation Notes

- `normalized_label` deve ser único por usuário.

## 5. RelapseTriggerLink

### Purpose

Tabela de associação entre recaídas e gatilhos.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `relapse_event_id` | UUID | Sim | FK |
| `trigger_catalog_item_id` | UUID | Sim | FK |

### Relationships

- N `RelapseTriggerLink` para 1 `RelapseEvent`
- N `RelapseTriggerLink` para 1 `TriggerCatalogItem`

### Validation Notes

- Chave composta única por par para evitar duplicidade no mesmo episódio.

## 6. RelapseEmotionLink

### Purpose

Tabela de associação entre recaídas e estados emocionais.

### Fields

| Field | Type | Required | Rules |
|-------|------|----------|-------|
| `relapse_event_id` | UUID | Sim | FK |
| `emotion_catalog_item_id` | UUID | Sim | FK |

### Relationships

- N `RelapseEmotionLink` para 1 `RelapseEvent`
- N `RelapseEmotionLink` para 1 `EmotionCatalogItem`

### Validation Notes

- Chave composta única por par para evitar duplicidade no mesmo episódio.

## 7. ProgressSummary

### Purpose

Visão derivada para apresentar evolução do usuário sem armazenar regras críticas duplicadas.

### Derived Fields

| Field | Type | Description |
|-------|------|-------------|
| `current_streak_days` | integer | Dias desde a última recaída registrada |
| `best_streak_days` | integer | Melhor sequência histórica sem recaídas |
| `relapses_in_period` | integer | Total no intervalo selecionado |
| `avg_interval_days` | number | Média de dias entre recaídas no período |
| `period_start` | date | Início do recorte |
| `period_end` | date | Fim do recorte |

### Validation Notes

- Deve ser recalculada sempre que um `RelapseEvent` for criado, editado ou removido.

## 8. TriggerPatternInsight

### Purpose

Visão derivada para destacar gatilhos e contextos recorrentes ao usuário.

### Derived Fields

| Field | Type | Description |
|-------|------|-------------|
| `pattern_key` | string | Identificador do padrão |
| `pattern_type` | enum | `trigger`, `emotion`, `time_of_day`, `activity`, `location` |
| `label` | string | Nome exibido ao usuário |
| `occurrence_count` | integer | Quantidade de recaídas associadas |
| `occurrence_rate` | number | Frequência relativa no histórico considerado |
| `supporting_relapse_ids` | UUID[] | Episódios que sustentam o insight |

### Validation Notes

- Só deve ser exibida quando houver base mínima de dados para evitar falso sinal.
