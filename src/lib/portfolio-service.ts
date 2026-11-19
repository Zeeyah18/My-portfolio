import { query } from "./db";
import {
    AboutSection,
    Certificate,
    ContactMessage,
    Experience,
    HeroSection,
    PortfolioData,
    Project,
    ResumeMeta,
    SiteSettings,
    Skill,
} from "@/types/portfolio";

export const defaultPortfolioData: PortfolioData = {
    hero: {
        id: 1,
        headline: "Curious mind.",
        subheadline: "Thoughtful code.",
        description:
            "Hi, I'm Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences.",
        badgeText: "BUILDING WITH CURIOSITY",
        noteText: "A little bit of logic,\na lot of heart.",
        imageUrl: "/assets/portfolio-portrait.png",
        imageAlt: "Abigail, a computer science student, smiling beside her laptop",
    },
    about: {
        id: 1,
        firstDescription:
            "I'm an Information Technology student fascinated by what happens when thoughtful design meets good engineering. I enjoy making the web feel less complicated and a little more welcoming.",
        secondDescription:
            "Between classes, you'll find me exploring frontend development, learning something new just because, or collaborating on ideas that make a difference.",
        imageUrl: "/assets/portfolio-portrait.png",
        imageAlt: "About photo of Abigail coding and designing",
    },
    skills: [
        { id: 1, name: "HTML5", iconKey: "siHtml5", displayOrder: 1, isActive: true },
        { id: 2, name: "CSS3", iconKey: "siCss", displayOrder: 2, isActive: true },
        { id: 3, name: "JavaScript", iconKey: "siJavascript", displayOrder: 3, isActive: true },
        { id: 4, name: "TypeScript", iconKey: "siTypescript", displayOrder: 4, isActive: true },
        { id: 5, name: "React", iconKey: "siReact", displayOrder: 5, isActive: true },
        { id: 6, name: "Node.js", iconKey: "siNodedotjs", displayOrder: 6, isActive: true },
        { id: 7, name: "Python", iconKey: "siPython", displayOrder: 7, isActive: true },
        { id: 8, name: "Git & GitHub", iconKey: "siGit", displayOrder: 8, isActive: true },
    ],
    projects: [
        {
            id: 1,
            name: "Bloom & Balance",
            description:
                "A calm, accessible habit tracker designed to make everyday wellbeing feel a little more possible.",
            imageUrl: "",
            liveUrl: "https://example.com/bloom-and-balance",
            githubUrl: "https://github.com",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            name: "Campus Connect",
            description:
                "A welcoming home for student clubs, campus events, and the connections that make a university feel smaller.",
            imageUrl: "",
            liveUrl: "https://example.com/campus-connect",
            githubUrl: "https://github.com",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            name: "Greenhouse Notes",
            description:
                "A little plant-care dashboard that turns watering schedules into an easy, joyful routine.",
            imageUrl: "",
            liveUrl: "https://example.com/greenhouse-notes",
            githubUrl: "https://github.com",
            displayOrder: 3,
            isActive: true,
        },
    ],
    certificates: [
        {
            id: 1,
            title: "Introduction to Front-End Development",
            aboutCertificate:
                "Mastered responsive page layouts, DOM manipulation, Git version control, and core web accessibility principles.",
            year: "2025",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Award",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            title: "Responsive Web Design",
            aboutCertificate:
                "Comprehensive 300-hour certification covering modern CSS Grid, Flexbox, media queries, and semantic HTML5 structuring.",
            year: "2025",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Braces",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            title: "Foundations of User Experience (UX) Design",
            aboutCertificate:
                "Covered design thinking, empathy mapping, user personas, low-to-high fidelity wireframing, and usability testing.",
            year: "2024",
            imageUrl: "/assets/portfolio-portrait.png",
            iconName: "Gem",
            displayOrder: 3,
            isActive: true,
        },
    ],
    experiences: [
        {
            id: 1,
            title: "Computer Science Student",
            organization: "University studies · Bengaluru, India",
            period: "2024 — PRESENT",
            description:
                "Building strong foundations in programming, data structures, web development, and collaborative problem-solving.",
            displayOrder: 1,
            isActive: true,
        },
        {
            id: 2,
            title: "Independent Project Builder",
            organization: "Personal & collaborative projects",
            period: "2025 — PRESENT",
            description:
                "Taking ideas from sketch to screen, learning new tools along the way, and sharing the things I make with others.",
            displayOrder: 2,
            isActive: true,
        },
        {
            id: 3,
            title: "Curious Learner",
            organization: "Online courses · Open-source community",
            period: "ALWAYS",
            description:
                "Following curiosity into new frameworks, thoughtful design, and a more accessible, inclusive web.",
            displayOrder: 3,
            isActive: true,
        },
    ],
    settings: {
        id: 1,
        siteTitle: "Abigail Ola · IT Portfolio",
        ownerName: "Abigail Ola",
        ownerTitle: "Computer Science Student",
        contactEmail: "hello@example.com",
        githubUrl: "https://github.com",
        linkedinUrl: "https://linkedin.com",
        introEyebrow: "A STUDENT BY DAY",
        introQuote: "Learning out loud, building with intention.",
        footerCopyright: "© 2025 Abigail Ola",
    },
    resume: null,
};

