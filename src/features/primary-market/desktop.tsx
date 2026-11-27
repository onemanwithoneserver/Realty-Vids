import { useState } from "react";
import { Icon, PlayButton, ResultsHeader } from "../../components/common";
import { PRIMARY_MAP_MARKERS, PRIMARY_PROJECTS, type PrimaryResultsProps } from "./data";

export function DesktopPrimaryMarket({
  saved,
  toggle,
  onBack,
  onProject,
  onVideo,
  onFilters,
}: PrimaryResultsProps) {
  const [moveSearch, setMoveSearch] = useState(true);

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <ResultsHeader
        market="Primary Market"
        count="42 projects"
        onBack={onBack}
        onFilters={onFilters}
      />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
        <div className="xl:col-span-7 space-y-5">
          {PRIMARY_PROJECTS.map((proj) => {
            const isSaved = saved.has(proj.id);
            return (
              <article
                key={proj.id}
                onClick={onProject}
                className="group ios-card ios-card-interactive overflow-hidden grid grid-cols-1 md:grid-cols-12 cursor-pointer"
              >
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-black overflow-hidden">
                  <img
                    src={proj.image}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="rv-badge-glass absolute top-3 left-3 !bg-[var(--accent-fill)] !border-white/30">
                    {proj.status}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVideo();
                    }}
                    className="absolute bottom-3 left-3 h-9 pl-1.5 pr-3.5 rounded-full bg-black/75 backdrop-blur-md border border-white/25 text-white text-[12px] font-semibold inline-flex items-center gap-2 hover:bg-[var(--accent-fill)] transition"
                  >
                    <span className="scale-75 -ml-1">
                      <PlayButton small />
                    </span>
                    <span>{proj.videos}</span>
                  </button>
                </div>

                <div className="md:col-span-7 p-6 flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="ios-eyebrow !text-[10px]">
                        {proj.place} · By {proj.builder}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(proj.id);
                        }}
                        className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-semibold border transition ${
                          isSaved
                            ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                            : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)]"
                        }`}
                      >
                        <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={16} />
                        <span>{isSaved ? "Saved" : "Save"}</span>
                      </button>
                    </div>
                    <h2 className="mt-1.5 font-[800] text-[22px] tracking-[-0.025em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition">
                      {proj.title}
                    </h2>
                    <p className="mt-1 font-bold text-[18px] text-[var(--text-primary)]">
                      {proj.price}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[var(--bg-subtle)]">
                    <div>
                      <small className="block text-[10px] font-bold uppercase text-[var(--text-tertiary)]">
                        Config
                      </small>
                      <strong className="text-[12px] font-bold text-[var(--text-primary)]">
                        {proj.config}
                      </strong>
                    </div>
                    <div>
                      <small className="block text-[10px] font-bold uppercase text-[var(--text-tertiary)]">
                        Status
                      </small>
                      <strong className="text-[12px] font-bold text-[var(--text-primary)]">
                        {proj.status}
                      </strong>
                    </div>
                    <div>
                      <small className="block text-[10px] font-bold uppercase text-[var(--text-tertiary)]">
                        Possession
                      </small>
                      <strong className="text-[12px] font-bold text-[var(--text-primary)]">
                        {proj.possession}
                      </strong>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)]">
                    <span>Explore project dossier</span>
                    <Icon name="arrow" size={17} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="xl:col-span-5 sticky top-[calc(var(--preview-bar-h)+var(--topbar-h)+24px)]">
          <div className="rv-radar-map h-[540px] p-5 flex flex-col justify-between shadow-md">
            <span className="rv-radar-ring w-44 h-44" />
            <span className="rv-radar-ring w-80 h-80 opacity-60" />

            <div className="flex items-center justify-between relative z-10">
              <span className="px-3 py-1.5 rounded-full ios-glass border border-[var(--border-subtle)] text-[11px] font-bold uppercase tracking-wider">
                Interactive Market Map
              </span>
              <button
                type="button"
                onClick={() => setMoveSearch((v) => !v)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition ${
                  moveSearch
                    ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                    : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
                }`}
              >
                {moveSearch ? "✓ Search as map moves" : "Search as map moves"}
              </button>
            </div>

            {PRIMARY_MAP_MARKERS.map((m) => (
              <button
                key={m.area}
                type="button"
                onClick={onProject}
                style={{ left: `${m.left}%`, top: `${m.top}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--accent-fill)] hover:text-white border border-[var(--accent-border)] shadow-md inline-flex items-center gap-1.5 text-[12px] font-bold transition"
              >
                <Icon name="apartment" size={16} />
                <span>{m.area}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] group-hover:bg-white/20 group-hover:text-white text-[11px] transition">
                  {m.count}
                </span>
              </button>
            ))}

            <div className="relative z-10 p-4 rounded-2xl ios-glass-heavy border border-[var(--border-subtle)] flex items-center justify-between">
              <div>
                <strong className="block text-[14px] font-bold text-[var(--text-primary)]">
                  42 verified projects in view
                </strong>
                <span className="text-[12px] text-[var(--text-secondary)]">
                  Select a cluster pin to inspect project films
                </span>
              </div>
              <button
                type="button"
                onClick={onFilters}
                className="btn-ios-secondary !min-h-[38px] !px-3.5 !text-[12px]"
              >
                Refine
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
