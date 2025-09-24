import {author} from "../data/author";

export default function Education() {
  return (
    <section id="contact" className="bg-black text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">Contact</h2>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <a href={`mailto:${author.email}`} className="rounded-lg border border-neutral-800 p-4 hover:border-red-500 hover:bg-red-600/10 transition">
            <p className="text-white font-medium">Email</p>
            <p className="text-sm">{author.email}</p>
          </a>
          <div className="rounded-lg border border-neutral-800 p-4">
            <p className="text-white font-medium">Location</p>
            <p className="text-sm">{author.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
