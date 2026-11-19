import { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className="experience-band" id="experience">
      <div className="section-wrap content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE JOURNEY SO FAR</p>
            <h2>
              Learning by doing<span>.</span>
            </h2>
          </div>
          <p className="section-aside">
            Every new chapter starts
            <br />
            with a first step.
          </p>
        </div>
        <div className="timeline">
          {experiences.map((exp) => (
            <div className="timeline-entry" key={exp.id || `${exp.title}-${exp.period}`}>
              <span className="timeline-date">{exp.period}</span>
              <span className="timeline-dot" />
              <div>
                <h3>{exp.title}</h3>
                <p className="timeline-place">{exp.organization}</p>
                <p className="timeline-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

