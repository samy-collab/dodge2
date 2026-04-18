import type { RelapseEvent } from '../../services/types';

function formatDate(value: string) {
  return new Date(value).toLocaleString('pt-BR');
}

export function RelapseHistory({
  items,
  selectedId,
  onEdit,
  onDelete,
}: {
  items: RelapseEvent[];
  selectedId?: string;
  onEdit: (relapse: RelapseEvent) => void;
  onDelete: (relapseId: string) => void;
}) {
  return (
    <section className="panel">
      <div className="panel-heading">
        <h2>Historico</h2>
        <p>Lista cronologica privada, com filtros e acoes rapidas.</p>
      </div>

      <div className="history-list">
        {items.length === 0 ? (
          <p className="muted">Nenhuma recaida encontrada para o periodo selecionado.</p>
        ) : null}

        {items.map((item) => (
          <article
            key={item.id}
            className={`history-card ${selectedId === item.id ? 'is-selected' : ''}`}
          >
            <header>
              <div>
                <strong>{formatDate(item.occurredAt)}</strong>
                <span> Intensidade {item.intensity}/5</span>
              </div>
              <div className="history-actions">
                <button type="button" onClick={() => onEdit(item)}>
                  Editar
                </button>
                <button type="button" className="secondary" onClick={() => onDelete(item.id)}>
                  Remover
                </button>
              </div>
            </header>
            <p>{item.notes ?? 'Sem observacoes registradas.'}</p>
            <dl>
              <div>
                <dt>Gatilhos</dt>
                <dd>{item.triggers.join(', ') || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>Emocoes</dt>
                <dd>{item.emotions.join(', ') || 'Nao informado'}</dd>
              </div>
              <div>
                <dt>Atividade</dt>
                <dd>{item.activityContext ?? 'Nao informado'}</dd>
              </div>
              <div>
                <dt>Local</dt>
                <dd>{item.locationContext ?? 'Nao informado'}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

