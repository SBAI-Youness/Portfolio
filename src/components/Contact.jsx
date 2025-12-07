import {author} from "../data/author";
import { useEffect, useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 1600);
    return () => clearTimeout(t);
  }, [showToast]);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setShowToast(true);
    } catch (_) {
      // noop
    }
  };

  return (
    <section id="contact" className="text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-white text-2xl font-bold">Contact</h2>
          <span className="hidden sm:inline-flex text-xs px-2 py-1 rounded-full border border-neutral-800 text-neutral-400">Available for opportunities</span>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Email */}
          <div className="group rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-red-600/5 hover:border-red-600/60 transition">
            <div className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg border border-neutral-800 inline-flex items-center justify-center text-red-400 group-hover:border-red-600/60">
                {/* Mail icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.559-.75 7.19 5.243a.75.75 0 0 0 .902 0l7.19-5.243H4.059Z"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">Email</p>
                <a href={`mailto:${author.email}`} className="mt-0.5 block text-sm truncate text-neutral-300 hover:text-white">{author.email}</a>
              </div>
              <button onClick={() => handleCopy(author.email, "Email copied")} className="ml-auto inline-flex items-center justify-center h-8 w-8 rounded-md border border-neutral-800 text-neutral-300 hover:text-white hover:border-red-600/60 hover:bg-red-600/10 transition" aria-label="Copy email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M6 3.75A2.25 2.25 0 0 1 8.25 1.5h8.25A2.25 2.25 0 0 1 18.75 3.75v8.25A2.25 2.25 0 0 1 16.5 14.25H8.25A2.25 2.25 0 0 1 6 12V3.75z"/><path d="M3.75 6A2.25 2.25 0 0 0 1.5 8.25v11.25A2.25 2.25 0 0 0 3.75 21.75h11.25A2.25 2.25 0 0 0 17.25 19.5V18H8.25A3.75 3.75 0 0 1 4.5 14.25V6H3.75z"/></svg>
              </button>
            </div>
          </div>

          {/* Phone */}
          <div className="group rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-red-600/5 hover:border-red-600/60 transition">
            <div className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg border border-neutral-800 inline-flex items-center justify-center text-red-400 group-hover:border-red-600/60">
                {/* Phone icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M2.25 6.75A3.75 3.75 0 0 1 6 3h.7c.42 0 .8.26.94.65l1.06 3.18c.12.36.02.76-.26 1.02l-1.2 1.08a.75.75 0 0 0-.15.94 11.53 11.53 0 0 0 5.05 5.05.75.75 0 0 0 .94-.15l1.08-1.2c.26-.28.66-.38 1.02-.26l3.18 1.06c.39.13.65.52.65.94V18A3.75 3.75 0 0 1 17.25 21.75h-.5C8.8 21.75 2.25 15.2 2.25 7.5v-.75z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">Phone</p>
                <a href={`tel:${author.phone}`} className="mt-0.5 block text-sm truncate text-neutral-300 hover:text-white">{author.phone}</a>
              </div>
              <button onClick={() => handleCopy(author.phone, "Phone copied")} className="ml-auto inline-flex items-center justify-center h-8 w-8 rounded-md border border-neutral-800 text-neutral-300 hover:text-white hover:border-red-600/60 hover:bg-red-600/10 transition" aria-label="Copy phone">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M6 3.75A2.25 2.25 0 0 1 8.25 1.5h8.25A2.25 2.25 0 0 1 18.75 3.75v8.25A2.25 2.25 0 0 1 16.5 14.25H8.25A2.25 2.25 0 0 1 6 12V3.75z"/><path d="M3.75 6A2.25 2.25 0 0 0 1.5 8.25v11.25A2.25 2.25 0 0 0 3.75 21.75h11.25A2.25 2.25 0 0 0 17.25 19.5V18H8.25A3.75 3.75 0 0 1 4.5 14.25V6H3.75z"/></svg>
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="group rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-red-600/5 hover:border-red-600/60 transition">
            <div className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg border border-neutral-800 inline-flex items-center justify-center text-red-400 group-hover:border-red-600/60">
                {/* Location icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25c-4.28 0-7.5 3.22-7.5 7.5 0 5.25 7.5 12 7.5 12s7.5-6.75 7.5-12c0-4.28-3.22-7.5-7.5-7.5Zm0 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">Location</p>
                <p className="mt-0.5 text-sm text-neutral-300">{author.location}</p>
              </div>
            </div>
          </div>

          {/* GitHub */}
          <a href="https://github.com/SBAI-Youness" target="_blank" className="group rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-red-600/5 hover:border-red-600/60 transition">
            <div className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg border border-neutral-800 inline-flex items-center justify-center text-red-400 group-hover:border-red-600/60">
                {/* GitHub icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.39-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.8 1.05.81-.23 1.68-.35 2.54-.35s1.73.12 2.54.35c1.95-1.33 2.8-1.05 2.8-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" clipRule="evenodd"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">GitHub</p>
                <p className="mt-0.5 text-sm text-neutral-300">@SBAI-Youness</p>
              </div>
              <div className="ml-auto h-8 w-8 inline-flex items-center justify-center rounded-md border border-neutral-800 text-neutral-300 group-hover:text-white group-hover:border-red-600/60 group-hover:bg-red-600/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.5 12a.75.75 0 0 1 .75-.75h12.69l-3.22-3.22a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H5.25A.75.75 0 0 1 4.5 12z" clipRule="evenodd"/></svg>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a href="https://www.linkedin.com/in/youness-sbai" target="_blank" className="group rounded-xl border border-neutral-800 bg-neutral-900/20 hover:bg-red-600/5 hover:border-red-600/60 transition">
            <div className="p-4 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg border border-neutral-800 inline-flex items-center justify-center text-red-400 group-hover:border-red-600/60">
                {/* LinkedIn icon */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24h-3.8V8z"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium">LinkedIn</p>
                <p className="mt-0.5 text-sm text-neutral-300">@youness-sbai</p>
              </div>
              <div className="ml-auto h-8 w-8 inline-flex items-center justify-center rounded-md border border-neutral-800 text-neutral-300 group-hover:text-white group-hover:border-red-600/60 group-hover:bg-red-600/10 transition">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M4.5 12a.75.75 0 0 1 .75-.75h12.69l-3.22-3.22a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H5.25A.75.75 0 0 1 4.5 12z" clipRule="evenodd"/></svg>
              </div>
            </div>
          </a>
        </div>

        {/* Decorative line */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">Prefer email? I typically reply within 24 hours.</p>
          <a href={`mailto:${author.email}`} className="inline-flex items-center justify-center rounded-full border border-red-600/50 bg-red-600/10 text-red-300 px-4 py-2 text-sm font-medium hover:bg-red-600/20 hover:border-red-500 transition">
            Say Hello
          </a>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="rounded-full border border-red-600/50 bg-black/80 text-red-200 px-4 py-2 text-sm shadow-[0_0_40px_-10px_rgba(239,68,68,0.35)]">
            {copied}
          </div>
        </div>
      )}
    </section>
  )
}
