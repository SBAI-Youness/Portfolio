import { portfolioData } from "@/data/portfolioData";
import { motion } from "framer-motion";

export const Certifications = () => {
    // Duplicate the certifications to create a seamless infinite loop
    const doubledCerts = [...portfolioData.certifications, ...portfolioData.certifications];

    return (
        <section id="certifications" className="space-y-12 overflow-hidden py-10">
            <div className="section-title px-6 max-w-[750px] mx-auto">
                <span>Certifications</span>
                <div className="section-divider"></div>
            </div>

            <div className="relative flex overflow-x-hidden">
                <motion.div
                    className="flex whitespace-nowrap gap-8"
                    animate={{ x: "-50%" }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 40,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {/* Simplified Marquee using Framer Motion's infinite repeat */}
                    <MarqueeContent items={doubledCerts} />
                </motion.div>
            </div>
        </section>
    );
};

const MarqueeContent = ({ items }: { items: any[] }) => (
    <div className="flex gap-8 px-4">
        {items.map((cert, idx) => (
            <a
                key={idx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 p-6 border border-border bg-black hover:border-white transition-all group shrink-0 w-[400px] h-[120px] rounded-sm"
            >
                <div className="w-16 h-16 shrink-0 bg-white p-2 rounded-sm flex items-center justify-center overflow-hidden">
                    <img
                        src={cert.image}
                        alt={cert.provider}
                        className="w-full h-full object-contain transition-opacity"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white truncate uppercase tracking-tight">{cert.name}</h3>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest mt-1">{cert.provider} — {cert.date}</p>
                </div>
            </a>
        ))}
    </div>
);
