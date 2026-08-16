import yaml from "js-yaml";

// ─── Writeups ────────────────────────────────────────────────────────────────

export interface WriteupMeta {
    title: string;
    platform: "TryHackMe" | "HackTheBox" | "CTF";
    difficulty: "Easy" | "Medium" | "Hard";
    category?: "pwn" | "rev" | "osint" | "web" | "crypto" | "misc";
    ctfName?: string;
    date: string;
    tags: string[];
    excerpt: string;
    slug: string;
    icon?: string;
    roomUrl?: string;
}

export interface WriteupEntry {
    meta: WriteupMeta;
    content: string;
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export type BlogCategory = "project" | "discovery" | "tutorial" | "opinion";

export interface BlogMeta {
    title: string;
    date: string;
    tags: string[];
    category: BlogCategory;
    excerpt: string;
    slug: string;
    cover?: string;
}

export interface BlogEntry {
    meta: BlogMeta;
    content: string;
}

// ─── Shared Helpers ───────────────────────────────────────────────────────────

function parseMarkdown(raw: string) {
    const regex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = raw.match(regex);

    if (match) {
        const yamlText = match[1];
        const content = match[2];
        const data = yaml.load(yamlText) as Record<string, any>;
        return { data, content };
    }

    return { data: {}, content: raw };
}

/** Estimates reading time in minutes based on word count (200 wpm). */
export function estimateReadingTime(content: string): number {
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

// ─── Writeup Loaders ─────────────────────────────────────────────────────────

export async function loadWriteups(): Promise<WriteupEntry[]> {
    const modules = import.meta.glob("/src/content/writeups/**/*.md", {
        query: '?raw',
        import: 'default',
        eager: true
    });

    const entriesArr = Object.entries(modules).map(([path, raw]) => {
        const { data, content } = parseMarkdown(raw as string);
        const slug = path.split("/").pop()?.replace(".md", "") || "";

        return {
            meta: { ...data, slug } as WriteupMeta,
            content,
        };
    });

    return entriesArr.sort(
        (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export async function loadWriteupBySlug(slug: string): Promise<WriteupEntry | null> {
    const writeups = await loadWriteups();
    return writeups.find(w => w.meta.slug === slug) || null;
}

// ─── Blog Loaders ─────────────────────────────────────────────────────────────

export async function loadBlogs(): Promise<BlogEntry[]> {
    const modules = import.meta.glob("/src/content/blogs/**/*.md", {
        query: '?raw',
        import: 'default',
        eager: true
    });

    const entriesArr = Object.entries(modules).map(([path, raw]) => {
        const { data, content } = parseMarkdown(raw as string);
        const slug = path.split("/").pop()?.replace(".md", "") || "";

        return {
            meta: { ...data, slug } as BlogMeta,
            content,
        };
    });

    return entriesArr.sort(
        (a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export async function loadBlogBySlug(slug: string): Promise<BlogEntry | null> {
    const blogs = await loadBlogs();
    return blogs.find(b => b.meta.slug === slug) || null;
}
