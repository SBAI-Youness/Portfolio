import {education} from "../data/education";

export default function Education() {
  return (
    <section id="education" className="bg-black text-neutral-300">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Education</h2>
        <ol className="mt-6 space-y-6">
          {education.map((item, idx) => (
            <li key={idx} className="rounded-lg border border-neutral-800 p-4">
              <p className="text-white font-medium">{item.school}</p>
              <p className="text-sm">{item.degree}</p>
              <p className="text-xs text-neutral-400">{item.start} — {item.end}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
