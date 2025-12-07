import {author} from "../data/author";
import { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/40 bg-black/60 border-b border-red-900/30 shadow-lg">
      <nav className="mx-auto max-w-7xl px-8 py-6 flex items-center justify-between">
        <a href="#home" className="text-white text-2xl font-bold tracking-tight hover:text-red-400 transition-colors duration-300">
          {author.name}
        </a>
        <div className="hidden md:flex items-center gap-10">
          <a href="#about" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">About</a>
          <a href="#skills" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">Skills</a>
          <a href="#education" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">Education</a>
          <a href="#projects" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">Projects</a>
          <a href="#certifications" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">Certifications</a>
          <a href="#contact" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-2 px-3 rounded-md hover:bg-red-600/10">Contact</a>
        </div>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center h-12 w-12 rounded-lg border-2 border-neutral-600 text-neutral-200 hover:border-red-500 hover:bg-red-600/20 transition-all duration-300 shadow-lg"
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
        <div className="md:hidden border-t border-red-900/30 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70 shadow-xl">
          <div className="mx-auto max-w-7xl px-8 py-6 grid gap-4">
            <a onClick={() => setIsOpen(false)} href="#about" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">About</a>
            <a onClick={() => setIsOpen(false)} href="#skills" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">Skills</a>
            <a onClick={() => setIsOpen(false)} href="#education" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">Education</a>
            <a onClick={() => setIsOpen(false)} href="#projects" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">Projects</a>
            <a onClick={() => setIsOpen(false)} href="#certifications" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">Certifications</a>
            <a onClick={() => setIsOpen(false)} href="#contact" className="text-base text-neutral-200 hover:text-white hover:text-red-400 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-red-600/10">Contact</a>
          </div>
        </div>
      )}
    </header>
  )
}