// ==========================================
// HERO SECTION
// ==========================================
export async function getHeroSection(): Promise<HeroSection> {
    try {
        const res = await query<{
            id: number;
            headline?: string;
            subheadline?: string;
            description?: string;
            badge_text?: string;
            note_text?: string;
            image_url: string;
            image_alt: string;
            updated_at: string;
        }>("SELECT id, headline, subheadline, description, badge_text, note_text, image_url, image_alt, updated_at FROM hero_section WHERE id = 1 LIMIT 1");

        if (res && res.rows.length > 0) {
            const row = res.rows[0]!;
            return {
                id: row.id,
                headline: row.headline || defaultPortfolioData.hero.headline,
                subheadline: row.subheadline || defaultPortfolioData.hero.subheadline,
                description: row.description || defaultPortfolioData.hero.description,
                badgeText: row.badge_text || defaultPortfolioData.hero.badgeText,
                noteText: row.note_text || defaultPortfolioData.hero.noteText,
                imageUrl: row.image_url || defaultPortfolioData.hero.imageUrl,
                imageAlt: row.image_alt || defaultPortfolioData.hero.imageAlt,
                updatedAt: row.updated_at,
            };
        }
    } catch (error) {
        console.error("Error loading hero_section from database, using fallback:", error);
    }
    return defaultPortfolioData.hero;
}

export async function updateHeroSection(data: {
    imageUrl?: string;
    imageAlt?: string;
    headline?: string;
    subheadline?: string;
    description?: string;
    badgeText?: string;
    noteText?: string;
}): Promise<boolean> {
    const res = await query(
        `INSERT INTO hero_section (id, headline, subheadline, description, badge_text, note_text, image_url, image_alt, updated_at)
         VALUES (1, $1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (id) DO UPDATE SET
           headline = COALESCE(EXCLUDED.headline, hero_section.headline),
           subheadline = COALESCE(EXCLUDED.subheadline, hero_section.subheadline),
           description = COALESCE(EXCLUDED.description, hero_section.description),
           badge_text = COALESCE(EXCLUDED.badge_text, hero_section.badge_text),
           note_text = COALESCE(EXCLUDED.note_text, hero_section.note_text),
           image_url = COALESCE(EXCLUDED.image_url, hero_section.image_url),
           image_alt = COALESCE(EXCLUDED.image_alt, hero_section.image_alt),
           updated_at = NOW()`,
        [
            data.headline ?? defaultPortfolioData.hero.headline,
            data.subheadline ?? defaultPortfolioData.hero.subheadline,
            data.description ?? defaultPortfolioData.hero.description,
            data.badgeText ?? defaultPortfolioData.hero.badgeText,
            data.noteText ?? defaultPortfolioData.hero.noteText,
            data.imageUrl ?? defaultPortfolioData.hero.imageUrl,
            data.imageAlt ?? defaultPortfolioData.hero.imageAlt,
        ],
    );
    return !!res;
}

