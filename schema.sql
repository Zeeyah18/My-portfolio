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

-- -----------------------------------------------------------------------------
-- 1. USERS & ADMIN AUTHENTICATION
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(60) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(150),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 2. HERO SECTION (Dynamic image only; headlines and bio are static in code)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_section (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    headline TEXT NOT NULL DEFAULT 'Curious mind.',
    subheadline TEXT NOT NULL DEFAULT 'Thoughtful code.',
    description TEXT NOT NULL DEFAULT 'Hi, I''m Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences.',
    badge_text TEXT NOT NULL DEFAULT 'BUILDING WITH CURIOSITY',
    note_text TEXT NOT NULL DEFAULT 'A little bit of logic,\na lot of heart.',
    image_url TEXT NOT NULL DEFAULT '/assets/portfolio-portrait.png',
    image_alt TEXT DEFAULT 'Abigail, a computer science student, smiling beside her laptop',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 3. ABOUT ME SECTION (First description, second description, and photo)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS about_section (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    first_description TEXT NOT NULL,
    second_description TEXT NOT NULL,
    image_url TEXT NOT NULL DEFAULT '/assets/portfolio-portrait.png',
    image_alt TEXT DEFAULT 'About photo of Abigail Ola',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 4. TOOLS & SKILLS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon_key VARCHAR(100) NOT NULL, -- e.g. 'siHtml5', 'siCss', 'siReact', 'siGit'
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 5. PROJECTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT, -- Project screenshot or preview image
    live_url TEXT,  -- Live demo website URL
    github_url TEXT, -- GitHub repository URL
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 6. CERTIFICATES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS certificates (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    about_certificate TEXT, -- What was learned and achieved
    year VARCHAR(10) NOT NULL DEFAULT '2025',
    image_url TEXT, -- Certificate badge or diploma image
    icon_name VARCHAR(50) NOT NULL DEFAULT 'Award', -- 'Award', 'Braces', 'Sparkles'
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 7. EXPERIENCE TIMELINE
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS experiences (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    organization VARCHAR(150) NOT NULL,
    period VARCHAR(100) NOT NULL, -- '2024 — PRESENT'
    description TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE
);

-- -----------------------------------------------------------------------------
-- 8. CONTACT MESSAGES (From Contact Form Card: name, email, message)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 9. SITE SETTINGS (Brand, owner, social links, intro quotes)
-- -----------------------------------------------------------------------------
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

-- -----------------------------------------------------------------------------
-- 10. RESUME
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS resume (
    id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    filename TEXT NOT NULL,
    content_type TEXT NOT NULL DEFAULT 'application/pdf',
    file_data BYTEA,
    cloudinary_url TEXT,
    cloudinary_public_id TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =============================================================================
-- SEED DATA
-- =============================================================================



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

INSERT INTO skills (id, name, icon_key, display_order)
VALUES
    (1, 'HTML5', 'siHtml5', 1),
    (2, 'CSS3', 'siCss', 2),
    (3, 'JavaScript', 'siJavascript', 3),
    (4, 'TypeScript', 'siTypescript', 4),
    (5, 'React', 'siReact', 5),
    (6, 'Node.js', 'siNodedotjs', 6),
    (7, 'Python', 'siPython', 7),
    (8, 'Git & GitHub', 'siGit', 8)
ON CONFLICT (id) DO NOTHING;

SELECT setval('skills_id_seq', COALESCE((SELECT MAX(id) FROM skills), 1));

INSERT INTO projects (id, name, description, image_url, display_order)
VALUES
    (
        1,
        'Bloom & Balance',
        'A calm, accessible habit tracker designed to make everyday wellbeing feel a little more possible.',
        '/assets/portfolio-portrait.png',
        1
    ),
    (
        2,
        'Campus Connect',
        'A welcoming home for student clubs, campus events, and the connections that make a university feel smaller.',
        '/assets/portfolio-portrait.png',
        2
    ),
    (
        3,
        'Greenhouse Notes',
        'A little plant-care dashboard that turns watering schedules into an easy, joyful routine.',
        '/assets/portfolio-portrait.png',
        3
    )
ON CONFLICT (id) DO NOTHING;

SELECT setval('projects_id_seq', COALESCE((SELECT MAX(id) FROM projects), 1));

INSERT INTO certificates (id, title, about_certificate, year, image_url, icon_name, display_order)
VALUES
    (
        1,
        'Introduction to Front-End Development',
        'Mastered responsive page layouts, DOM manipulation, Git version control, and core web accessibility principles.',
        '2025',
        '/assets/portfolio-portrait.png',
        'Award',
        1
    ),
    (
        2,
        'Responsive Web Design',
        'Comprehensive 300-hour certification covering modern CSS Grid, Flexbox, media queries, and semantic HTML5 structuring.',
        '2025',
        '/assets/portfolio-portrait.png',
        'Braces',
        2
    ),
    (
        3,
        'Foundations of User Experience (UX) Design',
        'Covered design thinking, empathy mapping, user personas, low-to-high fidelity wireframing, and usability testing.',
        '2024',
        '/assets/portfolio-portrait.png',
        'Sparkles',
        3
    )
ON CONFLICT (id) DO NOTHING;

SELECT setval('certificates_id_seq', COALESCE((SELECT MAX(id) FROM certificates), 1));

INSERT INTO experiences (id, title, organization, period, description, display_order)
VALUES
    (
        1,
        'Computer Science Student',
        'University studies · Bengaluru, India',
        '2024 — PRESENT',
        'Building strong foundations in programming, data structures, web development, and collaborative problem-solving.',
        1
    ),
    (
        2,
        'Independent Project Builder',
        'Personal & collaborative projects',
        '2025 — PRESENT',
        'Taking ideas from sketch to screen, learning new tools along the way, and sharing the things I make with others.',
        2
    ),
    (
        3,
        'Curious Learner',
        'Online courses · Open-source community',
        'ALWAYS',
        'Following curiosity into new frameworks, thoughtful design, and a more accessible, inclusive web.',
        3
    )
ON CONFLICT (id) DO NOTHING;

SELECT setval('experiences_id_seq', COALESCE((SELECT MAX(id) FROM experiences), 1));
