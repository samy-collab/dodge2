import { render, screen } from '@testing-library/react';
import { ProgressSummaryPanel } from '../../src/features/progress/ProgressSummaryPanel';

describe('ProgressSummaryPanel', () => {
  it('renders progress KPI cards', () => {
    render(
      <ProgressSummaryPanel
        summary={{
          periodStart: '2026-04-01',
          periodEnd: '2026-04-30',
          relapsesInPeriod: 2,
          currentStreakDays: 5,
          bestStreakDays: 11,
          avgIntervalDays: 3.5,
        }}
      />,
    );

    expect(screen.getByText(/Resumo do progresso/i)).toBeInTheDocument();
    expect(screen.getByText(/11 dias/i)).toBeInTheDocument();
  });
});

