/**
 * API origin without trailing slash.
 * - Set `VITE_API_URL` in production (and local if you want an explicit origin).
 * - In **dev**, if `VITE_API_URL` is empty and `VITE_API_PROXY` is set, we call the API
 *   directly. That avoids `POST /api/uploads/...` hitting only Vite (404) when the dev
 *   proxy does not forward the request; CORS is enabled on the API.
 */
function resolveApiBase(): string {
  const explicit = (import.meta.env.VITE_API_URL as string | undefined)?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const proxyTarget = (import.meta.env.VITE_API_PROXY as string | undefined)?.trim();
  if (proxyTarget) return proxyTarget.replace(/\/$/, "");

  return "";
}

const API_BASE = resolveApiBase();

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function joinUrl(path: string): string {
  if (path.startsWith("http")) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

/** Same origin as `apiFetch` — for authenticated `fetch()` of blobs, etc. */
export function apiUrl(path: string): string {
  return joinUrl(path);
}

/** Resolve API-relative paths (e.g. `/uploads/...`) for `<img src>` using the same base as `apiFetch`. */
export function apiPublicUrl(pathOrUrl: string): string {
  if (
    pathOrUrl.startsWith("http://") ||
    pathOrUrl.startsWith("https://") ||
    pathOrUrl.startsWith("data:")
  ) {
    return pathOrUrl;
  }
  return joinUrl(pathOrUrl);
}

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, ...rest } = init;
  const headers = new Headers(rest.headers);
  if (
    rest.body &&
    !(rest.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  const res = await fetch(joinUrl(path), { ...rest, headers });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = (await res.json()) as { error?: string };
      if (j.error) msg = j.error;
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, msg);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return res.json() as Promise<T>;
}