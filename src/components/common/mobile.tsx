import { useState, type ReactNode } from "react";
import { useViewport } from "../../lib/viewport";
import {
  useHorizontalScrollArrows,
  useInfiniteVideoFeed,
  useVideoPreview,
  type FeaturedBannerProps,
  type ResultsToolbarProps,
  type VerticalFeedProps,
  type VideoCardProps,
} from "./data";
import { PlayOrb, SharedIcon } from "./desktop";
import type { VerticalVideoItem } from "../../lib/types";

export function HorizontalScrollRail({
  children,
  className = "",
  edgeBleed = true,
  snap = true,
  ariaLabel = "Scrollable items",
}: {
  children: ReactNode;
  className?: string;
  edgeBleed?: boolean;
  snap?: boolean;
  ariaLabel?: string;
}) {
  const { railRef, canScrollLeft, canScrollRight, scrollByStep } = useHorizontalScrollArrows();

  return (
    <div className="relative">
      <div
        ref={railRef}
        aria-label={ariaLabel}
        className={`${
          edgeBleed ? "-mx-5 px-5 scroll-px-5" : ""
        } flex gap-3.5 overflow-x-auto no-scrollbar ${
          snap ? "snap-x snap-mandatory" : ""
        } pt-1 pb-4 ${className}`}
      >
        {children}
      </div>

      {canScrollLeft && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            scrollByStep(-1);
          }}
          aria-label="Scroll left"
          className={`absolute ${
            edgeBleed ? "-left-5" : "left-0"
          } top-[calc(50%-8px)] -translate-y-1/2 z-20 w-7 h-9 rounded-r-full rounded-l-none ios-glass-heavy border border-l-0 border-[var(--border-strong)] text-[var(--text-primary)] shadow-lg grid place-items-center hover:w-8 active:scale-95 transition-all`}
        >
          <SharedIcon name="back" size={14} />
        </button>
      )}

      {canScrollRight && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            scrollByStep(1);
          }}
          aria-label="Scroll right"
          className={`absolute ${
            edgeBleed ? "-right-5" : "right-0"
          } top-[calc(50%-8px)] -translate-y-1/2 z-20 w-7 h-9 rounded-l-full rounded-r-none ios-glass-heavy border border-r-0 border-[var(--border-strong)] text-[var(--text-primary)] shadow-lg grid place-items-center hover:w-8 active:scale-95 transition-all`}
        >
          <SharedIcon name="chevron" size={16} />
        </button>
      )}
    </div>
  );
}

export function MobileDetailHeader({ label, onBack }: { label: string; onBack: () => void }) {
  const { onShareFeedback } = useViewport();
  return (
    <div className="sticky top-[var(--mobile-topbar-h)] z-30 -mx-5 px-5 h-12 ios-glass border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 mb-5">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1 text-[15px] font-semibold text-[var(--accent)] bg-transparent border-0 p-1 -ml-1"
      >
        <SharedIcon name="back" size={18} />
        <span>Back</span>
      </button>
      <span className="text-[12px] font-bold tracking-[0.06em] uppercase text-[var(--text-secondary)] truncate max-w-[180px]">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onShareFeedback("Link copied to clipboard.")}
        aria-label="Share"
        className="w-9 h-9 rounded-full bg-[var(--bg-chip)] grid place-items-center text-[var(--text-primary)] border-0"
      >
        <SharedIcon name="share" size={19} />
      </button>
    </div>
  );
}

