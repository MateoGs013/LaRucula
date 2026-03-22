import { createServer } from 'node:http';

import {
  createContactSubmission,
  createReservationRecord,
  getBlogPostBySlug,
  getBlogPostSummaries,
  getMenuContent,
  getPegasuzSiteContentPayload,
  getReservationAvailabilityContent,
  getReservationLayoutContent,
  getSiteContent,
} from './content.js';

function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(response, statusCode, payload) {
  setCorsHeaders(response);
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(payload));
}

function sendError(response, statusCode, code, message, details = {}) {
  sendJson(response, statusCode, {
    error: {
      code,
      message,
      details,
    },
  });
}

function resolveRequest(request) {
  const origin = `http://${request.headers.host || 'localhost'}`;
  return new URL(request.url || '/', origin);
}

async function readJsonBody(request) {
  const chunks = [];
  let totalBytes = 0;
  const maxBytes = 1024 * 1024;

  for await (const chunk of request) {
    totalBytes += chunk.length;

    if (totalBytes > maxBytes) {
      const error = new Error('Request body too large');
      error.code = 'payload_too_large';
      throw error;
    }

    chunks.push(chunk);
  }

  if (chunks.length === 0) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    const error = new Error('Invalid JSON payload');
    error.code = 'invalid_json';
    throw error;
  }
}

function handleDomainResult(response, result) {
  if (!result.ok) {
    sendError(response, result.statusCode, result.code, result.message, result.details);
    return;
  }

  sendJson(response, 200, result.payload);
}

export function createPublicApiServer() {
  return createServer(async (request, response) => {
    const { method = 'GET' } = request;
    const url = resolveRequest(request);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    if (method === 'OPTIONS') {
      setCorsHeaders(response);
      response.writeHead(204);
      response.end();
      return;
    }

    try {
      if (pathname === '/api/health' && method === 'GET') {
        sendJson(response, 200, {
          status: 'ok',
          service: 'larucula-public-api',
        });
        return;
      }

      if (pathname === '/api/site' && method === 'GET') {
        sendJson(response, 200, getSiteContent());
        return;
      }

      if (pathname === '/api/site-contents' && method === 'GET') {
        sendJson(response, 200, getPegasuzSiteContentPayload());
        return;
      }

      if (pathname === '/api/menu' && method === 'GET') {
        sendJson(response, 200, getMenuContent());
        return;
      }

      if (pathname === '/api/blog/posts' && method === 'GET') {
        sendJson(response, 200, getBlogPostSummaries());
        return;
      }

      if (pathname.startsWith('/api/blog/posts/') && method === 'GET') {
        const slug = decodeURIComponent(pathname.slice('/api/blog/posts/'.length));
        const post = getBlogPostBySlug(slug);

        if (!post) {
          sendError(response, 404, 'blog_post_not_found', 'The requested blog post could not be found.', {
            slug,
          });
          return;
        }

        sendJson(response, 200, post);
        return;
      }

      if (pathname === '/api/contact' && method === 'POST') {
        const body = await readJsonBody(request);
        handleDomainResult(response, await createContactSubmission(body));
        return;
      }

      if (pathname === '/api/reservations/layout' && method === 'GET') {
        sendJson(response, 200, getReservationLayoutContent());
        return;
      }

      if (pathname === '/api/reservations/availability' && method === 'GET') {
        handleDomainResult(
          response,
          await getReservationAvailabilityContent({
            date: url.searchParams.get('date'),
            time: url.searchParams.get('time'),
            partySize: url.searchParams.get('partySize'),
          })
        );
        return;
      }

      if (pathname === '/api/reservations' && method === 'POST') {
        const body = await readJsonBody(request);
        handleDomainResult(response, await createReservationRecord(body));
        return;
      }

      sendError(response, 404, 'not_found', 'The requested endpoint does not exist.', {
        path: pathname,
        method,
      });
    } catch (error) {
      if (error.code === 'invalid_json') {
        sendError(response, 400, 'invalid_json', 'Request body must be valid JSON.');
        return;
      }

      if (error.code === 'payload_too_large') {
        sendError(response, 413, 'payload_too_large', 'Request body is too large.');
        return;
      }

      sendError(response, 500, 'internal_error', 'The server could not process the request.');
    }
  });
}