export async function updateHeroImage(imageUrl: string, imageAlt?: string): Promise<boolean> {
    return updateHeroSection({ imageUrl, imageAlt });
}

// ==========================================
// ABOUT SECTION
// ==========================================
export async function getAboutSection(): Promise<AboutSection> {
    try {
        const res = await query<{
            id: number;
            first_description: string;
            second_description: string;
            image_url: string;
            image_alt: string;
            updated_at: string;
        }>(
            "SELECT id, first_description, second_description, image_url, image_alt, updated_at FROM about_section WHERE id = 1 LIMIT 1",
        );

        if (res && res.rows.length > 0) {
            const row = res.rows[0]!;
            return {
                id: row.id,
                firstDescription: row.first_description,
                secondDescription: row.second_description,
                imageUrl: row.image_url,
                imageAlt: row.image_alt,
                updatedAt: row.updated_at,
            };
        }
    } catch (error) {
        console.error("Error loading about_section from database, using fallback:", error);
    }
    return defaultPortfolioData.about;
}

export async function updateAboutSection(
    firstDesc: string,
    secondDesc: string,
    imageUrl: string,
    imageAlt?: string,
): Promise<boolean> {
    const res = await query(
        `INSERT INTO about_section (id, first_description, second_description, image_url, image_alt, updated_at)
     VALUES (1, $1, $2, $3, $4, NOW())
     ON CONFLICT (id) DO UPDATE SET
       first_description = EXCLUDED.first_description,
       second_description = EXCLUDED.second_description,
       image_url = EXCLUDED.image_url,
       image_alt = COALESCE(EXCLUDED.image_alt, about_section.image_alt),
       updated_at = NOW()`,
        [firstDesc, secondDesc, imageUrl, imageAlt || "About photo"],
    );
    return !!res;
}

// ==========================================
// SKILLS CRUD
// ==========================================
export async function getSkills(): Promise<Skill[]> {
    try {
        const res = await query<{
            id: number;
            name: string;
            icon_key: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, name, icon_key, display_order, is_active FROM skills WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                name: row.name,
                iconKey: row.icon_key,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading skills from database, using fallback:", error);
    }
    return defaultPortfolioData.skills;
}

export async function createSkill(data: { name: string; iconKey: string; displayOrder?: number }): Promise<Skill> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.skills.length + 1);
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO skills (name, icon_key, display_order, is_active) VALUES ($1, $2, $3, TRUE) RETURNING id",
            [data.name, data.iconKey, displayOrder],
        );
        if (res && res.rows[0]) {
            const newSkill: Skill = { id: res.rows[0].id, name: data.name, iconKey: data.iconKey, displayOrder, isActive: true };
            defaultPortfolioData.skills.push(newSkill);
            return newSkill;
        }
    } catch (err) {
        console.error("DB createSkill error:", err);
    }
    const newSkill: Skill = {
        id: Date.now(),
        name: data.name,
        iconKey: data.iconKey,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.skills.push(newSkill);
    return newSkill;
}

export async function updateSkill(id: number, data: { name?: string; iconKey?: string; displayOrder?: number; isActive?: boolean }): Promise<boolean> {
    try {
        await query(
            `UPDATE skills SET
                name = COALESCE($1, name),
                icon_key = COALESCE($2, icon_key),
                display_order = COALESCE($3, display_order),
                is_active = COALESCE($4, is_active)
             WHERE id = $5`,
            [data.name ?? null, data.iconKey ?? null, data.displayOrder ?? null, data.isActive ?? null, id],
        );
    } catch (err) {
        console.error("DB updateSkill error:", err);
    }
    const s = defaultPortfolioData.skills.find((item) => item.id === id);
    if (s) {
        if (data.name !== undefined) s.name = data.name;
        if (data.iconKey !== undefined) s.iconKey = data.iconKey;
        if (data.displayOrder !== undefined) s.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) s.isActive = data.isActive;
    }
    return true;
}

export async function deleteSkill(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM skills WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteSkill error:", err);
    }
    const idx = defaultPortfolioData.skills.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.skills.splice(idx, 1);
    return true;
}

