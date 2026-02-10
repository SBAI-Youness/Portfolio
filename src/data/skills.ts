import type { SkillGroup } from "../types";

export const skills: SkillGroup = {
    languages: ["C", "C++", "PHP", "Java", "JavaScript", "TypeScript", "Python"],
    web: ["HTML", "CSS", "React", "Tailwind CSS", "Node.js", "Express.js", "Laravel"],
    databases: ["SQL", "MySQL", "MongoDB", "SQL Server"],
    networking: [
        "TCP/IP", "UDP", "DNS", "DHCP", "HTTP/S", "SMTP", "FTP", "VPN", "VLANs",
        "Subnetting", "Routing", "Switching", "Firewall configuration", "Packet analysis (Wireshark)"
    ],
    offensiveSecurity: ["SQL Injection", "XSS", "CSRF", "Privilege Escalation", "Metasploit", "Nmap", "Burp Suite", "SQLmap", "Hydra"],
    defensiveSecurity: ["Log Collection & Analysis", "Active Directory", "SIEM (ELK Stack, Splunk, Wazuh)"],
    operatingSystems: ["Windows", "Linux"],
    design: ["Merise", "UML"],
    virtualization: ["VirtualBox", "VMware", "QEMU"],
    vcs: ["Git", "GitHub"],
    gameDev: ["SDL", "Raylib"]
};
