import { z } from 'zod';
import { periodFilterSchema } from './relapses.js';

export const triggerPatternInsightSchema = z.object({
  patternKey: z.string(),
  patternType: z.enum(['trigger', 'emotion', 'time_of_day', 'activity', 'location']),
  label: z.string(),
  occurrenceCount: z.number().int(),
  occurrenceRate: z.number(),
  supportingRelapseIds: z.array(z.string().uuid()),
});

export const analyticsQuerySchema = periodFilterSchema;

export const analyticsResponseSchema = z.object({
  hasEnoughData: z.boolean(),
  items: z.array(triggerPatternInsightSchema),
});

export type TriggerPatternInsight = z.infer<typeof triggerPatternInsightSchema>;

