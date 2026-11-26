import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, ResultsHeader } from "../../AppShared";

function SecondaryResults({
  saved,
  toggle,
  onBack,
  onProperty,
  onVideo,
  onFilters,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onProperty: () => void;
  onVideo: () => void;
  onFilters: () => void;
}) {
  const properties = [
    [
      IMAGES.interior,
      "Sea-facing residence",
      "Apartment · 3 BHK",
      "₹9.4 Cr",
      "2,180 sq ft",
      "Altamount Road",
      "24 of 31 · Semi-furnished",
      "OWNER",
      "Available now",
    ],
    [
      IMAGES.lounge,
      "Garden apartment",
      "Apartment · 3 BHK",
      "₹7.75 Cr",
      "1,640 sq ft",
      "Bandra West",
      "2 of 8 · Furnished",
      "BROKER",
      "Viewings this week",
    ],
    [
      IMAGES.city,
      "High-floor city home",
      "Apartment · 2 BHK",
      "₹6.9 Cr",
      "1,280 sq ft",
      "Worli",
      "31 of 42 · Unfurnished",
      "OWNER",
      "Available now",
    ],
    [
      IMAGES.pool,
      "Private coastal villa",
      "Villa · 4 BHK",
      "₹12.2 Cr",
      "3,450 sq ft",
      "Alibaug",
      "Ground + 1 · Furnished",
      "BROKER",
      "By appointment",
    ],
  ];
  return (
    <section className="results-page secondary-results">
      <ResultsHeader
        market="Secondary Market"
        count="186 properties"
        onBack={onBack}
        onFilters={onFilters}
      />
      <div className="secondary-result-grid">
        {properties.map(
          ([image, title, type, price, size, place, detail, source, availability], i) => (
            <article key={title} onClick={onProperty}>
              <div className="secondary-result-media">
                <img src={image} alt="" />
                <span>{source} LISTING</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggle(`secondary-result-${i}`);
                  }}
                >
                  <Icon name={saved.has(`secondary-result-${i}`) ? "check" : "bookmark"} />
                </button>
                <button
                  className="walkthrough"
                  onClick={(e) => {
                    e.stopPropagation();
                    onVideo();
                  }}
                >
                  <PlayButton small /> Walkthrough
                </button>
              </div>
              <div className="secondary-result-copy">
                <span className="project-place">{place.toUpperCase()}</span>
                <h2>{title}</h2>
                <p className="property-type">{type}</p>
                <div>
                  <strong>{price}</strong>
                  <span>{size}</span>
                </div>
                <p>{detail}</p>
                <small>
                  <i /> {availability}
                </small>
              </div>
            </article>
          ),
        )}
      </div>
      <button className="load-more">Load more properties</button>
    </section>
  );
}

export default SecondaryResults;
