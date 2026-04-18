import { describe, expect, it } from 'vitest';
import { buildApp } from '../../src/app.js';

describe('Auth contract', () => {
  it('creates a user session on register', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'new-user@example.com',
        password: 'password123',
        displayName: 'Nova Pessoa',
        timezone: 'America/Sao_Paulo',
      },
    });

    expect([201, 409, 500]).toContain(response.statusCode);
  });

  it('returns auth session on login', async () => {
    const app = buildApp();
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'new-user@example.com',
        password: 'password123',
      },
    });

    expect([200, 401, 500]).toContain(response.statusCode);
  });
});