// ==========================================
// PROJECTS CRUD
// ==========================================
export async function getProjects(): Promise<Project[]> {
    try {
        const res = await query<{
            id: number;
            name: string;
            description: string;
            image_url: string;
            live_url?: string;
            github_url?: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, name, description, image_url, live_url, github_url, display_order, is_active FROM projects WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                name: row.name,
                description: row.description,
                imageUrl: row.image_url,
                liveUrl: row.live_url || "",
                githubUrl: row.github_url || "",
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading projects from database, using fallback:", error);
    }
    return defaultPortfolioData.projects;
}

export async function createProject(data: {
    name: string;
    description: string;
    imageUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    displayOrder?: number;
}): Promise<Project> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.projects.length + 1);
    const imageUrl = data.imageUrl || "";
    const liveUrl = data.liveUrl || "";
    const githubUrl = data.githubUrl || "";
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO projects (name, description, image_url, live_url, github_url, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, TRUE) RETURNING id",
            [data.name, data.description, imageUrl, liveUrl, githubUrl, displayOrder],
        );
        if (res && res.rows[0]) {
            const newProj: Project = {
                id: res.rows[0].id,
                name: data.name,
                description: data.description,
                imageUrl,
                liveUrl,
                githubUrl,
                displayOrder,
                isActive: true,
            };
            defaultPortfolioData.projects.push(newProj);
            return newProj;
        }
    } catch (err) {
        console.error("DB createProject error:", err);
    }
    const newProj: Project = {
        id: Date.now(),
        name: data.name,
        description: data.description,
        imageUrl,
        liveUrl,
        githubUrl,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.projects.push(newProj);
    return newProj;
}

export async function updateProject(
    id: number,
    data: {
        name?: string;
        description?: string;
        imageUrl?: string;
        liveUrl?: string;
        githubUrl?: string;
        displayOrder?: number;
        isActive?: boolean;
    },
): Promise<boolean> {
    try {
        await query(
            `UPDATE projects SET
                name = COALESCE($1, name),
                description = COALESCE($2, description),
                image_url = COALESCE($3, image_url),
                live_url = COALESCE($4, live_url),
                github_url = COALESCE($5, github_url),
                display_order = COALESCE($6, display_order),
                is_active = COALESCE($7, is_active)
             WHERE id = $8`,
            [
                data.name ?? null,
                data.description ?? null,
                data.imageUrl ?? null,
                data.liveUrl ?? null,
                data.githubUrl ?? null,
                data.displayOrder ?? null,
                data.isActive ?? null,
                id,
            ],
        );
    } catch (err) {
        console.error("DB updateProject error:", err);
    }
    const p = defaultPortfolioData.projects.find((item) => item.id === id);
    if (p) {
        if (data.name !== undefined) p.name = data.name;
        if (data.description !== undefined) p.description = data.description;
        if (data.imageUrl !== undefined) p.imageUrl = data.imageUrl;
        if (data.liveUrl !== undefined) p.liveUrl = data.liveUrl;
        if (data.githubUrl !== undefined) p.githubUrl = data.githubUrl;
        if (data.displayOrder !== undefined) p.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) p.isActive = data.isActive;
    }
    return true;
}

export async function deleteProject(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM projects WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteProject error:", err);
    }
    const idx = defaultPortfolioData.projects.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.projects.splice(idx, 1);
    return true;
}

