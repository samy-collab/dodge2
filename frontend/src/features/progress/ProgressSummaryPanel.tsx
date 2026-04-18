import type { ProgressSummary } from '../../services/types';

export function ProgressSummaryPanel({ summary }: { summary: ProgressSummary }) {
  const cards = [
    {
      label: 'Recaidas no periodo',
      value: summary.relapsesInPeriod,
    },
    {
      label: 'Sequencia atual',
      value: `${summary.currentStreakDays} dias`,
    },
    {
      label: 'Melhor sequencia',
      value: `${summary.bestStreakDays} dias`,
    },
    {
      label: 'Intervalo medio',
      value: `${summary.avgIntervalDays} dias`,
    },
  ];

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Resumo do progresso</h2>
        <p>
          Comparativo entre <strong>{summary.periodStart}</strong> e{' '}
          <strong>{summary.periodEnd}</strong>.
        </p>
      </div>

      <div className="kpi-grid">
        {cards.map((card) => (
          <article className="kpi-card" key={card.label}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

