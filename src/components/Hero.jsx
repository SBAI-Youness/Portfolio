import { author } from "../data/author";
import profile1 from "../assets/facial_pictures/facial_picture2.png";
import resumePdf from "../assets/resume/resume.pdf";
import { useEffect, useState } from "react";

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      const timeout = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % author.roles.length);
        setVisible(true);
      }, 500);
      return () => clearTimeout(timeout);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="text-white pt-24 md:pt-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
        
        {/* Left: Image */}
        <div className="order-2 md:order-1 flex justify-center md:justify-center">
          <img
            src={profile1}
            alt={author.name}
            className="w-[280px] sm:w-[320px] md:w-[420px] rounded-full border border-red-700/40 shadow-[0_0_80px_-20px_rgba(239,68,68,0.45)]"
          />
        </div>

        {/* Right: Text */}
        <div className="order-1 md:order-2 text-center mx-auto">
          <p className="text-sm text-red-400/80">Hello, I'm</p>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold tracking-tight">
            {author.name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-300 max-w-xl h-[1.75rem] md:h-[2rem] mx-auto">
            <span
              className={`inline-block will-change-transform will-change-opacity transition-all duration-500 ease-in-out ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
              }`}
            >
              {author.roles[roleIndex]}
            </span>
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={resumePdf}
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-neutral-200 transition"
            >
              Download CV
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-red-600/50 bg-red-600/10 text-red-300 px-5 py-2.5 text-sm font-medium hover:bg-red-600/20 hover:border-red-500 transition"
            >
              Contact Info
            </a>
          </div>

          {/* Social Icons */}
          <div className="mt-6 flex items-center gap-4 justify-center">
            <a
              href="https://www.linkedin.com/in/youness-sbai"
              target="_blank"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-600/10 transition"
            >
              <span className="sr-only">LinkedIn</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-neutral-300">
                <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.16V24h-3.8V8z"/>
              </svg>
            </a>
            <a
              href="https://github.com/SBAI-Youness"
              target="_blank"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-neutral-700 hover:border-red-500 hover:bg-red-600/10 transition"
            >
              <span className="sr-only">GitHub</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-neutral-300">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.39-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .85-.28 2.8 1.05.81-.23 1.68-.35 2.54-.35s1.73.12 2.54.35c1.95-1.33 2.8-1.05 2.8-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.81-4.57 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" clipRule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
