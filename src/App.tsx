import { portfolioData } from "./data/portfolioData";
import { Hero as Header } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Certifications } from "./sections/Certifications";
import { Footer } from "./components/custom/Footer";

function App() {
  return (
    <div className="min-h-screen bg-background py-20 px-6 md:py-32">
      <div className="max-w-[750px] mx-auto space-y-24">
        <Header />
        <About />
        <EducationSection />
        <Skills />
        <Projects />
        <Certifications />
        <Footer />
      </div>
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

export default App;
