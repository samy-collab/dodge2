import bcrypt from 'bcryptjs';
import type { FastifyReply, FastifyRequest } from 'fastify';

const SESSION_COOKIE = 'dodge2_session';
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export type SessionPayload = {
  userId: string;
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export function getSessionSecret() {
  return process.env.SESSION_SECRET ?? 'dev-session-secret';
}

export function encodeSession(payload: SessionPayload) {
  const json = JSON.stringify(payload);
  return Buffer.from(json, 'utf8').toString('base64url');
}

export function decodeSession(value?: string): SessionPayload | null {
  if (!value) {
    return null;
  }

  try {
    const json = Buffer.from(value, 'base64url').toString('utf8');
    return JSON.parse(json) as SessionPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(reply: FastifyReply, payload: SessionPayload) {
  reply.setCookie(SESSION_COOKIE, encodeSession(payload), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: ONE_WEEK_MS / 1000,
  });
}

export function clearSessionCookie(reply: FastifyReply) {
  reply.clearCookie(SESSION_COOKIE, { path: '/' });
}

export function getSessionUserId(request: FastifyRequest) {
  const payload = decodeSession(request.cookies[SESSION_COOKIE]);
  return payload?.userId ?? null;
}

export async function requireAuth(request: FastifyRequest, reply: FastifyReply) {
  const userId = getSessionUserId(request);
  if (!userId) {
    await reply.code(401).send({
      message: 'Sessao autenticada obrigatoria.',
    });
    return;
  }

  request.user = { id: userId };
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      id: string;
    };
  }
}

