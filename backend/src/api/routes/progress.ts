import type { FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';
import { requireAuth } from '../../lib/auth.js';
import { progressQuerySchema } from '../schemas/progress.js';
import { getProgressSummary } from '../../services/progressService.js';

export const progressRoutes: FastifyPluginAsync = async (app) => {
  app.register(async (protectedApp) => {
    protectedApp.addHook('preHandler', requireAuth);

    protectedApp.get('/progress/summary', async (request, reply) => {
      try {
        const query = progressQuerySchema.parse(request.query);
        return getProgressSummary(request.user!.id, query);
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
