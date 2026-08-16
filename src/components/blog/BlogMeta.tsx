import { Calendar, Clock, Tag } from "lucide-react";
import type { BlogMeta as BlogMetaType } from "@/lib/markdown";
import { estimateReadingTime } from "@/lib/markdown";

const CATEGORY_STYLES: Record<string, { label: string; className: string }> = {
    project:   { label: "Project",   className: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    discovery: { label: "Discovery", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    tutorial:  { label: "Tutorial",  className: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    opinion:   { label: "Opinion",   className: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
};

interface BlogMetaProps {
    meta: BlogMetaType;
    content?: string;
    showTags?: boolean;
}

export const BlogMeta = ({ meta, content, showTags = true }: BlogMetaProps) => {
    const style = CATEGORY_STYLES[meta.category] ?? {
        label: meta.category,
        className: "bg-muted/50 text-muted-foreground border-muted",
    };

    const readTime = content ? estimateReadingTime(content) : null;

    return (
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            {/* Category badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style.className}`}>
                {style.label}
            </span>

            {/* Date */}
            <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(meta.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
            </span>

            {/* Reading time */}
            {readTime !== null && (
                <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {readTime} min read
                </span>
            )}

            {/* Tags */}
            {showTags && meta.tags?.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                    <Tag className="h-3.5 w-3.5 shrink-0" />
                    {meta.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-xs bg-muted/40 border border-muted/60 px-2 py-0.5 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
