import { describe, expect, it } from 'vitest';
import { createRelapseRequestSchema, relapseEventSchema } from '../../src/api/schemas/relapses.js';

describe('Relapses contract', () => {
  it('accepts the create payload shape', () => {
    const payload = createRelapseRequestSchema.parse({
      occurredAt: new Date().toISOString(),
      intensity: 4,
      triggers: ['Stress'],
      emotions: ['Ansiedade'],
    });

    expect(payload.intensity).toBe(4);
  });

  it('matches the relapse response shape', () => {
    const relapse = relapseEventSchema.parse({
      id: '85b655ca-2865-4349-8d5b-8b5f28ea45eb',
      occurredAt: new Date().toISOString(),
      recordedAt: new Date().toISOString(),
      intensity: 3,
      triggers: [],
      emotions: [],
    });

    expect(relapse.id).toBeTruthy();
  });
});

