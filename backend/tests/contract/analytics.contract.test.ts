import { describe, expect, it } from 'vitest';
import { analyticsResponseSchema } from '../../src/api/schemas/analytics.js';

describe('Analytics contract', () => {
  it('parses trigger insight payloads', () => {
    const payload = analyticsResponseSchema.parse({
      hasEnoughData: true,
      items: [
        {
          patternKey: 'trigger:stress',
          patternType: 'trigger',
          label: 'Stress',
          occurrenceCount: 4,
          occurrenceRate: 0.5,
          supportingRelapseIds: ['85b655ca-2865-4349-8d5b-8b5f28ea45eb'],
        },
      ],
    });

    expect(payload.items[0]?.patternType).toBe('trigger');
  });
});

