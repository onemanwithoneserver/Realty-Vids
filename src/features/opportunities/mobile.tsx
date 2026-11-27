import { useMemo, useState } from "react";
import {
  FeaturedVideoBanner,
  HorizontalScrollRail,
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

export function MobileOpportunities({
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
    <section className="px-5 pt-6 pb-28">
      <div className="flex items-center justify-between gap-2">
        <span className="ios-eyebrow">Curated Advantages</span>
        <span className="rv-badge-verified !text-[9px] !py-0.5 !px-2">
          <Icon name="verified" size={13} />
          Verified
        </span>
      </div>
      <h1 className="ios-large-title text-[34px] mt-1">Opportunities</h1>
      <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
        See the project, understand the documented advantage, then decide.
      </p>

      {/* Horizontal Category Cards */}
      <div className="my-4">
        <HorizontalScrollRail snap={false} className="!gap-3" ariaLabel="Opportunity categories">
          {OPPORTUNITY_CATEGORIES.map((item) => {
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
        image={hero.image}
        videoSrc={OPPORTUNITY_BANNER_VIDEO}
        eyebrow={category.toUpperCase()}
        title={hero.title}
        creator="Verification Desk"
        category="Lower Parel"
        duration="04:36"
        summary="A concise video review of the residence, terms and registered comps."
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
        detailsLabel="View Deal"
      />

      {opportunityCuratedRows.map(({ eyebrow, title, videos }, row) => (
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
          </HorizontalScrollRail>
        </div>
      ))}

      <VerticalVideoFeed
        eyebrow={`${category.toUpperCase()} · FEED`}
        title="More opportunities"
        description="Independently reviewed opportunities with documented benefits."
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
