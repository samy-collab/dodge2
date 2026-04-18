import { z } from 'zod';

const triggerListSchema = z.array(z.string().min(1).max(60)).max(10).default([]);
const emotionListSchema = z.array(z.string().min(1).max(40)).max(10).default([]);

export const createRelapseRequestSchema = z.object({
  occurredAt: z.coerce.date(),
  intensity: z.number().int().min(1).max(5),
  notes: z.string().max(2000).optional(),
  locationContext: z.string().max(120).optional(),
  activityContext: z.string().max(120).optional(),
  triggers: triggerListSchema,
  emotions: emotionListSchema,
});

export const updateRelapseRequestSchema = z
  .object({
    occurredAt: z.coerce.date().optional(),
    intensity: z.number().int().min(1).max(5).optional(),
    notes: z.string().max(2000).nullable().optional(),
    locationContext: z.string().max(120).nullable().optional(),
    activityContext: z.string().max(120).nullable().optional(),
    triggers: triggerListSchema.optional(),
    emotions: emotionListSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Informe ao menos um campo para atualizar.',
  });

export const relapseEventSchema = z.object({
  id: z.string().uuid(),
  occurredAt: z.string().datetime(),
  recordedAt: z.string().datetime(),
  intensity: z.number().int(),
  notes: z.string().optional(),
  locationContext: z.string().optional(),
  activityContext: z.string().optional(),
  triggers: z.array(z.string()),
  emotions: z.array(z.string()),
});

export const relapseListSchema = z.object({
  items: z.array(relapseEventSchema),
});

export const periodFilterSchema = z.object({
  from: z.string().date().optional(),
  to: z.string().date().optional(),
});

export type CreateRelapseRequest = z.infer<typeof createRelapseRequestSchema>;
export type UpdateRelapseRequest = z.infer<typeof updateRelapseRequestSchema>;
export type PeriodFilter = z.infer<typeof periodFilterSchema>;
export type RelapseEventDto = z.infer<typeof relapseEventSchema>;

