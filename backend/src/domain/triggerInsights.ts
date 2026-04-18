import type { TriggerPatternInsight } from '../api/schemas/analytics.js';

type RelapseInput = {
  id: string;
  occurredAt: Date;
  activityContext: string | null;
  locationContext: string | null;
  triggers: string[];
  emotions: string[];
};

const MIN_RELAPSES_FOR_INSIGHTS = 3;

function toTimeOfDay(date: Date) {
  const hour = date.getHours();
  if (hour < 6) return 'Madrugada';
  if (hour < 12) return 'Manha';
  if (hour < 18) return 'Tarde';
  return 'Noite';
}

function buildPattern(
  patternType: TriggerPatternInsight['patternType'],
  label: string,
  relapseIds: string[],
  totalRelapses: number,
): TriggerPatternInsight {
  return {
    patternKey: `${patternType}:${label.toLowerCase()}`,
    patternType,
    label,
    occurrenceCount: relapseIds.length,
    occurrenceRate: Number((relapseIds.length / totalRelapses).toFixed(2)),
    supportingRelapseIds: relapseIds,
  };
}

export function buildTriggerInsights(relapses: RelapseInput[]) {
  if (relapses.length < MIN_RELAPSES_FOR_INSIGHTS) {
    return {
      hasEnoughData: false,
      items: [] as TriggerPatternInsight[],
    };
  }

  const buckets = new Map<string, { type: TriggerPatternInsight['patternType']; label: string; relapseIds: string[] }>();

  const pushValue = (
    type: TriggerPatternInsight['patternType'],
    label: string | null | undefined,
    relapseId: string,
  ) => {
    if (!label) return;
    const key = `${type}:${label.toLowerCase()}`;
    const current = buckets.get(key) ?? { type, label, relapseIds: [] };
    current.relapseIds.push(relapseId);
    buckets.set(key, current);
  };

  for (const relapse of relapses) {
    relapse.triggers.forEach((trigger) => pushValue('trigger', trigger, relapse.id));
    relapse.emotions.forEach((emotion) => pushValue('emotion', emotion, relapse.id));
    pushValue('activity', relapse.activityContext, relapse.id);
    pushValue('location', relapse.locationContext, relapse.id);
    pushValue('time_of_day', toTimeOfDay(relapse.occurredAt), relapse.id);
  }

  const items = [...buckets.values()]
    .filter((entry) => entry.relapseIds.length >= 2)
    .map((entry) => buildPattern(entry.type, entry.label, entry.relapseIds, relapses.length))
    .sort((left, right) => right.occurrenceCount - left.occurrenceCount);

  return {
    hasEnoughData: items.length > 0,
    items,
  };
}