// ==========================================
// CERTIFICATES CRUD
// ==========================================
export async function getCertificates(): Promise<Certificate[]> {
    try {
        const res = await query<{
            id: number;
            title: string;
            about_certificate: string;
            year: string;
            image_url: string;
            icon_name: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, title, about_certificate, year, image_url, icon_name, display_order, is_active FROM certificates WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                title: row.title,
                aboutCertificate: row.about_certificate,
                year: row.year,
                imageUrl: row.image_url,
                iconName: row.icon_name,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading certificates from database, using fallback:", error);
    }
    return defaultPortfolioData.certificates;
}

export async function createCertificate(data: {
    title: string;
    aboutCertificate?: string;
    year?: string;
    imageUrl?: string;
    iconName?: string;
    displayOrder?: number;
}): Promise<Certificate> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.certificates.length + 1);
    const year = data.year || "2025";
    const imageUrl = data.imageUrl || "";
    const iconName = data.iconName || "Award";
    const aboutCert = data.aboutCertificate || "";
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO certificates (title, about_certificate, year, image_url, icon_name, display_order, is_active) VALUES ($1, $2, $3, $4, $5, $6, TRUE) RETURNING id",
            [data.title, aboutCert, year, imageUrl, iconName, displayOrder],
        );
        if (res && res.rows[0]) {
            const newCert: Certificate = {
                id: res.rows[0].id,
                title: data.title,
                aboutCertificate: aboutCert,
                year,
                imageUrl,
                iconName,
                displayOrder,
                isActive: true,
            };
            defaultPortfolioData.certificates.push(newCert);
            return newCert;
        }
    } catch (err) {
        console.error("DB createCertificate error:", err);
    }
    const newCert: Certificate = {
        id: Date.now(),
        title: data.title,
        aboutCertificate: aboutCert,
        year,
        imageUrl,
        iconName,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.certificates.push(newCert);
    return newCert;
}

export async function updateCertificate(
    id: number,
    data: {
        title?: string;
        aboutCertificate?: string;
        year?: string;
        imageUrl?: string;
        iconName?: string;
        displayOrder?: number;
        isActive?: boolean;
    },
): Promise<boolean> {
    try {
        await query(
            `UPDATE certificates SET
                title = COALESCE($1, title),
                about_certificate = COALESCE($2, about_certificate),
                year = COALESCE($3, year),
                image_url = COALESCE($4, image_url),
                icon_name = COALESCE($5, icon_name),
                display_order = COALESCE($6, display_order),
                is_active = COALESCE($7, is_active)
             WHERE id = $8`,
            [
                data.title ?? null,
                data.aboutCertificate ?? null,
                data.year ?? null,
                data.imageUrl ?? null,
                data.iconName ?? null,
                data.displayOrder ?? null,
                data.isActive ?? null,
                id,
            ],
        );
    } catch (err) {
        console.error("DB updateCertificate error:", err);
    }
    const c = defaultPortfolioData.certificates.find((item) => item.id === id);
    if (c) {
        if (data.title !== undefined) c.title = data.title;
        if (data.aboutCertificate !== undefined) c.aboutCertificate = data.aboutCertificate;
        if (data.year !== undefined) c.year = data.year;
        if (data.imageUrl !== undefined) c.imageUrl = data.imageUrl;
        if (data.iconName !== undefined) c.iconName = data.iconName;
        if (data.displayOrder !== undefined) c.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) c.isActive = data.isActive;
    }
    return true;
}

export async function deleteCertificate(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM certificates WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteCertificate error:", err);
    }
    const idx = defaultPortfolioData.certificates.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.certificates.splice(idx, 1);
    return true;
}

// ==========================================
// EXPERIENCES CRUD
// ==========================================
export async function getExperiences(): Promise<Experience[]> {
    try {
        const res = await query<{
            id: number;
            title: string;
            organization: string;
            period: string;
            description: string;
            display_order: number;
            is_active: boolean;
        }>("SELECT id, title, organization, period, description, display_order, is_active FROM experiences WHERE is_active = TRUE ORDER BY display_order ASC");

        if (res && res.rows.length > 0) {
            return res.rows.map((row) => ({
                id: row.id,
                title: row.title,
                organization: row.organization,
                period: row.period,
                description: row.description,
                displayOrder: row.display_order,
                isActive: row.is_active,
            }));
        }
    } catch (error) {
        console.error("Error loading experiences from database, using fallback:", error);
    }
    return defaultPortfolioData.experiences;
}

