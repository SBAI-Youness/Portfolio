import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import type { WriteupMeta as MetaType } from "@/lib/markdown";
import { WriteupMeta } from "./WriteupMeta";
import { TryHackMeIcon, HackTheBoxIcon } from "./PlatformLogos";

interface WriteupCardProps {
    meta: MetaType;
}

export const WriteupCard = ({ meta }: WriteupCardProps) => {
    return (
        <Link to={`/writeups/${meta.slug}`}>
            <Card className="hover:bg-muted/50 transition-colors border-muted bg-card">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-muted/50 flex items-center justify-center border border-muted-foreground/10 p-1">
                            {meta.icon ? (
                                <img src={meta.icon} alt={meta.title} className="h-full w-full object-contain rounded-md" />
                            ) : (
                                <div className="p-2 text-muted-foreground/50">
                                    {meta.platform === 'TryHackMe' ? (
                                        <TryHackMeIcon className="h-6 w-6" />
                                    ) : (
                                        <HackTheBoxIcon className="h-6 w-6" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <CardTitle className="text-xl font-bold text-white truncate">{meta.title}</CardTitle>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <WriteupMeta meta={meta} />
                    <p className="text-muted-foreground line-clamp-2">{meta.excerpt}</p>
                </CardContent>
            </Card>
        </Link>
    );
};
