function normalizeBaseUrl(rawBaseUrl) {
  const value = String(rawBaseUrl || '').trim().replace(/\/+$/, '');
  if (!value) return '';
  return value.endsWith('/api') ? value : `${value}/api`;
}

const configuredMode = String(
  import.meta.env.VITE_API_MODE || import.meta.env.VITE_DATA_SOURCE || 'mock'
)
  .trim()
  .toLowerCase();

export const apiConfig = {
  mode: configuredMode === 'api' ? 'api' : 'mock',
  baseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL),
  timeoutMs: Number.parseInt(import.meta.env.VITE_API_TIMEOUT_MS || '10000', 10),
};

export function isApiEnabled() {
  return apiConfig.mode === 'api' && Boolean(apiConfig.baseUrl);
}