export async function createExperience(data: {
    title: string;
    organization: string;
    period: string;
    description: string;
    displayOrder?: number;
}): Promise<Experience> {
    const displayOrder = data.displayOrder ?? (defaultPortfolioData.experiences.length + 1);
    try {
        const res = await query<{ id: number }>(
            "INSERT INTO experiences (title, organization, period, description, display_order, is_active) VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id",
            [data.title, data.organization, data.period, data.description, displayOrder],
        );
        if (res && res.rows[0]) {
            const newExp: Experience = {
                id: res.rows[0].id,
                title: data.title,
                organization: data.organization,
                period: data.period,
                description: data.description,
                displayOrder,
                isActive: true,
            };
            defaultPortfolioData.experiences.push(newExp);
            return newExp;
        }
    } catch (err) {
        console.error("DB createExperience error:", err);
    }
    const newExp: Experience = {
        id: Date.now(),
        title: data.title,
        organization: data.organization,
        period: data.period,
        description: data.description,
        displayOrder,
        isActive: true,
    };
    defaultPortfolioData.experiences.push(newExp);
    return newExp;
}

export async function updateExperience(
    id: number,
    data: {
        title?: string;
        organization?: string;
        period?: string;
        description?: string;
        displayOrder?: number;
        isActive?: boolean;
    },
): Promise<boolean> {
    try {
        await query(
            `UPDATE experiences SET
                title = COALESCE($1, title),
                organization = COALESCE($2, organization),
                period = COALESCE($3, period),
                description = COALESCE($4, description),
                display_order = COALESCE($5, display_order),
                is_active = COALESCE($6, is_active)
             WHERE id = $7`,
            [
                data.title ?? null,
                data.organization ?? null,
                data.period ?? null,
                data.description ?? null,
                data.displayOrder ?? null,
                data.isActive ?? null,
                id,
            ],
        );
    } catch (err) {
        console.error("DB updateExperience error:", err);
    }
    const e = defaultPortfolioData.experiences.find((item) => item.id === id);
    if (e) {
        if (data.title !== undefined) e.title = data.title;
        if (data.organization !== undefined) e.organization = data.organization;
        if (data.period !== undefined) e.period = data.period;
        if (data.description !== undefined) e.description = data.description;
        if (data.displayOrder !== undefined) e.displayOrder = data.displayOrder;
        if (data.isActive !== undefined) e.isActive = data.isActive;
    }
    return true;
}

export async function deleteExperience(id: number): Promise<boolean> {
    try {
        await query("DELETE FROM experiences WHERE id = $1", [id]);
    } catch (err) {
        console.error("DB deleteExperience error:", err);
    }
    const idx = defaultPortfolioData.experiences.findIndex((item) => item.id === id);
    if (idx !== -1) defaultPortfolioData.experiences.splice(idx, 1);
    return true;
}

// ==========================================
// SITE SETTINGS
// ==========================================
export async function getSiteSettings(): Promise<SiteSettings> {
    try {
        const res = await query<{
            id: number;
            site_title: string;
            owner_name: string;
            owner_title: string;
            contact_email: string;
            github_url: string;
            linkedin_url: string;
            intro_eyebrow: string;
            intro_quote: string;
            footer_copyright: string;
            updated_at: string;
        }>("SELECT id, site_title, owner_name, owner_title, contact_email, github_url, linkedin_url, intro_eyebrow, intro_quote, footer_copyright, updated_at FROM site_settings WHERE id = 1 LIMIT 1");

        if (res && res.rows.length > 0) {
            const row = res.rows[0]!;
            return {
                id: row.id,
                siteTitle: row.site_title || defaultPortfolioData.settings.siteTitle,
                ownerName: row.owner_name || defaultPortfolioData.settings.ownerName,
                ownerTitle: row.owner_title || defaultPortfolioData.settings.ownerTitle,
                contactEmail: row.contact_email || defaultPortfolioData.settings.contactEmail,
                githubUrl: row.github_url || defaultPortfolioData.settings.githubUrl,
                linkedinUrl: row.linkedin_url || defaultPortfolioData.settings.linkedinUrl,
                introEyebrow: row.intro_eyebrow || defaultPortfolioData.settings.introEyebrow,
                introQuote: row.intro_quote || defaultPortfolioData.settings.introQuote,
                footerCopyright: row.footer_copyright || defaultPortfolioData.settings.footerCopyright,
                updatedAt: row.updated_at,
            };
        }
    } catch (error) {
        console.error("Error loading site_settings from database, using fallback:", error);
    }
    return defaultPortfolioData.settings;
}

