import { buildApp } from './app.js';

const port = Number(process.env.PORT ?? 3333);
const app = buildApp();

app
  .listen({
    host: '0.0.0.0',
    port,
  })
  .catch((error) => {
    app.log.error(error);
    process.exit(1);
  });

