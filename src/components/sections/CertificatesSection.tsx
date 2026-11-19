import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { getLucideIcon } from "@/lib/icons";
import { Certificate } from "@/types/portfolio";

interface CertificatesSectionProps {
    certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
    return (
        <section className="section-wrap content-section certificates-section" id="certificates">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">MILESTONES &amp; MASTERY</p>
                    <h2>
                        Proof of progress<span>.</span>
                    </h2>
                </div>
                <span className="section-aside">Every badge, a new beginning.</span>
            </div>

            {/* 2-Column Responsive Card Grid */}
            <div className="certificate-cards-grid">
                {certificates.map((cert) => {
                    const Icon = getLucideIcon(cert.iconName);
                    const hasImage =
                        Boolean(cert.imageUrl) &&
                        !cert.imageUrl!.includes("portfolio-portrait") &&
                        !cert.imageUrl!.includes("abigail-portrait");

                    return (
                        <article
                            key={cert.id || cert.title}
                            className="certificate-card group"
                        >
                            <div>
                                {/* Certificate Image Banner */}
                                {hasImage ? (
                                    <div className="certificate-card-image-wrap">
                                        <Image
                                            src={cert.imageUrl!}
                                            alt={cert.title}
                                            fill
                                            className="certificate-card-image"
                                        />
                                        <a
                                            href={cert.imageUrl!}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="certificate-card-image-overlay"
                                            aria-label={`View ${cert.title} credential`}
                                        >
                                            <span>View Credential</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                ) : (
                                    <div className="certificate-card-placeholder">
                                        <div className="certificate-card-placeholder-icon">
                                            <Icon size={28} />
                                        </div>
                                        <span>Verified Milestone</span>
                                    </div>
                                )}

                                {/* Card Header & Year Badge */}
                                <div className="certificate-card-meta">
                                    <span className="certificate-year-badge">
                                        <span className="status-dot" />
                                        {cert.year}
                                    </span>
                                    <div className="certificate-type-tag">
                                        <Icon size={14} />
                                        <span>{cert.iconName}</span>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="certificate-card-title">
                                    {cert.title}
                                </h3>

                                {/* Description */}
                                <p className="certificate-card-desc">
                                    {cert.aboutCertificate}
                                </p>
                            </div>

                            {/* Card Footer */}
                            <div className="certificate-card-footer">
                                <span className="certificate-verified-label">
                                    Verified Credential
                                </span>
                                {hasImage ? (
                                    <a
                                        href={cert.imageUrl!}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="certificate-card-link"
                                    >
                                        <span>View Credential</span>
                                        <ArrowUpRight size={15} />
                                    </a>
                                ) : (
                                    <span className="certificate-completed-badge">
                                        Earned
                                    </span>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>

            <p className="certificate-note mt-8">
                Verified milestones &mdash; earned through coursework, practical builds, and continuous learning.
            </p>
        </section>
    );
}
