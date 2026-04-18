import type { PeriodFilter } from '../api/schemas/relapses.js';
import { calculateAverageIntervalDays, calculateBestStreakDays, calculateCurrentStreakDays } from '../domain/progressMetrics.js';
import { listRelapsesForProgress } from '../repositories/progressRepository.js';

function resolvePeriod(filter: PeriodFilter) {
  const now = new Date();
  const from = filter.from
    ? new Date(`${filter.from}T00:00:00.000Z`)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const to = filter.to ? new Date(`${filter.to}T23:59:59.999Z`) : now;

  return { from, to };
}

function toDateString(value: Date) {
  return value.toISOString().slice(0, 10);
}

export async function getProgressSummary(userId: string, filter: PeriodFilter) {
  const period = resolvePeriod(filter);
  const { allRelapses, periodRelapses } = await listRelapsesForProgress(userId, period.from, period.to);
  const lastRelapse = [...allRelapses].sort(
    (left, right) => right.occurredAt.getTime() - left.occurredAt.getTime(),
  )[0];

  return {
    periodStart: toDateString(period.from),
    periodEnd: toDateString(period.to),
    relapsesInPeriod: periodRelapses.length,
    currentStreakDays: calculateCurrentStreakDays(lastRelapse?.occurredAt ?? null),
    bestStreakDays: calculateBestStreakDays(allRelapses),
    avgIntervalDays: calculateAverageIntervalDays(periodRelapses),
  };
}

