import { useEffect, useState } from "react";
import type { WriteupEntry } from "@/lib/markdown";
import { loadWriteups } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutGrid, ChevronDown, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { TryHackMeIcon, HackTheBoxIcon, CTFIcon } from "@/components/writeups/PlatformLogos";
import { WriteupCard } from "@/components/writeups/WriteupCard";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 5;

export default function WriteupsPage() {
    const [allWriteups, setAllWriteups] = useState<WriteupEntry[]>([]);
    const [filteredWriteups, setFilteredWriteups] = useState<WriteupEntry[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
    const [selectedCtf, setSelectedCtf] = useState<string | null>(null);
    const [isCtfExpanded, setIsCtfExpanded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadWriteups()
            .then(data => {
                setAllWriteups(data);
                setFilteredWriteups(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load writeups:", err);
                setError(err.message || "Failed to load writeups.");
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filtered = allWriteups;

        // Platform & CTF Filtering
        if (selectedPlatform !== "All") {
            filtered = filtered.filter(w => w.meta.platform === selectedPlatform);
            if (selectedPlatform === "CTF" && selectedCtf) {
                filtered = filtered.filter(w => w.meta.ctfName === selectedCtf);
            }
        }

        // Search Query Filtering
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(w => {
                const title = w.meta.title.toLowerCase();
                const excerpt = w.meta.excerpt.toLowerCase();
                const tags = w.meta.tags.join(" ").toLowerCase();
                const ctfName = w.meta.ctfName?.toLowerCase() || "";
                const category = w.meta.category?.toLowerCase() || "";
                const platform = w.meta.platform.toLowerCase();

                return title.includes(query) ||
                    excerpt.includes(query) ||
                    tags.includes(query) ||
                    ctfName.includes(query) ||
                    category.includes(query) ||
                    platform.includes(query);
            });
        }

        setFilteredWriteups(filtered);
        setCurrentPage(1);
    }, [selectedPlatform, selectedCtf, searchQuery, allWriteups]);

    const ctfNames = Array.from(
        new Set(
            allWriteups
                .filter(w => w.meta.platform === "CTF" && w.meta.ctfName)
                .map(w => w.meta.ctfName as string)
        )
    ).sort();

    const platforms = [
        { name: "All", icon: <LayoutGrid className="h-4 w-4" />, color: "text-blue-400" },
        { name: "TryHackMe", icon: <TryHackMeIcon className="h-4 w-4" />, color: "text-[#ff4b50]" },
        { name: "HackTheBox", icon: <HackTheBoxIcon className="h-4 w-4" />, color: "text-[#9fef00]" },
        { name: "CTF", displayName: "CTF Competition", icon: <CTFIcon className="h-5 w-5" />, color: "text-purple-400" },
    ];

    if (error) {
        return (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-center">
                {error}
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 min-h-[60vh]">
            {/* Left Sidebar */}
            <aside className="w-full md:w-64 space-y-6">
                <div>
                    <Link to="/">
                        <Button variant="ghost" size="sm" className="gap-2 mb-4 -ml-2 text-muted-foreground hover:bg-muted/50 hover:text-blue-400 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Portfolio
                        </Button>
                    </Link>
                    <h2 className="text-xl font-bold text-white mb-6">Platforms</h2>
                    <nav className="space-y-1">
                        {platforms.map((p) => (
                            <div key={p.name}>
                                <button
                                    onClick={() => {
                                        setSelectedPlatform(p.name);
                                        if (p.name !== "CTF") {
                                            setSelectedCtf(null);
                                        } else {
                                            setSelectedCtf(null); // Reset to show all CTFs
                                            setIsCtfExpanded(!isCtfExpanded);
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all text-sm font-medium ${selectedPlatform === p.name
                                        ? "bg-muted text-white shadow-sm border border-muted"
                                        : "text-muted-foreground hover:bg-muted/30 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={p.color}>
                                            {p.icon}
                                        </span>
                                        {p.name === "All" ? "All Platforms" : p.displayName || p.name}
                                    </div>
                                    {p.name === "CTF" && (
                                        isCtfExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                                    )}
                                </button>

                                {p.name === "CTF" && isCtfExpanded && (
                                    <div className="ml-9 mt-1 space-y-1 border-l border-muted pl-4 animate-in slide-in-from-top-1 duration-200">
                                        {ctfNames.map(ctfName => (
                                            <button
                                                key={ctfName}
                                                onClick={() => {
                                                    setSelectedPlatform("CTF");
                                                    setSelectedCtf(ctfName);
                                                }}
                                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-xs transition-colors ${selectedCtf === ctfName
                                                    ? "text-blue-400 font-semibold bg-blue-400/5"
                                                    : "text-muted-foreground hover:text-white hover:bg-muted/20"
                                                    }`}
                                            >
                                                {ctfName === "ST4F1T" && (
                                                    <img src="/assets/icons/ctf/st4f1t.png" alt="ST4F1T" className="h-5 w-5 object-contain" />
                                                )}
                                                {ctfName}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-8">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white">
                            {selectedPlatform === "All" ? "All Write-ups" : selectedPlatform === "CTF" ? (selectedCtf || "CTF Competition") : `${selectedPlatform} Rooms`}
                        </h1>
                        <p className="text-muted-foreground">
                            {selectedPlatform === "All"
                                ? "Explore my journey through various cyber security platforms."
                                : selectedPlatform === "CTF"
                                    ? "A collection of write-ups from various CTF competitions."
                                    : `A collection of challenges I've solved on ${selectedPlatform}.`}
                        </p>
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search write-ups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-muted/20 border-muted focus:border-blue-500/50 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-muted/20 animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="grid gap-6">
                            {filteredWriteups.length > 0 ? (
                                filteredWriteups
                                    .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                                    .map(entry => (
                                        <WriteupCard key={entry.meta.slug} meta={entry.meta} />
                                    ))
                            ) : (
                                <div className="text-center py-20 text-muted-foreground border border-dashed border-muted rounded-lg">
                                    No write-ups found for this category yet.
                                </div>
                            )}
                        </div>

                        {/* Pagination UI */}
                        {filteredWriteups.length > ITEMS_PER_PAGE && (
                            <div className="flex flex-col items-center gap-4 pt-10 border-t border-muted">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        disabled={currentPage === 1}
                                        className="gap-1 border-muted hover:bg-muted text-muted-foreground hover:text-white disabled:opacity-30"
                                    >
                                        <ChevronRight className="h-4 w-4 rotate-180" />
                                        Previous
                                    </Button>

                                    <div className="flex items-center gap-1 mx-2">
                                        {(() => {
                                            const totalPages = Math.ceil(filteredWriteups.length / ITEMS_PER_PAGE);
                                            const pages: (number | string)[] = [];

                                            if (totalPages <= 7) {
                                                for (let i = 1; i <= totalPages; i++) pages.push(i);
                                            } else {
                                                // Always show first page
                                                pages.push(1);

                                                if (currentPage > 3) {
                                                    pages.push("...");
                                                }

                                                // Calculate range around current page
                                                const start = Math.max(2, currentPage - 1);
                                                const end = Math.min(totalPages - 1, currentPage + 1);

                                                // Adjust to ensure we show 3 numbers in the middle if possible
                                                const finalStart = currentPage <= 3 ? 2 : (currentPage >= totalPages - 2 ? totalPages - 4 : start);
                                                const finalEnd = currentPage >= totalPages - 2 ? totalPages - 1 : (currentPage <= 3 ? 5 : end);

                                                for (let i = Math.max(2, finalStart); i <= Math.min(totalPages - 1, finalEnd); i++) {
                                                    pages.push(i);
                                                }

                                                if (currentPage < totalPages - 2) {
                                                    pages.push("...");
                                                }

                                                // Always show last page
                                                pages.push(totalPages);
                                            }

                                            return pages.map((p, i) => {
                                                if (p === "...") {
                                                    return (
                                                        <span key={`dots-${i}`} className="w-8 h-8 flex items-center justify-center text-muted-foreground">
                                                            ...
                                                        </span>
                                                    );
                                                }
                                                const pageNum = p as number;
                                                return (
                                                    <button
                                                        key={`page-${pageNum}`}
                                                        onClick={() => setCurrentPage(pageNum)}
                                                        className={`w-8 h-8 rounded-md text-sm transition-all ${currentPage === pageNum
                                                            ? "bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20"
                                                            : "text-muted-foreground hover:bg-muted/50 hover:text-white"
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            });
                                        })()}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredWriteups.length / ITEMS_PER_PAGE), prev + 1))}
                                        disabled={currentPage === Math.ceil(filteredWriteups.length / ITEMS_PER_PAGE)}
                                        className="gap-1 border-muted hover:bg-muted text-muted-foreground hover:text-white disabled:opacity-30"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
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
