import type { CreateRelapseRequest, UpdateRelapseRequest } from '../api/schemas/relapses.js';

const FUTURE_TOLERANCE_MS = 5 * 60 * 1000;

export function ensureOccurredAtInPast(occurredAt: Date) {
  if (occurredAt.getTime() > Date.now() + FUTURE_TOLERANCE_MS) {
    throw new Error('A recaida nao pode ser registrada no futuro.');
  }
}

export function isPotentialDuplicate(
  latest: {
    occurredAt: Date;
    intensity: number;
    activityContext: string | null;
    locationContext: string | null;
  } | null,
  candidate: CreateRelapseRequest,
) {
  if (!latest) {
    return false;
  }

  return (
    latest.intensity === candidate.intensity &&
    latest.occurredAt.toISOString() === candidate.occurredAt.toISOString() &&
    (latest.activityContext ?? '') === (candidate.activityContext ?? '') &&
    (latest.locationContext ?? '') === (candidate.locationContext ?? '')
  );
}

export function applyRelapsePatch<T extends Record<string, unknown>>(
  original: T,
  patch: UpdateRelapseRequest,
) {
  return {
    ...original,
    ...Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== undefined),
    ),
  };
}

