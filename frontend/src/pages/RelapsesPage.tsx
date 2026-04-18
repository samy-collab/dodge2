import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { RelapseForm } from '../features/relapses/RelapseForm';
import { RelapseHistory } from '../features/relapses/RelapseHistory';
import { createRelapse, deleteRelapse, listRelapses, updateRelapse } from '../services/relapsesApi';
import type { PeriodFilter, RelapseEvent } from '../services/types';

const initialFilter: PeriodFilter = {};

export function RelapsesPage() {
  const [filter, setFilter] = useState<PeriodFilter>(initialFilter);
  const [selectedRelapse, setSelectedRelapse] = useState<RelapseEvent | null>(null);
  const queryClient = useQueryClient();

  const relapsesQuery = useQuery({
    queryKey: ['relapses', filter],
    queryFn: () => listRelapses(filter),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['relapses'] });

  const createMutation = useMutation({
    mutationFn: createRelapse,
    onSuccess: () => invalidate(),
  });

  const updateMutation = useMutation({
    mutationFn: ({ relapseId, payload }: { relapseId: string; payload: Parameters<typeof updateRelapse>[1] }) =>
      updateRelapse(relapseId, payload),
    onSuccess: () => {
      setSelectedRelapse(null);
      invalidate();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRelapse,
    onSuccess: () => invalidate(),
  });

  return (
    <div className="page-grid">
      <section className="hero">
        <div>
          <span className="eyebrow">Historico pessoal</span>
          <h1>Registre recaidas com o contexto que vai importar depois.</h1>
        </div>
        <div className="filter-bar">
          <label>
            De
            <input
              type="date"
              value={filter.from ?? ''}
              onChange={(event) => setFilter((current) => ({ ...current, from: event.target.value || undefined }))}
            />
          </label>
          <label>
            Ate
            <input
              type="date"
              value={filter.to ?? ''}
              onChange={(event) => setFilter((current) => ({ ...current, to: event.target.value || undefined }))}
            />
          </label>
        </div>
      </section>

      <RelapseForm
        initialRelapse={selectedRelapse}
        busy={createMutation.isPending || updateMutation.isPending}
        onSubmit={async (payload) => {
          if (selectedRelapse) {
            await updateMutation.mutateAsync({
              relapseId: selectedRelapse.id,
              payload,
            });
          } else {
            await createMutation.mutateAsync(payload);
          }
        }}
      />

      <RelapseHistory
        items={relapsesQuery.data?.items ?? []}
        selectedId={selectedRelapse?.id}
        onEdit={setSelectedRelapse}
        onDelete={(relapseId) => deleteMutation.mutate(relapseId)}
      />
    </div>
  );
}

