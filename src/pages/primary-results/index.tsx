import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, ResultsHeader } from "../../AppShared";

function PrimaryResults({
  saved,
  toggle,
  onBack,
  onProject,
  onVideo,
  onFilters,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onProject: () => void;
  onVideo: () => void;
  onFilters: () => void;
}) {
  const projects = [
    [
      IMAGES.tower,
      "Aurelia Residences",
      "K Raheja",
      "Worli",
      "₹6.8–11.2 Cr",
      "3 & 4 BHK",
      "New launch",
      "Dec 2028",
      "6 videos",
    ],
    [
      IMAGES.pool,
      "The Reserve",
      "Lodha",
      "Alibaug",
      "₹4.25–7.8 Cr",
      "3 & 4 BHK",
      "Under construction",
      "Dec 2027",
      "12 videos",
    ],
    [
      IMAGES.lounge,
      "Maison 77",
      "Maison",
      "Bandra West",
      "₹8.2–10.4 Cr",
      "3 BHK",
      "Ready to move",
      "OC received",
      "4 videos",
    ],
    [
      IMAGES.city,
      "The Skyline",
      "Oberoi",
      "Parel",
      "₹5.6–9.1 Cr",
      "2, 3 & 4 BHK",
      "Upcoming",
      "Launch Q2 2027",
      "3 videos",
    ],
  ];
  return (
    <section className="results-page primary-results">
      <ResultsHeader
        market="Primary Market"
        count="42 projects"
        onBack={onBack}
        onFilters={onFilters}
      />
      <div className="results-layout">
        <div className="primary-result-list">
          {projects.map(
            ([image, title, builder, place, price, config, status, possession, videos], i) => (
              <article key={title} onClick={onProject}>
                <div className="primary-result-media">
                  <img src={image} alt="" />
                  <span className="pill coral">{status.toUpperCase()}</span>
                  <button
                    className="result-video"
                    onClick={(e) => {
                      e.stopPropagation();
                      onVideo();
                    }}
                  >
                    <PlayButton small />
                    {videos}
                  </button>
                </div>
                <div className="primary-result-copy">
                  <div>
                    <span className="project-place">
                      {place.toUpperCase()} · BY {builder.toUpperCase()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(`primary-result-${i}`);
                      }}
                    >
                      <Icon name={saved.has(`primary-result-${i}`) ? "check" : "bookmark"} />
                      {saved.has(`primary-result-${i}`) ? "Saved" : "Save project"}
                    </button>
                  </div>
                  <h2>{title}</h2>
                  <p>{price}</p>
                  <div className="result-facts">
                    <span>
                      <small>CONFIGURATION</small>
                      {config}
                    </span>
                    <span>
                      <small>STATUS</small>
                      {status}
                    </span>
                    <span>
                      <small>POSSESSION</small>
                      {possession}
                    </span>
                  </div>
                  <button className="text-link">
                    View project <Icon name="arrow" size={16} />
                  </button>
                </div>
              </article>
            ),
          )}
        </div>
        <aside className="results-map-panel">
          <div className="map-orbit orbit-one" />
          <div className="map-orbit orbit-two" />
          {[
            [25, 24, "4"],
            [67, 31, "7"],
            [46, 65, "3"],
            [78, 73, "5"],
          ].map(([left, top, count], i) => (
            <button key={i} style={{ left: `${left}%`, top: `${top}%` }} onClick={onProject}>
              <span>{count}</span>
            </button>
          ))}
          <em>DEMONSTRATION MAP</em>
          <div>
            <strong>42 projects in this area</strong>
            <button>Search as I move map</button>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default PrimaryResults;
