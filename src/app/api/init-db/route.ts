import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getDbPool } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const pool = getDbPool();
    const schemaPath = path.join(process.cwd(), 'src', 'lib', 'schema.sql');
    const seedPath = path.join(process.cwd(), 'src', 'lib', 'seed.sql');

    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    // Split and execute statements
    const connection = await pool.getConnection();
    try {
      const runStatements = async (sql: string) => {
        const statements = sql
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s.length > 0 && !s.startsWith('--') && !s.startsWith('USE'));

        for (const statement of statements) {
          try {
            await connection.query(statement);
          } catch (e: any) {
            console.warn('Statement warning:', e.message);
          }
        }
      };

      await runStatements(schemaSql);
      await runStatements(seedSql);

      return NextResponse.json({
        success: true,
        message: 'Database schema and seed initialized successfully in MySQL 8.0 port 3306 (lumio_commerce).',
      });
    } finally {
      connection.release();
    }
  } catch (error: any) {
    console.error('API Init DB Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
