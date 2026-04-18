import { render, screen } from '@testing-library/react';
import { RelapseHistory } from '../../src/features/relapses/RelapseHistory';

describe('RelapseHistory', () => {
  it('renders relapse details and actions', () => {
    render(
      <RelapseHistory
        items={[
          {
            id: '5d6f96af-9d43-4bf7-bae0-937d5f3378fb',
            occurredAt: '2026-04-10T19:00:00.000Z',
            recordedAt: '2026-04-10T19:05:00.000Z',
            intensity: 4,
            triggers: ['Stress'],
            emotions: ['Ansiedade'],
            notes: 'Teste',
          },
        ]}
        onEdit={() => undefined}
        onDelete={() => undefined}
      />,
    );

    expect(screen.getByText(/Historico/i)).toBeInTheDocument();
    expect(screen.getByText(/Stress/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Editar/i })).toBeInTheDocument();
  });
});