export function MobileFeaturedBanner(props: FeaturedBannerProps) {
  const {
    image,
    videoSrc,
    eyebrow,
    title,
    creator,
    category,
    duration,
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
      className={`rv-hero-banner rv-hero-banner-mobile ${
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

      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-10">
        <span className="rv-badge-glass !text-[10px] !py-1 !px-2.5 truncate max-w-[65%]">
          {verified ? "VERIFIED · " : ""}
          {badge ?? eyebrow}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="rv-badge-glass !text-[10px] !py-1 !px-2.5">{duration}</span>
          {ready && !failed && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              aria-label={muted ? "Unmute" : "Mute"}
              className="w-8 h-8 rounded-full bg-black/55 border border-white/20 grid place-items-center text-white"
            >
              <SharedIcon name={muted ? "mute" : "volume"} size={17} />
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 right-4 z-10">
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#ffa3aa]">
          {eyebrow}
        </span>
        <h2 className="mt-1 font-[800] text-[25px] leading-[1.06] tracking-[-0.032em] text-white line-clamp-3">
          {title.replace("\n", " ")}
        </h2>
        <p className="mt-1.5 text-[12px] text-white/95 truncate">
          <strong className="text-white font-semibold">{creator}</strong> · {category}
        </p>
        <div className="grid grid-cols-2 gap-2.5 mt-3.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onWatch();
            }}
            className="btn-ios-primary !min-h-[44px] !px-3 !text-[13px]"
          >
            <SharedIcon name="play" size={20} />
            <span>Watch Now</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDetails();
            }}
            className="btn-ios-glass !min-h-[44px] !px-3 !text-[13px]"
          >
            <span className="truncate">{detailsLabel}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

export function MobileVideoCard({
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
      className={`ios-card overflow-hidden shrink-0 snap-start cursor-pointer ${
        portrait ? "w-[192px]" : "w-[276px]"
      }`}
    >
      <div
        className={`relative bg-black overflow-hidden ${
          portrait ? "aspect-[9/13.5]" : "aspect-[16/10]"
        }`}
      >
        <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25" />
        <span className="rv-badge-glass absolute top-3 left-3 !text-[9px] !py-1 !px-2.5">
          {label}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggle(saveId);
          }}
          aria-label={isSaved ? "Unsave" : "Save"}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full grid place-items-center backdrop-blur-md border ${
            isSaved
              ? "bg-[var(--accent-fill)] border-white/50 text-white"
              : "bg-black/65 border-white/30 text-white"
          }`}
        >
          <SharedIcon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
        </button>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <PlayOrb small />
        </div>
        <span className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/65 text-white text-[11px] font-semibold">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-[14px] leading-snug text-[var(--text-primary)] line-clamp-2">
          {title}
        </h3>
        <p className="mt-1.5 text-[12px] text-[var(--text-secondary)] truncate">
          {creator} · {context}
        </p>
      </div>
    </article>
  );
}

function MobileVerticalCard({
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
    <article className="ios-card overflow-hidden">
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
        className={`relative w-full bg-black overflow-hidden block border-0 p-0 ${
          item.format === "portrait" ? "aspect-[4/4.6]" : "aspect-[16/10]"
        }`}
      >
        <img src={item.poster} alt="" loading="lazy" className="w-full h-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
        <span className="rv-badge-glass absolute top-3 left-3 !text-[10px]">{item.category}</span>
        <span className="rv-badge-glass absolute bottom-3 right-3 !text-[10px]">
          {item.eyebrow.split(" · ").at(-1)}
        </span>
        <span className="absolute inset-0 grid place-items-center">
          <PlayOrb />
        </span>
      </button>

      <div className="p-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] font-bold text-[12px] grid place-items-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1">
              <strong className="text-[13px] font-bold text-[var(--text-primary)] truncate">
                {item.creator}
              </strong>
              {item.verified && (
                <SharedIcon name="verified" size={16} className="text-[var(--emerald)] shrink-0" />
              )}
            </div>
            <span className="block text-[11px] text-[var(--text-tertiary)] truncate">
              {item.creatorMeta}
            </span>
          </div>
        </div>

        <h3 className="mt-3 font-bold text-[17px] leading-snug tracking-[-0.02em] text-[var(--text-primary)]">
          {item.title}
        </h3>

        <div className="mt-3 p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center gap-2.5">
          <SharedIcon
            name={item.kind === "education" ? "play" : "pin"}
            size={19}
            className="text-[var(--accent)] shrink-0"
          />
          <div className="min-w-0">
            <strong className="block text-[12px] font-semibold text-[var(--text-primary)] truncate">
              {item.contextTitle}
            </strong>
            <span className="block text-[11px] text-[var(--text-secondary)] truncate">
              {item.contextMeta}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3.5 pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLiked((v) => !v)}
              className={`inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-[12px] font-semibold border-0 ${
                liked
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              <SharedIcon name={liked ? "heartFilled" : "heart"} size={18} />
              <span>{liked ? "Liked" : item.engagement}</span>
            </button>
            <button
              type="button"
              onClick={() => toggle(saveId)}
              aria-label="Save video"
              className={`w-9 h-9 rounded-full grid place-items-center border-0 ${
                isSaved
                  ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              <SharedIcon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
            </button>
            <button
              type="button"
              onClick={() => onShareFeedback(`Shared "${item.title}"`)}
              aria-label="Share video"
              className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)] grid place-items-center border-0"
            >
              <SharedIcon name="share" size={18} />
            </button>
          </div>

          {onEnquire && item.kind !== "education" ? (
            <button
              type="button"
              onClick={onEnquire}
              className="btn-ios-primary !min-h-[36px] !px-4 !text-[12px]"
            >
              Enquire
            </button>
          ) : (
            onDetails && (
              <button
                type="button"
                onClick={onDetails}
                className="group/details btn-ios-secondary !min-h-[36px] !px-4 !text-[12px] hover:!border-[var(--accent-border)] hover:!text-[var(--accent)]"
              >
                <span>Details</span>
                <span className="inline-flex items-center max-w-0 opacity-0 -translate-x-1 overflow-hidden group-hover/details:max-w-[18px] group-hover/details:opacity-100 group-hover/details:translate-x-0 transition-all duration-200">
                  <SharedIcon name="arrow" size={15} />
                </span>
              </button>
            )
          )}
        </div>
      </div>
    </article>
  );
}

