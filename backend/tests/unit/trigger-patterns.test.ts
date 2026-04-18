import { describe, expect, it } from 'vitest';
import { buildTriggerInsights } from '../../src/domain/triggerInsights.js';

describe('Trigger insights', () => {
  it('returns insufficient-data for short histories', () => {
    const result = buildTriggerInsights([
      {
        id: '1e26da6b-2b0f-47ca-98b5-3ef37adf7b11',
        occurredAt: new Date(),
        triggers: ['Stress'],
        emotions: ['Ansiedade'],
        activityContext: 'Casa',
        locationContext: 'Quarto',
      },
    ]);

    expect(result.hasEnoughData).toBe(false);
  });
});

