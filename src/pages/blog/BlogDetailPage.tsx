import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CodeBlock } from "@/components/custom/CodeBlock";
import { ImageZoom } from "@/components/ui/image-zoom";
import type { BlogEntry } from "@/lib/markdown";
import { loadBlogBySlug } from "@/lib/markdown";
import { BlogMeta } from "@/components/blog/BlogMeta";

export default function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [entry, setEntry] = useState<BlogEntry | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            loadBlogBySlug(slug).then(data => {
                setEntry(data);
                setLoading(false);
            });
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-8 w-1/2 bg-muted rounded" />
                <div className="h-4 w-1/4 bg-muted rounded" />
                <div className="space-y-4 pt-8">
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-full bg-muted rounded" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                </div>
            </div>
        );
    }

    if (!entry) {
        return (
            <div className="py-20 flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold text-white">Post not found</h1>
                <Link to="/blog">
                    <Button>Back to Blog</Button>
                </Link>
            </div>
        );
    }

    return (
        <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Back button */}
            <Link to="/blog">
                <Button variant="ghost" size="sm" className="gap-2 -ml-4 text-muted-foreground hover:bg-muted/50 hover:text-blue-400 transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Blog
                </Button>
            </Link>

            {/* Cover image */}
            {entry.meta.cover && (
                <div className="w-full h-56 md:h-72 rounded-2xl overflow-hidden border border-muted/50 shadow-2xl">
                    <img
                        src={entry.meta.cover}
                        alt={entry.meta.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            {/* Header */}
            <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                    {entry.meta.title}
                </h1>
                <BlogMeta meta={entry.meta} content={entry.content} showTags />
            </div>

            {/* Prose content */}
            <div className="prose prose-invert prose-pre:bg-muted/50 prose-pre:border prose-pre:border-muted max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight, rehypeRaw]}
                    components={{
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-12 mb-6 text-white border-b border-muted pb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-8 mb-4 text-white" {...props} />,
                        p:  ({ node, ...props }) => <p  className="text-muted-foreground leading-relaxed mb-6" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-6 text-muted-foreground" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-6 text-muted-foreground" {...props} />,
                        li: ({ node, ...props }) => <li className="text-muted-foreground leading-relaxed" {...props} />,
                        img: ({ node, ...props }) => <ImageZoom className="rounded-lg border border-muted/50 my-6 shadow-lg mx-auto" {...props} />,
                        code: ({ node, inline, className, children, ...props }: any) => {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <CodeBlock language={match[1]} className={className} {...props}>
                                    {children}
                                </CodeBlock>
                            ) : (
                                <code className="bg-muted/50 px-1.5 py-0.5 rounded text-sm font-mono text-pink-400" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {entry.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
