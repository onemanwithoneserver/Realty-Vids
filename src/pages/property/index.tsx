import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, DetailHeader } from "../../AppShared";

function PropertyDetail({
  saved,
  toggle,
  onBack,
  onVideo,
  onEnquire,
}: {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onVideo: () => void;
  onEnquire: () => void;
}) {
  return (
    <section className="detail-page resale-detail">
      <DetailHeader label="SECONDARY MARKET PROPERTY" onBack={onBack} />
      <div className="resale-hero">
        <div className="resale-gallery-main" onClick={onVideo}>
          <img src={IMAGES.interior} alt="Sea-facing Altamount apartment living room" />
          <div className="feature-shade" />
          <span className="pill light">VERIFIED RESALE</span>
          <button>
            <PlayButton /> Watch home tour
          </button>
        </div>
        <div className="resale-gallery-side">
          <img src={IMAGES.lounge} alt="Dining area" />
          <img src={IMAGES.city} alt="City view" />
          <span>+ 18 PHOTOS</span>
        </div>
      </div>
      <div className="project-detail-grid">
        <div className="project-story">
          <div className="resale-heading">
            <div>
              <span className="project-place">ALTAMOUNT ROAD · MUMBAI</span>
              <h1>Sea-facing residence at Altamount</h1>
              <p>3 bedroom · 2,180 sq ft carpet · 2 parking</p>
            </div>
            <strong>₹9.4 Cr</strong>
          </div>
          <div className="property-facts">
            {[
              ["FLOOR", "24 of 31"],
              ["AGE", "6 years"],
              ["STATUS", "Ready to move"],
              ["TENURE", "Freehold"],
              ["FACING", "West · Sea"],
              ["FURNISHING", "Semi-furnished"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <span className="project-place">ABOUT THIS HOME</span>
          <h2>
            A considered home with
            <br />
            an uninterrupted horizon.
          </h2>
          <p>
            Warm natural materials, generous rooms and a protected western outlook distinguish this
            privately held residence. The home has been independently photographed and its core
            documentation reviewed by Realty Vids.
          </p>
          <div className="resale-verification">
            <span>
              <Icon name="check" /> Ownership reviewed
            </span>
            <span>
              <Icon name="check" /> Area documents checked
            </span>
            <span>
              <Icon name="check" /> Listing updated 2 days ago
            </span>
          </div>
          <div className="detail-module connectivity-module">
            <span className="project-place">LOCATION</span>
            <div className="detail-map">
              <span className="map-orbit orbit-one" />
              <button>
                <Icon name="pin" />
                <strong>Altamount Road</strong>
              </button>
              <em>APPROXIMATE LOCATION · DEMO</em>
            </div>
            <div>
              {[
                ["Kemps Corner", "6 min"],
                ["Marine Drive", "12 min"],
                ["BKC", "28 min"],
                ["International Airport", "36 min"],
              ].map(([place, time]) => (
                <span key={place}>
                  <strong>{place}</strong>
                  <small>{time}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="detail-module seller-module">
            <span className="project-place">LISTING SOURCE</span>
            <div>
              <div className="expert-avatar">AM</div>
              <span>
                <strong>Owner represented by Aarav Mehta</strong>
                <small>Identity and authority reviewed · Listing updated 2 days ago</small>
              </span>
              <button onClick={onEnquire}>Contact seller</button>
            </div>
          </div>
        </div>
        <aside className="context-panel">
          <span className="project-place">PRIVATE RESALE</span>
          <h3>Arrange a confidential viewing</h3>
          <p>Receive the property dossier, ownership summary and available viewing times.</p>
          <button className="primary-button" onClick={onEnquire}>
            Request a viewing
          </button>
          <button className="secondary-button" onClick={() => toggle("altamount-property")}>
            <Icon name={saved.has("altamount-property") ? "check" : "bookmark"} />
            {saved.has("altamount-property") ? "Property saved" : "Save property"}
          </button>
          <div className="advisor">
            <div className="expert-avatar">AM</div>
            <span>
              <strong>Aarav Mehta</strong>
              <small>Secondary market advisor</small>
            </span>
          </div>
          <small className="privacy-note">
            Exact building details are shared after owner approval.
          </small>
        </aside>
      </div>
      <div className="mobile-detail-actions">
        <button className="secondary-button" onClick={() => toggle("altamount-property")}>
          <Icon name={saved.has("altamount-property") ? "check" : "bookmark"} />
          {saved.has("altamount-property") ? "Saved" : "Save Property"}
        </button>
        <button className="primary-button" onClick={onEnquire}>
          Contact Seller
        </button>
      </div>
    </section>
  );
}

export default PropertyDetail;
