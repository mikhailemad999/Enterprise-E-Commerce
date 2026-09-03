import crypto from 'crypto';
import { cookies } from 'next/headers';
import { DepartmentUser, COOKIE_NAME, DEPARTMENT_METADATA } from './departments';

export * from './departments';

const SESSION_SECRET = process.env.SESSION_SECRET || 'lumio_quiet_luxury_department_secret_key_2026';

export function signToken(payload: DepartmentUser): string {
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
  return `${data}.${hmac}`;
}

export function verifyToken(token: string): DepartmentUser | null {
  try {
    if (!token || !token.includes('.')) return null;
    const [data, hmac] = token.split('.');
    const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(data).digest('base64url');
    if (hmac !== expectedHmac) return null;
    const decoded = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
    return decoded as DepartmentUser;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<DepartmentUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
