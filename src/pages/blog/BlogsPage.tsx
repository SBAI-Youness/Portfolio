import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, LayoutGrid, Search, Lightbulb, BookOpen, FlaskConical, MessageSquare } from "lucide-react";
import type { BlogEntry, BlogCategory } from "@/lib/markdown";
import { loadBlogs } from "@/lib/markdown";
import { BlogCard } from "@/components/blog/BlogCard";

const ITEMS_PER_PAGE = 5;

type FilterCategory = "All" | BlogCategory;

const CATEGORIES: { name: FilterCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { name: "All",       label: "All Posts",  icon: <LayoutGrid className="h-4 w-4" />,      color: "text-blue-400" },
    { name: "project",   label: "Projects",   icon: <FlaskConical className="h-4 w-4" />,     color: "text-blue-400" },
    { name: "discovery", label: "Discoveries",icon: <Lightbulb className="h-4 w-4" />,        color: "text-emerald-400" },
    { name: "tutorial",  label: "Tutorials",  icon: <BookOpen className="h-4 w-4" />,         color: "text-amber-400" },
    { name: "opinion",   label: "Opinions",   icon: <MessageSquare className="h-4 w-4" />,    color: "text-purple-400" },
];

export default function BlogsPage() {
    const [allBlogs, setAllBlogs] = useState<BlogEntry[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogEntry[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadBlogs()
            .then(data => {
                setAllBlogs(data);
                setFilteredBlogs(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load blogs:", err);
                setError(err.message || "Failed to load blog posts.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = allBlogs;

        if (selectedCategory !== "All") {
            filtered = filtered.filter(b => b.meta.category === selectedCategory);
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(b => {
                const title   = b.meta.title.toLowerCase();
                const excerpt = b.meta.excerpt.toLowerCase();
                const tags    = b.meta.tags.join(" ").toLowerCase();
                const cat     = b.meta.category.toLowerCase();
                return title.includes(query) || excerpt.includes(query) || tags.includes(query) || cat.includes(query);
            });
        }

        setFilteredBlogs(filtered);
        setCurrentPage(1);
    }, [selectedCategory, searchQuery, allBlogs]);

    const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
    const paginated  = filteredBlogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[60vh]">
            {/* ── Left Sidebar ── */}
            <aside className="w-full md:w-64 space-y-6">
                <div>
                    <Link to="/">
                        <Button variant="ghost" size="sm" className="gap-2 mb-4 -ml-2 text-muted-foreground hover:bg-muted/50 hover:text-blue-400 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                    <h2 className="text-xl font-bold text-white mb-6">Categories</h2>
                    <nav className="space-y-1">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.name}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${
                                    selectedCategory === cat.name
                                        ? "bg-muted text-white shadow-sm border border-muted"
                                        : "text-muted-foreground hover:bg-muted/30 hover:text-white"
                                }`}
                            >
                                <span className={cat.color}>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">
                            {selectedCategory === "All"
                                ? "All Posts"
                                : CATEGORIES.find(c => c.name === selectedCategory)?.label ?? selectedCategory}
                        </h1>
                        <p className="text-muted-foreground">
                            {selectedCategory === "All"
                                ? "Thoughts on projects, discoveries, and everything in between."
                                : selectedCategory === "project"   ? "Deep dives into things I've built."
                                : selectedCategory === "discovery" ? "Things I stumbled upon and found worth sharing."
                                : selectedCategory === "tutorial"  ? "Step-by-step guides and how-tos."
                                : "My thoughts and perspectives on various topics."}
                        </p>
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search posts..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/20 border-muted focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid gap-6">
                            {paginated.length > 0 ? (
                                paginated.map(entry => (
                                    <BlogCard key={entry.meta.slug} entry={entry} />
                                ))
                            ) : (
                                <div className="text-center py-20 text-muted-foreground border border-dashed border-muted rounded-lg">
                                    No posts found for this category yet.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {filteredBlogs.length > ITEMS_PER_PAGE && (
                            <div className="flex flex-col items-center gap-4 pt-10 border-t border-muted">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="gap-1 border-muted hover:bg-muted text-muted-foreground hover:text-white disabled:opacity-30"
                                    >
                                        ← Previous
                                    </Button>

                                    <div className="flex items-center gap-1 mx-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setCurrentPage(p)}
                                                className={`w-8 h-8 rounded-md text-sm transition-all ${
                                                    currentPage === p
                                                        ? "bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20"
                                                        : "text-muted-foreground hover:bg-muted/50 hover:text-white"
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="gap-1 border-muted hover:bg-muted text-muted-foreground hover:text-white disabled:opacity-30"
                                    >
                                        Next →
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
