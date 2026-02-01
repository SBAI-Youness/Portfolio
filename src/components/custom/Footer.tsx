import { portfolioData } from "@/data/portfolioData";

export const Footer = () => {
    return (
        <footer className="pt-24 pb-12 border-t border-border">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    © {new Date().getFullYear()} {portfolioData.author.name}
                </p>
                <div className="flex gap-8 text-xs font-medium text-muted-foreground uppercase tracking-widest">
                    <a href={`https://github.com/${portfolioData.author.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                    <a href={`https://linkedin.com/in/${portfolioData.author.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};
