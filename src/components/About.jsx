import {author} from "../data/author";

export default function About() {
  return (
    <section id="about" className="bg-black text-neutral-300">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-white text-2xl font-bold">About</h2>
        <p className="mt-4 leading-7">{author.summary}</p>
      </div>
    </section>
  )
}