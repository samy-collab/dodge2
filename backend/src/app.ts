import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { authRoutes } from './api/routes/auth.js';
import { relapseRoutes } from './api/routes/relapses.js';
import { analyticsRoutes } from './api/routes/analytics.js';
import { progressRoutes } from './api/routes/progress.js';

export function buildApp() {
  const app = Fastify({
    logger: process.env.NODE_ENV === 'development',
  });

  app.register(cors, {
    origin: process.env.APP_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  });
  app.register(cookie, {
    secret: process.env.SESSION_SECRET ?? 'dev-session-secret',
  });

  app.get('/health', async () => ({
    status: 'ok',
  }));

  app.register(authRoutes);
  app.register(relapseRoutes);
  app.register(analyticsRoutes);
  app.register(progressRoutes);

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    reply.status(500).send({
      message: 'Erro interno inesperado.',
    });
  });

  return app;
}

