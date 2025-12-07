import {author} from "../data/author";

export default function About() {
  return (
    <section id="about" className="text-neutral-300 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">About</h2>
        <p className="mt-4 leading-7">{author.summary}</p>
      </div>
    </section>
  )
}