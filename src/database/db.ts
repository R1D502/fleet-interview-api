import sqlite3 from 'sqlite3';

interface DbResult {
  lastID: number;
  changes: number;
}

type SqlParameter = string | number | null | undefined;

// Helper function to promisify callback-based functions
const promisify = <T>(
  operation: (...args: any[]) => void,
  context: any = null
): (...args: any[]) => Promise<T> => {
  return (...args: any[]): Promise<T> => {
    return new Promise((resolve, reject) => {
      operation.call(context, ...args, (err: Error | null, result: T) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  };
};

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Database connected successfully');
  }
});

// Promisified database operations with strong typing
export const dbRun = <T extends SqlParameter[]>(
  sql: string,
  params: T = [] as unknown as T
): Promise<DbResult> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(this: sqlite3.RunResult, err: Error | null) {
      if (err) reject(err);
      else resolve({
        lastID: this.lastID,
        changes: this.changes
      });
    });
  });
};

// Using the promisify helper for simpler operations
const allAsync = promisify<any[]>(db.all.bind(db));
const getAsync = promisify<any>(db.get.bind(db));

export const dbAll = async <T extends SqlParameter[], R = Record<string, unknown>>(
  sql: string,
  params: T = [] as unknown as T
): Promise<R[]> => {
  return allAsync(sql, params) as Promise<R[]>;
};

export const dbGet = async <T extends SqlParameter[], R = Record<string, unknown>>(
  sql: string,
  params: T = [] as unknown as T
): Promise<R | undefined> => {
  return getAsync(sql, params) as Promise<R | undefined>;
};

// Initialize database tables
export const initDb = async (): Promise<void> => {
  try {
    // Create employees table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create devices table
    await dbRun(`
      CREATE TABLE IF NOT EXISTS devices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        device_name TEXT NOT NULL,
        type TEXT NOT NULL,
        owner_id INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES employees(id)
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export default db;
