/* ============================================
   HTTP CLIENT — fetch wrapper centralisé
   ============================================ */

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
}

export interface ApiError {
  message: string
  status: number
  code?: string
}

// Construit l'URL avec query params
function buildUrl(baseUrl: string, params?: Record<string, string | number | boolean>): string {
  if (!params) return baseUrl
  const query = new URLSearchParams(
    Object.entries(params).reduce(
      (acc, [k, v]) => ({ ...acc, [k]: String(v) }),
      {} as Record<string, string>
    )
  )
  return `${baseUrl}?${query.toString()}`
}

// Wrapper principal
export async function httpClient<TResponse>(
  url: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const { method = 'GET', body, headers = {}, params } = options

  const finalUrl = buildUrl(url, params)

  const response = await fetch(finalUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  if (!response.ok) {
    const error: ApiError = {
      message: `HTTP Error ${response.status}`,
      status: response.status,
    }
    throw error
  }

  return response.json() as Promise<TResponse>
}

// Helpers DRY
export const http = {
  get: <T>(url: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    httpClient<T>(url, { ...options, method: 'GET' }),

  post: <T>(url: string, body: unknown, options?: Omit<RequestOptions, 'method'>) =>
    httpClient<T>(url, { ...options, method: 'POST', body }),

  put: <T>(url: string, body: unknown, options?: Omit<RequestOptions, 'method'>) =>
    httpClient<T>(url, { ...options, method: 'PUT', body }),

  delete: <T>(url: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    httpClient<T>(url, { ...options, method: 'DELETE' }),
}