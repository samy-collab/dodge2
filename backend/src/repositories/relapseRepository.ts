import type { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma.js';

export type RelapseRecord = Prisma.RelapseEventGetPayload<{
  include: {
    triggerLinks: { include: { triggerCatalogItem: true } };
    emotionLinks: { include: { emotionCatalogItem: true } };
  };
}>;

function normalizeLabel(value: string) {
  return value.trim().toLowerCase();
}

async function connectTriggers(userId: string, labels: string[]) {
  return Promise.all(
    labels.map(async (label) => {
      const normalizedLabel = normalizeLabel(label);
      const item = await prisma.triggerCatalogItem.upsert({
        where: {
          userId_normalizedLabel: {
            userId,
            normalizedLabel,
          },
        },
        update: { archivedAt: null },
        create: {
          userId,
          label: label.trim(),
          normalizedLabel,
        },
      });

      return { triggerCatalogItemId: item.id };
    }),
  );
}

async function connectEmotions(userId: string, labels: string[]) {
  return Promise.all(
    labels.map(async (label) => {
      const normalizedLabel = normalizeLabel(label);
      const item = await prisma.emotionCatalogItem.upsert({
        where: {
          userId_normalizedLabel: {
            userId,
            normalizedLabel,
          },
        },
        update: {},
        create: {
          userId,
          label: label.trim(),
          normalizedLabel,
        },
      });

      return { emotionCatalogItemId: item.id };
    }),
  );
}

export async function listRelapses(userId: string, from?: Date, to?: Date) {
  return prisma.relapseEvent.findMany({
    where: {
      userId,
      deletedAt: null,
      occurredAt:
        from || to
          ? {
              gte: from,
              lte: to,
            }
          : undefined,
    },
    orderBy: {
      occurredAt: 'desc',
    },
    include: {
      triggerLinks: {
        include: {
          triggerCatalogItem: true,
        },
      },
      emotionLinks: {
        include: {
          emotionCatalogItem: true,
        },
      },
    },
  });
}

export async function getLatestRelapse(userId: string) {
  return prisma.relapseEvent.findFirst({
    where: { userId, deletedAt: null },
    orderBy: { recordedAt: 'desc' },
  });
}

export async function findRelapseById(userId: string, relapseId: string) {
  return prisma.relapseEvent.findFirst({
    where: { id: relapseId, userId, deletedAt: null },
    include: {
      triggerLinks: { include: { triggerCatalogItem: true } },
      emotionLinks: { include: { emotionCatalogItem: true } },
    },
  });
}

export async function createRelapse(
  userId: string,
  input: {
    occurredAt: Date;
    intensity: number;
    notes?: string;
    locationContext?: string;
    activityContext?: string;
    triggers: string[];
    emotions: string[];
  },
) {
  const [triggerConnections, emotionConnections] = await Promise.all([
    connectTriggers(userId, input.triggers),
    connectEmotions(userId, input.emotions),
  ]);

  return prisma.relapseEvent.create({
    data: {
      userId,
      occurredAt: input.occurredAt,
      intensity: input.intensity,
      notes: input.notes,
      locationContext: input.locationContext,
      activityContext: input.activityContext,
      triggerLinks: {
        createMany: {
          data: triggerConnections,
        },
      },
      emotionLinks: {
        createMany: {
          data: emotionConnections,
        },
      },
    },
    include: {
      triggerLinks: { include: { triggerCatalogItem: true } },
      emotionLinks: { include: { emotionCatalogItem: true } },
    },
  });
}

export async function updateRelapse(
  userId: string,
  relapseId: string,
  input: {
    occurredAt: Date;
    intensity: number;
    notes: string | null;
    locationContext: string | null;
    activityContext: string | null;
    triggers: string[];
    emotions: string[];
  },
) {
  const [triggerConnections, emotionConnections] = await Promise.all([
    connectTriggers(userId, input.triggers),
    connectEmotions(userId, input.emotions),
  ]);

  await prisma.relapseTriggerLink.deleteMany({ where: { relapseEventId: relapseId } });
  await prisma.relapseEmotionLink.deleteMany({ where: { relapseEventId: relapseId } });

  return prisma.relapseEvent.update({
    where: { id: relapseId },
    data: {
      occurredAt: input.occurredAt,
      intensity: input.intensity,
      notes: input.notes,
      locationContext: input.locationContext,
      activityContext: input.activityContext,
      triggerLinks: {
        createMany: { data: triggerConnections },
      },
      emotionLinks: {
        createMany: { data: emotionConnections },
      },
    },
    include: {
      triggerLinks: { include: { triggerCatalogItem: true } },
      emotionLinks: { include: { emotionCatalogItem: true } },
    },
  });
}

export async function deleteRelapse(userId: string, relapseId: string) {
  return prisma.relapseEvent.updateMany({
    where: { id: relapseId, userId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
}

export function toRelapseDto(record: RelapseRecord) {
  return {
    id: record.id,
    occurredAt: record.occurredAt.toISOString(),
    recordedAt: record.recordedAt.toISOString(),
    intensity: record.intensity,
    notes: record.notes ?? undefined,
    locationContext: record.locationContext ?? undefined,
    activityContext: record.activityContext ?? undefined,
    triggers: record.triggerLinks.map((link) => link.triggerCatalogItem.label),
    emotions: record.emotionLinks.map((link) => link.emotionCatalogItem.label),
  };
}