export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<boolean> {
    const res = await query(
        `INSERT INTO site_settings (
            id, site_title, owner_name, owner_title, contact_email, github_url, linkedin_url, intro_eyebrow, intro_quote, footer_copyright, updated_at
         ) VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())
         ON CONFLICT (id) DO UPDATE SET
            site_title = COALESCE(EXCLUDED.site_title, site_settings.site_title),
            owner_name = COALESCE(EXCLUDED.owner_name, site_settings.owner_name),
            owner_title = COALESCE(EXCLUDED.owner_title, site_settings.owner_title),
            contact_email = COALESCE(EXCLUDED.contact_email, site_settings.contact_email),
            github_url = COALESCE(EXCLUDED.github_url, site_settings.github_url),
            linkedin_url = COALESCE(EXCLUDED.linkedin_url, site_settings.linkedin_url),
            intro_eyebrow = COALESCE(EXCLUDED.intro_eyebrow, site_settings.intro_eyebrow),
            intro_quote = COALESCE(EXCLUDED.intro_quote, site_settings.intro_quote),
            footer_copyright = COALESCE(EXCLUDED.footer_copyright, site_settings.footer_copyright),
            updated_at = NOW()`,
        [
            data.siteTitle ?? defaultPortfolioData.settings.siteTitle,
            data.ownerName ?? defaultPortfolioData.settings.ownerName,
            data.ownerTitle ?? defaultPortfolioData.settings.ownerTitle,
            data.contactEmail ?? defaultPortfolioData.settings.contactEmail,
            data.githubUrl ?? defaultPortfolioData.settings.githubUrl,
            data.linkedinUrl ?? defaultPortfolioData.settings.linkedinUrl,
            data.introEyebrow ?? defaultPortfolioData.settings.introEyebrow,
            data.introQuote ?? defaultPortfolioData.settings.introQuote,
            data.footerCopyright ?? defaultPortfolioData.settings.footerCopyright,
        ],
    );
    return !!res;
}

// ==========================================
// RESUME
// ==========================================
export async function getResumeMeta(): Promise<ResumeMeta | null> {
    try {
        const res = await query<{
            filename: string;
            cloudinary_url?: string;
            updated_at: string;
        }>(
            "SELECT filename, cloudinary_url, updated_at FROM resume WHERE id = 1 LIMIT 1",
        );
        if (!res || res.rows.length === 0) return null;
        const row = res.rows[0]!;
        const updatedAt = new Date(row.updated_at).toISOString();
        return {
            filename: row.filename,
            updatedAt,
            url: row.cloudinary_url || `/api/resume?v=${encodeURIComponent(updatedAt)}`,
            cloudinaryUrl: row.cloudinary_url,
        };
    } catch (error) {
        console.error("Error loading resume metadata:", error);
        return null;
    }
}

function resumeBytes(value: unknown): Uint8Array {
    if (Buffer.isBuffer(value)) return new Uint8Array(value);
    if (value instanceof Uint8Array) return value;
    if (typeof value === "string") {
        const hex = value.startsWith("\\x") ? value.slice(2) : value;
        return new Uint8Array(Buffer.from(hex, "hex"));
    }
    throw new Error("Stored resume is not a valid PDF");
}

export async function getResumeFile(): Promise<{
    filename: string;
    contentType: string;
    bytes?: Uint8Array;
    cloudinaryUrl?: string;
    cloudinaryPublicId?: string;
} | null> {
    const res = await query<{
        filename: string;
        content_type: string;
        file_data: unknown;
        cloudinary_url?: string;
        cloudinary_public_id?: string;
    }>("SELECT filename, content_type, file_data, cloudinary_url, cloudinary_public_id FROM resume WHERE id = 1 LIMIT 1");
    if (!res || res.rows.length === 0) return null;
    const row = res.rows[0]!;
    return {
        filename: row.filename || "resume.pdf",
        contentType: row.content_type || "application/pdf",
        bytes: row.file_data ? resumeBytes(row.file_data) : undefined,
        cloudinaryUrl: row.cloudinary_url,
        cloudinaryPublicId: row.cloudinary_public_id,
    };
}

