import { listRelapses } from './relapseRepository.js';

export async function listRelapsesForAnalytics(userId: string, from?: Date, to?: Date) {
  const relapses = await listRelapses(userId, from, to);
  return relapses.map((relapse) => ({
    id: relapse.id,
    occurredAt: relapse.occurredAt,
    activityContext: relapse.activityContext,
    locationContext: relapse.locationContext,
    triggers: relapse.triggerLinks.map((link) => link.triggerCatalogItem.label),
    emotions: relapse.emotionLinks.map((link) => link.emotionCatalogItem.label),
  }));
}

