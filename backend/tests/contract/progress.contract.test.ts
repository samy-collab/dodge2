import { describe, expect, it } from 'vitest';
import { progressSummarySchema } from '../../src/api/schemas/progress.js';

describe('Progress contract', () => {
  it('parses the progress summary shape', () => {
    const payload = progressSummarySchema.parse({
      periodStart: '2026-04-01',
      periodEnd: '2026-04-30',
      relapsesInPeriod: 2,
      currentStreakDays: 6,
      bestStreakDays: 14,
      avgIntervalDays: 3.5,
    });

    expect(payload.bestStreakDays).toBe(14);
  });
});

