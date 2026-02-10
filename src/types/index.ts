export interface EducationProgram {
    degree: string;
    start: string;
    end: string;
}

export interface Education {
    school: string;
    programs?: EducationProgram[];
    degree?: string; // For older entries with a single degree
    start?: string;
    end?: string;
}

export interface SkillGroup {
    languages: string[];
    web: string[];
    databases: string[];
    networking: string[];
    security: string[];
    operatingSystems: string[];
    design: string[];
    virtualization: string[];
    vcs: string[];
    gameDev: string[];
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
    education: Education[];
    skills: SkillGroup;
    projects: Project[];
    certifications: Certification[];
}
