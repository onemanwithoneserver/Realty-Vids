import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, DetailHeader } from "../../AppShared";

function ExpertProfile({
  saved,
  toggle,
  onBack,
  onVideo,
  onConsult,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onVideo: () => void;
  onConsult: () => void;
}) {
  return (
    <section className="detail-page expert-page">
      <DetailHeader label="EXPERT PROFILE" onBack={onBack} />
      <div className="expert-hero">
        <div className="expert-portrait">RM</div>
        <div>
          <span className="verified">
            <Icon name="check" size={13} /> VERIFIED EXPERT
          </span>
          <h1>Rhea Mehta</h1>
          <p>Property economist · Mumbai residential markets</p>
          <div>
            <span>
              <strong>12</strong> years experience
            </span>
            <span>
              <strong>86</strong> video insights
            </span>
            <span>
              <strong>28K</strong> followers
            </span>
          </div>
        </div>
        <div className="expert-actions">
          <button className="primary-button" onClick={onConsult}>
            Request consultation
          </button>
          <button className="secondary-button" onClick={() => toggle("expert-rhea")}>
            <Icon name={saved.has("expert-rhea") ? "check" : "bookmark"} />
            {saved.has("expert-rhea") ? "Expert saved" : "Save expert"}
          </button>
        </div>
      </div>
      <div className="expert-content">
        <div>
          <span className="project-place">ABOUT</span>
          <h2>Clarity for consequential decisions.</h2>
          <p>
            Rhea translates market data, policy and neighbourhood-level signals into grounded
            guidance for homebuyers and long-horizon investors.
          </p>
        </div>
        <div className="expert-videos">
          {[
            [IMAGES.skyline, "Is 2026 the year to buy?"],
            [IMAGES.aerial, "Three corridors to watch"],
            [IMAGES.city, "Reading a price cycle"],
          ].map(([image, title]) => (
            <button key={title} onClick={onVideo}>
              <img src={image} alt="" />
              <PlayButton small />
              <strong>{title}</strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExpertProfile;
