import yaml from "js-yaml";

export interface WriteupMeta {
    title: string;
    platform: "TryHackMe" | "HackTheBox";
    difficulty: "Easy" | "Medium" | "Hard";
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

export async function loadWriteups(): Promise<WriteupEntry[]> {
    const modules = import.meta.glob("/src/content/writeups/*.md", {
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
