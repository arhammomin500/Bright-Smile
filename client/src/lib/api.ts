import axios, { AxiosError, type AxiosRequestConfig } from 'axios';

// The Vite dev server proxies /api and /uploads to the Express backend.
export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ── Automatic access-token refresh on 401 ─────────────────────────────
let refreshing: Promise<boolean> | null = null;

async function tryRefresh(): Promise<boolean> {
  if (!refreshing) {
    refreshing = api
      .post('/auth/refresh')
      .then(() => true)
      .catch(() => false)
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const url = original?.url ?? '';
    const isAuthRoute = url.includes('/auth/login') || url.includes('/auth/refresh') || url.includes('/auth/register');

    if (error.response?.status === 401 && original && !original._retry && !isAuthRoute) {
      original._retry = true;
      const ok = await tryRefresh();
      if (ok) return api(original);
    }
    return Promise.reject(error);
  },
);

// Unwraps the { success, data } envelope.
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.get(url, config);
  return res.data.data as T;
}
export async function apiPost<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const res = await api.post(url, body, config);
  return res.data.data as T;
}
export async function apiPatch<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.patch(url, body);
  return res.data.data as T;
}
export async function apiPut<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.put(url, body);
  return res.data.data as T;
}
export async function apiDelete<T>(url: string): Promise<T> {
  const res = await api.delete(url);
  return res.data.data as T;
}

// Extracts a human-friendly message from an axios error.
export function errorMessage(err: unknown, fallback = 'Something went wrong'): string {
  if (axios.isAxiosError(err)) {
    return (err.response?.data as { error?: { message?: string } })?.error?.message ?? err.message ?? fallback;
  }
  return fallback;
}
