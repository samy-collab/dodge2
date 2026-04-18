import type { FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';
import { requireAuth } from '../../lib/auth.js';
import { analyticsQuerySchema } from '../schemas/analytics.js';
import { getTriggerAnalytics } from '../../services/analyticsService.js';

export const analyticsRoutes: FastifyPluginAsync = async (app) => {
  app.register(async (protectedApp) => {
    protectedApp.addHook('preHandler', requireAuth);

    protectedApp.get('/analytics/triggers', async (request, reply) => {
      try {
        const query = analyticsQuerySchema.parse(request.query);
        return getTriggerAnalytics(request.user!.id, query);
      } catch (error) {
        if (error instanceof ZodError) {
          await reply.code(422).send({ message: error.flatten() });
          return;
        }

        throw error;
      }
    });
  });
};
