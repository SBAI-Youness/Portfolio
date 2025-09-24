import {author} from "../data/author";

export default function Nav() {
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
      </nav>
    </header>
  )
}