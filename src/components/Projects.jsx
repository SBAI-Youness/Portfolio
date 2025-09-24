import {projects} from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="bg-black text-neutral-300">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Projects</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <article key={p.title} className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
              <img src={p.image} alt={p.title} className="w-full h-44 object-cover" />
              <div className="p-4">
                <h3 className="text-white font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-400 line-clamp-3">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full border border-neutral-700 text-neutral-300">{s}</span>
                  ))}
                </div>
                {p.links?.github && (
                  <div className="mt-4">
                    <a href={p.links.github} target="_blank" className="inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white border border-neutral-700 hover:border-red-500 rounded-full px-3 py-1.5 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.39-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.8 1.05.81-.23 1.68-.35 2.54-.35s1.73.12 2.54.35c1.95-1.33 2.8-1.05 2.8-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" clipRule="evenodd"/></svg>
                      <span>GitHub</span>
                    </a>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
