"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ProjectCaseStudy, ProjectCategory } from "@/app/components/projects/types";

type ProjectGridProps = {
  projects: ProjectCaseStudy[];
  activeCategory: ProjectCategory;
};

export default function ProjectGrid({ projects, activeCategory }: ProjectGridProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  return (
    <>
      <section id="projects-grid" className="bg-background-dark px-6 py-12 lg:px-20 lg:py-14">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {visibleProjects.map((project, index) => {
              return (
                <article
                  key={project.id}
                  className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-surface-border bg-card-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"
                    style={{
                      background:
                        "radial-gradient(circle at top right, var(--color-primary) 0%, transparent 50%)",
                    }}
                  />
                  <p className="inline-flex rounded-full border border-surface-border bg-surface-dark px-3 py-1 text-xs font-semibold text-primary">
                    {project.category}
                  </p>

                  <h3 className="mt-4 text-secondary text-2xl font-semibold leading-tight">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-surface-border bg-surface-dark px-3 py-1 text-xs text-secondary"
                      >
                        {`\u2714 ${highlight}`}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    View Case Study
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {isMounted &&
        selectedProject &&
        createPortal(
          <div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Case study details"
          >
            <div className="absolute inset-0 bg-background-dark/85 backdrop-blur-sm" />

            <div
              className="animate-fade-in-up relative z-10 max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-surface-border bg-card-dark p-6 md:p-8"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex rounded-full border border-surface-border bg-surface-dark px-3 py-1 text-xs font-semibold text-primary">
                    {selectedProject.category}
                  </p>
                  <h3 className="mt-3 text-secondary text-2xl font-semibold leading-tight md:text-3xl">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full border border-surface-border bg-surface-dark px-3 py-1.5 text-sm font-medium text-secondary"
                  aria-label="Close case study details"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4 text-sm leading-relaxed">
                <div>
                  <p className="text-secondary font-semibold">Overview</p>
                  <p className="text-muted mt-1">{selectedProject.overview}</p>
                </div>
                <div>
                  <p className="text-secondary font-semibold">Scope</p>
                  <p className="text-muted mt-1">{selectedProject.scope}</p>
                </div>
                <div>
                  <p className="text-secondary font-semibold">Approach</p>
                  <p className="text-muted mt-1">{selectedProject.approach}</p>
                </div>
                <div>
                  <p className="text-secondary font-semibold">Tools Used</p>
                  <p className="text-muted mt-1">{selectedProject.tools.join(", ")}</p>
                </div>
                <div>
                  <p className="text-secondary font-semibold">Results</p>
                  <p className="text-muted mt-1">{selectedProject.results}</p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
