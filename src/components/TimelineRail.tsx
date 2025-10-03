import { useMemo } from "react";
import type { TimelineEntry } from "../data/timeline";

export default function TimelineRail({
  entries,
  activeId,
  onJump,
}: {
  entries: TimelineEntry[];
  activeId?: string | null;
  onJump: (id: string) => void;
}) {
  // (left here if you want to use it later)
  const activeIdx = useMemo(
    () => Math.max(0, entries.findIndex((e) => e.id === activeId)),
    [entries, activeId]
  );

  return (
    <aside className="hidden md:block w-56 pr-6">
      <div className="sticky top-20">
        <h3 className="text-sm uppercase tracking-wider text-brand-subtext mb-4">
          Timeline
        </h3>

        <div className="relative pl-5">
          {/* Vertical rail */}
          <div className="absolute left-[9px] top-0 bottom-0 w-[2px] bg-white/10" />

          <ul className="space-y-5">
            {entries.map((e) => {
              const active = e.id === activeId;
              return (
                <li key={e.id}>
                  <button
                    onClick={() => onJump(e.id)}
                    className={`relative flex items-start gap-3 group text-left transition
                      ${active ? "text-brand-text" : "text-brand-subtext hover:text-brand-text"}`}
                  >
                    {/* Dot */}
                    <span
                      className={`absolute -left-[11px] top-1 h-3 w-3 rounded-full border
                        ${
                          active
                            ? "bg-brand-accent border-brand-accent shadow-[0_0_8px_2px_rgba(79,195,247,0.6)]"
                            : "bg-brand-gray border-white/20 group-hover:border-brand-accent"
                        }`}
                    />
                    <div>
                      <div className="text-xs uppercase tracking-wide opacity-80">{e.date}</div>
                      <div className="text-sm font-semibold">{e.title}</div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
