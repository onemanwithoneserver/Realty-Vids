import { useState } from "react";
import { DetailHeader, Icon } from "../../components/common";
import {
  FEATURED_SEARCH_RESULTS,
  POPULAR_LOCATIONS,
  RECENT_SEARCHES,
  SEARCH_CATEGORIES,
  type SearchPageProps,
} from "./data";

export function MobileSearch({ onBack, onProject, onProperty, onLocation }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const triggerTarget = (target: "project" | "property" | "location") => {
    if (target === "property") onProperty();
    else if (target === "location") onLocation();
    else onProject();
  };

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="Search" onBack={onBack} />

      <h1 className="ios-large-title text-[30px]">Search</h1>

      <div className="mt-4 h-12 px-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center gap-2.5 shadow-2xs">
        <Icon name="search" size={21} className="text-[var(--accent)] shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Projects, builders, localities…"
          className="flex-1 bg-transparent border-0 focus:outline-none text-[15px]"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="w-7 h-7 rounded-full bg-[var(--bg-subtle)] grid place-items-center border-0"
          >
            <Icon name="close" size={15} />
          </button>
        )}
      </div>

      <div className="-mx-5 px-5 scroll-px-5 flex gap-2.5 overflow-x-auto no-scrollbar my-4 py-1">
        {SEARCH_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={`h-8 px-3.5 rounded-full text-[12px] font-semibold shrink-0 border ${
              category === item
                ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {query ? (
        <div className="space-y-2.5 mt-4">
          <span className="ios-eyebrow !text-[10px]">Matches for “{query}”</span>
          {FEATURED_SEARCH_RESULTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => triggerTarget(item.target)}
              className="w-full ios-card p-3 flex items-center gap-3 text-left"
            >
              {"image" in item ? (
                <img
                  src={item.image}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] font-bold grid place-items-center shrink-0">
                  <Icon name="pin" size={22} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="ios-eyebrow !text-[9px]">{item.type}</span>
                <strong className="block font-bold text-[14px] text-[var(--text-primary)] truncate">
                  {item.title}
                </strong>
                <small className="block text-[12px] text-[var(--text-secondary)] truncate">
                  {item.meta}
                </small>
              </div>
              <Icon name="chevron" size={18} className="text-[var(--text-tertiary)]" />
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-5 mt-4">
          <div className="ios-card p-4 space-y-2">
            <span className="ios-eyebrow !text-[10px] block mb-1">Recent Searches</span>
            {RECENT_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="w-full h-10 px-3 rounded-xl bg-[var(--bg-subtle)] flex items-center gap-2.5 text-left border-0"
              >
                <Icon name="clock" size={17} className="text-[var(--text-tertiary)]" />
                <span className="flex-1 text-[13px] font-medium">{item}</span>
                <Icon name="arrow" size={16} className="text-[var(--text-tertiary)]" />
              </button>
            ))}
          </div>

          <div className="ios-card p-4 space-y-2">
            <span className="ios-eyebrow !text-[10px] block mb-1">Popular Locations</span>
            {POPULAR_LOCATIONS.map(({ rank, place, count }) => (
              <button
                key={place}
                type="button"
                onClick={onLocation}
                className="w-full p-2.5 rounded-xl bg-[var(--bg-subtle)] flex items-center gap-3 text-left border-0"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-[11px] grid place-items-center">
                  {rank}
                </span>
                <strong className="flex-1 text-[13px] font-bold">{place}</strong>
                <small className="text-[11px] text-[var(--text-secondary)]">{count}</small>
                <Icon name="chevron" size={16} className="text-[var(--text-tertiary)]" />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
