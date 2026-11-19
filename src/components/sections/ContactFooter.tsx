import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { SiteSettings } from "@/types/portfolio";

interface ContactFooterProps {
    settings?: SiteSettings;
}

export function ContactFooter({ settings }: ContactFooterProps) {
    const email = settings?.contactEmail || "hello@example.com";
    const githubUrl = settings?.githubUrl || "https://github.com";
    const linkedinUrl = settings?.linkedinUrl || "https://linkedin.com";
    const copyright = settings?.footerCopyright || "© 2025 Abigail Ola";

    return (
        <footer className="contact-footer" id="contact">
            <div className="section-wrap footer-inner">
                <div className="contact-grid">
                    <div className="contact-copy">
                        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
                        <h2>
                            Good things start
                            <br />
                            <em>with a hello.</em>
                        </h2>
                        <p className="contact-subtext">
                            Whether you have an internship opportunity, a freelance project,
                            open-source idea, or just want to connect — feel free to drop a
                            message or reach out directly!
                        </p>
                        <a className="footer-email" href={`mailto:${email}`}>
                            {email} <ArrowUpRight size={19} />
                        </a>
                    </div>

                    <ContactForm />
                </div>

                <div className="footer-bottom">
                    <span>{copyright} · </span>
                    <div className="social-links">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={18} />
                            </a>
                        )}
                        {linkedinUrl && (
                            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={18} />
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} aria-label="Email">
                                <Mail size={18} />
                            </a>
                        )}
                    </div>
                    <a href="#home" className="back-top">
                        BACK TO TOP ↑
                    </a>
                </div>
            </div>
        </footer>
    );
}
