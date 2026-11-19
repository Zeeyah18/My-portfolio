"use client";

import ProfileCard from "@/components/ProfileCard";
import { AboutSection as AboutSectionType } from "@/types/portfolio";

interface AboutSectionProps {
    about: AboutSectionType;
}

export function AboutSection({ about }: AboutSectionProps) {
    const avatarSrc = about?.imageUrl || "/assets/portfolio-portrait.png";

    const scrollToContact = () => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="section-wrap content-section about-section" id="about">
            <div className="section-heading">
                <p className="eyebrow">A LITTLE ABOUT ME</p>
               
            </div>
            <div className="about-grid">
                <div className="about-heading-col">
                    <h2>
                        Tech is my craft.
                        <br />
                        <span>People are my why.</span>
                    </h2>
                    <div className="about-photo-card">
                        <ProfileCard
                            name="Abigail Ola"
                            title="IT Professional"
                            handle="abigailola"
                            status="Available for work"
                            contactText="Contact"
                            avatarUrl={avatarSrc}
                            holo={0.8}
                            glare={0.5}
                            tiltStrength={12}
                            parallax={8}
                            radius={16}
                            enableTilt
                            intro
                            showUserInfo
                            enableMobileTilt={false}
                            theme="dark"
                            onContactClick={scrollToContact}
                        />
                    </div>
                </div>
                <div className="about-copy">
                    <p>{about.firstDescription}</p>
                    <p>{about.secondDescription}</p>
                    <div className="about-facts">
                        <div>
                            <span>CURRENTLY</span>
                            <strong>Information Technology Student</strong>
                        </div>
                        <div>
                            <span>ALWAYS</span>
                            <strong>Learning &amp; experimenting</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
