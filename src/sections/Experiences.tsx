import { portfolioData } from "@/data/portfolioData";
import { Briefcase, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

// Helper to parse start dates into numeric timestamps for comparison
const parseDateString = (dateStr: string): number => {
    const cleaned = dateStr.trim();

    // Check if it's just a 4-digit year (e.g. "2026")
    if (/^\d{4}$/.test(cleaned)) {
        return new Date(parseInt(cleaned), 0, 1).getTime();
    }

    // Try standard date parsing
    const parsed = Date.parse(cleaned);
    if (!isNaN(parsed)) {
        return parsed;
    }

    // Custom fallback for "Month Year" format
    const months: { [key: string]: number } = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7,
        sep: 8, september: 8, sept: 8,
        oct: 9, october: 9,
        nov: 10, november: 10,
        dec: 11, december: 11
    };

    const parts = cleaned.toLowerCase().split(/[\s,.-]+/);
    let year = 1970;
    let month = 0;

    for (const part of parts) {
        if (/^\d{4}$/.test(part)) {
            year = parseInt(part);
        } else if (months[part] !== undefined) {
            month = months[part];
        }
    }

    return new Date(year, month, 1).getTime();
};

export const Experiences = () => {
    const { experiences } = portfolioData;

    if (!experiences || experiences.length === 0) return null;

    // Dynamically sort experiences: most recent start date first
    const sortedExperiences = [...experiences].sort((a, b) => {
        return parseDateString(b.start) - parseDateString(a.start);
    });

    return (
        <section id="experience" className="space-y-8">
            <div className="section-title">
                <span>Experience</span>
                <div className="section-divider"></div>
            </div>

            <div className="space-y-6">
                {sortedExperiences.map((exp, index) => {
                    return (
                        <motion.div
                            key={exp.company + index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex gap-4 items-start p-4 hover:bg-white/[0.02] rounded-lg transition-all duration-300 border border-transparent hover:border-white/5"
                        >
                            {/* Company Logo */}
                            <div className="w-12 h-12 shrink-0 bg-white/[0.03] border border-white/10 rounded-md flex items-center justify-center p-1.5 overflow-hidden">
                                {exp.logo ? (
                                    <img
                                        src={exp.logo}
                                        alt={`${exp.company} logo`}
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                            const fallback = e.currentTarget.parentElement?.querySelector(".fallback-icon");
                                            if (fallback) fallback.classList.remove("hidden");
                                        }}
                                    />
                                ) : null}
                                <div className={`fallback-icon flex items-center justify-center text-muted-foreground ${exp.logo ? "hidden" : ""}`}>
                                    <Briefcase className="w-6 h-6 stroke-[1.5]" />
                                </div>
                            </div>

                            {/* Details (LinkedIn Style) */}
                            <div className="flex-1 min-w-0 space-y-0.5">
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight">
                                        {exp.role}
                                    </h3>
                                    {exp.url && (
                                        <a
                                            href={exp.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-white transition-colors"
                                            aria-label={`Visit ${exp.company} website`}
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>

                                <p className="text-sm font-semibold text-white/80">
                                    {exp.company}
                                </p>

                                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground font-normal">
                                    <span>{exp.start} - {exp.end}</span>
                                </div>

                                <p className="text-xs md:text-sm text-muted-foreground font-normal">
                                    {exp.location}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};
