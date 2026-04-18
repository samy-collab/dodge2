import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('demo12345', 10);
  const user = await prisma.userAccount.upsert({
    where: { email: 'demo@dodge2.local' },
    update: { lastLoginAt: new Date() },
    create: {
      email: 'demo@dodge2.local',
      passwordHash,
      displayName: 'Pessoa Demo',
      timezone: 'America/Sao_Paulo',
    },
  });

  const occurredAt = new Date();
  occurredAt.setDate(occurredAt.getDate() - 2);

  await prisma.relapseEvent.create({
    data: {
      userId: user.id,
      occurredAt,
      intensity: 3,
      notes: 'Registro inicial de desenvolvimento',
      activityContext: 'Fim do expediente',
      locationContext: 'Casa',
      triggerLinks: {
        create: [
          {
            triggerCatalogItem: {
              connectOrCreate: {
                where: {
                  userId_normalizedLabel: {
                    userId: user.id,
                    normalizedLabel: 'stress',
                  },
                },
                create: {
                  userId: user.id,
                  label: 'Stress',
                  normalizedLabel: 'stress',
                },
              },
            },
          },
        ],
      },
      emotionLinks: {
        create: [
          {
            emotionCatalogItem: {
              connectOrCreate: {
                where: {
                  userId_normalizedLabel: {
                    userId: user.id,
                    normalizedLabel: 'ansiedade',
                  },
                },
                create: {
                  userId: user.id,
                  label: 'Ansiedade',
                  normalizedLabel: 'ansiedade',
                },
              },
            },
          },
        ],
      },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

