import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { WriteupEntry } from "@/lib/markdown";
import { loadWriteupBySlug } from "@/lib/markdown";
import { WriteupMeta } from "@/components/writeups/WriteupMeta";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { TryHackMeIcon, HackTheBoxIcon } from "@/components/writeups/PlatformLogos";

export default function WriteupDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [entry, setEntry] = useState<WriteupEntry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            loadWriteupBySlug(slug).then(data => {
                setEntry(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) return <div className="animate-pulse space-y-8">
        <div className="h-8 w-1/2 bg-muted rounded"></div>
        <div className="h-4 w-1/4 bg-muted rounded"></div>
        <div className="space-y-4 pt-8">
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-full bg-muted rounded"></div>
            <div className="h-4 w-3/4 bg-muted rounded"></div>
        </div>
    </div>;

    if (!entry) return (
        <div className="text-center py-20 space-y-4">
            <h1 className="text-2xl font-bold text-white">Write-up not found</h1>
            <Link to="/writeups">
                <Button>Back to Listings</Button>
            </Link>
        </div>
    );
    return (
        <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-6">
                <Link to="/writeups">
                    <Button variant="ghost" size="sm" className="gap-2 -ml-4 text-muted-foreground hover:bg-muted/50 hover:text-blue-400 transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Write-ups
                    </Button>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="h-28 w-28 shrink-0 rounded-3xl overflow-hidden bg-muted/50 flex items-center justify-center border border-muted-foreground/10 p-3 shadow-2xl">
                            {entry.meta.icon ? (
                                <img src={entry.meta.icon} alt={entry.meta.title} className="h-full w-full object-contain" />
                            ) : (
                                <div className="p-4 text-muted-foreground/30">
                                    {entry.meta.platform === 'TryHackMe' ? (
                                        <TryHackMeIcon className="h-14 w-14" />
                                    ) : (
                                        <HackTheBoxIcon className="h-14 w-14" />
                                    )}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">{entry.meta.title}</h1>
                            <WriteupMeta meta={entry.meta} />
                        </div>
                    </div>

                    {entry.meta.roomUrl && (
                        <a href={entry.meta.roomUrl} target="_blank" rel="noopener noreferrer">
                            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                <ExternalLink className="h-4 w-4" />
                                View Room on {entry.meta.platform}
                            </Button>
                        </a>
                    )}
                </div>
            </div>

            <div className="prose prose-invert prose-pre:bg-muted/50 prose-pre:border prose-pre:border-muted max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-12 mb-6 text-white border-b border-muted pb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-8 mb-4 text-white" {...props} />,
                        p: ({ node, ...props }) => <p className="text-muted-foreground leading-relaxed mb-6" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground" {...props} />,
                        img: ({ node, ...props }) => <img className="rounded-lg border border-muted/50 my-6 shadow-lg mx-auto" {...props} />,
                        code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="my-6 rounded-lg overflow-hidden border border-muted">
                                    <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-muted flex justify-between items-center">
                                        <span>{match[1]}</span>
                                    </div>
                                    <pre className="p-4 overflow-x-auto bg-black/30">
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                            ) : (
                                <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono text-pink-400" {...props}>
                                    {children}
                                </code>
                            );
                        }
                    }}
                >
                    {entry.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
