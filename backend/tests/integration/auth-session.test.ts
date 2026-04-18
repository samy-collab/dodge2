import { describe, expect, it } from 'vitest';
import { decodeSession, encodeSession } from '../../src/lib/auth.js';

describe('Auth session utilities', () => {
  it('encodes and decodes the user identity in the session cookie', () => {
    const encoded = encodeSession({ userId: 'abc-123' });
    expect(decodeSession(encoded)).toEqual({ userId: 'abc-123' });
  });
});

