import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { useViewport } from "../../lib/viewport";
import {
  FeaturedVideoBanner,
  Icon,
  VerticalVideoFeed,
  VideoRailCard,
} from "../../components/common";
import {
  buildDiscoverVerticalPool,
  DISCOVER_CATEGORIES,
  DISCOVER_HERO_OPTIONS,
  DISCOVER_MARKETS,
  DISCOVER_VIDEO_VIDEOS,
  discoverVideoRails,
  type DiscoverProps,
} from "./data";

export function DesktopDiscover({
  saved,
  toggle,
  onVideo,
  onProject,
  onProperty,
  onSearch,
  onLocation,
  onPrimary,
  onSecondary,
  onEnquire,
  previewPaused,
}: DiscoverProps) {
  const { locationLabel, radiusKm } = useViewport();
  const [category, setCategory] = useState("All Properties");
  const [market, setMarket] = useState("Primary Market");
  const isResale = market === "Secondary Market";
  const hero = DISCOVER_HERO_OPTIONS[category][isResale ? "secondary" : "primary"];
  const verticalItems = useMemo(
    () => buildDiscoverVerticalPool(market, category),
    [category, market],
  );
  const videoSrc = isResale ? DISCOVER_VIDEO_VIDEOS.secondary : DISCOVER_VIDEO_VIDEOS.primary;

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      {/* Editorial Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
        <div>
          <span className="ios-eyebrow">Video-First Property Discovery</span>
          <h1 className="ios-large-title text-[48px] mt-1.5">Discover</h1>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)] max-w-xl">
            Watch the spaces, neighbourhoods and verified projects changing how {locationLabel}{" "}
            lives.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button type="button" onClick={onSearch} className="btn-ios-secondary !min-h-[44px]">
            <Icon name="search" size={20} />
            <span>Search</span>
          </button>
          <button type="button" onClick={onLocation} className="btn-ios-secondary !min-h-[44px]">
            <Icon name="pin" size={20} className="text-[var(--accent)]" />
            <span>
              {locationLabel} · {radiusKm} km
            </span>
          </button>
          <button
            type="button"
            onClick={isResale ? onSecondary : onPrimary}
            className="btn-ios-primary !min-h-[44px]"
          >
            <span>{isResale ? "Browse 186 Properties" : "Browse 42 Projects"}</span>
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>

      {/* Market Segment Cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        role="group"
        aria-label="Choose property market"
      >
        {DISCOVER_MARKETS.map((item) => {
          const active = market === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setMarket(item.id)}
              className={`relative p-5 rounded-[22px] border text-left flex items-center justify-between gap-4 transition ${
                active
                  ? "bg-[var(--bg-elevated)] border-[var(--accent)] shadow-md"
                  : "bg-[var(--bg-elevated)]/60 border-[var(--border-subtle)] hover:border-[var(--border-strong)]"
              }`}
            >
              <div className="flex items-center gap-4">
                <span
                  className={`w-12 h-12 rounded-2xl grid place-items-center shrink-0 transition ${
                    active
                      ? "rv-accent-fill text-white shadow-[var(--accent-glow)]"
                      : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                  }`}
                >
                  <Icon name={item.id === "Primary Market" ? "apartment" : "home"} size={25} />
                </span>
                <div>
                  <strong className="block font-[750] text-[17px] tracking-[-0.02em] text-[var(--text-primary)]">
                    {item.id}
                  </strong>
                  <span className="block mt-0.5 text-[13px] text-[var(--text-secondary)]">
                    {item.detail}
                  </span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-[12px] font-bold shrink-0 ${
                  active
                    ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                    : "bg-[var(--bg-subtle)] text-[var(--text-tertiary)]"
                }`}
              >
                {item.inventoryBadge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sticky iOS Category Filter Rail */}
      <nav
        aria-label="Property categories"
        className="sticky top-[calc(var(--preview-bar-h)+var(--topbar-h))] z-20 -mx-2 px-2 py-3 mb-6 ios-glass rounded-2xl flex items-center gap-2 overflow-x-auto no-scrollbar"
      >
        {DISCOVER_CATEGORIES.map((item) => {
          const active = category === item.label;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(item.label)}
              className={`relative isolate h-11 px-5 rounded-full inline-flex items-center gap-2.5 text-[13px] font-semibold border-0 transition shrink-0 ${
                active
                  ? "text-white font-bold"
                  : "bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] shadow-2xs"
              }`}
            >
              {active && (
                <m.span
                  layoutId="discover-desktop-cat-pill"
                  transition={{ type: "spring", stiffness: 460, damping: 34 }}
                  className="absolute inset-0 z-0 pointer-events-none rounded-full rv-accent-fill shadow-[var(--accent-glow)]"
                />
              )}
              <span className="relative z-10 inline-flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={20} />
              </span>
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Featured Video Stage */}
      <FeaturedVideoBanner
        image={hero.image}
        videoSrc={videoSrc}
        eyebrow={isResale ? "FEATURED HOME WALKTHROUGH" : "FEATURED PROJECT WALKTHROUGH"}
        title={hero.title}
        creator={isResale ? "Realty Vids Resale Desk" : "Realty Vids Studios"}
        category={`${market} · ${category}`}
        duration={isResale ? "04:18" : "06:24"}
        summary={hero.description}
        badge={hero.location}
        verified={isResale}
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo(isResale ? "property" : "project", "landscape", {
            title: hero.title,
            creator: isResale ? "Realty Vids Resale Desk" : "Realty Vids Studios",
            creatorMeta: `${market} · ${category} · ${hero.facts}`,
            poster: hero.image,
            eyebrow: `${isResale ? "HOME WALKTHROUGH" : "PROJECT WALKTHROUGH"} · ${
              isResale ? "04:18" : "06:24"
            }`,
            videoSrc,
          })
        }
        onDetails={isResale ? onProperty : onProject}
        detailsLabel={isResale ? "View Property" : "View Project"}
      />

      {/* Curated Video Rails */}
      {discoverVideoRails.map(({ eyebrow, title, videos }, row) => (
        <div className="mt-7" key={eyebrow}>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <span className="ios-eyebrow">{eyebrow}</span>
              <h2 className="ios-section-title text-[26px] mt-1">{title}</h2>
            </div>
            <button
              type="button"
              onClick={isResale ? onSecondary : onPrimary}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)] hover:underline bg-transparent border-0"
            >
              <span>See all</span>
              <Icon name="arrow" size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map(([image, vtitle, creator, context, duration, label], i) => (
              <VideoRailCard
                key={`${row}-${vtitle}`}
                image={image}
                title={vtitle}
                creator={creator}
                context={context}
                duration={duration}
                label={label}
                saved={saved}
                saveId={`discover-stream-${row}-${i}`}
                toggle={toggle}
                onOpen={() =>
                  onVideo(isResale ? "property" : "project", "landscape", {
                    title: vtitle,
                    creator,
                    creatorMeta: context,
                    poster: image,
                    eyebrow: `${label} · ${duration}`,
                  })
                }
              />
            ))}
          </div>
        </div>
      ))}

      <VerticalVideoFeed
        eyebrow={`${market.toUpperCase()} · ${category.toUpperCase()}`}
        title="More property videos"
        description="Keep scrolling through verified video walkthroughs matched to your selected market and property type."
        items={verticalItems}
        contextKey={`discover-${market}-${category}`}
        saved={saved}
        toggle={toggle}
        onVideo={onVideo}
        onDetails={isResale ? onProperty : onProject}
        onEnquire={onEnquire}
      />
    </section>
  );
}
