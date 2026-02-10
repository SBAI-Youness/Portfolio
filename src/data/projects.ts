import type { Project } from "../types";

export const projects: Project[] = [
    {
        title: "KeeBox",
        stack: ["C++", "Qt", "SQLCipher"],
        description: "KeeBox is a secure, open-source password manager built with C++ and Qt. It uses SQLCipher (AES-256) to ensure your data is always encrypted at rest.",
        image: "/assets/projects/keebox.png",
        links: { github: "https://github.com/SBAI-Youness/KeeBox" }
    },
    {
        title: "ieee-website",
        stack: ["React", "TypeScript", "Tailwind CSS", "Shadcn/ui"],
        description: "Official website for the IEEE student branch at EMSI MARRAKESH — built with modern web technologies.",
        image: "/assets/projects/ieee-website.jpg",
        links: {
            github: "https://github.com/SBAI-Youness/ieee-website",
            live: "https://ieee-sb-emsi-marrakesh.vercel.app"
        }
    },
    {
        title: "Melody Mosaic",
        stack: ["MERN", "Socket.io", "Clerk", "Shadcn/ui", "Cloudinary"],
        description: "Full‑stack music platform with playback, playlists, real-time chat, and secure auth; modern UI and Cloudinary media storage.",
        image: "/assets/projects/melodymosaic.png",
        links: { github: "https://github.com/SBAI-Youness/MelodyMosaic" }
    },
    {
        title: "Stock Management System",
        stack: ["C", "CSV", "OpenSSL"],
        description: "Secure console CRUD with auth, search/sort, OpenSSL password hashing, brute-force prevention, and secure session management.",
        image: "/assets/projects/stock_management_system.png",
        links: { github: "https://github.com/SBAI-Youness/Stock_Management_System" }
    },
];
