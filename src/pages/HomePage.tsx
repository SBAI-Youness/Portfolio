import { Hero as Header } from "../sections/Hero";
import { About } from "../sections/About";
import { Experiences } from "../sections/Experiences";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Certifications } from "../sections/Certifications";
import { Footer } from "../components/custom/Footer";
import { portfolioData } from "../data/portfolioData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, ExternalLink, NotebookPen } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
    return (
        <div className="max-w-[750px] mx-auto space-y-24">
            <Header />

            {/* Links to Blog & Write-ups */}
            <section className="flex flex-wrap justify-center gap-3">
                <Link to="/blog">
                    <Button variant="outline" className="gap-2 group">
                        <NotebookPen className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                        Visit my Blog
                    </Button>
                </Link>
                <Link to="/writeups">
                    <Button variant="outline" className="gap-2 group">
                        <BookOpen className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        Visit my Cyber Security Write-ups
                    </Button>
                </Link>
            </section>

            <About />
            <Experiences />
            <EducationSection />
            <Skills />
            <Projects />
            <Certifications />
            <Footer />
        </div>
    );
}

const EducationSection = () => (
    <section id="education" className="space-y-8">
        <div className="section-title">
            <span>Education</span>
            <div className="section-divider"></div>
        </div>

        <div className="space-y-6">
            {portfolioData.education.map((item: any, index: number) => (
                <motion.div
                    key={item.school + index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex gap-4 items-start p-4 hover:bg-white/[0.02] rounded-lg transition-all duration-300 border border-transparent hover:border-white/5"
                >
                    {/* School Logo */}
                    <div className="w-14 h-14 shrink-0 bg-white/[0.03] border border-white/10 rounded-md flex items-center justify-center p-1 overflow-hidden">
                        {item.logo ? (
                            <img
                                src={item.logo}
                                alt={`${item.school} logo`}
                                className="w-full h-full object-contain"
                                onError={(e: any) => {
                                    e.currentTarget.style.display = "none";
                                    const fallback = e.currentTarget.parentElement?.querySelector(".edu-fallback-icon");
                                    if (fallback) fallback.classList.remove("hidden");
                                }}
                            />
                        ) : null}
                        <div className={`edu-fallback-icon flex items-center justify-center text-muted-foreground ${item.logo ? "hidden" : ""}`}>
                            <GraduationCap className="w-6 h-6 stroke-[1.5]" />
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center gap-1.5">
                            <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                                {item.school}
                            </h3>
                            {item.url && (
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-white transition-colors"
                                    aria-label={`Visit ${item.school} website`}
                                >
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                        </div>

                        {/* Programs or single degree */}
                        <div className="mt-2 space-y-2">
                            {item.programs ? (
                                item.programs.map((prog: any, pIdx: number) => (
                                    <div key={pIdx} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                        <p className="text-sm font-semibold text-white/80">{prog.degree}</p>
                                        <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-widest">
                                            {prog.start} — {prog.end}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                                    <p className="text-sm font-semibold text-white/80">{item.degree}</p>
                                    <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-widest">
                                        {item.start} — {item.end}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);


