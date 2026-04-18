import { z } from 'zod';
import { periodFilterSchema } from './relapses.js';

export const progressQuerySchema = periodFilterSchema;

export const progressSummarySchema = z.object({
  periodStart: z.string().date(),
  periodEnd: z.string().date(),
  relapsesInPeriod: z.number().int(),
  currentStreakDays: z.number().int(),
  bestStreakDays: z.number().int(),
  avgIntervalDays: z.number(),
});

export type ProgressSummary = z.infer<typeof progressSummarySchema>;

