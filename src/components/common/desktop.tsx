import { useState } from "react";
import { getThemeBrandAssets } from "../../lib/assets";
import { useViewport } from "../../lib/viewport";
import type { AppTheme } from "../../lib/types";
import {
  ICON_MAP,
  useInfiniteVideoFeed,
  useVideoPreview,
  type FeaturedBannerProps,
  type IconName,
  type ResultsToolbarProps,
  type VerticalFeedProps,
  type VideoCardProps,
} from "./data";
import type { VerticalVideoItem } from "../../lib/types";

export function SharedIcon({
  name,
  size = 22,
  className = "",
}: {
  name: IconName | string;
  size?: number;
  className?: string;
}) {
  const Component = ICON_MAP[name as IconName] ?? ICON_MAP.spark;
  return <Component sx={{ fontSize: size }} className={className} aria-hidden="true" />;
}

export function BrandLogo({
  compact = false,
  themeOverride,
  className = "",
}: {
  compact?: boolean;
  themeOverride?: AppTheme;
  className?: string;
}) {
  const { theme } = useViewport();
  const activeTheme = themeOverride ?? theme;
  const brand = getThemeBrandAssets(activeTheme);

  if (compact) {
    return (
      <div
        className={`w-9 h-9 rounded-xl grid place-items-center shrink-0 select-none ${
          activeTheme === "dark"
            ? "bg-white/10 border border-white/15"
            : "bg-[var(--accent-soft)] border border-[var(--accent-border)]"
        } ${className}`}
      >
        <img src={brand.symbol} alt="Realty Vids" className="w-6 h-6 object-contain" />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <span className="rv-brand-logo h-10">
        <img src={brand.logo} alt="Realty Vids" />
      </span>
    </div>
  );
}

export function PlayOrb({ small = false }: { small?: boolean }) {
  return (
    <span className={`rv-play-orb ${small ? "is-sm" : ""}`}>
      <SharedIcon name="playTriangle" size={small ? 24 : 32} />
    </span>
  );
}

export function DesktopDetailHeader({ label, onBack }: { label: string; onBack: () => void }) {
  const { onShareFeedback } = useViewport();
  return (
    <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-subtle)]">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition"
      >
        <SharedIcon name="back" size={16} />
        <span>Back</span>
      </button>
      <span className="ios-eyebrow text-[var(--text-tertiary)]">{label}</span>
      <button
        type="button"
        onClick={() => onShareFeedback("Link copied to clipboard.")}
        aria-label="Share page"
        className="inline-flex items-center gap-2 px-4 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[13px] font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition"
      >
        <SharedIcon name="share" size={18} />
        <span>Share</span>
      </button>
    </div>
  );
}

