export default function Hero() {
  return (
    <section className="relative w-screen max-w-full overflow-x-hidden h-[90vh] flex items-center justify-center text-center">
      {/* Background Video */}
      <video
        src={`${import.meta.env.BASE_URL}videos/websitesplash.mp4`}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
      />

      {/* Dark overlay to make text readable */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>

      {/* Foreground content */}
      <div className="relative z-10 px-6">
        <h1 className="text-5xl font-bold mb-4 text-brand-text">Hi, I'm Richard Casey</h1>
        <p className="text-xl text-brand-subtext mb-8">
          Software Developer — C# / Unity / React
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
          >
            Projects
          </a>
          <a
            href="#about"
            className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
          >
            About
          </a>
          <a
            href="#CV"
            className="px-6 py-3 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
          >
            CV
          </a>
        </div>
      </div>
    </section>
  );
}
