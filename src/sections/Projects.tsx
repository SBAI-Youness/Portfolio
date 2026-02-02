import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project }: { project: any }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="group relative flex flex-col bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 cursor-pointer"
        >
            <div className="relative aspect-video overflow-hidden border-b border-white/5 bg-white/[0.01] flex items-center justify-center p-8">
                <img
                    src={project.image}
                    alt={project.title}
                    className="max-w-full max-h-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="flex-1 p-6 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">{project.title}</h3>
                        <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            {project.links.github && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all border border-white/5" aria-label="GitHub Repository">
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {project.links.live && (
                                <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 rounded-full text-muted-foreground hover:text-white hover:bg-white/10 transition-all border border-white/5" aria-label="Live Demo">
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className={`text-sm text-muted-foreground leading-relaxed font-normal transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}>
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech: string) => (
                        <span key={tech} className="text-[10px] font-bold px-2.5 py-1 bg-white/[0.03] rounded-md text-muted-foreground border border-white/5 group-hover:border-white/10 transition-colors uppercase tracking-wider">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="space-y-12">
            <div className="section-title">
                <span>Projects</span>
                <div className="section-divider"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolioData.projects.map((project: any) => (
                    <ProjectCard key={project.title} project={project} />
                ))}
            </div>
        </section>
    );
};
