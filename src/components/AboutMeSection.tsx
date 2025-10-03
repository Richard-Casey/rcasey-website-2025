import FadeInWhenVisible from "./FadeInWhenVisible"
import { FaEnvelope, FaLinkedin } from "react-icons/fa"

export default function AboutMeSection() {
  return (
    <FadeInWhenVisible>
      <section className="max-w-5xl mx-auto mb-28 px-6 py-16 flex flex-col md:flex-row items-center gap-12">
        
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}profile.png`}
            alt="Profile"
            className="w-60 h-60 rounded-full border-4 border-brand-accent object-cover shadow-lg"
          />
        </div>

        {/* About Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4 text-brand-text">About Me</h2>
          <p className="text-brand-subtext leading-relaxed max-w-xl mx-auto md:mx-0">
            Hi, I'm <span className="text-brand-accent font-semibold">Richard</span> — 
            a UK-based software developer who loves building tools, games, and anything that makes life easier.
            I enjoy exploring new tech stacks, experimenting with design, and bringing ideas to life.
          </p>

          {/* Contact Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="mailto:me@richard-casey.co.uk"
              className="flex items-center gap-2 px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
            >
              <FaEnvelope className="text-lg" />
              Send Me an Email
            </a>
            <a
              href="https://www.linkedin.com/in/richard-casey-40a6124a"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
            >
              <FaLinkedin className="text-lg" />
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </FadeInWhenVisible>
  )
}
