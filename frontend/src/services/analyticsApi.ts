import { apiRequest } from './http';
import type { PeriodFilter, TriggerPatternInsight } from './types';

export function getTriggerAnalytics(filter: PeriodFilter) {
  return apiRequest<{ hasEnoughData: boolean; items: TriggerPatternInsight[] }>(
    '/analytics/triggers',
    {
      query: filter,
    },
  );
}

