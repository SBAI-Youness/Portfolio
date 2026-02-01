import { portfolioData } from "@/data/portfolioData";

export const About = () => {
    return (
        <section id="about" className="space-y-6">
            <div className="section-title">
                <span>About</span>
                <div className="section-divider"></div>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal max-w-3xl">
                {portfolioData.author.summary}
            </p>
        </section>
    );
};
