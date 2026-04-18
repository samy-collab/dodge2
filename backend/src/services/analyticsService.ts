import type { PeriodFilter } from '../api/schemas/relapses.js';
import { buildTriggerInsights } from '../domain/triggerInsights.js';
import { listRelapsesForAnalytics } from '../repositories/analyticsRepository.js';

function parsePeriod(filter: PeriodFilter) {
  return {
    from: filter.from ? new Date(`${filter.from}T00:00:00.000Z`) : undefined,
    to: filter.to ? new Date(`${filter.to}T23:59:59.999Z`) : undefined,
  };
}

export async function getTriggerAnalytics(userId: string, filter: PeriodFilter) {
  const period = parsePeriod(filter);
  const relapses = await listRelapsesForAnalytics(userId, period.from, period.to);
  return buildTriggerInsights(relapses);
}

