import type { SkillGroup } from "../types";

export const skills: SkillGroup = {
    languages: ["C", "C++", "Python", "JavaScript", "TypeScript", "PHP", "Java"],
    web: ["HTML", "CSS", "React", "Tailwind CSS", "Node.js", "Express.js", "Laravel"],
    databases: ["SQLite", "MySQL", "MongoDB", "SQL Server"],
    networking: [
        "TCP/IP", "UDP", "DNS", "DHCP", "HTTP/S", "SMTP", "FTP", "VPN", "VLANs",
        "Subnetting", "Routing", "Switching", "Firewall configuration", "Packet analysis (Wireshark)"
    ],
    offensiveSecurity: ["Nmap", "Burp Suite", "Gobuster", "Netcat", "Hydra", "Metasploit", "SQLmap", "LinPEAS", "GTFOBins", "John the Ripper"],
    defensiveSecurity: ["Log Collection & Analysis", "Active Directory", "SIEM (ELK Stack, Splunk, Wazuh)"],
    operatingSystems: ["Windows", "Linux"],
    design: ["Merise", "UML"],
    virtualization: ["VirtualBox", "VMware", "QEMU"],
    vcs: ["Git", "GitHub"],
    gameDev: ["SDL", "Raylib"]
};
