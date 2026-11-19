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
      <div className="certificate-grid">
        {certificates.map((cert) => {
          const Icon = getLucideIcon(cert.iconName);
          return (
            <article className="certificate-item" key={cert.id || cert.title}>
              <span className="certificate-icon">
                <Icon size={22} />
              </span>
              <div>
                <h3>{cert.title}</h3>
                <p>{cert.aboutCertificate}</p>
              </div>
              <span className="certificate-year">{cert.year}</span>
            </article>
          );
        })}
        <p className="certificate-note">
          Sample certificates — replace with your own credentials and earned dates.
        </p>
      </div>
    </section>
  );
}

