const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_AaZ1EIRLXw7K@ep-blue-union-a18erlsa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&uselibpqcompat=true";

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

async function run() {
  try {
    const schemaPath = path.join(__dirname, "../schema.sql");
    const sql = fs.readFileSync(schemaPath, "utf8");
    console.log("Connecting to Neon PostgreSQL and applying schema.sql...");
    await pool.query(sql);
    console.log("✓ Schema applied successfully!");

    const res = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log(
      "✓ Verified tables created:",
      res.rows.map((r) => r.table_name).join(", ")
    );
  } catch (err) {
    console.error("✗ Database setup error:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

run();
