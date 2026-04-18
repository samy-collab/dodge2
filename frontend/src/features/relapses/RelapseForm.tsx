import { useEffect, useState } from 'react';
import type { RelapseEvent } from '../../services/types';

export type RelapseFormValues = {
  occurredAt: string;
  intensity: number;
  notes: string;
  locationContext: string;
  activityContext: string;
  triggers: string;
  emotions: string;
};

function formatDateTimeLocal(date: Date) {
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function createEmptyValues(): RelapseFormValues {
  return {
    occurredAt: formatDateTimeLocal(new Date()),
    intensity: 3,
    notes: '',
    locationContext: '',
    activityContext: '',
    triggers: '',
    emotions: '',
  };
}

function toValues(relapse?: RelapseEvent | null): RelapseFormValues {
  if (!relapse) return createEmptyValues();
  return {
    occurredAt: formatDateTimeLocal(new Date(relapse.occurredAt)),
    intensity: relapse.intensity,
    notes: relapse.notes ?? '',
    locationContext: relapse.locationContext ?? '',
    activityContext: relapse.activityContext ?? '',
    triggers: relapse.triggers.join(', '),
    emotions: relapse.emotions.join(', '),
  };
}

function splitList(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export function RelapseForm({
  initialRelapse,
  onSubmit,
  busy,
}: {
  initialRelapse?: RelapseEvent | null;
  onSubmit: (payload: {
    occurredAt: string;
    intensity: number;
    notes?: string;
    locationContext?: string;
    activityContext?: string;
    triggers: string[];
    emotions: string[];
  }) => Promise<void>;
  busy?: boolean;
}) {
  const [values, setValues] = useState<RelapseFormValues>(toValues(initialRelapse));

  useEffect(() => {
    setValues(toValues(initialRelapse));
  }, [initialRelapse]);

  return (
    <form
      className="panel form-panel"
      onSubmit={async (event) => {
        event.preventDefault();
        await onSubmit({
          occurredAt: new Date(values.occurredAt).toISOString(),
          intensity: values.intensity,
          notes: values.notes || undefined,
          locationContext: values.locationContext || undefined,
          activityContext: values.activityContext || undefined,
          triggers: splitList(values.triggers),
          emotions: splitList(values.emotions),
        });
        if (!initialRelapse) {
          setValues(createEmptyValues());
        }
      }}
    >
      <div className="panel-heading">
        <h2>{initialRelapse ? 'Editar recaida' : 'Registrar recaida'}</h2>
        <p>Adicione contexto suficiente para identificar padroes depois.</p>
      </div>

      <label>
        Data e hora
        <input
          required
          type="datetime-local"
          value={values.occurredAt}
          onChange={(event) => setValues((current) => ({ ...current, occurredAt: event.target.value }))}
        />
      </label>

      <label>
        Intensidade
        <input
          required
          min={1}
          max={5}
          type="range"
          value={values.intensity}
          onChange={(event) =>
            setValues((current) => ({ ...current, intensity: Number(event.target.value) }))
          }
        />
        <span>{values.intensity}/5</span>
      </label>

      <label>
        Gatilhos
        <input
          placeholder="stress, solidao, cansaco"
          value={values.triggers}
          onChange={(event) => setValues((current) => ({ ...current, triggers: event.target.value }))}
        />
      </label>

      <label>
        Emocoes
        <input
          placeholder="ansiedade, culpa"
          value={values.emotions}
          onChange={(event) => setValues((current) => ({ ...current, emotions: event.target.value }))}
        />
      </label>

      <label>
        Contexto de atividade
        <input
          value={values.activityContext}
          onChange={(event) =>
            setValues((current) => ({ ...current, activityContext: event.target.value }))
          }
        />
      </label>

      <label>
        Contexto de local
        <input
          value={values.locationContext}
          onChange={(event) =>
            setValues((current) => ({ ...current, locationContext: event.target.value }))
          }
        />
      </label>

      <label>
        Observacoes
        <textarea
          rows={4}
          value={values.notes}
          onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
        />
      </label>

      <button type="submit" disabled={busy}>
        {busy ? 'Salvando...' : initialRelapse ? 'Salvar alteracoes' : 'Registrar agora'}
      </button>
    </form>
  );
}
