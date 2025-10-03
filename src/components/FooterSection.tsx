import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function FooterSection() {
  return (
<footer className="fixed bottom-0 left-0 w-full bg-brand-gray text-brand-subtext py-3 border-t-2 border-white z-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} Richard Casey</p>
        <div className="flex gap-6 text-2xl">
          <a
            href="mailto:me@richard-casey.co.uk"
            className="hover:text-brand-accent transition"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://www.linkedin.com/in/richard-casey-40a6124a/"
            target="_blank"
            className="hover:text-brand-accent transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Richard-Casey"
            target="_blank"
            className="hover:text-brand-accent transition"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
}
