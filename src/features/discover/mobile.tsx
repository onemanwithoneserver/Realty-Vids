import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { useViewport } from "../../lib/viewport";
import {
  FeaturedVideoBanner,
  HorizontalScrollRail,
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

export function MobileDiscover({
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
  const { locationLabel, radiusKm, isPreviewFrame, headerVisible } = useViewport();
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
    <section className="px-5 pt-6 pb-28">
      <span className="ios-eyebrow">Video-First Discovery</span>
      <div className="flex items-center justify-between gap-3 mt-1">
        <h1 className="ios-large-title text-[34px]">Discover</h1>
        <button
          type="button"
          onClick={isResale ? onSecondary : onPrimary}
          className="h-9 px-3.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[12px] font-bold inline-flex items-center gap-1 border border-[var(--accent-border)]"
        >
          <span>{isResale ? "186 Homes" : "42 Projects"}</span>
          <Icon name="chevron" size={17} />
        </button>
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
        Watch verified tours across {locationLabel} ({radiusKm} km).
      </p>

      {/* Quick Search Pill */}
      <div className="flex items-center gap-2.5 mt-5">
        <button
          type="button"
          onClick={onSearch}
          className="flex-1 h-11 px-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center gap-2.5 text-left text-[13px] text-[var(--text-secondary)] shadow-2xs"
        >
          <Icon name="search" size={20} className="text-[var(--text-tertiary)]" />
          <span className="truncate">Projects, localities, builders…</span>
        </button>
        <button
          type="button"
          onClick={onLocation}
          aria-label="Choose location"
          className="h-11 px-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--text-primary)] shrink-0"
        >
          <Icon name="pin" size={18} className="text-[var(--accent)]" />
          <span>{radiusKm} km</span>
        </button>
      </div>

      {/* iOS Segmented Market Switch */}
      <div
        className="w-full grid grid-cols-2 p-1 rounded-2xl bg-[var(--bg-chip)] border border-[var(--border-subtle)] mt-4"
        role="group"
        aria-label="Choose market"
      >
        {DISCOVER_MARKETS.map((item) => {
          const active = market === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setMarket(item.id)}
              className={`relative isolate py-2.5 px-3 rounded-xl text-center border-0 bg-transparent transition z-10 ${
                active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"
              }`}
            >
              {active && (
                <m.span
                  layoutId="mobile-market-seg"
                  transition={{ type: "spring", stiffness: 460, damping: 35 }}
                  className="ios-segment-pill !rounded-xl"
                />
              )}
              <strong className="relative z-10 block text-[13px] font-bold">{item.id}</strong>
              <small className="relative z-10 block text-[10px] text-[var(--text-tertiary)] mt-0.5 truncate">
                {item.inventoryBadge}
              </small>
            </button>
          );
        })}
      </div>

      {/* Sticky Category Chips */}
      <nav
        aria-label="Property categories"
        className={`sticky ${
          isPreviewFrame && headerVisible
            ? "top-[calc(var(--preview-bar-h)+var(--mobile-topbar-h))]"
            : "top-[var(--mobile-topbar-h)]"
        } z-30 -mx-5 px-5 py-3 my-4 ios-glass border-y border-[var(--border-subtle)] flex items-center gap-2.5 overflow-x-auto no-scrollbar`}
      >
        {DISCOVER_CATEGORIES.map((item) => {
          const active = category === item.label;
          return (
            <button
              key={item.label}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(item.label)}
              className={`h-9 px-3.5 rounded-full inline-flex items-center gap-1.5 text-[12px] font-semibold shrink-0 border transition ${
                active
                  ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white shadow-xs"
                  : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <FeaturedVideoBanner
        image={hero.image}
        videoSrc={videoSrc}
        eyebrow={isResale ? "RESALE WALKTHROUGH" : "PROJECT WALKTHROUGH"}
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

      {discoverVideoRails.map(({ eyebrow, title, videos }, row) => (
        <div className="mt-9" key={eyebrow}>
          <div className="flex items-end justify-between gap-2 mb-3.5">
            <div>
              <span className="ios-eyebrow !text-[10px]">{eyebrow}</span>
              <h2 className="ios-section-title text-[20px] mt-1">{title}</h2>
            </div>
            <button
              type="button"
              onClick={isResale ? onSecondary : onPrimary}
              className="text-[12px] font-bold text-[var(--accent)] bg-transparent border-0 shrink-0"
            >
              See all
            </button>
          </div>

          <HorizontalScrollRail ariaLabel={title}>
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
          </HorizontalScrollRail>
        </div>
      ))}

      <VerticalVideoFeed
        eyebrow={`${market.toUpperCase()} · ${category.toUpperCase()}`}
        title="More property videos"
        description="Keep scrolling through walkthroughs matched to your market and property filter."
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
