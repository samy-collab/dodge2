import { render, screen } from '@testing-library/react';
import { TriggerInsightsPanel } from '../../src/features/analytics/TriggerInsightsPanel';

describe('TriggerInsightsPanel', () => {
  it('shows the insufficient-data state', () => {
    render(<TriggerInsightsPanel hasEnoughData={false} items={[]} />);
    expect(screen.getByText(/pelo menos tres recaidas/i)).toBeInTheDocument();
  });
});

