import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";
import {
    Code2,
    ShieldCheck,
    Network,
    Database,
    Globe,
    Monitor,
    Palette,
    Box,
    GitBranch,
    Gamepad2,
    type LucideIcon
} from "lucide-react";
import type { SkillGroup } from "@/types";

interface CategoryConfig {
    label: string;
    icon: LucideIcon;
    color: string;
}

const categoryConfigs: Record<keyof SkillGroup, CategoryConfig> = {
    languages: {
        label: "Languages",
        icon: Code2,
        color: "text-blue-400"
    },
    web: {
        label: "Web Development",
        icon: Globe,
        color: "text-cyan-400"
    },
    databases: {
        label: "Databases",
        icon: Database,
        color: "text-amber-400"
    },
    networking: {
        label: "Networking",
        icon: Network,
        color: "text-emerald-400"
    },
    security: {
        label: "Cybersecurity",
        icon: ShieldCheck,
        color: "text-red-400"
    },
    operatingSystems: {
        label: "Operating Systems",
        icon: Monitor,
        color: "text-slate-400"
    },
    design: {
        label: "Design & Modeling",
        icon: Palette,
        color: "text-pink-400"
    },
    virtualization: {
        label: "Virtualization",
        icon: Box,
        color: "text-indigo-400"
    },
    vcs: {
        label: "Version Control",
        icon: GitBranch,
        color: "text-orange-400"
    },
    gameDev: {
        label: "Game Development",
        icon: Gamepad2,
        color: "text-purple-400"
    }
};

export const Skills = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        }
    };

    return (
        <section id="skills" className="space-y-12">
            <div className="section-title">
                <span>Skills</span>
                <div className="section-divider"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                {(Object.keys(portfolioData.skills) as Array<keyof SkillGroup>).map((key) => {
                    const items = portfolioData.skills[key];
                    const config = categoryConfigs[key];

                    if (!items || items.length === 0) return null;

                    return (
                        <motion.div
                            key={key}
                            variants={itemVariants}
                            className="group p-5 bg-white/[0.015] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-1.5 rounded-lg bg-white/5 ${config.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <config.icon className="w-4 h-4" />
                                </div>
                                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">
                                    {config.label}
                                </h3>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                                {items.map((item: string) => (
                                    <span
                                        key={item}
                                        className="text-[10px] font-medium px-2.5 py-1 bg-white/[0.02] text-muted-foreground border border-white/5 rounded hover:border-white/20 hover:text-white transition-all duration-200 cursor-default"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </section>
    );
};
