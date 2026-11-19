export interface HeroSection {
  id: number;
  headline?: string;
  subheadline?: string;
  description?: string;
  badgeText?: string;
  noteText?: string;
  imageUrl: string;
  imageAlt?: string;
  updatedAt?: string;
}

export interface AboutSection {
  id: number;
  firstDescription: string;
  secondDescription: string;
  imageUrl: string;
  imageAlt?: string;
  updatedAt?: string;
}

export interface Skill {
  id: number;
  name: string;
  iconKey: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Certificate {
  id: number;
  title: string;
  aboutCertificate: string;
  year: string;
  imageUrl?: string;
  iconName: string;
  displayOrder: number;
  isActive: boolean;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export interface ResumeMeta {
  filename: string;
  updatedAt: string;
  url: string;
  cloudinaryUrl?: string;
}

export interface SiteSettings {
  id: number;
  siteTitle: string;
  ownerName: string;
  ownerTitle: string;
  contactEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  introEyebrow: string;
  introQuote: string;
  footerCopyright: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  createdAt?: string;
}

export interface PortfolioData {
  hero: HeroSection;
  about: AboutSection;
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  experiences: Experience[];
  settings: SiteSettings;
  resume: ResumeMeta | null;
}
