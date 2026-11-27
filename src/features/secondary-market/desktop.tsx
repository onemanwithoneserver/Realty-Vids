import { useState } from "react";
import { Icon, ResultsHeader } from "../../components/common";
import { SECONDARY_PROPERTIES, type SecondaryResultsProps } from "./data";

export function DesktopSecondaryMarket({
  saved,
  toggle,
  onBack,
  onProperty,
  onVideo,
  onFilters,
}: SecondaryResultsProps) {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? SECONDARY_PROPERTIES : SECONDARY_PROPERTIES.slice(0, 4);

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <ResultsHeader
        market="Secondary Market"
        count="186 properties"
        onBack={onBack}
        onFilters={onFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((prop) => {
          const isSaved = saved.has(prop.id);
          return (
            <article
              key={prop.id}
              onClick={onProperty}
              className="group ios-card ios-card-interactive overflow-hidden cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-black overflow-hidden">
                <img
                  src={prop.image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                <span className="rv-badge-glass absolute top-4 left-4">{prop.source} LISTING</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(prop.id);
                  }}
                  aria-label="Save property"
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full grid place-items-center backdrop-blur-md border transition ${
                    isSaved
                      ? "bg-[var(--accent-fill)] border-white/50 text-white"
                      : "bg-black/65 border-white/30 text-white hover:bg-black/80"
                  }`}
                >
                  <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={20} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideo();
                  }}
                  className="absolute bottom-4 left-4 h-10 px-4 rounded-full bg-black/70 hover:bg-[var(--accent-fill)] backdrop-blur-md border border-white/35 text-white text-[13px] font-semibold inline-flex items-center gap-2 transition"
                >
                  <Icon name="play" size={19} />
                  <span>Watch Walkthrough</span>
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div>
                  <span className="ios-eyebrow !text-[10px]">{prop.place}</span>
                  <div className="flex items-start justify-between gap-4 mt-1">
                    <div>
                      <h2 className="font-[800] text-[22px] tracking-[-0.024em] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition">
                        {prop.title}
                      </h2>
                      <p className="mt-0.5 text-[14px] font-medium text-[var(--text-secondary)]">
                        {prop.type}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <strong className="block font-[800] text-[22px] text-[var(--text-primary)]">
                        {prop.price}
                      </strong>
                      <span className="text-[12px] font-semibold text-[var(--text-tertiary)]">
                        {prop.size}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-[13px]">
                  <span className="text-[var(--text-secondary)]">{prop.detail}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--emerald)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--emerald)]" />
                    {prop.availability}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {!showAll && (
        <div className="flex justify-center mt-9">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="btn-ios-secondary !px-7"
          >
            <span>Load more properties</span>
            <Icon name="expand" size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
