export interface EducationProgram {
    degree: string;
    start: string;
    end: string;
}

export interface Education {
    school: string;
    logo?: string;
    url?: string;
    programs?: EducationProgram[];
    degree?: string; // For older entries with a single degree
    start?: string;
    end?: string;
}

export interface SkillGroup {
    languages: string[];
    databases: string[];
    networking: string[];
    offensiveSecurity: string[];
    defensiveSecurity: string[];
    operatingSystems: string[];
    securityTools: string[];
    virtualization: string[];
    vcs: string[];
}

export interface Project {
    title: string;
    stack: string[];
    description: string;
    image: string;
    links: {
        github?: string;
        live?: string;
    };
}

export interface Certification {
    provider: string;
    name: string;
    date: string;
    image: string;
    url: string;
}

export interface Experience {
    company: string;
    role: string;
    start: string;
    end: string;
    location: string;
    logo?: string;
    url?: string;
    description?: string[];
}

export interface PortfolioData {
    author: {
        name: string;
        title: string;
        email: string;
        phone: string;
        github: string;
        linkedin: string;
        summary: string;
        roles: string[];
        profilePicture?: string;
        resume?: string;
    };
    experiences: Experience[];
    education: Education[];
    skills: SkillGroup;
    projects: Project[];
    certifications: Certification[];
}
