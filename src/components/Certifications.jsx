import { certifications } from "../data/certifications";

export default function Certifications() {
  const items = [...certifications, ...certifications];
  return (
    <section id="certifications" className="text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-3xl font-semibold tracking-tight">
            Certifications
          </h2>
        </div>

        <div className="mt-10 marquee">
          <div className="marquee-track gap-6">
            {items.map((c, idx) => (
              <article
                key={`${c.name}-${idx}`}
                className="group flex min-w-[340px] sm:min-w-[400px] flex-col rounded-2xl border border-neutral-800 bg-neutral-950/70 px-6 py-5 shadow-md backdrop-blur transition hover:border-neutral-700 hover:bg-neutral-900/70"
              >
                <div className="flex items-center gap-4">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={c.name}
                      className="h-12 w-12 rounded-lg object-cover border border-neutral-800"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-lg border border-neutral-800 bg-neutral-900 flex items-center justify-center text-[11px] text-neutral-500">
                      Img
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-white text-base font-medium truncate">
                      {c.name}
                    </p>
                    <p className="text-sm text-neutral-400 truncate">
                      {c.provider}
                    </p>
                  </div>
                  {c.date && (
                    <span className="ml-auto text-xs text-neutral-400 border border-neutral-800 rounded-md px-2 py-0.5">
                      {c.date}
                    </span>
                  )}
                </div>

                {Array.isArray(c.skills) && c.skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.skills.slice(0, 6).map((s, i) => (
                      <span
                        key={`${c.name}-skill-${i}`}
                        className="text-[11px] px-2.5 py-0.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-300/90"
                        title={s}
                      >
                        {s}
                      </span>
                    ))}
                    {c.skills.length > 6 && (
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-400">
                        +{c.skills.length - 6} more
                      </span>
                    )}
                  </div>
                )}

                {c.url && (
                  <div className="mt-5">
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1.5 text-sm text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-md px-3 py-1.5 transition"
                    >
                      View Certificate
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3Z" />
                        <path d="M5 5h5V3H3v7h2V5Z" />
                      </svg>
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
