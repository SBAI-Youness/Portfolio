import type { SkillGroup } from "../types";

export const skills: SkillGroup = {
    languages: ["Python", "C++", "JavaScript", "TypeScript", "PHP", "Java"],
    databases: ["SQLite", "MySQL", "MongoDB", "SQL Server"],
    networking: [
        "TCP/IP", "DNS", "DHCP", "HTTP/S", "Switching", "Subnetting", "Routing", "VLANs", "VPNs"
    ],
    offensiveSecurity: ["Web Penetration Testing", "Post-Exploitation and Lateral Movement", "Privilege Escalation", "Reconnaissance"],
    defensiveSecurity: ["SIEM Tools (Wazuh, Splunk)", "Active Directory Basics"],
    securityTools: ["Nmap", "Gobuster", "Burp Suite", "Metasploit", "SQLMap", "Wireshark", "Hydra", "John the Ripper"],
    operatingSystems: ["Windows", "Linux"],
    virtualization: ["VMware", "QEMU"],
    vcs: ["Git", "GitHub"]
};
