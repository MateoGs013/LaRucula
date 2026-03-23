import { createServer } from 'node:http';

import {
  getLocalesContent,
  getMenuCategoriesContent,
  getMenuCategoryBySlug,
  getMenuContent,
  getPegasuzSiteContentPayload,
  getSiteContent,
} from './content.js';

function setCorsHeaders(response) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
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

export function createPublicApiServer() {
  return createServer((request, response) => {
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

      if (pathname === '/api/menu/categories' && method === 'GET') {
        sendJson(response, 200, getMenuCategoriesContent());
        return;
      }

      if (pathname.startsWith('/api/menu/categories/') && method === 'GET') {
        const slug = decodeURIComponent(pathname.slice('/api/menu/categories/'.length));
        const category = getMenuCategoryBySlug(slug);

        if (!category) {
          sendError(response, 404, 'menu_category_not_found', 'The requested menu category could not be found.', {
            slug,
          });
          return;
        }

        sendJson(response, 200, category);
        return;
      }

      if (pathname === '/api/locales' && method === 'GET') {
        sendJson(response, 200, getLocalesContent());
        return;
      }

      sendError(response, 404, 'not_found', 'The requested endpoint does not exist.', {
        path: pathname,
        method,
      });
    } catch {
      sendError(response, 500, 'internal_error', 'The server could not process the request.');
    }
  });
}
