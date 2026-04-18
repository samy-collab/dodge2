import { prisma } from '../lib/prisma.js';
import { hashPassword, verifyPassword } from '../lib/auth.js';
import type { LoginRequest, RegisterRequest } from '../api/schemas/auth.js';

function toUserProfile(user: {
  id: string;
  email: string;
  displayName: string;
  timezone: string;
}) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    timezone: user.timezone,
  };
}

export async function registerUser(input: RegisterRequest) {
  const existing = await prisma.userAccount.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (existing) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const user = await prisma.userAccount.create({
    data: {
      email: input.email.toLowerCase(),
      passwordHash: await hashPassword(input.password),
      displayName: input.displayName,
      timezone: input.timezone,
    },
  });

  return {
    user: toUserProfile(user),
  };
}

export async function loginUser(input: LoginRequest) {
  const user = await prisma.userAccount.findUnique({
    where: { email: input.email.toLowerCase() },
  });

  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  const valid = await verifyPassword(input.password, user.passwordHash);
  if (!valid) {
    throw new Error('INVALID_CREDENTIALS');
  }

  await prisma.userAccount.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  return {
    user: toUserProfile(user),
  };
}

