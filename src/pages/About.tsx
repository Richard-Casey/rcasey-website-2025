import { useEffect, useMemo, useRef, useState } from "react";
import TimelineRail from "../components/TimelineRail";
import { timeline } from "../data/timeline";
import FadeInWhenVisible from "../components/FadeInWhenVisible";

export default function About() {
  const entries = useMemo(() => timeline, []);
  const [activeId, setActiveId] = useState<string | null>(entries[0]?.id ?? null);

  // Map id -> element
  const refs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    entries.forEach((e) => {
      if (!refs.current[e.id]) refs.current[e.id] = null;
    });
  }, [entries]);

  // Offsets / runway
  const NAV_OFFSET = 96;        // height of sticky navbar
  const BOTTOM_SPACER_VH = 50;  // extra runway at bottom (viewport-height %)

  // --- Active section detection (robust + bottom-aware) ---
  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const docEl = document.documentElement;
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const scrollBottom = scrollY + viewportH;
      const docH = docEl.scrollHeight;

      // If you're basically at the bottom, mark the last entry active.
      if (scrollBottom >= docH - 2) {
        setActiveId(entries[entries.length - 1]?.id ?? null);
        return;
      }

      // Otherwise pick the last section whose top is above the "reading head".
      const targetY = scrollY + NAV_OFFSET + 1;
      let current: string | null = entries[0]?.id ?? null;

      for (const e of entries) {
        const el = refs.current[e.id];
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY; // doc-relative
        if (top <= targetY) current = e.id;
        else break; // sections in order
      }

      setActiveId(current);
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateActive(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entries]);

  // --- Smooth jump from the left rail (special case for last) ---
  function handleJump(id: string) {
    const lastId = entries[entries.length - 1]?.id;
    if (id === lastId) {
      // Go all the way down so the last card can sit comfortably above the fold
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
      return;
    }

    const el = refs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-14">
      {/* Intro */}
      <FadeInWhenVisible>
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-3 text-brand-text">About Richard</h1>
          <p className="text-brand-subtext max-w-3xl">
            I’m a UK-based software developer who loves building practical tools, polished UI,
            and small games. Strong in C# (Unity/WPF) and comfortable in React/TypeScript. I care
            about readable code, tight feedback loops, and shipping things that make people’s
            lives easier.
          </p>
        </div>
      </FadeInWhenVisible>

      <hr className="border-brand-gray mb-10" />

      {/* Layout: sticky timeline (left) + sections (right) */}
      <div className="md:grid md:grid-cols-[14rem_1fr] md:gap-6">
        <TimelineRail entries={entries} activeId={activeId} onJump={handleJump} />

        {/* extra bottom padding so last cards can scroll above the fold */}
        <div className="space-y-10 pb-40">
          {entries.map((e) => {
            const isActive = e.id === activeId;

            return (
              <FadeInWhenVisible key={e.id}>
                <article
                  id={e.id}
                  data-id={e.id}
                  ref={(el) => {
                    refs.current[e.id] = el;
                  }}
                  className={[
                    "scroll-mt-24",
                    "bg-brand-gray border rounded-2xl p-5 md:p-6 shadow-sm transition-all duration-300",
                    isActive
                      ? "border-brand-accent/40 opacity-100"
                      : "border-white/15 opacity-60 hover:opacity-80",
                  ].join(" ")}
                >
                  <header className="mb-2">
                    <div className="text-xs uppercase tracking-wider text-brand-subtext">{e.date}</div>
                    <h2 className="text-xl md:text-2xl font-semibold text-brand-text">{e.title}</h2>
                  </header>

                  <p className="text-brand-subtext leading-relaxed">{e.summary}</p>

                  {e.bullets && e.bullets.length > 0 && (
                    <ul className="list-disc list-inside mt-3 space-y-1 text-brand-subtext">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}

                  {e.link && (
                    <div className="mt-4">
                      <a
                        href={e.link.href}
                        target="_blank"
                        className="inline-block px-4 py-2 border border-brand-accent text-brand-accent rounded hover:bg-brand-accent hover:text-black transition"
                      >
                        {e.link.label}
                      </a>
                    </div>
                  )}
                </article>
              </FadeInWhenVisible>
            );
          })}

          {/* huge invisible runway so the last 1–2 items can scroll up under the navbar */}
          <div style={{ height: `${BOTTOM_SPACER_VH}vh` }} />
        </div>
      </div>
    </section>
  );
}
