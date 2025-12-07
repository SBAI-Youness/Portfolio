import {skills} from "../data/skills";

export default function Skills() {
  const groups = [
    ["Languages", skills.languages],
    ["Web", skills.web],
    ["Databases", skills.databases],
    ["Networking", skills.networking],
    ["Security", skills.security],
    ["Operating Systems", skills.operatingSystems],
    ["Design", skills.design],
    ["Virtualization", skills.virtualization],
    ["Version Control", skills.vcs],
    ["Game Dev", skills.gameDev],
  ];
  return (
    <section id="skills" className="text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Skills</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
      </div>
    </section>
  )
}
