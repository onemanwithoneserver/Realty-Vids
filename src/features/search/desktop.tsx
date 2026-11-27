import { useMemo, useState } from "react";
import { DetailHeader, Icon } from "../../components/common";
import {
  FEATURED_SEARCH_RESULTS,
  POPULAR_LOCATIONS,
  RECENT_SEARCHES,
  SEARCH_CATEGORIES,
  type SearchPageProps,
} from "./data";

export function DesktopSearch({ onBack, onProject, onProperty, onLocation }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    return FEATURED_SEARCH_RESULTS.filter((item) => {
      const catMatch = category === "All" || item.category === category;
      const q = query.trim().toLowerCase();
      const qMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.meta.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [category, query]);

  const triggerTarget = (target: "project" | "property" | "location") => {
    if (target === "property") onProperty();
    else if (target === "location") onLocation();
    else onProject();
  };

  return (
    <section className="max-w-[1160px] mx-auto px-8 py-9">
      <DetailHeader label="DISCOVER SEARCH" onBack={onBack} />

      <div className="max-w-2xl mb-7">
        <span className="ios-eyebrow">Search Realty Vids</span>
        <h1 className="ios-large-title text-[46px] mt-1.5">What are you looking for?</h1>
      </div>

      {/* Frosted Spotlight Input */}
      <div className="h-16 px-6 rounded-[22px] bg-[var(--bg-elevated)] border-2 border-[var(--border-strong)] focus-within:border-[var(--accent)] shadow-md flex items-center gap-4 transition">
        <Icon name="search" size={26} className="text-[var(--accent)] shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects, builders, resale homes, localities or landmarks…"
          className="flex-1 bg-transparent border-0 focus:outline-none text-[17px] font-medium"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear query"
            className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] grid place-items-center text-[var(--text-secondary)] border-0"
          >
            <Icon name="close" size={18} />
          </button>
        )}
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-2 flex-wrap mt-4 mb-9">
        {SEARCH_CATEGORIES.map((item) => {
          const active = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`h-10 px-4 rounded-full text-[13px] font-semibold border transition ${
                active
                  ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                  : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {query || category !== "All" ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="ios-eyebrow">Best Matches</span>
            <strong className="text-[13px] text-[var(--text-secondary)]">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
              {query ? ` for “${query}”` : ""}
            </strong>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(filtered.length ? filtered : FEATURED_SEARCH_RESULTS).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => triggerTarget(item.target)}
                className="ios-card ios-card-interactive p-4 flex items-center gap-4 text-left"
              >
                {"image" in item ? (
                  <img
                    src={item.image}
                    alt=""
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                ) : "monogram" in item ? (
                  <div className="w-20 h-20 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] font-extrabold text-[20px] grid place-items-center shrink-0">
                    {item.monogram}
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-2xl bg-[var(--bg-subtle)] text-[var(--accent)] grid place-items-center shrink-0">
                    <Icon name="pin" size={28} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="ios-eyebrow !text-[10px]">{item.type}</span>
                  <strong className="block mt-1 font-bold text-[17px] text-[var(--text-primary)] truncate">
                    {item.title}
                  </strong>
                  <p className="mt-1 text-[13px] text-[var(--text-secondary)] truncate">
                    {item.meta}
                  </p>
                </div>
                <Icon name="chevron" size={22} className="text-[var(--text-tertiary)] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          <div className="lg:col-span-7 space-y-6">
            <section className="ios-card p-6">
              <span className="ios-eyebrow mb-3 block">Recent Searches</span>
              <div className="space-y-2">
                {RECENT_SEARCHES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setQuery(item)}
                    className="w-full h-12 px-4 rounded-xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] flex items-center gap-3 text-left border-0 transition"
                  >
                    <Icon name="clock" size={19} className="text-[var(--text-tertiary)]" />
                    <strong className="flex-1 text-[14px] font-semibold text-[var(--text-primary)]">
                      {item}
                    </strong>
                    <Icon name="arrow" size={18} className="text-[var(--text-tertiary)]" />
                  </button>
                ))}
              </div>
            </section>

            <section className="ios-card p-6">
              <span className="ios-eyebrow mb-3 block">Popular Locations</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {POPULAR_LOCATIONS.map(({ rank, place, count }) => (
                  <button
                    key={place}
                    type="button"
                    onClick={onLocation}
                    className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] flex items-center gap-3 text-left border-0 transition"
                  >
                    <span className="w-9 h-9 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] font-extrabold text-[12px] grid place-items-center shrink-0">
                      {rank}
                    </span>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-[14px] font-bold text-[var(--text-primary)] truncate">
                        {place}
                      </strong>
                      <small className="block text-[12px] text-[var(--text-secondary)]">
                        {count}
                      </small>
                    </div>
                    <Icon name="chevron" size={18} className="text-[var(--text-tertiary)]" />
                  </button>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-5 ios-card p-6 space-y-4">
            <div>
              <span className="ios-eyebrow">Suggested For You</span>
              <h2 className="ios-section-title text-[22px] mt-1">
                Projects matched to your preferences
              </h2>
            </div>
            {FEATURED_SEARCH_RESULTS.slice(0, 3).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => triggerTarget(item.target)}
                className="w-full p-3 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] flex items-center gap-3.5 text-left border-0 transition"
              >
                {"image" in item && (
                  <img
                    src={item.image}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <strong className="block text-[15px] font-bold text-[var(--text-primary)] truncate">
                    {item.title}
                  </strong>
                  <small className="block mt-0.5 text-[12px] text-[var(--text-secondary)] truncate">
                    {item.meta}
                  </small>
                </div>
                <Icon name="chevron" size={19} className="text-[var(--text-tertiary)]" />
              </button>
            ))}
          </aside>
        </div>
      )}
    </section>
  );
}
