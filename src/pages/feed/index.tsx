import { feedVerticalPool } from "./data";
import { discoverVideoRails } from "../discover/data";
import { publicAsset } from "../../publicAsset";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  VideoKind,
  VideoFormat,
  SelectedVideo,
  IMAGES,
  Icon,
  CinematicFeaturedBanner,
  StreamVideoCard,
  VerticalVideoFeed,
} from "../../AppShared";

function VideoFeedHome({
  saved,
  toggle,
  onVideo,
  onProject,
  onCreateFeed,
  previewPaused,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onProject: () => void;
  onCreateFeed: () => void;
  previewPaused: boolean;
}) {
  const [feed, setFeed] = useState("All");
  return (
    <section className="cinematic-page stream-home">
      <div className="stream-page-heading">
        <div>
          <span>CURATED FOR ARJUN</span>
          <h1>My Feed</h1>
          <p>Property stories, market voices and spaces chosen around your goals.</p>
        </div>
        <button onClick={onCreateFeed}>
          <Icon name="tune" size={16} /> Personalise
        </button>
      </div>
      <div className="stream-tabs">
        {["All", "Education", "My Home", "Investment"].map((item) => (
          <button
            key={item}
            className={feed === item ? "active" : ""}
            onClick={() => setFeed(item)}
          >
            {item}
          </button>
        ))}
        <button onClick={onCreateFeed}>+</button>
      </div>
      <CinematicFeaturedBanner
        image={IMAGES.tower}
        videoSrc={publicAsset("media/banner-feed.webm")}
        eyebrow="FEATURED FOR YOU"
        title="Aurelia: Above the expected"
        creator="Realty Vids Studios"
        category="Personalised project film · Worli"
        duration="06:24"
        summary="A quiet cinematic journey through a new Worli address, selected around your recent viewing."
        badge="REALTY VIDS ORIGINAL"
        previewPaused={previewPaused}
        onWatch={() =>
          onVideo("project", "landscape", {
            title: "Aurelia: Above the expected",
            creator: "Realty Vids Studios",
            creatorMeta: "Personalised project film · Worli",
            poster: IMAGES.tower,
            eyebrow: "PROJECT FILM · 06:24",
            videoSrc: publicAsset("media/banner-feed.webm"),
          })
        }
        onDetails={onProject}
        detailsLabel="View Project"
      />
      <div className="stream-rail-heading">
        <div>
          <span>RECOMMENDED FOR YOU</span>
          <h2>Because you’re exploring Mumbai</h2>
        </div>
        <button>
          View all <Icon name="arrow" size={16} />
        </button>
      </div>
      <div className="stream-video-rail">
        {discoverVideoRails[0].videos.map(
          ([image, title, creator, context, duration, label], i) => (
            <StreamVideoCard
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
      </div>
      <div className="stream-rail-heading">
        <div>
          <span>CONTINUE WATCHING</span>
          <h2>Pick up where you left off</h2>
        </div>
      </div>
      <div className="stream-wide-rail">
        {discoverVideoRails[1].videos
          .slice(0, 2)
          .map(([image, title, creator, context, duration, label], i) => (
            <StreamVideoCard
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
              onOpen={() => onVideo("project")}
            />
          ))}
      </div>
      <div className="stream-rail-heading">
        <div>
          <span>QUICK WATCH</span>
          <h2>Vertical stories worth a minute</h2>
        </div>
      </div>
      <div className="stream-portrait-rail">
        {[
          [IMAGES.interior, "Why this room feels larger", "Studio Ardete"],
          [IMAGES.city, "Worli in 60 seconds", "Realty Vids"],
          [IMAGES.pool, "The quiet luxury test", "Mira Shah"],
          [IMAGES.lounge, "One detail to notice", "Design Desk"],
        ].map(([image, title, creator], i) => (
          <StreamVideoCard
            key={title}
            image={image}
            title={title}
            creator={creator}
            context="Short video"
            duration={`0:${[48, 57, 42, 51][i]}`}
            label="SHORT"
            portrait
            saved={saved}
            saveId={`short-stream-${i}`}
            toggle={toggle}
            onOpen={() => onVideo(i === 1 ? "education" : "project", "portrait")}
          />
        ))}
      </div>
      <div className="stream-rail-heading">
        <div>
          <span>FROM EXPERTS YOU FOLLOW</span>
          <h2>Fresh perspectives</h2>
        </div>
      </div>
      <div className="stream-video-rail">
        {discoverVideoRails[2].videos.map(
          ([image, title, creator, context, duration, label], i) => (
            <StreamVideoCard
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
      </div>
      <VerticalVideoFeed
        eyebrow="YOUR CONTINUOUS FEED"
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

export default VideoFeedHome;
