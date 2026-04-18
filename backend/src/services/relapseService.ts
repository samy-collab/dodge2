import type {
  CreateRelapseRequest,
  PeriodFilter,
  UpdateRelapseRequest,
} from '../api/schemas/relapses.js';
import { applyRelapsePatch, ensureOccurredAtInPast, isPotentialDuplicate } from '../domain/relapseRules.js';
import {
  createRelapse,
  deleteRelapse,
  findRelapseById,
  getLatestRelapse,
  listRelapses,
  toRelapseDto,
  updateRelapse,
} from '../repositories/relapseRepository.js';

function parsePeriod(filter: PeriodFilter) {
  return {
    from: filter.from ? new Date(`${filter.from}T00:00:00.000Z`) : undefined,
    to: filter.to ? new Date(`${filter.to}T23:59:59.999Z`) : undefined,
  };
}

export async function listRelapseHistory(userId: string, filter: PeriodFilter) {
  const period = parsePeriod(filter);
  const relapses = await listRelapses(userId, period.from, period.to);
  return {
    items: relapses.map(toRelapseDto),
  };
}

export async function createRelapseEntry(userId: string, input: CreateRelapseRequest) {
  ensureOccurredAtInPast(input.occurredAt);
  const latest = await getLatestRelapse(userId);

  if (isPotentialDuplicate(latest, input)) {
    throw new Error('POTENTIAL_DUPLICATE');
  }

  const relapse = await createRelapse(userId, input);
  return toRelapseDto(relapse);
}

export async function updateRelapseEntry(
  userId: string,
  relapseId: string,
  input: UpdateRelapseRequest,
) {
  const existing = await findRelapseById(userId, relapseId);
  if (!existing) {
    throw new Error('RELAPSE_NOT_FOUND');
  }

  const merged = applyRelapsePatch(
    {
      occurredAt: existing.occurredAt,
      intensity: existing.intensity,
      notes: existing.notes,
      locationContext: existing.locationContext,
      activityContext: existing.activityContext,
      triggers: existing.triggerLinks.map((link) => link.triggerCatalogItem.label),
      emotions: existing.emotionLinks.map((link) => link.emotionCatalogItem.label),
    },
    input,
  );

  ensureOccurredAtInPast(merged.occurredAt);
  const relapse = await updateRelapse(userId, relapseId, merged);
  return toRelapseDto(relapse);
}

export async function removeRelapseEntry(userId: string, relapseId: string) {
  const result = await deleteRelapse(userId, relapseId);
  if (result.count === 0) {
    throw new Error('RELAPSE_NOT_FOUND');
  }
}

