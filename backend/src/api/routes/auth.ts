import type { FastifyPluginAsync } from 'fastify';
import { ZodError } from 'zod';
import { authSessionSchema, loginRequestSchema, registerRequestSchema } from '../schemas/auth.js';
import { setSessionCookie } from '../../lib/auth.js';
import { loginUser, registerUser } from '../../services/authService.js';

export const authRoutes: FastifyPluginAsync = async (app) => {
  app.post('/auth/register', async (request, reply) => {
    try {
      const input = registerRequestSchema.parse(request.body);
      const session = await registerUser(input);
      setSessionCookie(reply, { userId: session.user.id });
      await reply.code(201).send(authSessionSchema.parse(session));
    } catch (error) {
      if (error instanceof ZodError) {
        await reply.code(422).send({ message: error.flatten() });
        return;
      }

      if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
        await reply.code(409).send({ message: 'E-mail ja cadastrado.' });
        return;
      }

      throw error;
    }
  });

  app.post('/auth/login', async (request, reply) => {
    try {
      const input = loginRequestSchema.parse(request.body);
      const session = await loginUser(input);
      setSessionCookie(reply, { userId: session.user.id });
      await reply.code(200).send(authSessionSchema.parse(session));
    } catch (error) {
      if (error instanceof ZodError) {
        await reply.code(422).send({ message: error.flatten() });
        return;
      }

      if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
        await reply.code(401).send({ message: 'Credenciais invalidas.' });
        return;
      }

      throw error;
    }
  });
};

