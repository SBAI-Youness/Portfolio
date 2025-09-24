import {skills} from "../data/skills";

export default function Skills() {
  const groups = [
    ["Languages", skills.technical.languages],
    ["Web", skills.technical.web],
    ["Databases", skills.technical.databases],
    ["Networking", skills.technical.networking],
    ["Security", skills.technical.security],
    ["Operating Systems", skills.technical.operatingSystems],
    ["Design", skills.technical.design],
    ["Virtualization", skills.technical.virtualization],
    ["Version Control", skills.technical.vcs],
    ["Game Dev", skills.technical.gameDev],
  ];
  return (
    <section id="skills" className="bg-black text-neutral-300">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Skills</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map(([title, list]) => (
            <div key={title} className="rounded-lg border border-neutral-800 p-4">
              <p className="text-white font-medium">{title}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {list.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full border border-neutral-700 text-neutral-300">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <p className="text-white font-medium">Soft Skills</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {skills.soft.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-full border border-neutral-700 text-neutral-300">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
