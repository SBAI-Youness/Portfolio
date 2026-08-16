import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { BlogEntry } from "@/lib/markdown";
import { BlogMeta } from "./BlogMeta";

interface BlogCardProps {
    entry: BlogEntry;
}

export const BlogCard = ({ entry }: BlogCardProps) => {
    const { meta, content } = entry;

    return (
        <Link to={`/blog/${meta.slug}`} className="group block">
            <Card className="hover:bg-muted/50 transition-all duration-300 border-muted bg-card overflow-hidden group-hover:border-muted-foreground/20">
                {/* Cover image */}
                {meta.cover && (
                    <div className="h-44 w-full overflow-hidden bg-muted/30">
                        <img
                            src={meta.cover}
                            alt={meta.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors leading-snug line-clamp-2">
                        {meta.title}
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <BlogMeta meta={meta} content={content} showTags={false} />
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {meta.excerpt}
                    </p>

                    {/* Tags */}
                    {meta.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {meta.tags.map(tag => (
                                <span
                                    key={tag}
                                    className="text-xs bg-muted/40 border border-muted/60 px-2 py-0.5 rounded-full text-muted-foreground"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400 pt-1 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0 duration-300">
                        Read post
                        <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
};
