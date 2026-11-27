import { useMemo, useState } from "react";
import {
  FeaturedVideoBanner,
  HorizontalScrollRail,
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

export function MobileInsights({ saved, toggle, onVideo, onExpert, previewPaused }: InsightsProps) {
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
    <section className="px-5 pt-6 pb-28">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="ios-eyebrow">Watch · Learn · Decide</span>
          <h1 className="ios-large-title text-[34px] mt-1">Insights</h1>
        </div>
        <button
          type="button"
          onClick={onExpert}
          className="h-9 px-3.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] inline-flex items-center gap-1.5 text-[12px] font-bold text-[var(--text-primary)] mt-2"
        >
          <Icon name="user" size={17} className="text-[var(--accent)]" />
          <span>Experts</span>
        </button>
      </div>
      <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
        Real estate knowledge from independent market voices.
      </p>

      <div className="my-4">
        <HorizontalScrollRail snap={false} className="!gap-3" ariaLabel="Insight categories">
          {INSIGHT_CATEGORIES.map((item) => {
            const active = category === item.label;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setCategory(item.label)}
                className={`w-[138px] shrink-0 p-3.5 rounded-2xl border text-left flex flex-col gap-3 transition ${
                  active
                    ? "rv-accent-fill border-transparent text-white shadow-md"
                    : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-primary)]"
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl grid place-items-center ${
                    active
                      ? "bg-white text-[#b81434] shadow-xs"
                      : "bg-[var(--bg-subtle)] text-[var(--accent)]"
                  }`}
                >
                  <Icon name={item.icon} size={21} />
                </span>
                <div>
                  <strong className="block font-bold text-[13px] leading-tight">
                    {item.label}
                  </strong>
                  <small
                    className={`block text-[10px] mt-0.5 ${
                      active ? "text-white/95" : "text-[var(--text-tertiary)]"
                    }`}
                  >
                    {item.detail}
                  </small>
                </div>
              </button>
            );
          })}
        </HorizontalScrollRail>
      </div>

      <FeaturedVideoBanner
        image={hero.poster}
        videoSrc={INSIGHTS_BANNER_VIDEO}
        eyebrow={hero.eyebrow}
        title={hero.title}
        creator="Rhea Mehta"
        category={category}
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
        detailsLabel="Expert Profile"
      />

      {insightCuratedRows.map(({ eyebrow, title, videos }, row) => (
        <div className="mt-9" key={eyebrow}>
          <div className="mb-3.5">
            <span className="ios-eyebrow !text-[10px]">{eyebrow}</span>
            <h2 className="ios-section-title text-[20px] mt-1">{title}</h2>
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
          </HorizontalScrollRail>
        </div>
      ))}

      <VerticalVideoFeed
        eyebrow={`${category.toUpperCase()} · LEARNING FEED`}
        title="Keep learning"
        description="Continuous expert explanations and market guides."
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
