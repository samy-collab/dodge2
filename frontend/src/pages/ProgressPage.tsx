import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ProgressSummaryPanel } from '../features/progress/ProgressSummaryPanel';
import { getProgressSummary } from '../services/progressApi';
import type { PeriodFilter } from '../services/types';

export function ProgressPage() {
  const [filter, setFilter] = useState<PeriodFilter>({});
  const progressQuery = useQuery({
    queryKey: ['progress', filter],
    queryFn: () => getProgressSummary(filter),
  });

  return (
    <div className="page-grid">
      <section className="hero">
        <div>
          <span className="eyebrow">Evolucao pessoal</span>
          <h1>Acompanhe sequencias, frequencia e intervalos por periodo.</h1>
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

      {progressQuery.data ? <ProgressSummaryPanel summary={progressQuery.data} /> : null}
    </div>
  );
}