export async function saveResume({
    filename,
    bytes,
    cloudinaryUrl,
    cloudinaryPublicId,
}: {
    filename: string;
    bytes?: Buffer | null;
    cloudinaryUrl?: string | null;
    cloudinaryPublicId?: string | null;
}): Promise<ResumeMeta> {
    const res = await query<{
        filename: string;
        cloudinary_url?: string;
        updated_at: string;
    }>(
        `INSERT INTO resume (id, filename, content_type, file_data, cloudinary_url, cloudinary_public_id, updated_at)
         VALUES (1, $1, 'application/pdf', $2, $3, $4, NOW())
         ON CONFLICT (id) DO UPDATE SET
            filename = EXCLUDED.filename,
            content_type = EXCLUDED.content_type,
            file_data = COALESCE(EXCLUDED.file_data, resume.file_data),
            cloudinary_url = EXCLUDED.cloudinary_url,
            cloudinary_public_id = EXCLUDED.cloudinary_public_id,
            updated_at = NOW()
         RETURNING filename, cloudinary_url, updated_at`,
        [filename, bytes ?? null, cloudinaryUrl ?? null, cloudinaryPublicId ?? null],
    );
    if (!res || res.rows.length === 0) {
        throw new Error("Could not save the resume. Check that the database is connected.");
    }
    const row = res.rows[0]!;
    const updatedAt = new Date(row.updated_at).toISOString();
    return {
        filename: row.filename,
        updatedAt,
        url: row.cloudinary_url || `/api/resume?v=${encodeURIComponent(updatedAt)}`,
        cloudinaryUrl: row.cloudinary_url,
    };
}

export async function deleteResume(): Promise<{ success: boolean; cloudinaryPublicId?: string }> {
    const existing = await query<{ cloudinary_public_id?: string }>(
        "SELECT cloudinary_public_id FROM resume WHERE id = 1 LIMIT 1",
    );
    const pubId = existing?.rows[0]?.cloudinary_public_id;
    const res = await query("DELETE FROM resume WHERE id = 1");
    return { success: !!res, cloudinaryPublicId: pubId };
}

// ==========================================
// CONTACT MESSAGES
// ==========================================
const inMemoryMessages: ContactMessage[] = [];

export async function createContactMessage(
    name: string,
    email: string,
    message: string,
): Promise<boolean> {
    const res = await query(
        "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)",
        [name, email, message],
    );
    if (!res) {
        inMemoryMessages.unshift({
            id: `local-${Date.now()}`,
            name,
            email,
            message,
            createdAt: new Date().toISOString(),
        });
        return true;
    }
    return !!res;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
    try {
        const res = await query<{
            id: string;
            name: string;
            email: string;
            message: string;
            created_at: string;
        }>("SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC");

        if (res && res.rows.length > 0) {
            return res.rows.map((r) => ({
                id: r.id,
                name: r.name,
                email: r.email,
                message: r.message,
                createdAt: r.created_at,
            }));
        }
    } catch {
        // Fallback
    }
    return inMemoryMessages;
}

export async function deleteContactMessage(id: string): Promise<boolean> {
    try {
        await query("DELETE FROM contact_messages WHERE id = $1", [id]);
    } catch {
        // Ignore DB error
    }
    const idx = inMemoryMessages.findIndex((m) => m.id === id);
    if (idx !== -1) inMemoryMessages.splice(idx, 1);
    return true;
}

// ==========================================
// FULL PORTFOLIO AGGREGATE
// ==========================================
export async function getPortfolioData(): Promise<PortfolioData> {
    const [hero, about, skills, projects, certificates, experiences, settings, resume] = await Promise.all([
        getHeroSection(),
        getAboutSection(),
        getSkills(),
        getProjects(),
        getCertificates(),
        getExperiences(),
        getSiteSettings(),
        getResumeMeta(),
    ]);

    return {
        hero,
        about,
        skills,
        projects,
        certificates,
        experiences,
        settings,
        resume,
    };
}
