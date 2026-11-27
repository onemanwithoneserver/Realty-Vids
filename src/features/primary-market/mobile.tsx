import { useState } from "react";
import { Icon, PlayButton, ResultsHeader } from "../../components/common";
import { PRIMARY_PROJECTS, type PrimaryResultsProps } from "./data";

export function MobilePrimaryMarket({
  saved,
  toggle,
  onBack,
  onProject,
  onVideo,
  onFilters,
}: PrimaryResultsProps) {
  const [showMap, setShowMap] = useState(false);

  return (
    <section className="px-5 pb-28">
      <ResultsHeader
        market="Primary Market"
        count="42 projects"
        onBack={onBack}
        onFilters={onFilters}
      />

      <button
        type="button"
        onClick={() => setShowMap((v) => !v)}
        className="w-full mb-4 p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center justify-between text-[13px] font-bold"
      >
        <span className="inline-flex items-center gap-2">
          <Icon name="pin" size={19} className="text-[var(--accent)]" />
          <span>{showMap ? "Hide Market Map" : "View 42 Projects on Map"}</span>
        </span>
        <Icon
          name="expand"
          size={20}
          className={showMap ? "rotate-180 transition" : "transition"}
        />
      </button>

      {showMap && (
        <div className="rv-radar-map h-48 mb-4 p-3 flex items-center justify-center">
          <span className="rv-radar-ring w-32 h-32" />
          <button
            type="button"
            onClick={onProject}
            className="btn-ios-primary !min-h-[38px] !text-[12px] relative z-10"
          >
            <Icon name="pin" size={16} />
            <span>Explore Worli Cluster (14)</span>
          </button>
        </div>
      )}

      <div className="space-y-4">
        {PRIMARY_PROJECTS.map((proj) => {
          const isSaved = saved.has(proj.id);
          return (
            <article
              key={proj.id}
              onClick={onProject}
              className="ios-card overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-black">
                <img src={proj.image} alt="" className="w-full h-full object-cover" />
                <span className="rv-badge-glass absolute top-3 left-3 !bg-[var(--accent-fill)] !text-[10px]">
                  {proj.status}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(proj.id);
                  }}
                  aria-label="Save project"
                  className={`absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur-md border ${
                    isSaved
                      ? "bg-[var(--accent-fill)] border-white/50 text-white"
                      : "bg-black/65 border-white/30 text-white"
                  }`}
                >
                  <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideo();
                  }}
                  className="absolute bottom-3 left-3 h-8 px-3 rounded-full bg-black/70 text-white text-[11px] font-semibold inline-flex items-center gap-1.5 border border-white/25"
                >
                  <Icon name="play" size={16} />
                  <span>{proj.videos}</span>
                </button>
              </div>
              <div className="p-4">
                <span className="ios-eyebrow !text-[10px]">
                  {proj.place} · {proj.builder}
                </span>
                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <h2 className="font-bold text-[18px] text-[var(--text-primary)]">{proj.title}</h2>
                  <strong className="text-[15px] font-extrabold text-[var(--accent)] shrink-0">
                    {proj.price}
                  </strong>
                </div>
                <p className="mt-1.5 text-[12px] text-[var(--text-secondary)]">
                  {proj.config} · Possession {proj.possession}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
