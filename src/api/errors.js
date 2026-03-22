export class ApiError extends Error {
  constructor(message, options = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = options.status ?? 500;
    this.code = options.code ?? 'API_ERROR';
    this.details = options.details ?? null;
    this.cause = options.cause ?? null;
  }
}

export function getErrorMessage(error, fallback = 'Something went wrong.') {
  if (!error) return fallback;
  if (error instanceof ApiError) return error.message || fallback;
  if (error instanceof Error) return error.message || fallback;
  return fallback;
}