export function DesktopFeaturedBanner(props: FeaturedBannerProps) {
  const {
    image,
    videoSrc,
    eyebrow,
    title,
    creator,
    category,
    duration,
    summary,
    badge,
    verified,
    previewPaused,
    onWatch,
    onDetails,
    detailsLabel,
  } = props;
  const {
    containerRef,
    videoRef,
    shouldLoad,
    ready,
    failed,
    muted,
    setMuted,
    reducedMotion,
    onCanPlay,
    onError,
  } = useVideoPreview(videoSrc, previewPaused);

  return (
    <article
      ref={containerRef}
      onClick={onWatch}
      className={`rv-hero-banner rv-hero-banner-desktop group ${
        ready && !failed && !reducedMotion ? "is-video-ready" : ""
      }`}
    >
      <img className="rv-hero-media" src={image} alt="" />
      <video
        key={videoSrc}
        ref={videoRef}
        className="rv-hero-media rv-hero-video"
        autoPlay={!reducedMotion}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster={image}
        onCanPlay={onCanPlay}
        onError={onError}
        aria-hidden="true"
      >
        {shouldLoad && <source src={videoSrc} type="video/webm" />}
      </video>
      <div className="rv-hero-scrim" />

      {/* Top Metadata Bar */}
      <div className="absolute top-6 left-7 right-7 flex items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="rv-badge-glass">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            {eyebrow}
          </span>
          {verified && (
            <span className="rv-badge-glass !bg-emerald-950/85 !border-emerald-400/50 text-emerald-100">
              <SharedIcon name="verified" size={15} />
              Verified
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {badge && <span className="rv-badge-glass">{badge}</span>}
          <span className="rv-badge-glass">{duration}</span>
          {ready && !failed && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              aria-label={muted ? "Unmute preview" : "Mute preview"}
              className="w-9 h-9 rounded-full bg-black/65 border border-white/25 backdrop-blur-md grid place-items-center text-white hover:bg-black/80 transition"
            >
              <SharedIcon name={muted ? "mute" : "volume"} size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Bottom Editorial Copy */}
      <div className="absolute bottom-7 left-8 right-8 flex items-end justify-between gap-8 z-10">
        <div className="max-w-2xl">
          <h2 className="font-[800] text-[clamp(30px,3.2vw,46px)] leading-[1.03] tracking-[-0.038em] text-white whitespace-pre-line drop-shadow-sm">
            {title}
          </h2>
          <div className="flex items-center gap-2.5 mt-3 text-[13px] text-white/95 font-medium">
            <span className="font-semibold text-white">{creator}</span>
            <span className="opacity-65">•</span>
            <span>{category}</span>
          </div>
          <p className="mt-2.5 text-[15px] leading-relaxed text-white/90 max-w-xl line-clamp-2">
            {summary}
          </p>
          <div className="flex items-center gap-3 mt-5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onWatch();
              }}
              className="btn-ios-primary !h-12 !px-6 text-[14px]"
            >
              <SharedIcon name="play" size={22} />
              <span>Watch Film</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDetails();
              }}
              className="btn-ios-glass !h-12 !px-6"
            >
              <span>{detailsLabel}</span>
              <SharedIcon name="arrow" size={18} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export function DesktopVideoCard({
  image,
  title,
  creator,
  context,
  duration,
  label,
  portrait = false,
  saved,
  saveId,
  toggle,
  onOpen,
}: VideoCardProps) {
  const isSaved = saved.has(saveId);
  return (
    <article
      onClick={onOpen}
      className="group ios-card ios-card-interactive overflow-hidden cursor-pointer flex flex-col"
    >
      <div
        className={`relative overflow-hidden bg-black ${
          portrait ? "aspect-[9/14]" : "aspect-[16/10]"
        }`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25 pointer-events-none" />
        <span className="rv-badge-glass absolute top-3 left-3 !text-[10px] !py-1 !px-2.5">
          {label}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggle(saveId);
          }}
          aria-label={isSaved ? "Remove saved video" : "Save video"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur-md border transition ${
            isSaved
              ? "bg-[var(--accent-fill)] border-white/50 text-white"
              : "bg-black/65 border-white/30 text-white hover:bg-black/80"
          }`}
        >
          <SharedIcon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
        </button>
        <div className="absolute inset-0 grid place-items-center pointer-events-none opacity-90 group-hover:opacity-100 transition">
          <PlayOrb small />
        </div>
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide">
          {duration}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-bold text-[15px] leading-snug tracking-[-0.015em] text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
            {title}
          </h3>
          <p className="mt-1.5 text-[13px] font-medium text-[var(--text-secondary)] truncate">
            {creator}
          </p>
        </div>
      </div>
    </article>
  );
}

function DesktopVerticalCard({
  item,
  saved,
  toggle,
  onVideo,
  onDetails,
  onEnquire,
}: {
  item: VerticalVideoItem;
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: VerticalFeedProps["onVideo"];
  onDetails?: () => void;
  onEnquire?: () => void;
}) {
  const { onShareFeedback } = useViewport();
  const [liked, setLiked] = useState(false);
  const saveId = `vertical-${item.id}`;
  const isSaved = saved.has(saveId);
  const initials = item.creator
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <article className="ios-card overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
      <button
        type="button"
        onClick={() =>
          onVideo(item.kind, item.format, {
            title: item.title,
            creator: item.creator,
            creatorMeta: item.creatorMeta,
            poster: item.poster,
            eyebrow: item.eyebrow,
          })
        }
        aria-label={`Play ${item.title}`}
        className="lg:col-span-7 relative aspect-[16/10] bg-black overflow-hidden group text-left border-0 p-0"
      >
        <img
          src={item.poster}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />
        <span className="rv-badge-glass absolute top-4 left-4">{item.category}</span>
        <span className="rv-badge-glass absolute bottom-4 right-4">
          {item.eyebrow.split(" · ").at(-1)}
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <PlayOrb />
        </span>
      </button>

      <div className="lg:col-span-5 p-6 flex flex-col justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-[13px] grid place-items-center shrink-0 border border-[var(--accent-border)]">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <strong className="text-[14px] font-bold text-[var(--text-primary)] truncate">
                  {item.creator}
                </strong>
                {item.verified && (
                  <SharedIcon
                    name="verified"
                    size={17}
                    className="text-[var(--emerald)] shrink-0"
                  />
                )}
              </div>
              <span className="block text-[12px] text-[var(--text-tertiary)] truncate">
                {item.creatorMeta}
              </span>
            </div>
          </div>

          <h3 className="mt-4 font-[750] text-[20px] leading-snug tracking-[-0.024em] text-[var(--text-primary)]">
            {item.title}
          </h3>

          <div className="mt-4 p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] grid place-items-center text-[var(--accent)] shrink-0 shadow-xs">
              <SharedIcon name={item.kind === "education" ? "play" : "pin"} size={20} />
            </div>
            <div className="min-w-0">
              <strong className="block text-[13px] font-semibold text-[var(--text-primary)] truncate">
                {item.contextTitle}
              </strong>
              <span className="block text-[12px] text-[var(--text-secondary)] truncate">
                {item.contextMeta}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full text-[13px] font-semibold border transition ${
                liked
                  ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                  : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <SharedIcon name={liked ? "heartFilled" : "heart"} size={19} />
              <span>{liked ? "Liked" : item.engagement}</span>
            </button>
            <button
              type="button"
              onClick={() => toggle(saveId)}
              className={`inline-flex items-center gap-2 h-10 px-3.5 rounded-full text-[13px] font-semibold border transition ${
                isSaved
                  ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                  : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              <SharedIcon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
              <span>{isSaved ? "Saved" : "Save"}</span>
            </button>
            <button
              type="button"
              onClick={() => onShareFeedback(`Shared "${item.title}"`)}
              className="inline-flex items-center gap-2 h-10 px-3.5 rounded-full text-[13px] font-semibold bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition border-0"
            >
              <SharedIcon name="share" size={19} />
              <span>Share</span>
            </button>
          </div>

          {(onDetails || (onEnquire && item.kind !== "education")) && (
            <div className="flex items-center gap-2.5 pt-3 border-t border-[var(--border-subtle)]">
              {onDetails && (
                <button
                  type="button"
                  onClick={onDetails}
                  className="group/details btn-ios-secondary !min-h-[40px] !px-5 !text-[13px] hover:!border-[var(--accent-border)] hover:!text-[var(--accent)]"
                >
                  <span>View Details</span>
                  <span className="inline-flex items-center max-w-0 opacity-0 -translate-x-1 overflow-hidden group-hover/details:max-w-[22px] group-hover/details:opacity-100 group-hover/details:translate-x-0 transition-all duration-200">
                    <SharedIcon name="arrow" size={17} />
                  </span>
                </button>
              )}
              {onEnquire && item.kind !== "education" && (
                <button
                  type="button"
                  onClick={onEnquire}
                  className="btn-ios-primary !min-h-[40px] !px-5 !text-[13px]"
                >
                  <span>Enquire</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function DesktopVerticalFeed(props: VerticalFeedProps) {
  const {
    eyebrow,
    title,
    description,
    items,
    contextKey,
    saved,
    toggle,
    onVideo,
    onDetails,
    onEnquire,
  } = props;
  const { visibleItems, loading, sentinelRef, hasMore, total, loadMore } = useInfiniteVideoFeed(
    items,
    contextKey,
  );

  return (
    <section className="mt-14 pt-10 border-t border-[var(--border-subtle)]">
      <header className="flex items-end justify-between gap-6 mb-7">
        <div>
          <span className="ios-eyebrow">{eyebrow}</span>
          <h2 className="ios-section-title text-[28px] mt-1.5">{title}</h2>
          <p className="mt-1.5 text-[14px] text-[var(--text-secondary)] max-w-xl">{description}</p>
        </div>
        <span className="text-[12px] font-semibold text-[var(--text-tertiary)] px-3 py-1.5 rounded-full bg-[var(--bg-subtle)]">
          Showing {visibleItems.length} of {total} films
        </span>
      </header>

      <div className="space-y-6">
        {visibleItems.map((item) => (
          <DesktopVerticalCard
            key={item.id}
            item={item}
            saved={saved}
            toggle={toggle}
            onVideo={onVideo}
            onDetails={onDetails}
            onEnquire={onEnquire}
          />
        ))}

        {loading && (
          <div className="ios-card p-5 grid grid-cols-12 gap-5" aria-label="Loading more videos">
            <div className="col-span-7 h-64 rv-skeleton" />
            <div className="col-span-5 space-y-4 py-2">
              <div className="h-10 w-2/3 rv-skeleton" />
              <div className="h-16 w-full rv-skeleton" />
              <div className="h-14 w-full rv-skeleton" />
              <div className="h-10 w-3/4 rv-skeleton" />
            </div>
          </div>
        )}

        {hasMore && !loading && (
          <div className="flex justify-center pt-2">
            <button type="button" onClick={loadMore} className="btn-ios-secondary">
              <span>Load more videos</span>
              <SharedIcon name="expand" size={20} />
            </button>
          </div>
        )}

        {!hasMore && !loading && (
          <div className="ios-card p-6 text-center">
            <SharedIcon name="checkCircle" size={28} className="text-[var(--emerald)] mb-1.5" />
            <strong className="block text-[15px] font-bold text-[var(--text-primary)]">
              You’re all caught up
            </strong>
            <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
              Every verified video matching this selection is displayed above.
            </p>
          </div>
        )}

        <div ref={sentinelRef} data-loaded={visibleItems.length} data-total={total} />
      </div>
    </section>
  );
}

export function DesktopResultsToolbar({ market, count, onBack, onFilters }: ResultsToolbarProps) {
  const { locationLabel, radiusKm } = useViewport();
  const [sort, setSort] = useState("Recommended");
  const [chips, setChips] = useState([
    `${locationLabel} · ${radiusKm} km`,
    "3–4 BHK",
    "Video Verified",
  ]);

  return (
    <div className="mb-8">
      <DesktopDetailHeader label={`${market.toUpperCase()} INVENTORY`} onBack={onBack} />
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="ios-eyebrow">
            DISCOVER · {locationLabel.toUpperCase()} · {radiusKm} KM
          </span>
          <h1 className="ios-large-title text-[40px] mt-1.5">{market}</h1>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)]">
            {count} curated listings with verified video walkthroughs
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={onFilters} className="btn-ios-secondary !h-11">
            <SharedIcon name="tune" size={20} />
            <span>Filters</span>
            <span className="w-5 h-5 rounded-full bg-[var(--accent-fill)] text-white text-[11px] font-bold grid place-items-center">
              {chips.length}
            </span>
          </button>
          <label className="inline-flex items-center gap-2.5 h-11 px-4 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[13px] font-semibold text-[var(--text-secondary)]">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-transparent font-bold text-[var(--text-primary)] border-0 focus:outline-none pr-1"
            >
              <option>Recommended</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Possession Date</option>
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-2.5 flex-wrap mt-5">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-2 h-9 pl-3.5 pr-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[13px] font-medium text-[var(--text-primary)] shadow-2xs"
          >
            {chip}
            <button
              type="button"
              onClick={() => setChips((prev) => prev.filter((c) => c !== chip))}
              aria-label={`Remove ${chip}`}
              className="w-5 h-5 rounded-full bg-[var(--bg-subtle)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] grid place-items-center border-0 transition"
            >
              <SharedIcon name="close" size={14} />
            </button>
          </span>
        ))}
        <button
          type="button"
          onClick={onFilters}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] text-[13px] font-semibold"
        >
          <SharedIcon name="plus" size={17} />
          <span>Add filter</span>
        </button>
      </div>
    </div>
  );
}
