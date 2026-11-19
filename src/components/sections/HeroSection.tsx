import Image from "next/image";
import { ArrowUpRight, Gem } from "lucide-react";
import portrait from "@/assets/portfolio-portrait.png";
import { ResumeDialog } from "@/components/ResumeDialog";
import { HeroSection as HeroSectionType } from "@/types/portfolio";

interface HeroSectionProps {
    hero: HeroSectionType;
    resumeUrl?: string | null;
}

export function HeroSection({ hero, resumeUrl }: HeroSectionProps) {
    const headline = hero?.headline || "Curious mind.";
    const subheadline = hero?.subheadline || "Thoughtful code.";
    const description =
        hero?.description ||
        "Hi, I'm Abigail — a computer science student who loves turning big ideas into simple, human-centered digital experiences.";
    const badgeText = hero?.badgeText || "BUILDING WITH CURIOSITY";
    const noteText = hero?.noteText || "A little bit of logic,\na lot of heart.";

    return (
        <section className="hero-section section-wrap" id="home">
            <div className="hero-copy">
                <h1>
                    {headline}
                    <br />
                    <span>{subheadline}</span>
                </h1>
                <p className="hero-description whitespace-pre-line">
                    {description}
                </p>
                <div className="hero-actions">
                    <a className="button-primary" href="#projects">
                        Explore my work <ArrowUpRight size={17} />
                    </a>
                    <ResumeDialog resumeUrl={resumeUrl} />
                </div>
            </div>
            <div
                className="hero-visual"
                aria-label="Portrait of a computer science student"
            >
                <div className="portrait-frame">
                    <Image
                        src={hero?.imageUrl || portrait}
                        alt={hero?.imageAlt || "Abigail, a computer science student, smiling beside her laptop"}
                        width={1024}
                        height={1280}
                        priority
                    />
                </div>
                <div className="portrait-stamp">
                    <Gem size={16} />
                    <span className="whitespace-pre-line uppercase">
                        {badgeText}
                    </span>
                </div>
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <div className="hero-image-note whitespace-pre-line">
                    {noteText}
                </div>
            </div>
            <div className="hero-index">
                <span>01</span>
                <span className="index-rule" />
                <span>SCROLL TO EXPLORE</span>
            </div>
        </section>
    );
}
