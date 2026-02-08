import { Hero as Header } from "../sections/Hero";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Certifications } from "../sections/Certifications";
import { Footer } from "../components/custom/Footer";
import { portfolioData } from "../data/portfolioData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function HomePage() {
    return (
        <div className="max-w-[750px] mx-auto space-y-24">
            <Header />

            {/* Dynamic Link to Write-ups */}
            <section className="flex justify-center">
                <Link to="/writeups">
                    <Button variant="outline" className="gap-2 group">
                        <BookOpen className="h-4 w-4 text-blue-400 group-hover:scale-110 transition-transform" />
                        Visit my Cyber Security Write-ups
                    </Button>
                </Link>
            </section>

            <About />
            <EducationSection />
            <Skills />
            <Projects />
            <Certifications />
            <Footer />
        </div>
    );
}

const EducationSection = () => (
    <section id="education" className="space-y-12">
        <div className="section-title">
            <span>Education</span>
            <div className="section-divider"></div>
        </div>

        <div className="space-y-16">
            {portfolioData.education.map((item: any, index: number) => (
                <div key={index} className="space-y-4">
                    <h3 className="text-xl font-bold text-white">{item.school}</h3>

                    <div className="space-y-8">
                        {item.programs ? (
                            item.programs.map((prog: any, pIdx: number) => (
                                <div key={pIdx} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                                    <h4 className="text-lg text-muted-foreground font-medium">{prog.degree}</h4>
                                    <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-widest">
                                        {prog.start} — {prog.end}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
                                <h4 className="text-lg text-muted-foreground font-medium">{item.degree}</h4>
                                <span className="text-xs font-medium text-muted-foreground shrink-0 uppercase tracking-widest">
                                    {item.start} — {item.end}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </section>
);
