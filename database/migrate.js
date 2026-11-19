const { Pool } = require("pg");

const databaseUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_AaZ1EIRLXw7K@ep-blue-union-a18erlsa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require&uselibpqcompat=true";

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

async function migrate() {
  try {
    console.log("Migrating database on Neon...");

    // 1. Expand hero_section with text fields
    await pool.query(`
      ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS headline TEXT DEFAULT 'Curious mind.';
      ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS subheadline TEXT DEFAULT 'Thoughtful code.';
      ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS description TEXT DEFAULT 'Hi, I''m Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences.';
      ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS badge_text TEXT DEFAULT 'BUILDING WITH CURIOSITY';
      ALTER TABLE hero_section ADD COLUMN IF NOT EXISTS note_text TEXT DEFAULT 'A little bit of logic,\na lot of heart.';
    `);
    console.log("✓ Hero section table enhanced with dynamic content columns.");

    // Update existing row if columns were null
    await pool.query(`
      UPDATE hero_section SET
        headline = COALESCE(headline, 'Curious mind.'),
        subheadline = COALESCE(subheadline, 'Thoughtful code.'),
        description = COALESCE(description, 'Hi, I''m Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences.'),
        badge_text = COALESCE(badge_text, 'BUILDING WITH CURIOSITY'),
        note_text = COALESCE(note_text, 'A little bit of logic,\na lot of heart.')
      WHERE id = 1;
    `);

    // 2. Expand projects with live demo and GitHub repository links
    await pool.query(`
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url TEXT;
      ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
    `);
    console.log("✓ Projects table enhanced with live_url and github_url.");

    // 3. Create site_settings table for global portfolio & footer configurations
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        site_title TEXT NOT NULL DEFAULT 'Abigail Ola · IT Portfolio',
        owner_name TEXT NOT NULL DEFAULT 'Abigail Ola',
        owner_title TEXT NOT NULL DEFAULT 'Computer Science Student',
        contact_email TEXT NOT NULL DEFAULT 'hello@example.com',
        github_url TEXT NOT NULL DEFAULT 'https://github.com',
        linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com',
        intro_eyebrow TEXT NOT NULL DEFAULT 'A STUDENT BY DAY',
        intro_quote TEXT NOT NULL DEFAULT 'Learning out loud, building with intention.',
        footer_copyright TEXT NOT NULL DEFAULT '© 2025 Abigail Ola',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      INSERT INTO site_settings (
        id, site_title, owner_name, owner_title, contact_email, github_url, linkedin_url, intro_eyebrow, intro_quote, footer_copyright
      ) VALUES (
        1, 'Abigail Ola · IT Portfolio', 'Abigail Ola', 'Computer Science Student', 'hello@example.com', 'https://github.com', 'https://linkedin.com', 'A STUDENT BY DAY', 'Learning out loud, building with intention.', '© 2025 Abigail Ola'
      ) ON CONFLICT (id) DO NOTHING;
    `);
    console.log("✓ site_settings table created and seeded.");

    // 4. Resume PDF stored in the database or Cloudinary
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resume (
        id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        filename TEXT NOT NULL,
        content_type TEXT NOT NULL DEFAULT 'application/pdf',
        file_data BYTEA,
        cloudinary_url TEXT,
        cloudinary_public_id TEXT,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      ALTER TABLE resume ADD COLUMN IF NOT EXISTS cloudinary_url TEXT;
      ALTER TABLE resume ADD COLUMN IF NOT EXISTS cloudinary_public_id TEXT;
      ALTER TABLE resume ALTER COLUMN file_data DROP NOT NULL;
    `);
    console.log("✓ resume table created and migrated for Cloudinary support.");
    console.log("✓ resume table ready.");

    console.log("All database migrations completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

migrate();
