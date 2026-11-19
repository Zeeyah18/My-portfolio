import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
    projects: Project[];
}

const PROJECT_BG_CLASSES = ["project-sage", "project-lime", "project-mint"];
const PROJECT_GLYPHS = ["✦", "◈", "✺"];

export function ProjectsSection({ projects }: ProjectsSectionProps) {
    return (
        <section className="section-wrap content-section projects-section" id="projects">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">SELECTED PROJECTS</p>
                    <h2>
                        Made with curiosity<span>.</span>
                    </h2>
                </div>
                <span className="section-aside">A few things from the workbench.</span>
            </div>
            <div className="projects-list">
                {projects.map((project, idx) => {
                    const hasCustomImage =
                        Boolean(project.imageUrl) &&
                        !project.imageUrl!.includes("portfolio-portrait") &&
                        !project.imageUrl!.includes("abigail-portrait");
                    const bgClass = PROJECT_BG_CLASSES[idx % PROJECT_BG_CLASSES.length];
                    const glyph = PROJECT_GLYPHS[idx % PROJECT_GLYPHS.length];
                    const targetLink = project.liveUrl || project.githubUrl || "#contact";
                    const isExternal = targetLink.startsWith("http");

                    return (
                        <article className="project-row" key={project.id || project.name}>
                            <div className={`project-art ${bgClass}`}>
                                {hasCustomImage ? (
                                    <Image
                                        src={project.imageUrl as string}
                                        alt={project.name}
                                        width={260}
                                        height={180}
                                        className="project-art-img w-full h-full object-cover"
                                    />
                                ) : (
                                    <>
                                        <span className="project-art-glyph">{glyph}</span>
                                        <span className="project-art-caption">{project.name.split(" ")[0]}</span>
                                        <span className="project-art-index">0{idx + 1}</span>
                                    </>
                                )}
                            </div>
                            <div className="project-info">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                {(project.liveUrl || project.githubUrl) && (
                                    <div className="mt-3 flex flex-wrap items-center gap-2.5">
                                        {project.liveUrl && (
                                            <a
                                                href={project.liveUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2.5 py-1 text-xs rounded bg-[var(--forest)] text-[var(--primary-foreground)] hover:bg-[var(--sage)] inline-flex items-center gap-1 transition-colors font-medium"
                                            >
                                                <span>Live Demo</span>
                                                <ArrowUpRight size={12} />
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2.5 py-1 text-xs rounded border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--paper-deep)] inline-flex items-center gap-1 transition-colors font-medium"
                                            >
                                                <Github size={12} />
                                                <span>Code</span>
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                            <a
                                href={targetLink}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="project-arrow"
                                aria-label={`View ${project.name}`}
                            >
                                <ArrowUpRight size={21} />
                            </a>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
