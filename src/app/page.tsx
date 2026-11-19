import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroBand } from "@/components/sections/IntroBand";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { ContactFooter } from "@/components/sections/ContactFooter";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getPortfolioData } from "@/lib/portfolio-service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="portfolio-page">
      <ScrollReveal />
      <Header />
      <HeroSection hero={data.hero} resumeUrl={data.resume?.url} />
      <IntroBand
        eyebrow={data.settings?.introEyebrow}
        quote={data.settings?.introQuote}
      />
      <AboutSection about={data.about} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection experiences={data.experiences} />
      <CertificatesSection certificates={data.certificates} />
      <ContactFooter settings={data.settings} />
    </main>
  );
}
