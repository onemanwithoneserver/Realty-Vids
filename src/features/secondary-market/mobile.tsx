import { useState } from "react";
import { Icon, ResultsHeader } from "../../components/common";
import { SECONDARY_PROPERTIES, type SecondaryResultsProps } from "./data";

export function MobileSecondaryMarket({
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
    <section className="px-5 pb-28">
      <ResultsHeader
        market="Secondary Market"
        count="186 properties"
        onBack={onBack}
        onFilters={onFilters}
      />

      <div className="space-y-4">
        {items.map((prop) => {
          const isSaved = saved.has(prop.id);
          return (
            <article
              key={prop.id}
              onClick={onProperty}
              className="ios-card overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-[16/10] bg-black">
                <img src={prop.image} alt="" className="w-full h-full object-cover" />
                <span className="rv-badge-glass absolute top-3 left-3 !text-[10px]">
                  {prop.source} LISTING
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(prop.id);
                  }}
                  aria-label="Save property"
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
                  className="absolute bottom-3 left-3 h-8 px-3 rounded-full bg-black/70 border border-white/25 text-white text-[11px] font-semibold inline-flex items-center gap-1.5"
                >
                  <Icon name="play" size={16} />
                  <span>Walkthrough</span>
                </button>
              </div>
              <div className="p-4">
                <span className="ios-eyebrow !text-[10px]">{prop.place}</span>
                <div className="flex items-baseline justify-between gap-2 mt-1">
                  <h2 className="font-bold text-[17px] text-[var(--text-primary)]">{prop.title}</h2>
                  <strong className="text-[16px] font-extrabold text-[var(--accent)]">
                    {prop.price}
                  </strong>
                </div>
                <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
                  {prop.type} · {prop.size} · {prop.detail}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-semibold text-[var(--emerald)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--emerald)]" />
                  {prop.availability}
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {!showAll && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="btn-ios-secondary w-full mt-5"
        >
          Load more properties
        </button>
      )}
    </section>
  );
}
