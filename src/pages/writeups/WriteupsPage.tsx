import { useEffect, useState } from "react";
import type { WriteupEntry } from "@/lib/markdown";
import { loadWriteups } from "@/lib/markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import { TryHackMeIcon, HackTheBoxIcon } from "@/components/writeups/PlatformLogos";
import { WriteupCard } from "@/components/writeups/WriteupCard";

export default function WriteupsPage() {
    const [allWriteups, setAllWriteups] = useState<WriteupEntry[]>([]);
    const [filteredWriteups, setFilteredWriteups] = useState<WriteupEntry[]>([]);
    const [selectedPlatform, setSelectedPlatform] = useState<string>("All");
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
        if (selectedPlatform === "All") {
            setFilteredWriteups(allWriteups);
        } else {
            setFilteredWriteups(allWriteups.filter(w => w.meta.platform === selectedPlatform));
        }
    }, [selectedPlatform, allWriteups]);

    const platforms = [
        { name: "All", icon: <LayoutGrid className="h-4 w-4" />, color: "text-blue-400" },
        { name: "TryHackMe", icon: <TryHackMeIcon className="h-4 w-4" />, color: "text-[#ff4b50]" },
        { name: "HackTheBox", icon: <HackTheBoxIcon className="h-4 w-4" />, color: "text-[#9fef00]" },
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
                            <button
                                key={p.name}
                                onClick={() => setSelectedPlatform(p.name)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm font-medium ${selectedPlatform === p.name
                                    ? "bg-muted text-white shadow-sm border border-muted"
                                    : "text-muted-foreground hover:bg-muted/30 hover:text-white"
                                    }`}
                            >
                                <span className={p.color}>
                                    {p.icon}
                                </span>
                                {p.name === "All" ? "All Platforms" : p.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">
                        {selectedPlatform === "All" ? "All Write-ups" : `${selectedPlatform} Rooms`}
                    </h1>
                    <p className="text-muted-foreground">
                        {selectedPlatform === "All"
                            ? "Explore my journey through various cyber security platforms."
                            : `A collection of challenges I've solved on ${selectedPlatform}.`}
                    </p>
                </div>

                {loading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-32 bg-muted/20 animate-pulse rounded-lg" />
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredWriteups.length > 0 ? (
                            filteredWriteups.map(entry => (
                                <WriteupCard key={entry.meta.slug} meta={entry.meta} />
                            ))
                        ) : (
                            <div className="text-center py-20 text-muted-foreground border border-dashed border-muted rounded-lg">
                                No write-ups found for this category yet.
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