export function MobileVerticalFeed(props: VerticalFeedProps) {
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
    <section className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
      <header className="mb-5">
        <span className="ios-eyebrow">{eyebrow}</span>
        <h2 className="ios-section-title text-[22px] mt-1">{title}</h2>
        <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
          {description}
        </p>
      </header>

      <div className="space-y-5">
        {visibleItems.map((item) => (
          <MobileVerticalCard
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
          <div className="ios-card p-3.5 space-y-3" aria-label="Loading more videos">
            <div className="h-48 rv-skeleton" />
            <div className="h-5 w-3/4 rv-skeleton" />
            <div className="h-10 w-full rv-skeleton" />
          </div>
        )}

        {hasMore && !loading && (
          <button type="button" onClick={loadMore} className="btn-ios-secondary w-full">
            <span>Load more videos</span>
          </button>
        )}

        {!hasMore && !loading && (
          <div className="ios-card p-4 text-center">
            <strong className="block text-[14px] font-bold text-[var(--text-primary)]">
              You’re up to date
            </strong>
            <p className="mt-0.5 text-[12px] text-[var(--text-secondary)]">
              All {total} videos in this feed are loaded.
            </p>
          </div>
        )}

        <div ref={sentinelRef} data-loaded={visibleItems.length} data-total={total} />
      </div>
    </section>
  );
}

export function MobileResultsToolbar({ market, count, onBack, onFilters }: ResultsToolbarProps) {
  const { locationLabel, radiusKm } = useViewport();
  const [sort, setSort] = useState("Recommended");

  return (
    <div className="mb-5">
      <MobileDetailHeader label={market} onBack={onBack} />
      <span className="ios-eyebrow">
        {locationLabel.toUpperCase()} · {radiusKm} KM
      </span>
      <h1 className="ios-large-title text-[30px] mt-1">{market}</h1>
      <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
        {count} matched to your search
      </p>

      <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
        <button
          type="button"
          onClick={onFilters}
          className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[var(--accent-fill)] text-white text-[12px] font-semibold border-0 shrink-0"
        >
          <SharedIcon name="tune" size={17} />
          <span>Filters (2)</span>
        </button>
        <label className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[12px] font-semibold shrink-0">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent border-0 focus:outline-none font-semibold text-[var(--text-primary)]"
          >
            <option>Sort: Recommended</option>
            <option>Sort: Newest</option>
            <option>Price: Low to High</option>
          </select>
        </label>
        <span className="inline-flex items-center h-9 px-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[12px] font-medium shrink-0">
          3–4 BHK
        </span>
      </div>
    </div>
  );
}
