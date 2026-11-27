import { useState } from "react";
import { m } from "framer-motion";
import {
  FeaturedVideoBanner,
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

export function DesktopFeed({
  saved,
  toggle,
  onVideo,
  onProject,
  onCreateFeed,
  previewPaused,
}: FeedProps) {
  const [feed, setFeed] = useState<string>("All");

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
        <div>
          <span className="ios-eyebrow">Curated For Arjun</span>
          <h1 className="ios-large-title text-[48px] mt-1.5">My Feed</h1>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)] max-w-xl">
            Property stories, independent market voices and spaces chosen around your goals.
          </p>
        </div>
        <button type="button" onClick={onCreateFeed} className="btn-ios-secondary">
          <Icon name="tune" size={20} />
          <span>Personalise Feed</span>
        </button>
      </div>

      {/* Feed Tabs */}
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <div className="ios-segmented">
          {FEED_TABS.map((item) => {
            const active = feed === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFeed(item)}
                className={`ios-segment-btn ${active ? "is-active" : ""}`}
              >
                {active && (
                  <m.span
                    layoutId="feed-desktop-tab"
                    transition={{ type: "spring", stiffness: 460, damping: 34 }}
                    className="ios-segment-pill"
                  />
                )}
                <span className="relative z-10">{item}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={onCreateFeed}
          className="h-10 px-4 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] inline-flex items-center gap-1.5 text-[13px] font-bold"
        >
          <Icon name="plus" size={18} />
          <span>New Custom Feed</span>
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

      {/* Recommended Rail */}
      <div className="mt-7">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <span className="ios-eyebrow">Recommended For You</span>
            <h2 className="ios-section-title text-[26px] mt-1">Because you’re exploring Mumbai</h2>
          </div>
          <button
            type="button"
            onClick={onProject}
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)] bg-transparent border-0"
          >
            <span>Explore projects</span>
            <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                onOpen={() =>
                  onVideo(i === 3 ? "education" : "project", "landscape", {
                    title,
                    creator,
                    creatorMeta: context,
                    poster: image,
                    eyebrow: `${label} · ${duration}`,
                  })
                }
              />
            ),
          )}
        </div>
      </div>

      {/* Continue Watching Wide Rail */}
      <div className="mt-7">
        <div className="mb-5">
          <span className="ios-eyebrow">Continue Watching</span>
          <h2 className="ios-section-title text-[26px] mt-1">Pick up where you left off</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {discoverVideoRails[1].videos
            .slice(0, 2)
            .map(([image, title, creator, context, duration, label], i) => (
              <VideoRailCard
                key={title}
                image={image}
                title={title}
                creator={creator}
                context={context}
                duration={duration}
                label={label}
                saved={saved}
                saveId={`continue-stream-${i}`}
                toggle={toggle}
                onOpen={() =>
                  onVideo("project", "landscape", {
                    title,
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

      {/* Quick Watch Portrait Shorts */}
      <div className="mt-7">
        <div className="mb-5">
          <span className="ios-eyebrow">Quick Watch · Shorts</span>
          <h2 className="ios-section-title text-[26px] mt-1">Vertical stories worth a minute</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {QUICK_SHORTS.map((short, i) => (
            <VideoRailCard
              key={short.title}
              image={short.image}
              title={short.title}
              creator={short.creator}
              context="Vertical Short"
              duration={short.duration}
              label="SHORT"
              portrait
              saved={saved}
              saveId={`short-stream-${i}`}
              toggle={toggle}
              onOpen={() =>
                onVideo(short.kind, "portrait", {
                  title: short.title,
                  creator: short.creator,
                  creatorMeta: "Vertical Short",
                  poster: short.image,
                  eyebrow: `SHORT · ${short.duration}`,
                })
              }
            />
          ))}
        </div>
      </div>

      {/* From Followed Experts */}
      <div className="mt-7">
        <div className="mb-5">
          <span className="ios-eyebrow">From Experts You Follow</span>
          <h2 className="ios-section-title text-[26px] mt-1">Fresh perspectives</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                onOpen={() =>
                  onVideo("education", "landscape", {
                    title,
                    creator,
                    creatorMeta: context,
                    poster: image,
                    eyebrow: `${label} · ${duration}`,
                  })
                }
              />
            ),
          )}
        </div>
      </div>

      <VerticalVideoFeed
        eyebrow="For You"
        title="Keep discovering"
        description="Personalised videos shaped by your interests, followed creators, saved topics and viewing history."
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
