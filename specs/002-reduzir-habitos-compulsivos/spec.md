# Feature Specification: Sistema de Redução de Hábitos Compulsivos

**Feature Branch**: `002-reduzir-habitos-compulsivos`  
**Created**: 2026-04-18  
**Status**: Draft  
**Input**: User description: "Um sistema para ajudar usuários a identificar, acompanhar e reduzir hábitos compulsivos, através do registro de recaídas, análise de gatilhos e acompanhamento de progresso pessoal."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Registrar recaídas com contexto (Priority: P1)

Como usuário, quero registrar uma recaída rapidamente junto com informações sobre o que aconteceu antes e durante o episódio, para construir um histórico confiável do meu comportamento.

**Why this priority**: Sem registro consistente, o sistema não consegue apoiar análise de gatilhos nem acompanhamento de evolução. Este é o núcleo de valor da funcionalidade.

**Independent Test**: Pode ser testada de forma independente ao permitir que um usuário registre uma recaída com data, horário, intensidade percebida e contexto, e depois visualize esse registro salvo no próprio histórico.

**Acceptance Scenarios**:

1. **Given** que o usuário deseja registrar um episódio, **When** ele informa os dados mínimos exigidos da recaída, **Then** o sistema salva o registro com data e horário associados ao episódio.
2. **Given** que o usuário registrou uma recaída, **When** ele adiciona gatilhos percebidos, emoções e observações, **Then** o sistema associa essas informações ao mesmo episódio.
3. **Given** que o usuário abre seu histórico, **When** ele consulta os registros anteriores, **Then** o sistema apresenta cada recaída com seus respectivos detalhes contextuais.

---

### User Story 2 - Identificar padrões e gatilhos (Priority: P2)

Como usuário, quero visualizar padrões recorrentes entre minhas recaídas, para reconhecer gatilhos e circunstâncias que aumentam meu risco de repetição.

**Why this priority**: Depois de existir um histórico mínimo, o próximo maior valor está em transformar registros brutos em aprendizado acionável sobre comportamentos e situações de risco.

**Independent Test**: Pode ser testada de forma independente ao registrar múltiplas recaídas com gatilhos e contextos variados e verificar se o sistema destaca os padrões mais recorrentes.

**Acceptance Scenarios**:

1. **Given** que existem múltiplos registros com dados contextuais, **When** o usuário acessa a análise de gatilhos, **Then** o sistema apresenta os gatilhos mais recorrentes e sua frequência.
2. **Given** que há recaídas registradas em horários ou situações semelhantes, **When** o usuário consulta os padrões pessoais, **Then** o sistema evidencia tendências de contexto, horário ou estado emocional.
3. **Given** que o usuário analisa um gatilho recorrente, **When** ele abre o detalhamento desse padrão, **Then** o sistema mostra quais episódios contribuíram para essa identificação.

---

### User Story 3 - Acompanhar progresso pessoal (Priority: P3)

Como usuário, quero acompanhar meu progresso ao longo do tempo, para perceber melhora, manter motivação e ajustar minhas estratégias de redução.

**Why this priority**: O acompanhamento de progresso reforça engajamento e permite avaliar se o usuário está reduzindo frequência, intensidade ou recorrência de episódios.

**Independent Test**: Pode ser testada de forma independente ao registrar recaídas ao longo de um período e verificar se o sistema mostra indicadores comparativos, marcos e evolução pessoal.

**Acceptance Scenarios**:

1. **Given** que o usuário possui histórico de recaídas, **When** ele acessa a visão de progresso, **Then** o sistema apresenta indicadores comparativos por período.
2. **Given** que o usuário passou um intervalo sem recaídas, **When** ele consulta seu progresso, **Then** o sistema mostra a sequência atual e o melhor período já alcançado.
3. **Given** que o usuário deseja rever sua evolução recente, **When** ele seleciona um intervalo de tempo, **Then** o sistema atualiza os indicadores de progresso para esse período.

---

### Edge Cases

