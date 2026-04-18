import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '../../services/http';
import type { AuthSession } from '../../services/types';

const STORAGE_KEY = 'dodge2.session';

type AuthContextValue = {
  session: AuthSession | null;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: {
    email: string;
    password: string;
    displayName: string;
    timezone: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function persist(session: AuthSession | null) {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function readPersistedSession() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    setSession(readPersistedSession());
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      async login(input) {
        const nextSession = await apiRequest<AuthSession>('/auth/login', {
          method: 'POST',
          body: JSON.stringify(input),
        });
        setSession(nextSession);
        persist(nextSession);
      },
      async register(input) {
        const nextSession = await apiRequest<AuthSession>('/auth/register', {
          method: 'POST',
          body: JSON.stringify(input),
        });
        setSession(nextSession);
        persist(nextSession);
      },
      logout() {
        setSession(null);
        persist(null);
      },
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}

