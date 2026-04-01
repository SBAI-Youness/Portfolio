import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
    language: string;
    children: React.ReactNode;
    className?: string;
}

export function CodeBlock({ language, children, className }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        let codeText = '';
        
        if (typeof children === 'string') {
            codeText = children;
        } else if (Array.isArray(children)) {
            codeText = children.map(child => {
                if (typeof child === 'string') return child;
                if (typeof child === 'object' && child !== null) {
                    // Handle React elements or objects by extracting their text content
                    if ('props' in child && child.props.children) {
                        return extractTextContent(child.props.children);
                    }
                    return String(child);
                }
                return String(child);
            }).join('');
        } else if (typeof children === 'object' && children !== null) {
            codeText = extractTextContent(children);
        } else {
            codeText = String(children);
        }
        
        try {
            await navigator.clipboard.writeText(codeText);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    const extractTextContent = (obj: any): string => {
        if (typeof obj === 'string') return obj;
        if (Array.isArray(obj)) return obj.map(extractTextContent).join('');
        if (typeof obj === 'object' && obj !== null && 'props' in obj && obj.props.children) {
            return extractTextContent(obj.props.children);
        }
        return String(obj);
    };

    return (
        <div className="my-6 rounded-lg overflow-hidden border border-muted">
            <div className="bg-muted px-4 py-2 text-xs font-mono text-muted-foreground border-b border-muted flex justify-between items-center">
                <span>{language}</span>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="h-6 px-2 text-xs hover:bg-muted-foreground/20 transition-colors"
                >
                    {copied ? (
                        <>
                            <Check className="h-3 w-3 mr-1 text-green-400" />
                            Copied!
                        </>
                    ) : (
                        <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                        </>
                    )}
                </Button>
            </div>
            <pre className="p-4 overflow-x-auto bg-black/30">
                <code className={className}>
                    {children}
                </code>
            </pre>
        </div>
    );
}
