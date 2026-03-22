import { apiRequest } from '@/api/client';
import { isApiEnabled } from '@/api/config';

export async function submitContact(payload) {
  const body = {
    name: String(payload?.name || '').trim(),
    email: String(payload?.email || '').trim(),
    phone: String(payload?.phone || '').trim(),
    subject: String(payload?.subject || '').trim(),
    message: String(payload?.message || '').trim(),
  };

  if (!isApiEnabled()) {
    await new Promise((resolve) => window.setTimeout(resolve, 800));
    return {
      success: true,
      submittedAt: new Date().toISOString(),
      data: body,
    };
  }

  return apiRequest('/contact', {
    method: 'POST',
    body,
  });
}
