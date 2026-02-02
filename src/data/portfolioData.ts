import type { PortfolioData } from "../types";

export const portfolioData: PortfolioData = {
    author: {
        name: "Youness SBAI",
        title: "Computer Engineering & Networks Student",
        location: "",
        email: "youness.sbai.work@gmail.com",
        phone: "+212 652-919299",
        github: "SBAI-Youness",
        linkedin: "y-sbai",
        summary:
            "Third-year Computer Engineering & Networks student at EMSI, specializing in cybersecurity and programming. Actively involved in CTFs and technical projects, pushing skills further and contributing to the tech community.",
        roles: [
            "CTF Player",
            "Open-source Contributor"
        ],
        profilePicture: "/assets/pictures/sbai.jpeg",
        resume: "/assets/resume/resume.pdf"
    },
    education: [
        {
            school: "École Marocaine des Sciences de l'Ingénieur (EMSI)",
            programs: [
                {
                    degree: "Engineering Cycle – Computer Engineering & Networks",
                    start: "2025",
                    end: "Present",
                },
                {
                    degree: "Preparatory Classes for Engineering Studies",
                    start: "2023",
                    end: "2025",
                },
            ]
        },
        {
            school: "Établissement EL KHALED 2",
            degree: "Baccalaureate in Physical Science",
            start: "2022",
            end: "2023",
        }
    ],
    skills: {
        languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "PHP", "Rust"],
        web: ["HTML", "CSS", "React", "Tailwind CSS", "Node.js", "Express.js", "Laravel"],
        databases: ["SQL", "MySQL", "MongoDB"],
        networking: [
            "TCP/IP", "UDP", "DNS", "DHCP", "HTTP/S", "SMTP", "FTP", "VPN", "VLANs",
            "Subnetting", "Routing", "Switching", "Firewall configuration", "Packet analysis (Wireshark)"
        ],
        security: ["Metasploit", "Nmap", "Burp Suite"],
        operatingSystems: ["Windows", "Linux"],
        design: ["Merise", "UML"],
        virtualization: ["VirtualBox", "VMware", "QEMU"],
        vcs: ["Git", "GitHub"],
        gameDev: ["SDL", "Raylib"]
    },
    projects: [
        {
            title: "KeeBox",
            stack: ["C++", "Qt", "SQLCipher"],
            description:
                "KeeBox is a secure, open-source password manager built with C++ and Qt. It uses SQLCipher (AES-256) to ensure your data is always encrypted at rest.",
            image: "/assets/projects/keebox.png",
            links: { github: "https://github.com/SBAI-Youness/KeeBox" }
        },
        {
            title: "ieee-website",
            stack: ["React", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
            description:
                "Official website for the IEEE student branch at EMSI MARRAKESH — built with modern web technologies.",
            image: "/assets/projects/ieee-website.jpg",
            links: {
                github: "https://github.com/SBAI-Youness/ieee-website",
                live: "https://ieee-sb-emsi-marrakesh.vercel.app"
            }
        },
        {
            title: "Melody Mosaic",
            stack: ["MERN", "Socket.io", "Clerk", "Shadcn/ui", "Cloudinary"],
            description:
                "Full‑stack music platform with playback, playlists, real-time chat, and secure auth; modern UI and Cloudinary media storage.",
            image: "/assets/projects/melodymosaic.png",
            links: { github: "https://github.com/SBAI-Youness/MelodyMosaic" }
        },
        {
            title: "Stock Management System",
            stack: ["C", "CSV", "OpenSSL"],
            description:
                "Secure console CRUD with auth, search/sort, OpenSSL password hashing, brute-force prevention, and secure session management.",
            image: "/assets/projects/stock_management_system.png",
            links: { github: "https://github.com/SBAI-Youness/Stock_Management_System" }
        },
    ],
    certifications: [
        {
            provider: "Google (Coursera)",
            name: "Google Cybersecurity Professional Certificate",
            date: "2025",
            image: "/assets/icons/certifications/google.png",
            url: "https://coursera.org/share/dabb879349a5499a0ef0806b2202fb41",
        },
        {
            provider: "University of Michigan (Coursera)",
            name: "C Programming for Everybody Specialization",
            date: "2024",
            image: "/assets/icons/certifications/university_of_michigan.png",
            url: "https://coursera.org/share/356771130900a0bdc595de61a4856a7b",
        },
        {
            provider: "EPFL (Coursera)",
            name: "Introduction à la programmation orientée objet (en C++)",
            date: "2024",
            image: "/assets/icons/certifications/epfl.png",
            url: "https://coursera.org/share/291322f2deffcb6740f55bbf2d896d2a",
        },
        {
            provider: "Johns Hopkins University (Coursera)",
            name: "HTML, CSS and JavaScript for Web Developers",
            date: "2024",
            image: "/assets/icons/certifications/johns_hopkins_university.png",
            url: "https://coursera.org/share/e8519426939304fb0cb984eee29c7fa8",
        },
        {
            provider: "Udemy",
            name: "CCNA Networking Essentials: A Comprehensive Cisco Course",
            date: "2023",
            image: "/assets/icons/certifications/meta_brains.png",
            url: "https://www.udemy.com/certificate/UC-82b13590-62f9-4c4c-a2b1-4b84cbd2302f/",
        }
    ]
};
