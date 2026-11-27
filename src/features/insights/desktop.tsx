import { useMemo, useState } from "react";
import {
  FeaturedVideoBanner,
  Icon,
  VerticalVideoFeed,
  VideoRailCard,
} from "../../components/common";
import {
  INSIGHT_CATEGORIES,
  INSIGHT_COPY,
  INSIGHTS_BANNER_VIDEO,
  insightCuratedRows,
  insightVerticalPool,
  type InsightsProps,
} from "./data";

export function DesktopInsights({
  saved,
  toggle,
  onVideo,
  onExpert,
  previewPaused,
}: InsightsProps) {
  const [category, setCategory] = useState("Learn");
  const hero = INSIGHT_COPY[category];
  const insightItems = useMemo(
    () =>
      insightVerticalPool.map((item) => ({
        ...item,
        category,
        creatorMeta: `${category} · ${item.creator}`,
      })),
    [category],
  );

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
        <div>
          <span className="ios-eyebrow">Watch · Learn · Decide</span>
          <h1 className="ios-large-title text-[48px] mt-1.5">Insights</h1>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)] max-w-xl">
            Grounded real estate fluency from economists, legal specialists and local advisors.
          </p>
        </div>
        <button type="button" onClick={onExpert} className="btn-ios-secondary">
          <Icon name="user" size={20} />
          <span>Meet Lead Economist</span>
        </button>
      </div>

      {/* Learning Hub Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-7">
        {INSIGHT_CATEGORIES.map((item) => {
          const active = category === item.label;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => setCategory(item.label)}
              className={`p-4 rounded-[20px] border text-left transition flex flex-col justify-between gap-4 ${
                active
                  ? "rv-accent-fill border-transparent text-white shadow-[var(--accent-glow)]"
                  : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)]"
              }`}
            >
              <span
                className={`w-11 h-11 rounded-2xl grid place-items-center ${
                  active
                    ? "bg-white text-[#b81434] shadow-xs"
                    : "bg-[var(--bg-subtle)] text-[var(--accent)]"
                }`}
              >
                <Icon name={item.icon} size={24} />
              </span>
              <div>
                <strong className="block font-bold text-[14px] leading-snug">{item.label}</strong>
                <small
                  className={`block text-[11px] mt-0.5 ${
                    active ? "text-white/95" : "text-[var(--text-tertiary)]"
                  }`}
                >
                  {item.detail}
                </small>
              </div>
            </button>
          );
        })}
      </div>

      <FeaturedVideoBanner
        image={hero.poster}
        videoSrc={INSIGHTS_BANNER_VIDEO}
        eyebrow={hero.eyebrow}
        title={hero.title}
        creator="Rhea Mehta"
        category={`${category} · Realty Vids Learning`}
        duration="12:46"
        summary={hero.description}
        badge="EXPERT VIDEO"
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("education", "landscape", {
            title: hero.title,
            creator: "Rhea Mehta",
            creatorMeta: `${category} · Realty Vids Learning`,
            poster: hero.poster,
            eyebrow: `${hero.eyebrow} · 12:46`,
            videoSrc: INSIGHTS_BANNER_VIDEO,
          })
        }
        onDetails={onExpert}
        detailsLabel="Meet the Expert"
      />

      {insightCuratedRows.map(({ eyebrow, title, videos }, row) => (
        <div className="mt-7" key={eyebrow}>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <span className="ios-eyebrow">{eyebrow}</span>
              <h2 className="ios-section-title text-[26px] mt-1">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onExpert}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)] bg-transparent border-0"
            >
              <span>Expert hub</span>
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
                saveId={`insight-stream-${row}-${i}`}
                toggle={toggle}
                onOpen={() =>
                  onVideo("education", "landscape", {
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
        eyebrow={`${category.toUpperCase()} · VIDEO LEARNING FEED`}
        title="Keep learning"
        description="A continuous video stream of expert explanations, market context and locality knowledge."
        items={insightItems}
        contextKey={`insights-${category}`}
        saved={saved}
        toggle={toggle}
        onVideo={onVideo}
        onDetails={onExpert}
      />
    </section>
  );
}
