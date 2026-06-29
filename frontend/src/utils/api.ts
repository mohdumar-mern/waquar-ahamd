import { apiConfig } from "@/config/api.config";

interface FetchOptions extends RequestInit {
  revalidate?: number;
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { revalidate = 60, ...init } = options;

  const res = await fetch(`${apiConfig.baseUrl}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    next   : { revalidate },
    ...init,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  get : <T>(url: string, opts?: FetchOptions) => apiFetch<T>(url, { method: "GET", ...opts }),
  post: <T>(url: string, body: unknown, opts?: FetchOptions) =>
    apiFetch<T>(url, { method: "POST", body: JSON.stringify(body), ...opts }),
};
