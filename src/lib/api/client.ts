import "server-only";

/**
 * Server-only fetch wrapper for the real backend. Not for client components
 * to call directly — this keeps NEXT_PUBLIC_API_BASE_URL requests and
 * whatever credential they need entirely server-side. The intended shape
 * once wiring begins:
 *   - `api/get-*.ts` (already server-only, "use cache") calls apiClient.get
 *     in place of returning a fixture.
 *   - Mutations become `"use server"` Server Actions (e.g.
 *     `api/adjust-credits.ts`) that call apiClient.post/patch/delete; client
 *     components (the *-sheet.tsx files already built) import and call the
 *     action directly instead of the local setState handlers they call today.
 *
 * TODO(auth): the real backend's admin endpoints gate on `is_admin` against
 * its own session/JWT (see AdminService.ts's UriHttpClient and
 * checkIsAdmin's `/api/admin/me`) — that may or may not be the same session
 * this console's own proxy.ts cookie represents. Whichever it is, attach it
 * below; AdminService.ts's UriHttpClient is the reference for the mechanism
 * the backend actually expects.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const url = new URL(path, API_BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T> {
  const response = await fetch(buildUrl(path, options?.params), {
    method,
    headers: { "Content-Type": "application/json" },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: options?.signal,
    cache: "no-store",
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => null);
    const message =
      (typeof detail?.detail === "string" && detail.detail) ||
      (typeof detail?.message === "string" && detail.message) ||
      response.statusText ||
      `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
