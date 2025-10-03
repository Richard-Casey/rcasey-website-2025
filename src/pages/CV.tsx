import FooterSection from "../components/FooterSection";

export default function CVPage() {
  const cvPath = `${import.meta.env.BASE_URL}rcaseycv.pdf`;

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl font-bold text-brand-text mb-6">
        Curriculum Vitae
      </h1>
      <p className="text-brand-subtext mb-8">
        You can view or download my full CV as a PDF below.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href={`${import.meta.env.BASE_URL}rcaseycv.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
        >
          View CV
        </a>

        <a
          href={`${import.meta.env.BASE_URL}rcaseycv.pdf`}
          download
          className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
        >
          Download CV
        </a>
      </div>
    </section>
  );
}
