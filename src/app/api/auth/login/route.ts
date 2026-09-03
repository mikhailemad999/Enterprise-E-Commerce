import { NextResponse } from 'next/server';
import { query, queryRow } from '@/lib/db';
import { signToken, COOKIE_NAME, DEPARTMENT_METADATA } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, pin, department_id } = body;

    if (!username || !pin || !department_id) {
      return NextResponse.json(
        { success: false, error: 'Username, 6-digit PIN, and department ID are required.' },
        { status: 400 }
      );
    }

    // 1. Strict 6-Digit Numeric Constraint (department.md: password_length: 6, numeric_only: true)
    const pinStr = String(pin).trim();
    if (!/^\d{6}$/.test(pinStr)) {
      return NextResponse.json(
        { success: false, error: 'Access Denied: PIN must be exactly 6 numeric digits.' },
        { status: 400 }
      );
    }

    // 2. Query User
    const user = await queryRow<any>(
      'SELECT id, email, username, six_digit_pin, role, department_id, status, first_name, last_name, permissions_json, login_attempts FROM users WHERE username = ?',
      [username.trim()]
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid credentials. User does not exist.' },
        { status: 401 }
      );
    }

    // 3. User Status check
    if (user.status === 'disabled') {
      return NextResponse.json(
        { success: false, error: 'Account is disabled. Contact platform administrator.' },
        { status: 403 }
      );
    }
    if (user.status === 'locked') {
      return NextResponse.json(
        { success: false, error: 'Account is locked due to repeated security failures.' },
        { status: 403 }
      );
    }

    // 4. Strict Department Isolation Check (master_rule: USERS MUST NEVER ACCESS OTHER DEPARTMENTS)
    if (user.department_id !== department_id) {
      const userDept = DEPARTMENT_METADATA[user.department_id]?.name || user.department_id;
      const targetDept = DEPARTMENT_METADATA[department_id]?.name || department_id;
      return NextResponse.json(
        {
          success: false,
          error: `Cross-Department Access Denied: User "${username}" is assigned to [${userDept}]. You cannot authenticate into [${targetDept}].`,
        },
        { status: 403 }
      );
    }

    // 5. PIN Verification
    if (user.six_digit_pin !== pinStr) {
      const attempts = (user.login_attempts || 0) + 1;
      const isLocked = attempts >= 5;
      await query(
        'UPDATE users SET login_attempts = ?, status = ? WHERE id = ?',
        [attempts, isLocked ? 'locked' : user.status, user.id]
      );

      // Audit failed attempt
      try {
        await query(
          'INSERT INTO audit_logs (user_id, username, department_id, action, entity_type, entity_id, details_json) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [user.id, user.username, department_id, 'LOGIN_FAILED', 'Authentication', 'LOGIN_ATTEMPT', JSON.stringify({ attempts, ip: '127.0.0.1' })]
        );
      } catch (e) {
        console.warn('Audit log warning:', e);
      }

      return NextResponse.json(
        {
          success: false,
          error: isLocked
            ? 'Account has been locked due to 5 consecutive invalid PIN attempts.'
            : `Incorrect 6-digit PIN. Attempt ${attempts} of 5.`,
        },
        { status: 401 }
      );
    }

    // 6. Successful Login: Reset attempts, update last_login
    await query('UPDATE users SET login_attempts = 0, last_login = NOW() WHERE id = ?', [user.id]);

    // Parse permissions
    let perms: string[] = [];
    try {
      perms = typeof user.permissions_json === 'string'
        ? JSON.parse(user.permissions_json)
        : (user.permissions_json || []);
    } catch {
      perms = [];
    }

    const payload = {
      id: user.id,
      username: user.username,
      department_id: user.department_id,
      role: user.role,
      name: `${user.first_name} ${user.last_name}`,
      permissions: perms,
    };

    const token = signToken(payload);

    // Audit successful login
    try {
      await query(
        'INSERT INTO audit_logs (user_id, username, department_id, action, entity_type, entity_id, details_json) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.id, user.username, department_id, 'LOGIN_SUCCESS', 'Authentication', 'SESSION_START', JSON.stringify({ department: department_id })]
      );
    } catch (e) {
      console.warn('Audit log warning:', e);
    }

    const redirectUrl = DEPARTMENT_METADATA[department_id]?.defaultPath || '/';

    const response = NextResponse.json({
      success: true,
      user: payload,
      redirectUrl,
      message: `Authenticated successfully into ${DEPARTMENT_METADATA[department_id]?.name || department_id}`,
    });

    // Set HTTP-only Cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 12, // 12 hours
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('Login API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
