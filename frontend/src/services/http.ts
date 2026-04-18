const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';

type RequestOptions = RequestInit & {
  query?: Record<string, string | undefined>;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}) {
  const url = new URL(`${API_URL}${path}`);

  if (options.query) {
    Object.entries(options.query).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      }
    });
  }

  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(body?.message ?? 'Falha na requisicao.');
  }

  return body as T;
}

