import { apiConfig, isApiEnabled } from '@/api/config';
import { ApiError } from '@/api/errors';

function buildUrl(path, query) {
  const normalizedPath = String(path || '').startsWith('/') ? path : `/${path}`;
  const url = new URL(`${apiConfig.baseUrl}${normalizedPath}`);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}

async function parseResponsePayload(response) {
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json().catch(() => null);
  }

  const text = await response.text().catch(() => '');
  return text || null;
}

export async function apiRequest(path, options = {}) {
  if (!isApiEnabled()) {
    throw new ApiError('API mode is disabled or no API base URL is configured.', {
      code: 'API_DISABLED',
      status: 500,
    });
  }

  const controller = new AbortController();
  const timeoutMs = options.timeoutMs ?? apiConfig.timeoutMs;
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(buildUrl(path, options.query), {
      method: options.method || 'GET',
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: options.signal || controller.signal,
    });

    const payload = await parseResponsePayload(response);

    if (!response.ok) {
      throw new ApiError(
        payload?.error || payload?.message || `Request failed with status ${response.status}.`,
        {
          status: response.status,
          details: payload,
          code: 'HTTP_ERROR',
        }
      );
    }

    return payload;
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new ApiError('The request timed out.', {
        status: 408,
        code: 'TIMEOUT',
        cause: error,
      });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError('Unable to reach the API.', {
      status: 503,
      code: 'NETWORK_ERROR',
      cause: error,
    });
  } finally {
    window.clearTimeout(timeoutId);
  }
}
