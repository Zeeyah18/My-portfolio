-- =============================================================================
-- Modern IT Portfolio - Minimal & Simplified PostgreSQL Database Schema
-- =============================================================================
--  1. Users / Admin auth (username, email, password_hash, name)
--  2. Hero section (image only)
--  3. About section (first_description, second_description, and image)
--  4. Tools / Skills (name, icon_key)
--  5. Projects (name, description, image)
--  6. Certificates (title, about_certificate, year, image, icon_name)
--  7. Experience timeline (title, organization, period, description)
--  8. Contact messages (name, email, message from the contact form)
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_section (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    image_url TEXT NOT NULL DEFAULT '/assets/portfolio-portrait.png',
    image_alt TEXT DEFAULT 'Abigail, a computer science student, smiling beside her laptop',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS about_section (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    first_description TEXT NOT NULL,
    second_description TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT '/assets/portfolio-portrait.png',
    image_alt TEXT DEFAULT 'About photo of Abigail Ola',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_key VARCHAR(100) NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    about_certificate TEXT,
    year VARCHAR(10) NOT NULL DEFAULT '2025',
    image_url TEXT,
    icon_name VARCHAR(50) NOT NULL DEFAULT 'Award',
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    period VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS resume (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    filename TEXT NOT NULL,
    content_type TEXT NOT NULL DEFAULT 'application/pdf',
    file_data BYTEA NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- SEED DATA
-- =============================================================================

INSERT INTO users (username, email, password_hash, name)
VALUES (
    'admin',
    'admin@portfolio.local',
    '$2a$10$w0J/WcO2l5sO7O8b1k8FVe7Xg4Q5XbKjWq7pZf8m.U4U.cQo6JmGy',
    'Portfolio Owner'
)
ON CONFLICT (email) DO NOTHING;

INSERT INTO hero_section (id, image_url, image_alt)
VALUES (
    1,
    '/assets/portfolio-portrait.png',
    'Aanya, a computer science student, smiling beside her laptop'
)
ON CONFLICT (id) DO UPDATE SET
    image_url = EXCLUDED.image_url,
    image_alt = EXCLUDED.image_alt;

INSERT INTO about_section (id, first_description, second_description, image_url, image_alt)
VALUES (
    1,
    'I''m a computer science student fascinated by what happens when thoughtful design meets good engineering. I enjoy making the web feel less complicated and a little more welcoming.',
    'Between classes, you''ll find me exploring frontend development, learning something new just because, or collaborating on ideas that make a difference.',
    '/assets/portfolio-portrait.png',
    'About photo of Abigail Ola coding and designing'
)
ON CONFLICT (id) DO UPDATE SET
    first_description = EXCLUDED.first_description,
    second_description = EXCLUDED.second_description,
    image_url = EXCLUDED.image_url,
    image_alt = EXCLUDED.image_alt;

INSERT INTO skills (name, icon_key, display_order)
VALUES
    ('HTML5', 'siHtml5', 1),
    ('CSS3', 'siCss', 2),
    ('JavaScript', 'siJavascript', 3),
    ('TypeScript', 'siTypescript', 4),
    ('React', 'siReact', 5),
    ('Node.js', 'siNodedotjs', 6),
    ('Python', 'siPython', 7),
    ('Git & GitHub', 'siGit', 8)
ON CONFLICT DO NOTHING;

INSERT INTO projects (name, description, image_url, display_order)
VALUES
    ('Bloom & Balance', 'A calm, accessible habit tracker designed to make everyday wellbeing feel a little more possible.', NULL, 1),
    ('Campus Connect', 'A welcoming home for student clubs, campus events, and the connections that make a university feel smaller.', NULL, 2),
    ('Greenhouse Notes', 'A little plant-care dashboard that turns watering schedules into an easy, joyful routine.', NULL, 3)
ON CONFLICT DO NOTHING;

INSERT INTO certificates (title, about_certificate, year, image_url, icon_name, display_order)
VALUES
    ('Introduction to Front-End Development', 'Mastered responsive page layouts, DOM manipulation, Git version control, and core web accessibility principles.', '2025', NULL, 'Award', 1),
    ('Responsive Web Design', 'Comprehensive 300-hour certification covering modern CSS Grid, Flexbox, media queries, and semantic HTML5 structuring.', '2025', NULL, 'Braces', 2),
    ('Foundations of User Experience (UX) Design', 'Covered design thinking, empathy mapping, user personas, low-to-high fidelity wireframing, and usability testing.', '2024', NULL, 'Sparkles', 3)
ON CONFLICT DO NOTHING;

INSERT INTO experiences (title, organization, period, description, display_order)
VALUES
    ('Computer Science Student', 'University studies · Bengaluru, India', '2024 — PRESENT', 'Building strong foundations in programming, data structures, web development, and collaborative problem-solving.', 1),
    ('Independent Project Builder', 'Personal & collaborative projects', '2025 — PRESENT', 'Taking ideas from sketch to screen, learning new tools along the way, and sharing the things I make with others.', 2),
    ('Curious Learner', 'Online courses · Open-source community', 'ALWAYS', 'Following curiosity into new frameworks, thoughtful design, and a more accessible, inclusive web.', 3)
ON CONFLICT DO NOTHING;
