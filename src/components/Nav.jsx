import {author} from "../data/author";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/40 border-b border-red-900/20">
      <nav className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#home" className="text-white text-lg font-semibold tracking-tight">
          {author.name}
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm text-neutral-300 hover:text-white transition">About</a>
          <a href="#skills" className="text-sm text-neutral-300 hover:text-white transition">Skills</a>
          <a href="#education" className="text-sm text-neutral-300 hover:text-white transition">Education</a>
          <a href="#projects" className="text-sm text-neutral-300 hover:text-white transition">Projects</a>
          <a href="#certifications" className="text-sm text-neutral-300 hover:text-white transition">Certifications</a>
          <a href="#contact" className="text-sm text-neutral-300 hover:text-white transition">Contact</a>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-neutral-700 text-neutral-200 hover:border-red-500 hover:bg-red-600/10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            {isOpen ? (
              <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </nav>
      {isOpen && (
        <div className="md:hidden border-t border-red-900/20 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/50">
          <div className="mx-auto max-w-7xl px-6 py-4 grid gap-3">
            <a onClick={() => setIsOpen(false)} href="#about" className="text-sm text-neutral-200 hover:text-white transition">About</a>
            <a onClick={() => setIsOpen(false)} href="#skills" className="text-sm text-neutral-200 hover:text-white transition">Skills</a>
            <a onClick={() => setIsOpen(false)} href="#education" className="text-sm text-neutral-200 hover:text-white transition">Education</a>
            <a onClick={() => setIsOpen(false)} href="#projects" className="text-sm text-neutral-200 hover:text-white transition">Projects</a>
            <a onClick={() => setIsOpen(false)} href="#certifications" className="text-sm text-neutral-200 hover:text-white transition">Certifications</a>
            <a onClick={() => setIsOpen(false)} href="#contact" className="text-sm text-neutral-200 hover:text-white transition">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}