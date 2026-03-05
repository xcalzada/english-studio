// src/api/client.ts
async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> ?? {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(path, { ...options, headers });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'API error');
  }

  return res.json();
}

export const api = {
  get:    <T>(path: string, token?: string) =>
    request<T>(path, {}, token),
  post:   <T>(path: string, body: unknown, token?: string) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }, token),
  delete: <T>(path: string, token?: string) =>
    request<T>(path, { method: 'DELETE' }, token),
};