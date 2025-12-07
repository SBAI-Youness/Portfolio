import {education} from "../data/education";

export default function Education() {
  return (
    <section id="education" className="text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Education</h2>
        <ol className="mt-10 relative">
          {/* vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-neutral-800" />
          {education.map((item, idx) => {
            const hasPrograms = Array.isArray(item.programs) && item.programs.length > 0;
            return (
              <li key={idx} className="relative pl-12 pb-10 last:pb-0">
                {/* timeline dot */}
                <span className="absolute left-4 top-1.5 h-3 w-3 rounded-full bg-white ring-4 ring-black" />
                <div className="rounded-lg border border-neutral-800/80 bg-neutral-900/30 backdrop-blur-sm p-4">
                  <p className="text-white font-semibold tracking-tight">{item.school}</p>
                  {hasPrograms ? (
                    <ul className="mt-3 space-y-3">
                      {item.programs.map((program, pIdx) => (
                        <li key={pIdx} className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm text-neutral-200">{program.degree}</p>
                          </div>
                          <p className="shrink-0 text-xs text-neutral-400">
                            {program.start} — {program.end}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <p className="text-sm text-neutral-200">{item.degree}</p>
                      <p className="shrink-0 text-xs text-neutral-400">{item.start} — {item.end}</p>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  )
}
