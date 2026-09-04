import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST || '127.0.0.1',
      port: Number(process.env.MYSQL_PORT) || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '1234',
      database: process.env.MYSQL_DATABASE || 'lumio_commerce',
      waitForConnections: true,
      connectionLimit: 30,
      maxIdle: 20,
      idleTimeout: 30000,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const p = getDbPool();
  const [rows] = await p.execute(sql, params);
  return rows as T;
}

export async function queryRow<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const rows = await query<any[]>(sql, params);
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as T;
  }
  return null;
}

/**
 * Execute operations within an atomic ACID transaction.
 * Automatically commits on success, or rolls back on error.
 */
export async function withTransaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const p = getDbPool();
  const connection = await p.getConnection();
  await connection.beginTransaction();
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

/**
 * Telemetry function for database connection pool monitoring.
 */
export function getPoolStats() {
  const p = getDbPool() as any;
  return {
    totalConnections: p?.pool?._allConnections?.length || 0,
    freeConnections: p?.pool?._freeConnections?.length || 0,
    queuedRequests: p?.pool?._connectionQueue?.length || 0,
    connectionLimit: 30,
  };
}

export default getDbPool;

