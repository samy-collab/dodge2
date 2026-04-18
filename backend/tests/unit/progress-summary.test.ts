import { describe, expect, it } from 'vitest';
import { calculateAverageIntervalDays, calculateBestStreakDays } from '../../src/domain/progressMetrics.js';

describe('Progress metrics', () => {
  it('calculates average interval days', () => {
    const average = calculateAverageIntervalDays([
      { occurredAt: new Date('2026-04-01T00:00:00.000Z') },
      { occurredAt: new Date('2026-04-04T00:00:00.000Z') },
      { occurredAt: new Date('2026-04-08T00:00:00.000Z') },
    ]);

    expect(average).toBe(3.5);
  });

  it('calculates the best streak based on the history', () => {
    const best = calculateBestStreakDays(
      [
        { occurredAt: new Date('2026-04-01T00:00:00.000Z') },
        { occurredAt: new Date('2026-04-04T00:00:00.000Z') },
        { occurredAt: new Date('2026-04-11T00:00:00.000Z') },
      ],
      new Date('2026-04-15T00:00:00.000Z'),
    );

    expect(best).toBe(7);
  });
});

