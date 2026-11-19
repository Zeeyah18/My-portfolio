import { Pool, QueryResult, QueryResultRow } from "pg";

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
    if (!process.env.DATABASE_URL) {
        return null;
    }

  if (!pool) {
    let connectionString = process.env.DATABASE_URL;
    if (
      connectionString.includes("sslmode=require") &&
      !connectionString.includes("uselibpqcompat=")
    ) {
      connectionString += connectionString.includes("?")
        ? "&uselibpqcompat=true"
        : "?uselibpqcompat=true";
    }

    const isSsl =
      process.env.NODE_ENV === "production" ||
      connectionString.includes("sslmode=require") ||
      connectionString.includes("neon.tech") ||
      connectionString.includes("pooler");

    pool = new Pool({
      connectionString,
      ssl: isSsl ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

        pool.on("error", (err) => {
            console.error("Unexpected error on idle PostgreSQL client", err);
        });
    }

    return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[],
): Promise<QueryResult<T> | null> {
    const p = getDbPool();
    if (!p) {
        return null;
    }
    return p.query<T>(text, params);
}

