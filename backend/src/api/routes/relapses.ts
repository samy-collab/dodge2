import type { FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';
import { requireAuth } from '../../lib/auth.js';
import { createRelapseRequestSchema, periodFilterSchema, updateRelapseRequestSchema } from '../schemas/relapses.js';
import { createRelapseEntry, listRelapseHistory, removeRelapseEntry, updateRelapseEntry } from '../../services/relapseService.js';

export const relapseRoutes: FastifyPluginAsync = async (app) => {
  app.register(async (protectedApp) => {
    protectedApp.addHook('preHandler', requireAuth);

    protectedApp.get('/relapses', async (request) => {
      const query = periodFilterSchema.parse(request.query);
      return listRelapseHistory(request.user!.id, query);
    });

    protectedApp.post('/relapses', async (request, reply) => {
      try {
        const input = createRelapseRequestSchema.parse(request.body);
        const relapse = await createRelapseEntry(request.user!.id, input);
        await reply.code(201).send(relapse);
      } catch (error) {
        if (error instanceof ZodError) {
          await reply.code(422).send({ message: error.flatten() });
          return;
        }

        if (error instanceof Error && error.message === 'POTENTIAL_DUPLICATE') {
          await reply.code(409).send({ message: 'Registro potencialmente duplicado.' });
          return;
        }

        if (error instanceof Error && error.message === 'A recaida nao pode ser registrada no futuro.') {
          await reply.code(422).send({ message: error.message });
          return;
        }

        throw error;
      }
    });

    protectedApp.patch('/relapses/:relapseId', async (request, reply) => {
      try {
        const input = updateRelapseRequestSchema.parse(request.body);
        const relapse = await updateRelapseEntry(
          request.user!.id,
          (request.params as { relapseId: string }).relapseId,
          input,
        );
        await reply.send(relapse);
      } catch (error) {
        if (error instanceof ZodError) {
          await reply.code(422).send({ message: error.flatten() });
          return;
        }

        if (error instanceof Error && error.message === 'RELAPSE_NOT_FOUND') {
          await reply.code(404).send({ message: 'Registro nao encontrado.' });
          return;
        }

        if (error instanceof Error && error.message === 'A recaida nao pode ser registrada no futuro.') {
          await reply.code(422).send({ message: error.message });
          return;
        }

        throw error;
      }
    });

    protectedApp.delete('/relapses/:relapseId', async (request, reply) => {
      try {
        await removeRelapseEntry(
          request.user!.id,
          (request.params as { relapseId: string }).relapseId,
        );
        await reply.code(204).send();
      } catch (error) {
        if (error instanceof Error && error.message === 'RELAPSE_NOT_FOUND') {
          await reply.code(404).send({ message: 'Registro nao encontrado.' });
          return;
        }

        throw error;
      }
    });
  });
};
