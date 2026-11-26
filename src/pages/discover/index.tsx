import { discoverVideoRails, buildDiscoverVerticalPool } from "./data";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  VideoKind,
  VideoFormat,
  SelectedVideo,
  IMAGES,
  Icon,
  nav,
  CinematicFeaturedBanner,
  StreamVideoCard,
  VerticalVideoFeed,
} from "../../AppShared";

function VideoDiscoverHome({
  saved,
  toggle,
  onVideo,
  onProject,
  onProperty,
  onSearch,
  onLocation,
  onPrimary,
  onSecondary,
  onEnquire,
  previewPaused,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onProject: () => void;
  onProperty: () => void;
  onSearch: () => void;
  onLocation: () => void;
  onPrimary: () => void;
  onSecondary: () => void;
  onEnquire: () => void;
  previewPaused: boolean;
}) {
  const [category, setCategory] = useState("All Properties");
  const [market, setMarket] = useState("Primary Market");
  const categories = [
    ["All Properties", "play"],
    ["Flats", "home"],
    ["Villas", "spark"],
    ["Open Plots", "pin"],
    ["Commercial", "list"],
  ];
  const chooseMarket = (value: string) => setMarket(value);
  const chooseCategory = (value: string) => setCategory(value);
  const isResale = market === "Secondary Market";
  const heroOptions: Record<
    string,
    Record<
      "primary" | "secondary",
      { image: string; title: string; description: string; location: string; facts: string }
    >
  > = {
    "All Properties": {
      primary: {
        image: IMAGES.city,
        title: "Aurelia.\nSee life from here.",
        description: "A cinematic first look at a new Worli landmark.",
        location: "WORLI · FROM ₹6.8 CR",
        facts: "3 & 4 BHK · POSSESSION 2028",
      },
      secondary: {
        image: IMAGES.interior,
        title: "A home above the city.",
        description: "An owner-listed residence on Altamount Road.",
        location: "ALTAMOUNT ROAD · ₹9.4 CR",
        facts: "3 BHK · 2,180 SQ FT",
      },
    },
    Flats: {
      primary: {
        image: IMAGES.lounge,
        title: "A new residential landmark takes shape.",
        description: "Tour a builder-led apartment project before its public launch.",
        location: "WORLI · FROM ₹5.9 CR",
        facts: "2, 3 & 4 BHK · NEW LAUNCH",
      },
      secondary: {
        image: IMAGES.interior,
        title: "A resale apartment made for city life.",
        description: "Walk through a verified owner-listed home in Lower Parel.",
        location: "LOWER PAREL · ₹4.8 CR",
        facts: "3 BHK · OWNER LISTING",
      },
    },
    Villas: {
      primary: {
        image: IMAGES.city,
        title: "More room, closer to the coast.",
        description: "A first look at a new collection of private villas.",
        location: "ALIBAUG · FROM ₹4.2 CR",
        facts: "3 & 4 BHK VILLAS · NEW PHASE",
      },
      secondary: {
        image: IMAGES.interior,
        title: "A lived-in villa with a garden story.",
        description: "Tour a broker-listed villa ready for its next owner.",
        location: "LONAVALA · ₹6.1 CR",
        facts: "4 BHK · VERIFIED RESALE",
      },
    },
    "Open Plots": {
      primary: {
        image: IMAGES.lounge,
        title: "A plotted development shaped by open space.",
        description: "See infrastructure, amenities and the first phase from above.",
        location: "PANVEL · FROM ₹1.2 CR",
        facts: "2,000–4,000 SQ FT · NEW DEVELOPMENT",
      },
      secondary: {
        image: IMAGES.city,
        title: "A resale plot with the groundwork visible.",
        description: "Review access, boundaries and the surrounding development.",
        location: "KARJAT · ₹86 L",
        facts: "2,400 SQ FT · OWNER LISTING",
      },
    },
    Commercial: {
      primary: {
        image: IMAGES.interior,
        title: "A new workplace designed for what’s next.",
        description: "Explore a builder-led commercial launch in BKC.",
        location: "BKC · FROM ₹7.5 CR",
        facts: "OFFICE SUITES · POSSESSION 2027",
      },
      secondary: {
        image: IMAGES.lounge,
        title: "A tenanted office with an income story.",
        description: "Understand the space, lease and resale opportunity.",
        location: "ANDHERI EAST · ₹3.6 CR",
        facts: "1,180 SQ FT · TENANTED",
      },
    },
  };
  const heroContext = heroOptions[category][isResale ? "secondary" : "primary"];
  const verticalItems = useMemo(
    () => buildDiscoverVerticalPool(market, category),
    [category, market],
  );
  return (
    <section className="cinematic-page stream-home discover-stream">
      <div className="stream-page-heading">
        <div>
          <span>VIDEO-FIRST PROPERTY DISCOVERY</span>
          <h1>Discover</h1>
          <p>Watch the spaces, neighbourhoods and projects changing how Mumbai lives.</p>
        </div>
        <div className="discover-heading-actions">
          <div className="stream-utilities">
            <button onClick={onSearch}>
              <Icon name="search" /> Search
            </button>
            <button onClick={onLocation}>
              <Icon name="pin" /> Mumbai · 25 km
            </button>
          </div>
        </div>
      </div>
      <div className="discover-market-tabs" aria-label="Choose property market">
        {[
          ["Primary Market", "New launches and builder projects"],
          ["Secondary Market", "Resale properties and owner/broker inventory"],
        ].map(([item, detail]) => (
          <button
            key={item}
            className={market === item ? "active" : ""}
            onClick={() => chooseMarket(item)}
            aria-pressed={market === item}
          >
            <span>{item}</span>
            <small>{detail}</small>
          </button>
        ))}
      </div>
      <nav className="discover-category-nav" aria-label="Property categories">
        {categories.map(([label, icon]) => (
          <button
            key={label}
            className={category === label ? "active" : ""}
            onClick={() => chooseCategory(label)}
            aria-pressed={category === label}
          >
            <Icon name={icon} size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <CinematicFeaturedBanner
        image={heroContext.image}
        videoSrc={
          isResale ? "/media/banner-discover-secondary.webm" : "/media/banner-discover-primary.webm"
        }
        eyebrow={isResale ? "FEATURED HOME WALKTHROUGH" : "FEATURED PROJECT WALKTHROUGH"}
        title={heroContext.title}
        creator={isResale ? "Realty Vids Resale Desk" : "Realty Vids Studios"}
        category={`${market} · ${category}`}
        duration={isResale ? "04:18" : "06:24"}
        summary={heroContext.description}
        badge={heroContext.location}
        verified={isResale}
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo(isResale ? "property" : "project", "landscape", {
            title: heroContext.title,
            creator: isResale ? "Realty Vids Resale Desk" : "Realty Vids Studios",
            creatorMeta: `${market} · ${category} · ${heroContext.facts}`,
            poster: heroContext.image,
            eyebrow: `${isResale ? "HOME WALKTHROUGH" : "PROJECT WALKTHROUGH"} · ${
              isResale ? "04:18" : "06:24"
            }`,
            videoSrc: isResale
              ? "/media/banner-discover-secondary.webm"
              : "/media/banner-discover-primary.webm",
          })
        }
        onDetails={isResale ? onProperty : onProject}
        detailsLabel={isResale ? "View Property" : "View Project"}
      />
      {discoverVideoRails
        .filter((_, index) => index !== 3)
        .map(({ eyebrow, title, videos }, row) => (
          <div className="stream-section" key={eyebrow}>
            <div className="stream-rail-heading">
              <div>
                <span>{eyebrow}</span>
                <h2>{title}</h2>
              </div>
              <button>
                View all <Icon name="arrow" size={16} />
              </button>
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
                  saveId={`discover-stream-${row}-${i}`}
                  toggle={toggle}
                  onOpen={() =>
                    onVideo(isResale ? "property" : "project", "landscape", {
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
        eyebrow={`${market.toUpperCase()} · ${category.toUpperCase()}`}
        title="More property videos"
        description="Keep scrolling through video walkthroughs matched to the selected market and property type."
        items={verticalItems}
        contextKey={`discover-${market}-${category}`}
        saved={saved}
        toggle={toggle}
        onVideo={onVideo}
        onDetails={isResale ? onProperty : onProject}
        onEnquire={onEnquire}
      />
    </section>
  );
}

export default VideoDiscoverHome;
