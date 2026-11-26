import { insightCuratedRows, insightVerticalPool } from "./data";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  VideoKind,
  VideoFormat,
  SelectedVideo,
  StreamCategory,
  CinematicFeaturedBanner,
  useCompactCategoryRail,
  StreamVideoCard,
  VerticalVideoFeed,
} from "../../AppShared";

function VideoInsightsHome({
  saved,
  toggle,
  onVideo,
  onExpert,
  previewPaused,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onExpert: () => void;
  previewPaused: boolean;
}) {
  const [category, setCategory] = useState("Learn");
  const { markerRef, compact } = useCompactCategoryRail();
  const categories = [
    ["Learn", "play"],
    ["Market Updates", "spark"],
    ["Expert Advice", "user"],
    ["Locality Insights", "pin"],
    ["Expert Talks", "compass"],
    ["Industry Updates", "list"],
  ];
  const insightItems = useMemo(
    () =>
      insightVerticalPool.map((item) => ({
        ...item,
        category,
        creatorMeta: `${category} · ${item.creator}`,
      })),
    [category],
  );
  const insightCopy: Record<string, [string, string, string]> = {
    Learn: [
      "LEARN THE FUNDAMENTALS",
      "How to read a project before you visit.",
      "A practical video guide to timelines, approvals and the questions worth asking.",
    ],
    "Market Updates": [
      "THE BIG PICTURE",
      "Is 2026 the year to buy—or wait?",
      "Three market voices unpack rates, supply and the neighbourhoods worth watching.",
    ],
    "Expert Advice": [
      "EXPERT ADVICE",
      "Five questions to ask before you shortlist.",
      "Experienced advisors share the signals they look for first.",
    ],
    "Locality Insights": [
      "LOCALITY STORY · WORLI",
      "Worli beyond the skyline.",
      "Understand connectivity, supply and daily life through local voices.",
    ],
    "Expert Talks": [
      "EXPERT ROUND TABLE",
      "What informed buyers are doing differently.",
      "A candid discussion with three independent market experts.",
    ],
    "Industry Updates": [
      "INDUSTRY UPDATE",
      "What the latest policy changes mean.",
      "A clear video briefing without the jargon.",
    ],
  };
  const [insightLabel, insightTitle, insightDescription] = insightCopy[category];
  return (
    <section className="cinematic-page stream-home insights-stream">
      <div className="stream-page-heading">
        <div>
          <span>WATCH · LEARN · DECIDE</span>
          <h1>Insights</h1>
          <p>Real estate knowledge from people who understand the market.</p>
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
            detail="Video hub"
          />
        ))}
      </div>
      <CinematicFeaturedBanner
        image={
          category === "Locality Insights"
            ? "/media/discover-01.jpg"
            : category === "Learn"
              ? "/media/discover-02.jpg"
              : "/media/discover-03.jpg"
        }
        videoSrc="/media/banner-insights.webm"
        eyebrow={insightLabel}
        title={insightTitle}
        creator="Rhea Mehta"
        category={`${category} · Realty Vids Learning`}
        duration="12:46"
        summary={insightDescription}
        badge="EXPERT VIDEO"
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("education", "landscape", {
            title: insightTitle,
            creator: "Rhea Mehta",
            creatorMeta: `${category} · Realty Vids Learning`,
            poster:
              category === "Locality Insights"
                ? "/media/discover-01.jpg"
                : category === "Learn"
                  ? "/media/discover-02.jpg"
                  : "/media/discover-03.jpg",
            eyebrow: `${category.toUpperCase()} · 12:46`,
            videoSrc: "/media/banner-insights.webm",
          })
        }
        onDetails={onExpert}
        detailsLabel="Meet the Expert"
      />
      {insightCuratedRows.map(({ eyebrow, title, videos }, row) => (
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
        description="A continuous video-only feed of expert explanations, market context and locality knowledge."
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

export default VideoInsightsHome;
