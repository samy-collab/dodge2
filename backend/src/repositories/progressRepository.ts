import { listRelapses } from './relapseRepository.js';

export async function listRelapsesForProgress(userId: string, from?: Date, to?: Date) {
  const allRelapses = await listRelapses(userId);
  const periodRelapses = await listRelapses(userId, from, to);

  return {
    allRelapses: allRelapses.map((relapse) => ({
      occurredAt: relapse.occurredAt,
    })),
    periodRelapses: periodRelapses.map((relapse) => ({
      occurredAt: relapse.occurredAt,
    })),
  };
}

