import {certifications} from "../data/certifications";

export default function Certifications() {
  const items = [...certifications, ...certifications];
  return (
    <section id="certifications" className="bg-black text-neutral-300">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Certifications</h2>
        <div className="mt-6 marquee">
          <div className="marquee-track gap-4">
            {items.map((c, idx) => (
              <article key={`${c.name}-${idx}`} className="flex items-center gap-3 min-w-[320px] rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3">
                {c.image ? (
                  <img src={c.image} alt={c.name} className="h-10 w-10 rounded object-cover border border-neutral-800" />
                ) : (
                  <div className="h-10 w-10 rounded border border-neutral-800 bg-neutral-900 flex items-center justify-center text-[10px] text-neutral-500">Img</div>
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm truncate">{c.name}</p>
                  <p className="text-xs text-neutral-400 truncate">{c.provider}</p>
                </div>
                {c.date && (
                  <span className="ml-auto text-[10px] text-neutral-400 border border-neutral-800 rounded px-1.5 py-0.5">{c.date}</span>
                )}
              </article>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-neutral-500">Hover to pause. Add certificate images and dates in <code>src/data/certifications.js</code>.</p>
      </div>
    </section>
  )
}