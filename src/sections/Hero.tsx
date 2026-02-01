import { portfolioData } from "@/data/portfolioData";
import { Github, Linkedin } from "lucide-react";

export const Hero = () => {
    const { name, title, roles, github, linkedin, email, phone, profilePicture, resume } = portfolioData.author;

    return (
        <header className="flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="space-y-6 flex-1 w-full text-center md:text-left">
                <div className="space-y-2">
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-2">
                        {name}
                    </h1>
                    <p className="text-xl text-muted-foreground font-medium">{title}</p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {roles.map((role: string, index: number) => (
                        <span key={role} className="flex items-center">
                            {role}
                            {index < roles.length - 1 && <span className="ml-6 w-1 h-1 rounded-full bg-border"></span>}
                        </span>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 pt-4 justify-center md:justify-start">
                    <div className="flex items-center gap-6">
                        <a href={`mailto:${email}`} className="text-sm font-medium hover:text-white transition-colors text-muted-foreground">Email</a>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-sm font-medium hover:text-white transition-colors text-muted-foreground">Mobile</a>
                        <a href={`https://github.com/${github}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-muted-foreground">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href={`https://linkedin.com/in/${linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-muted-foreground">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>

                    {resume && (
                        <a href={resume} target="_blank" rel="noopener noreferrer"
                            className="px-6 py-2 border border-white text-white font-medium text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            Resume
                        </a>
                    )}
                </div>
            </div>

            {profilePicture && (
                <div className="shrink-0">
                    <img
                        src={profilePicture}
                        alt={name}
                        className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-border object-cover transition-all duration-500"
                    />
                </div>
            )}
        </header>
    );
};
