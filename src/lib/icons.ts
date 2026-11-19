import {
  // Web & Frontend
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siAngular,
  siSvelte,
  siTailwindcss,
  siSass,
  siBootstrap,
  siRedux,
  siVite,
  siWebpack,
  // Backend & Languages
  siNodedotjs,
  siExpress,
  siNestjs,
  siPython,
  siDjango,
  siFlask,
  siFastapi,
  siPhp,
  siLaravel,
  siGo,
  siRust,
  siC,
  siCplusplus,
  siDotnet,
  // Databases & Cloud
  siPostgresql,
  siMysql,
  siMongodb,
  siRedis,
  siSqlite,
  siSupabase,
  siFirebase,
  siDocker,
  siKubernetes,
  siGooglecloud,
  siVercel,
  siNetlify,
  siCloudflare,
  // Mobile & Cross-Platform
  siFlutter,
  siDart,
  siAndroid,
  siKotlin,
  siSwift,
  // Tools & Design
  siGit,
  siGithub,
  siGitlab,
  siFigma,
  siPostman,
  siLinux,
  siGraphql,
  type SimpleIcon,
} from "simple-icons";
import { Award, Braces, Gem, Sparkles, type LucideIcon } from "lucide-react";

export interface SkillIconMeta {
  key: string;
  label: string;
  slug: string;
  hex: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "Tools & Mobile";
}

export const POPULAR_SKILL_ICONS: SkillIconMeta[] = [
  // Frontend
  { key: "siReact", label: "React", slug: "react", hex: "61DAFB", category: "Frontend" },
  { key: "siNextdotjs", label: "Next.js", slug: "nextdotjs", hex: "000000", category: "Frontend" },
  { key: "siTypescript", label: "TypeScript", slug: "typescript", hex: "3178C6", category: "Frontend" },
  { key: "siJavascript", label: "JavaScript", slug: "javascript", hex: "F7DF1E", category: "Frontend" },
  { key: "siHtml5", label: "HTML5", slug: "html5", hex: "E34F26", category: "Frontend" },
  { key: "siCss", label: "CSS3", slug: "css", hex: "1572B6", category: "Frontend" },
  { key: "siTailwindcss", label: "Tailwind CSS", slug: "tailwindcss", hex: "06B6D4", category: "Frontend" },
  { key: "siVuedotjs", label: "Vue.js", slug: "vuedotjs", hex: "4FC08D", category: "Frontend" },
  { key: "siAngular", label: "Angular", slug: "angular", hex: "0F0F11", category: "Frontend" },
  { key: "siSvelte", label: "Svelte", slug: "svelte", hex: "FF3E00", category: "Frontend" },
  { key: "siSass", label: "Sass", slug: "sass", hex: "CC6699", category: "Frontend" },
  { key: "siBootstrap", label: "Bootstrap", slug: "bootstrap", hex: "7952B3", category: "Frontend" },
  { key: "siRedux", label: "Redux", slug: "redux", hex: "764ABC", category: "Frontend" },
  { key: "siVite", label: "Vite", slug: "vite", hex: "646CFF", category: "Frontend" },
  { key: "siWebpack", label: "Webpack", slug: "webpack", hex: "8DD6F9", category: "Frontend" },

  // Backend
  { key: "siNodedotjs", label: "Node.js", slug: "nodedotjs", hex: "5FA04E", category: "Backend" },
  { key: "siPython", label: "Python", slug: "python", hex: "3776AB", category: "Backend" },
  { key: "siExpress", label: "Express", slug: "express", hex: "000000", category: "Backend" },
  { key: "siNestjs", label: "NestJS", slug: "nestjs", hex: "E0234E", category: "Backend" },
  { key: "siDjango", label: "Django", slug: "django", hex: "092E20", category: "Backend" },
  { key: "siFastapi", label: "FastAPI", slug: "fastapi", hex: "009688", category: "Backend" },
  { key: "siFlask", label: "Flask", slug: "flask", hex: "000000", category: "Backend" },
  { key: "siPhp", label: "PHP", slug: "php", hex: "777BB4", category: "Backend" },
  { key: "siLaravel", label: "Laravel", slug: "laravel", hex: "FF2D20", category: "Backend" },
  { key: "siGo", label: "Go", slug: "go", hex: "00ADD8", category: "Backend" },
  { key: "siRust", label: "Rust", slug: "rust", hex: "000000", category: "Backend" },
  { key: "siC", label: "C", slug: "c", hex: "A8B9CC", category: "Backend" },
  { key: "siCplusplus", label: "C++", slug: "cplusplus", hex: "00599C", category: "Backend" },
  { key: "siDotnet", label: ".NET", slug: "dotnet", hex: "512BD4", category: "Backend" },

  // Database & Cloud
  { key: "siPostgresql", label: "PostgreSQL", slug: "postgresql", hex: "4169E1", category: "Database & Cloud" },
  { key: "siMysql", label: "MySQL", slug: "mysql", hex: "4479A1", category: "Database & Cloud" },
  { key: "siMongodb", label: "MongoDB", slug: "mongodb", hex: "47A248", category: "Database & Cloud" },
  { key: "siRedis", label: "Redis", slug: "redis", hex: "FF4438", category: "Database & Cloud" },
  { key: "siSqlite", label: "SQLite", slug: "sqlite", hex: "003B57", category: "Database & Cloud" },
  { key: "siSupabase", label: "Supabase", slug: "supabase", hex: "3FCF8E", category: "Database & Cloud" },
  { key: "siFirebase", label: "Firebase", slug: "firebase", hex: "DD2C00", category: "Database & Cloud" },
  { key: "siDocker", label: "Docker", slug: "docker", hex: "2496ED", category: "Database & Cloud" },
  { key: "siKubernetes", label: "Kubernetes", slug: "kubernetes", hex: "326CE5", category: "Database & Cloud" },
  { key: "siGooglecloud", label: "Google Cloud", slug: "googlecloud", hex: "4285F4", category: "Database & Cloud" },
  { key: "siVercel", label: "Vercel", slug: "vercel", hex: "000000", category: "Database & Cloud" },
  { key: "siNetlify", label: "Netlify", slug: "netlify", hex: "00C7B7", category: "Database & Cloud" },
  { key: "siCloudflare", label: "Cloudflare", slug: "cloudflare", hex: "F38020", category: "Database & Cloud" },

  // Tools & Mobile
  { key: "siGit", label: "Git", slug: "git", hex: "F05032", category: "Tools & Mobile" },
  { key: "siGithub", label: "GitHub", slug: "github", hex: "181717", category: "Tools & Mobile" },
  { key: "siGitlab", label: "GitLab", slug: "gitlab", hex: "FC6D26", category: "Tools & Mobile" },
  { key: "siFigma", label: "Figma", slug: "figma", hex: "F24E1E", category: "Tools & Mobile" },
  { key: "siPostman", label: "Postman", slug: "postman", hex: "FF6C37", category: "Tools & Mobile" },
  { key: "siLinux", label: "Linux", slug: "linux", hex: "FCC624", category: "Tools & Mobile" },
  { key: "siGraphql", label: "GraphQL", slug: "graphql", hex: "E10098", category: "Tools & Mobile" },
  { key: "siFlutter", label: "Flutter", slug: "flutter", hex: "02569B", category: "Tools & Mobile" },
  { key: "siDart", label: "Dart", slug: "dart", hex: "0175C2", category: "Tools & Mobile" },
  { key: "siAndroid", label: "Android", slug: "android", hex: "3DDC84", category: "Tools & Mobile" },
  { key: "siKotlin", label: "Kotlin", slug: "kotlin", hex: "7F52FF", category: "Tools & Mobile" },
  { key: "siSwift", label: "Swift", slug: "swift", hex: "F05138", category: "Tools & Mobile" },
];