- O sistema deve permitir registrar uma recaída ocorrida anteriormente no mesmo dia ou em dias passados, deixando claro a data e o horário reais do episódio.
- O sistema deve lidar com registros incompletos, salvando apenas quando os campos mínimos forem fornecidos e orientando o usuário sobre o que falta.
- O sistema deve evitar contagem duplicada acidental quando o usuário tentar salvar duas vezes o mesmo episódio em sequência.
- Quando não houver dados suficientes para detectar padrões confiáveis, o sistema deve informar que ainda não existe base histórica mínima para análise.
- Se o usuário remover ou corrigir um registro anterior, os indicadores de progresso e padrões devem refletir a atualização.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST permitir que o usuário registre uma recaída com, no mínimo, data do episódio, horário aproximado e uma classificação de intensidade percebida.
- **FR-002**: O sistema MUST permitir que o usuário associe a cada recaída informações contextuais, incluindo gatilhos percebidos, estado emocional e observações livres.
- **FR-003**: O sistema MUST permitir que o usuário visualize, consulte e revise seu histórico de recaídas em ordem cronológica.
- **FR-004**: O sistema MUST permitir que o usuário corrija ou remova registros de recaídas para manter a precisão do histórico pessoal.
- **FR-005**: O sistema MUST identificar e apresentar os gatilhos mais recorrentes com base nos registros realizados pelo usuário.
- **FR-006**: O sistema MUST destacar padrões pessoais relacionados a frequência, horários, contextos e estados emocionais recorrentes quando houver dados suficientes.
- **FR-007**: O sistema MUST permitir que o usuário visualize indicadores de progresso por período, incluindo frequência de recaídas e intervalos entre episódios.
- **FR-008**: O sistema MUST apresentar ao usuário sua sequência atual sem recaídas e o maior intervalo sem recaídas já alcançado, quando aplicável.
- **FR-009**: O sistema MUST permitir que o usuário filtre a visualização de histórico, análise e progresso por intervalo de tempo.
- **FR-010**: O sistema MUST informar claramente quando não houver dados suficientes para gerar análise de gatilhos ou indicadores comparativos confiáveis.
- **FR-011**: O sistema MUST proteger a privacidade do usuário ao restringir o acesso aos registros pessoais apenas ao próprio titular autorizado.
- **FR-012**: O sistema MUST preservar consistência entre histórico, análise de gatilhos e progresso sempre que um registro for criado, editado ou removido.

### Key Entities *(include if feature involves data)*

- **Usuário**: Pessoa que registra recaídas, consulta padrões e acompanha a própria evolução.
- **Recaída**: Episódio registrado pelo usuário, contendo data, horário, intensidade percebida e observações contextuais.
- **Gatilho**: Fator percebido pelo usuário como associado à recaída, como situação, emoção, ambiente ou comportamento anterior.
- **Indicador de Progresso**: Medida calculada a partir do histórico pessoal, como frequência por período, sequência atual sem recaídas e melhor sequência histórica.
- **Padrão Pessoal**: Tendência identificada a partir da repetição de gatilhos, horários, contextos ou estados emocionais em múltiplos episódios.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 90% dos usuários conseguem registrar uma recaída completa em até 2 minutos na primeira tentativa.
- **SC-002**: 85% dos usuários com pelo menos 10 registros conseguem identificar ao menos um gatilho recorrente em sua análise pessoal.
- **SC-003**: 80% dos usuários conseguem localizar e revisar um registro anterior específico em menos de 1 minuto.
- **SC-004**: 75% dos usuários ativos relatam melhor compreensão dos próprios gatilhos após 4 semanas de uso contínuo.
- **SC-005**: 70% dos usuários ativos conseguem verificar sua evolução recente e comparar dois períodos distintos sem apoio externo.

## Assumptions

- O sistema é destinado ao acompanhamento individual e não substitui aconselhamento clínico ou atendimento profissional.
- A primeira versão atende um único tipo de usuário final: a própria pessoa que registra e acompanha seus hábitos.
- O sistema considera como progresso principal a redução de frequência de recaídas e o aumento dos intervalos entre episódios.
- O usuário está disposto a registrar episódios manualmente com honestidade suficiente para gerar análises úteis.
- O sistema operará com dados pessoais sensíveis e, portanto, deve tratar privacidade e acesso individual como requisito básico do produto.
