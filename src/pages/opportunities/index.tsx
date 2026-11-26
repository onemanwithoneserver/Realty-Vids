import { opportunityCuratedRows, opportunityVerticalPool } from "./data";
import { publicAsset } from "../../publicAsset";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  VideoKind,
  VideoFormat,
  SelectedVideo,
  IMAGES,
  StreamCategory,
  CinematicFeaturedBanner,
  useCompactCategoryRail,
  StreamVideoCard,
  VerticalVideoFeed,
} from "../../AppShared";

function VideoOpportunitiesHome({
  saved,
  toggle,
  onVideo,
  onOpportunity,
  onEnquire,
  previewPaused,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onOpportunity: () => void;
  onEnquire: () => void;
  previewPaused: boolean;
}) {
  const [category, setCategory] = useState("Hot Deals");
  const { markerRef, compact } = useCompactCategoryRail();
  const categories = [
    ["Hot Deals", "spark"],
    ["Early Launches", "clock"],
    ["Investment Picks", "compass"],
    ["Special Offers", "bookmark"],
    ["Rental Income", "home"],
    ["Ready to Move", "check"],
  ];
  const opportunityItems = useMemo(
    () =>
      opportunityVerticalPool.map((item) => ({
        ...item,
        category,
        creatorMeta: `${category} · ${item.location}`,
      })),
    [category],
  );
  const opportunityCopy: Record<string, [string, string, string]> = {
    "Hot Deals": ["12%", "BELOW BENCHMARK", "Why this Lower Parel home stands apart."],
    "Early Launches": ["FIRST", "EARLY ACCESS", "See The Terraces before its public release."],
    "Investment Picks": ["5.8%", "YIELD STORY", "A rental-income case worth understanding."],
    "Special Offers": ["₹18L", "VALUE INCLUDED", "Parking and stamp duty, clearly explained."],
    "Rental Income": ["24 MO", "LEASE ASSURED", "Inside an assured-rental arrangement."],
    "Ready to Move": ["READY", "OC RECEIVED", "Watch it today. Move sooner."],
  };
  const [opportunityBadge, opportunityLabel, opportunityTitle] = opportunityCopy[category];
  return (
    <section className="cinematic-page stream-home opportunity-stream">
      <div className="stream-page-heading">
        <div>
          <span>CURATED ADVANTAGES · EXPLAINED ON VIDEO</span>
          <h1>Opportunities</h1>
          <p>See the project, understand the advantage, then decide.</p>
        </div>
      </div>
      <div ref={markerRef} className="category-compact-marker" />
      <div className={`stream-categories compactible-category-rail ${compact ? "compact" : ""}`}>
        {categories.map(([label, icon]) => (
          <StreamCategory
            key={label}
            label={label}
            icon={icon}
            active={category === label}
            onClick={() => setCategory(label)}
            detail="Watch deals"
          />
        ))}
      </div>
      <CinematicFeaturedBanner
        image={
          category === "Ready to Move"
            ? IMAGES.pool
            : category === "Early Launches"
              ? IMAGES.tower
              : IMAGES.interior
        }
        videoSrc={publicAsset("media/banner-opportunities.webm")}
        eyebrow={`FEATURED VERIFIED OPPORTUNITY · ${category.toUpperCase()}`}
        title={opportunityTitle}
        creator="Realty Vids Verification Desk"
        category={`${category} · Lower Parel`}
        duration="04:36"
        summary="A concise video review of the residence, terms, evidence and relevant comparisons."
        badge={`${opportunityBadge} · ${opportunityLabel}`}
        verified
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("opportunity", "landscape", {
            title: opportunityTitle,
            creator: "Realty Vids Verification Desk",
            creatorMeta: `${category} · Independently reviewed`,
            poster:
              category === "Ready to Move"
                ? IMAGES.pool
                : category === "Early Launches"
                  ? IMAGES.tower
                  : IMAGES.interior,
            eyebrow: `VERIFIED OPPORTUNITY · 04:36`,
            videoSrc: publicAsset("media/banner-opportunities.webm"),
          })
        }
        onDetails={onOpportunity}
        detailsLabel="View Opportunity"
      />
      {opportunityCuratedRows.map(({ eyebrow, title, videos }, row) => (
        <div className="stream-section" key={eyebrow}>
          <div className="stream-rail-heading">
            <div>
              <span>{eyebrow}</span>
              <h2>{title}</h2>
            </div>
          </div>
          <div className="stream-video-rail">
            {videos.map(([image, vtitle, creator, context, duration, label], i) => (
              <StreamVideoCard
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

export default VideoOpportunitiesHome;
