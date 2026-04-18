import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TriggerInsightsPanel } from '../features/analytics/TriggerInsightsPanel';
import { getTriggerAnalytics } from '../services/analyticsApi';
import type { PeriodFilter } from '../services/types';

export function AnalyticsPage() {
  const [filter, setFilter] = useState<PeriodFilter>({});
  const analyticsQuery = useQuery({
    queryKey: ['analytics', filter],
    queryFn: () => getTriggerAnalytics(filter),
  });

  return (
    <div className="page-grid">
      <section className="hero">
        <div>
          <span className="eyebrow">Analise segura</span>
          <h1>Encontre gatilhos, emocoes e contextos que se repetem.</h1>
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

      <TriggerInsightsPanel
        hasEnoughData={analyticsQuery.data?.hasEnoughData ?? false}
        items={analyticsQuery.data?.items ?? []}
      />
    </div>
  );
}

