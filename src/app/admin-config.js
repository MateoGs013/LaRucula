function normalizeAdminUrl(rawValue) {
  const value = String(rawValue || '').trim();
  if (!value) {
    return '/admin/login';
  }

  return value;
}

function withTenantQuery(url, tenant) {
  const normalizedTenant = String(tenant || '').trim().toLowerCase();
  if (!normalizedTenant) {
    return url;
  }

  if (/([?&])tenant=/.test(url)) {
    return url;
  }

  return `${url}${url.includes('?') ? '&' : '?'}tenant=${encodeURIComponent(normalizedTenant)}`;
}

const configuredAdminUrl = normalizeAdminUrl(
  import.meta.env.VITE_ADMIN_URL || import.meta.env.VITE_ADMIN_LOGIN_URL
);

const configuredTenant = String(
  import.meta.env.VITE_ADMIN_TENANT || import.meta.env.VITE_CLIENT_SLUG || ''
)
  .trim()
  .toLowerCase();

export const adminAccessConfig = {
  enabled: Boolean(configuredAdminUrl),
  tenant: configuredTenant,
  url: withTenantQuery(configuredAdminUrl, configuredTenant),
  label: String(import.meta.env.VITE_ADMIN_LABEL || 'Admin').trim() || 'Admin',
};

export function prepareAdminAccess() {
  if (typeof window === 'undefined') {
    return;
  }

  if (adminAccessConfig.tenant) {
    window.localStorage.setItem('tenant', adminAccessConfig.tenant);
  }
}