export const simpleIconMap: Record<string, SimpleIcon> = {
  // Web & Frontend
  siHtml5,
  siCss,
  siJavascript,
  siTypescript,
  siReact,
  siNextdotjs,
  siVuedotjs,
  siAngular,
  siSvelte,
  siTailwindcss,
  siSass,
  siBootstrap,
  siRedux,
  siVite,
  siWebpack,
  // Backend & Languages
  siNodedotjs,
  siExpress,
  siNestjs,
  siPython,
  siDjango,
  siFlask,
  siFastapi,
  siPhp,
  siLaravel,
  siGo,
  siRust,
  siC,
  siCplusplus,
  siDotnet,
  // Databases & Cloud
  siPostgresql,
  siMysql,
  siMongodb,
  siRedis,
  siSqlite,
  siSupabase,
  siFirebase,
  siDocker,
  siKubernetes,
  siGooglecloud,
  siVercel,
  siNetlify,
  siCloudflare,
  // Mobile & Cross-Platform
  siFlutter,
  siDart,
  siAndroid,
  siKotlin,
  siSwift,
  // Tools & Design
  siGit,
  siGithub,
  siGitlab,
  siFigma,
  siPostman,
  siLinux,
  siGraphql,
};

// Build slug to SimpleIcon lookup map
const slugMap: Record<string, SimpleIcon> = {};
for (const icon of Object.values(simpleIconMap)) {
  if (icon && icon.slug) {
    slugMap[icon.slug.toLowerCase()] = icon;
  }
}

export const lucideIconMap: Record<string, LucideIcon> = {
  Award,
  Braces,
  Gem,
  Sparkles,
};

/**
 * Normalizes any icon key or slug and returns the matching SimpleIcon if available.
 */
export function getSimpleIcon(key: string): SimpleIcon | undefined {
  if (!key) return simpleIconMap.siReact;
  const clean = key.trim();

  // 1. Exact key match (e.g. "siReact" or "siNextdotjs")
  if (simpleIconMap[clean]) return simpleIconMap[clean];

  // 2. Try prefixing 'si' with capital letter (e.g. "react" -> "siReact")
  const withSi = "si" + clean.charAt(0).toUpperCase() + clean.slice(1);
  if (simpleIconMap[withSi]) return simpleIconMap[withSi];

  // 3. Try slug matching (e.g. "nextdotjs", "cplusplus", "tailwind-css")
  const normalized = clean.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (slugMap[normalized]) return slugMap[normalized];

  return undefined;
}

/**
 * Extracts a clean slug suitable for CDN URLs (https://cdn.simpleicons.org/{slug}).
 */
export function getSimpleIconSlug(key: string): string {
  if (!key) return "react";
  const icon = getSimpleIcon(key);
  if (icon?.slug) return icon.slug;

  return key
    .replace(/^si(?=[A-Z])/, "")
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/\./g, "dot")
    .replace(/&/g, "and")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]/g, "");
}

export function getLucideIcon(key: string): LucideIcon {
  return lucideIconMap[key] || Award;
}
