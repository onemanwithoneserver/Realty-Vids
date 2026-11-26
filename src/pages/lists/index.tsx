import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, PlayButton, DetailHeader } from "../../AppShared";

function MyLists({
  saved,
  onBack,
  onCreate,
  onProject,
  onVideo,
}: {
  saved: Set<string>;
  onBack: () => void;
  onCreate: () => void;
  onProject: () => void;
  onVideo: () => void;
}) {
  const [category, setCategory] = useState("Projects");
  const categories = [
    ["Projects", 4],
    ["Properties", 2],
    ["Opportunities", 1],
    ["Videos", saved.size + 3],
    ["Experts", 2],
    ["Searches", 3],
    ["Topics", 5],
  ];
  return (
    <section className="section lists-page">
      <DetailHeader label="YOUR RESEARCH WORKSPACE" onBack={onBack} />
      <div className="lists-intro">
        <div>
          <span>MY LISTS</span>
          <h1>
            Everything worth
            <br />
            coming back to.
          </h1>
        </div>
        <button className="primary-button" onClick={onCreate}>
          + Create custom list
        </button>
      </div>
      <div className="lists-layout">
        <aside>
          {categories.map(([name, count]) => (
            <button
              key={name}
              className={category === name ? "active" : ""}
              onClick={() => setCategory(String(name))}
            >
              <span>{name}</span>
              <b>{count}</b>
            </button>
          ))}
        </aside>
        <div className="saved-content">
          <div className="saved-heading">
            <div>
              <span className="project-place">SAVED {category.toUpperCase()}</span>
              <h2>{category}</h2>
            </div>
            <button>
              <Icon name="tune" size={17} /> Organise
            </button>
          </div>
          {category === "Projects" || category === "Properties" ? (
            <div className="saved-projects">
              {[
                [IMAGES.pool, "The Reserve", "Alibaug · From ₹4.25 Cr"],
                [IMAGES.tower, "Aurelia Residences", "Worli · From ₹6.8 Cr"],
                [IMAGES.lounge, "Maison 77", "Bandra West · From ₹8.2 Cr"],
                [IMAGES.city, "The Skyline", "Worli · From ₹7.1 Cr"],
              ].map(([img, title, meta]) => (
                <button key={title} onClick={onProject}>
                  <img src={img} alt="" />
                  <span>
                    <small>{category === "Projects" ? "PROJECT" : "PROPERTY"}</small>
                    <strong>{title}</strong>
                    <p>{meta}</p>
                  </span>
                  <Icon name="chevron" />
                </button>
              ))}
            </div>
          ) : category === "Videos" ? (
            <div className="saved-videos">
              {[
                [IMAGES.skyline, "Is 2026 the year to buy?", "12:46"],
                [IMAGES.interior, "Why this layout feels larger", "00:48"],
                [IMAGES.aerial, "Mumbai’s next growth corridor", "08:24"],
              ].map(([img, title, time]) => (
                <button key={title} onClick={onVideo}>
                  <span>
                    <img src={img} alt="" />
                    <PlayButton small />
                  </span>
                  <strong>{title}</strong>
                  <small>{time} · VIDEO</small>
                </button>
              ))}
            </div>
          ) : (
            <div className="saved-generic">
              <div>
                <Icon
                  name={
                    category === "Searches"
                      ? "search"
                      : category === "Experts"
                        ? "user"
                        : "bookmark"
                  }
                  size={28}
                />
              </div>
              <h3>Your saved {category.toLowerCase()} are organised here</h3>
              <p>Keep researching and this workspace will update automatically.</p>
              <button className="secondary-button">Explore {category.toLowerCase()}</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MyLists;
