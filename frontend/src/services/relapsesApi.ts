import { apiRequest } from './http';
import type { PeriodFilter, RelapseEvent } from './types';

export type RelapsePayload = {
  occurredAt: string;
  intensity: number;
  notes?: string;
  locationContext?: string;
  activityContext?: string;
  triggers: string[];
  emotions: string[];
};

export function listRelapses(filter: PeriodFilter) {
  return apiRequest<{ items: RelapseEvent[] }>('/relapses', {
    query: filter,
  });
}

export function createRelapse(payload: RelapsePayload) {
  return apiRequest<RelapseEvent>('/relapses', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateRelapse(relapseId: string, payload: Partial<RelapsePayload>) {
  return apiRequest<RelapseEvent>(`/relapses/${relapseId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function deleteRelapse(relapseId: string) {
  return apiRequest<void>(`/relapses/${relapseId}`, {
    method: 'DELETE',
  });
}

