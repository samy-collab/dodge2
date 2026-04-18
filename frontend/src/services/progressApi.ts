import { apiRequest } from './http';
import type { PeriodFilter, ProgressSummary } from './types';

export function getProgressSummary(filter: PeriodFilter) {
  return apiRequest<ProgressSummary>('/progress/summary', {
    query: filter,
  });
}

