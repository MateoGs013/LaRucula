import axios from 'axios';

import { apiConfig, isApiEnabled } from '@/api/config';
import { ApiError } from '@/api/errors';

const api = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const nextHeaders = {
    Accept: 'application/json',
    ...(config.headers || {}),
  };

  if (apiConfig.clientSlug) {
    nextHeaders['x-client'] = apiConfig.clientSlug;
  }

  if (typeof window !== 'undefined') {
    const token = window.localStorage.getItem('token');
    if (token && !nextHeaders.Authorization) {
      nextHeaders.Authorization = `Bearer ${token}`;
    }
  }

  config.headers = nextHeaders;
  return config;
});

function normalizePath(path) {
  return String(path || '').startsWith('/') ? path : `/${path}`;
}

function getErrorPayload(error) {
  if (error?.response?.data) {
    return error.response.data;
  }

  if (error?.message) {
    return { message: error.message };
  }

  return null;
}

export async function apiRequest(path, options = {}) {
  if (!isApiEnabled()) {
    throw new ApiError('API mode is disabled or no API base URL is configured.', {
      code: 'API_DISABLED',
      status: 500,
    });
  }

  try {
    const response = await api.request({
      url: normalizePath(path),
      method: options.method || 'GET',
      params: options.query,
      data: options.body,
      headers: options.headers,
      signal: options.signal,
      timeout: options.timeoutMs ?? apiConfig.timeoutMs,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
      throw new ApiError('The request timed out.', {
        status: 408,
        code: 'TIMEOUT',
        cause: error,
      });
    }

    if (error instanceof ApiError) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      const payload = getErrorPayload(error);

      throw new ApiError(
        payload?.error?.message || payload?.message || `Request failed with status ${error.response?.status || 503}.`,
        {
          status: error.response?.status || 503,
          code: payload?.error?.code || 'HTTP_ERROR',
          details: payload,
          cause: error,
        }
      );
    }

    throw new ApiError('Unable to reach the API.', {
      status: 503,
      code: 'NETWORK_ERROR',
      cause: error,
    });
  }
}
