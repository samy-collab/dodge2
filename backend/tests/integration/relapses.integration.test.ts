import { describe, expect, it } from 'vitest';
import { isPotentialDuplicate } from '../../src/domain/relapseRules.js';

describe('Relapse duplicate protection', () => {
  it('flags immediate duplicate submissions with same core fields', () => {
    const occurredAt = new Date('2026-04-10T10:00:00.000Z');

    expect(
      isPotentialDuplicate(
        {
          occurredAt,
          intensity: 4,
          activityContext: 'Casa',
          locationContext: 'Sofá',
        },
        {
          occurredAt,
          intensity: 4,
          activityContext: 'Casa',
          locationContext: 'Sofá',
          triggers: [],
          emotions: [],
        },
      ),
    ).toBe(true);
  });
});

