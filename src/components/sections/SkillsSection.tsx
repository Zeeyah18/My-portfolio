import { getSimpleIconSlug } from "@/lib/icons";
import { Skill } from "@/types/portfolio";

interface SkillsSectionProps {
  skills: Skill[];
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="skills-band" id="skills">
      <div className="section-wrap content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MY TOOLKIT</p>
            <h2>
              Tools of the trade<span>.</span>
            </h2>
          </div>
          <p className="section-aside">
            A growing collection of things I<br />
            love learning and building with.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => {
            const slug = getSimpleIconSlug(skill.iconKey);

            return (
              <div className="skill-item" key={skill.id || skill.name}>
                <span className="skill-symbol" aria-hidden="true">
                  <img
                    src={`https://cdn.simpleicons.org/${slug}`}
                    alt=""
                    width={28}
                    height={28}
                  />
                </span>
                <span className="skill-name">{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

