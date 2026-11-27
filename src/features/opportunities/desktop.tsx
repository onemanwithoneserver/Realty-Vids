import { useMemo, useState } from "react";
import {
  FeaturedVideoBanner,
  Icon,
  VerticalVideoFeed,
  VideoRailCard,
} from "../../components/common";
import {
  OPPORTUNITY_BANNER_VIDEO,
  OPPORTUNITY_CATEGORIES,
  OPPORTUNITY_COPY,
  opportunityCuratedRows,
  opportunityVerticalPool,
  type OpportunitiesProps,
} from "./data";

export function DesktopOpportunities({
  saved,
  toggle,
  onVideo,
  onOpportunity,
  onEnquire,
  previewPaused,
}: OpportunitiesProps) {
  const [category, setCategory] = useState("Hot Deals");
  const hero = OPPORTUNITY_COPY[category];
  const opportunityItems = useMemo(
    () =>
      opportunityVerticalPool.map((item) => ({
        ...item,
        category,
        creatorMeta: `${category} · ${item.location}`,
      })),
    [category],
  );

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-7">
        <div>
          <span className="ios-eyebrow">Curated Advantages · Explained On Video</span>
          <h1 className="ios-large-title text-[48px] mt-1.5">Opportunities</h1>
          <p className="mt-2 text-[15px] text-[var(--text-secondary)] max-w-xl">
            Every opportunity is independently benchmarked against registered comparables—never paid
            placement.
          </p>
        </div>
        <span className="rv-badge-verified !py-2 !px-4 !text-[12px]">
          <Icon name="verified" size={18} />
          Independently Verified Desk
        </span>
      </div>

      {/* Category Tile Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-7">
        {OPPORTUNITY_CATEGORIES.map((item) => {
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
        image={hero.image}
        videoSrc={OPPORTUNITY_BANNER_VIDEO}
        eyebrow={`FEATURED VERIFIED OPPORTUNITY · ${category.toUpperCase()}`}
        title={hero.title}
        creator="Realty Vids Verification Desk"
        category={`${category} · Lower Parel`}
        duration="04:36"
        summary="A concise video review of the residence, registered transaction comps, terms and documented savings."
        badge={`${hero.badge} · ${hero.label}`}
        verified
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("opportunity", "landscape", {
            title: hero.title,
            creator: "Realty Vids Verification Desk",
            creatorMeta: `${category} · Independently reviewed`,
            poster: hero.image,
            eyebrow: "VERIFIED OPPORTUNITY · 04:36",
            videoSrc: OPPORTUNITY_BANNER_VIDEO,
          })
        }
        onDetails={onOpportunity}
        detailsLabel="View Opportunity"
      />

      {opportunityCuratedRows.map(({ eyebrow, title, videos }, row) => (
        <div className="mt-7" key={eyebrow}>
          <div className="flex items-end justify-between gap-4 mb-5">
            <div>
              <span className="ios-eyebrow">{eyebrow}</span>
              <h2 className="ios-section-title text-[26px] mt-1">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onOpportunity}
              className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[var(--accent)] bg-transparent border-0"
            >
              <span>Inspect evidence</span>
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
                saveId={`opportunity-stream-${row}-${i}`}
                toggle={toggle}
                onOpen={() =>
                  onVideo("opportunity", "landscape", {
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
        eyebrow={`${category.toUpperCase()} · VERIFIED VIDEO FEED`}
        title="More opportunities"
        description="Continue through independently reviewed opportunities with evidence, source and benefit clearly stated."
        items={opportunityItems}
        contextKey={`opportunities-${category}`}
        saved={saved}
        toggle={toggle}
        onVideo={onVideo}
        onDetails={onOpportunity}
        onEnquire={onEnquire}
      />
    </section>
  );
}
