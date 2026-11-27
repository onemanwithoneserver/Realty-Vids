import { useState } from "react";
import {
  FeaturedVideoBanner,
  HorizontalScrollRail,
  Icon,
  VerticalVideoFeed,
  VideoRailCard,
} from "../../components/common";
import {
  discoverVideoRails,
  FEED_HERO,
  FEED_TABS,
  feedVerticalPool,
  QUICK_SHORTS,
  type FeedProps,
} from "./data";

export function MobileFeed({
  saved,
  toggle,
  onVideo,
  onProject,
  onCreateFeed,
  previewPaused,
}: FeedProps) {
  const [feed, setFeed] = useState<string>("All");

  return (
    <section className="px-5 pt-6 pb-28">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="ios-eyebrow">Curated For Arjun</span>
          <h1 className="ios-large-title text-[34px] mt-1">My Feed</h1>
        </div>
        <button
          type="button"
          onClick={onCreateFeed}
          className="h-9 px-3.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--text-primary)] mt-2"
        >
          <Icon name="tune" size={17} className="text-[var(--accent)]" />
          <span>Personalise</span>
        </button>
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
        Property stories and market voices tailored to your goals.
      </p>

      {/* Horizontal Filter Pills */}
      <div className="-mx-5 px-5 scroll-px-5 flex items-center gap-2.5 overflow-x-auto no-scrollbar my-5 py-1">
        {FEED_TABS.map((item) => {
          const active = feed === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFeed(item)}
              className={`h-9 px-4 rounded-full text-[12px] font-semibold shrink-0 border transition ${
                active
                  ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                  : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              {item}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onCreateFeed}
          aria-label="Create custom feed"
          className="ml-auto w-9 h-9 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] grid place-items-center shrink-0"
        >
          <Icon name="plus" size={19} />
        </button>
      </div>

      <FeaturedVideoBanner
        {...FEED_HERO}
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("project", "landscape", {
            title: FEED_HERO.title,
            creator: FEED_HERO.creator,
            creatorMeta: FEED_HERO.category,
            poster: FEED_HERO.image,
            eyebrow: `PROJECT FILM · ${FEED_HERO.duration}`,
            videoSrc: FEED_HERO.videoSrc,
          })
        }
        onDetails={onProject}
        detailsLabel="View Project"
      />

      {/* Recommended */}
      <div className="mt-9">
        <div className="mb-3.5">
          <span className="ios-eyebrow !text-[10px]">Recommended For You</span>
          <h2 className="ios-section-title text-[20px] mt-1">Because you’re exploring Mumbai</h2>
        </div>
        <HorizontalScrollRail ariaLabel="Recommended videos">
          {discoverVideoRails[0].videos.map(
            ([image, title, creator, context, duration, label], i) => (
              <VideoRailCard
                key={title}
                image={image}
                title={title}
                creator={creator}
                context={context}
                duration={duration}
                label={label}
                saved={saved}
                saveId={`feed-video-${i}`}
                toggle={toggle}
                onOpen={() => onVideo(i === 3 ? "education" : "project")}
              />
            ),
          )}
        </HorizontalScrollRail>
      </div>

      {/* Quick Watch Shorts */}
      <div className="mt-9">
        <div className="mb-3.5">
          <span className="ios-eyebrow !text-[10px]">Quick Watch</span>
          <h2 className="ios-section-title text-[20px] mt-1">Vertical stories worth a minute</h2>
        </div>
        <HorizontalScrollRail ariaLabel="Quick watch vertical shorts">
          {QUICK_SHORTS.map((short, i) => (
            <VideoRailCard
              key={short.title}
              image={short.image}
              title={short.title}
              creator={short.creator}
              context="Short film"
              duration={short.duration}
              label="SHORT"
              portrait
              saved={saved}
              saveId={`short-stream-${i}`}
              toggle={toggle}
              onOpen={() => onVideo(short.kind, "portrait")}
            />
          ))}
        </HorizontalScrollRail>
      </div>

      {/* Experts You Follow */}
      <div className="mt-9">
        <div className="mb-3.5">
          <span className="ios-eyebrow !text-[10px]">Experts You Follow</span>
          <h2 className="ios-section-title text-[20px] mt-1">Fresh perspectives</h2>
        </div>
        <HorizontalScrollRail ariaLabel="Videos from experts you follow">
          {discoverVideoRails[2].videos.map(
            ([image, title, creator, context, duration, label], i) => (
              <VideoRailCard
                key={title}
                image={image}
                title={title}
                creator={creator}
                context={context}
                duration={duration}
                label={label}
                saved={saved}
                saveId={`expert-feed-${i}`}
                toggle={toggle}
                onOpen={() => onVideo("education")}
              />
            ),
          )}
        </HorizontalScrollRail>
      </div>

      <VerticalVideoFeed
        eyebrow="For You"
        title="Keep discovering"
        description="Personalised videos shaped by your saved topics and viewing history."
        items={feedVerticalPool}
        contextKey={`feed-${feed}`}
        saved={saved}
        toggle={toggle}
        onVideo={onVideo}
        onDetails={onProject}
      />
    </section>
  );
}
