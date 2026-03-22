import { apiRequest } from '@/api/client';
import { isApiEnabled } from '@/api/config';
import { adaptMenuData } from '@/adapters/menuAdapter';
import { mockMenuData } from '@/data/mock-menu';

let cachedMenu = adaptMenuData(mockMenuData);
let pendingMenuRequest = null;

function cloneMenu(menu) {
  return structuredClone(menu);
}

export function getMenuSnapshot() {
  return cloneMenu(cachedMenu);
}

export async function getMenuData(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled()) {
    cachedMenu = adaptMenuData(mockMenuData);
    return getMenuSnapshot();
  }

  if (!force && pendingMenuRequest) {
    return pendingMenuRequest;
  }

  pendingMenuRequest = (async () => {
    const payload = await apiRequest('/menu');
    cachedMenu = adaptMenuData(payload);
    return getMenuSnapshot();
  })();

  try {
    return await pendingMenuRequest;
  } finally {
    pendingMenuRequest = null;
  }
}
