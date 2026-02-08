import { Badge } from "@/components/ui/badge";
import { CalendarDays, Tag } from "lucide-react";
import type { WriteupMeta as MetaType } from "@/lib/markdown";

interface WriteupMetaProps {
    meta: MetaType;
}

export const WriteupMeta = ({ meta }: WriteupMetaProps) => {
    return (
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-1">
                <Badge variant={meta.platform === "TryHackMe" ? "secondary" : "outline"} className="bg-opacity-10">
                    {meta.platform}
                </Badge>
            </div>
            <div className="flex items-center gap-1">
                <Badge
                    variant="outline"
                    className={`${meta.difficulty === "Easy" ? "text-green-500" :
                        meta.difficulty === "Medium" ? "text-yellow-500" : "text-red-500"
                        }`}
                >
                    {meta.difficulty}
                </Badge>
            </div>
            <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(meta.date).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <div className="flex gap-1">
                    {meta.tags.map(tag => (
                        <span key={tag} className="bg-muted px-2 py-0.5 rounded-md text-xs">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
