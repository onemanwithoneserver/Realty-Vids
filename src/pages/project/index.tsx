import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, DetailHeader } from "../../AppShared";

function ProjectDetail({
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
    <section className="detail-page">
      <DetailHeader label="PROJECT DETAIL" onBack={onBack} />
      <div className="project-hero">
        <img src={IMAGES.pool} alt="The Reserve landscaped pool and residence" />
        <div className="feature-shade" />
        <div className="project-hero-copy">
          <span>LODHA · ALIBAUG</span>
          <h1>The Reserve</h1>
          <p>A private sanctuary shaped around tropical gardens and unhurried coastal living.</p>
        </div>
        <button className="hero-play" onClick={onVideo}>
          <PlayButton /> Watch project film
        </button>
      </div>
      <div className="project-detail-grid">
        <div className="project-story">
          <div className="project-stats">
            <div>
              <span>FROM</span>
              <strong>₹4.25 Cr</strong>
            </div>
            <div>
              <span>CONFIGURATION</span>
              <strong>3 & 4 Beds</strong>
            </div>
            <div>
              <span>POSSESSION</span>
              <strong>December 2027</strong>
            </div>
            <div>
              <span>RERA</span>
              <strong>P52000047219</strong>
            </div>
          </div>
          <span className="project-place">THE PROJECT</span>
          <h2>
            Space to arrive.
            <br />
            Room to exhale.
          </h2>
          <p>
            Set across 18 acres of preserved landscape, The Reserve brings together 42 considered
            residences, private gardens and a members-only wellness pavilion.
          </p>
          <div className="media-pair">
            <button onClick={onVideo}>
              <img src={IMAGES.interior} alt="" />
              <PlayButton small />
              <span>Inside the residences</span>
            </button>
            <button onClick={onVideo}>
              <img src={IMAGES.lounge} alt="" />
              <PlayButton small />
              <span>Design with intention</span>
            </button>
          </div>
          <div className="amenities">
            <span className="project-place">SIGNATURE AMENITIES</span>
            <div>
              {[
                "Private pool",
                "Wellness pavilion",
                "Concierge",
                "Coastal trail",
                "Chef’s table",
                "EV charging",
              ].map((item, i) => (
                <span key={item}>
                  <b>0{i + 1}</b>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="detail-module builder-profile-module">
            <span className="project-place">THE BUILDER</span>
            <div>
              <b>LODHA</b>
              <span>
                <strong>Lodha</strong>
                <small>18 projects · 7 delivered in Mumbai</small>
              </span>
              <button>
                View portfolio <Icon name="arrow" size={15} />
              </button>
            </div>
          </div>
          <div className="detail-module">
            <span className="project-place">PRICING & CONFIGURATIONS</span>
            <div className="configuration-table">
              {[
                ["3 BHK", "1,820–2,110 sq ft", "₹4.25–5.4 Cr"],
                ["4 BHK", "2,540–3,120 sq ft", "₹6.1–7.8 Cr"],
                ["Garden villa", "3,480 sq ft", "₹9.2 Cr"],
              ].map(([type, size, price]) => (
                <button key={type}>
                  <span>
                    <strong>{type}</strong>
                    <small>{size} carpet</small>
                  </span>
                  <b>{price}</b>
                  <Icon name="chevron" size={15} />
                </button>
              ))}
            </div>
          </div>
          <div className="detail-module floor-plan-module">
            <span className="project-place">FLOOR PLANS</span>
            <div>
              {[
                ["3 BHK", "1,820 sq ft"],
                ["4 BHK", "2,540 sq ft"],
              ].map(([type, size], i) => (
                <button key={type}>
                  <span className="floor-plan-drawing">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <strong>{type}</strong>
                  <small>{size} carpet · View plan</small>
                </button>
              ))}
            </div>
          </div>
          <div className="detail-module connectivity-module">
            <span className="project-place">LOCATION & CONNECTIVITY</span>
            <div className="detail-map">
              <span className="map-orbit orbit-one" />
              <button>
                <Icon name="pin" />
                <strong>The Reserve</strong>
              </button>
              <em>DEMONSTRATION MAP</em>
            </div>
            <div>
              {[
                ["Mandwa Jetty", "20 min"],
                ["Alibaug town", "18 min"],
                ["Kihim Beach", "12 min"],
                ["Mumbai by speedboat", "55 min"],
              ].map(([place, time]) => (
                <span key={place}>
                  <strong>{place}</strong>
                  <small>{time}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="detail-module detail-videos">
            <span className="project-place">MORE PROJECT VIDEOS</span>
            <div>
              {[
                [IMAGES.pool, "A day at The Reserve", "03:42"],
                [IMAGES.interior, "Inside the 4-bedroom residence", "05:18"],
                [IMAGES.lounge, "Meet the landscape architect", "07:05"],
              ].map(([image, title, time]) => (
                <button key={title} onClick={onVideo}>
                  <span>
                    <img src={image} alt="" />
                    <PlayButton small />
                  </span>
                  <strong>{title}</strong>
                  <small>{time}</small>
                </button>
              ))}
            </div>
          </div>
          <div className="detail-module related-projects">
            <span className="project-place">RELATED PROJECTS</span>
            <div>
              {[
                [IMAGES.tower, "Aurelia Residences", "Worli · From ₹6.8 Cr"],
                [IMAGES.lounge, "Maison 77", "Bandra · From ₹8.2 Cr"],
              ].map(([image, title, meta]) => (
                <button key={title}>
                  <img src={image} alt="" />
                  <strong>{title}</strong>
                  <small>{meta}</small>
                </button>
              ))}
            </div>
          </div>
        </div>
        <aside className="context-panel">
          <span className="project-place">YOUR NEXT STEP</span>
          <h3>Experience The Reserve</h3>
          <p>Get the detailed brochure, current inventory and a private walkthrough.</p>
          <button className="primary-button" onClick={onEnquire}>
            Request a private viewing
          </button>
          <button className="secondary-button" onClick={() => toggle("reserve-project")}>
            <Icon name={saved.has("reserve-project") ? "check" : "bookmark"} size={17} />
            {saved.has("reserve-project") ? "Project saved" : "Save project"}
          </button>
          <div className="advisor">
            <div className="expert-avatar">NS</div>
            <span>
              <strong>Naina Shah</strong>
              <small>Project advisor · responds in 10 min</small>
            </span>
          </div>
          <div className="map-card">
            <div className="map-pin">
              <Icon name="pin" />
            </div>
            <span>20 min from Mandwa Jetty</span>
          </div>
        </aside>
      </div>
      <div className="mobile-detail-actions">
        <button className="secondary-button" onClick={() => toggle("reserve-project")}>
          <Icon name={saved.has("reserve-project") ? "check" : "bookmark"} />
          {saved.has("reserve-project") ? "Saved" : "Save Project"}
        </button>
        <button className="primary-button" onClick={onEnquire}>
          Enquire Now
        </button>
      </div>
    </section>
  );
}

export default ProjectDetail;
