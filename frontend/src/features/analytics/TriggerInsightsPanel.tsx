import type { TriggerPatternInsight } from '../../services/types';

export function TriggerInsightsPanel({
  hasEnoughData,
  items,
}: {
  hasEnoughData: boolean;
  items: TriggerPatternInsight[];
}) {
  if (!hasEnoughData) {
    return (
      <section className="panel">
        <div className="panel-heading">
          <h2>Analise de gatilhos</h2>
          <p>Registre pelo menos tres recaidas para liberar insights confiaveis.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Padroes recorrentes</h2>
        <p>Os itens abaixo resumem contextos que mais se repetem no seu historico recente.</p>
      </div>

      <div className="insight-grid">
        {items.map((item) => (
          <article key={item.patternKey} className="insight-card">
            <span className="eyebrow">{item.patternType}</span>
            <h3>{item.label}</h3>
            <p>{item.occurrenceCount} episodios relacionados</p>
            <strong>{Math.round(item.occurrenceRate * 100)}%</strong>
            <small>{item.supportingRelapseIds.length} recaidas sustentam esse insight.</small>
          </article>
        ))}
      </div>
    </section>
  );
}

