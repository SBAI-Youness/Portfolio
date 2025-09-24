import {author} from "../data/author";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-neutral-300 border-t border-red-900/20">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-semibold">{author.name}</p>
          <p className="mt-2 text-sm text-neutral-400 max-w-sm">{author.title}</p>
        </div>

        <nav className="grid grid-cols-2 gap-3 text-sm">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#about" className="hover:text-white transition">About</a>
          <a href="#education" className="hover:text-white transition">Experience</a>
          <a href="#skills" className="hover:text-white transition">Skills</a>
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </nav>

        <div className="md:justify-self-end">
          <div className="flex gap-3">
            <a href={`mailto:${author.email}`} className="text-sm underline underline-offset-4 hover:text-white">{author.email}</a>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <a href="https://www.linkedin.com/in/youness-sbai" target="_blank" className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-600/10 transition">
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-neutral-300"><path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24h-3.8V8z"/></svg>
            </a>
            <a href="https://github.com/SBAI-Youness" target="_blank" className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-600/10 transition">
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-neutral-300"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.39-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.8 1.05.81-.23 1.68-.35 2.54-.35s1.73.12 2.54.35c1.95-1.33 2.8-1.05 2.8-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" clipRule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-neutral-500 flex items-center justify-between">
          <span>© {year} {author.name}. All rights reserved.</span>
          <span className="text-neutral-600">{author.location}</span>
        </div>
      </div>
    </footer>
  );
}