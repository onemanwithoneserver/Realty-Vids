import React, { useEffect, useMemo, useRef, useState } from "react";
import { IMAGES, Icon, DetailHeader } from "../../AppShared";

function SearchPage({
  onBack,
  onProject,
  onProperty,
  onLocation,
}: {
  onBack: () => void;
  onProject: () => void;
  onProperty: () => void;
  onLocation: () => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const results = [
    [IMAGES.tower, "PROJECT", "Aurelia Residences", "Worli · K Raheja · From ₹6.8 Cr", onProject],
    [
      IMAGES.interior,
      "PROPERTY",
      "Sea-facing residence",
      "Altamount · 3 BHK · ₹9.4 Cr",
      onProperty,
    ],
    [IMAGES.pool, "PROJECT", "The Reserve", "Alibaug · Lodha · From ₹4.25 Cr", onProject],
  ] as const;
  return (
    <section className="dedicated-search-page">
      <DetailHeader label="DISCOVER SEARCH" onBack={onBack} />
      <div className="dedicated-search-inner">
        <div className="dedicated-search-heading">
          <span>SEARCH REALTY VIDS</span>
          <h1>
            What are you
            <br />
            looking for?
          </h1>
        </div>
        <div className="dedicated-search-input">
          <Icon name="search" size={23} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Project, builder, property, city, locality or landmark"
          />
          {query && (
            <button onClick={() => setQuery("")}>
              <Icon name="close" />
            </button>
          )}
        </div>
        <div className="dedicated-search-categories">
          {["All", "Projects", "Properties", "Builders", "Cities & localities", "Landmarks"].map(
            (item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ),
          )}
        </div>
        {query ? (
          <div className="dedicated-results">
            <div className="search-result-summary">
              <span>BEST MATCHES</span>
              <strong>8 results for “{query}”</strong>
            </div>
            <div className="dedicated-result-grid">
              {results.map(([image, type, title, meta, action]) => (
                <button key={title} onClick={action}>
                  <img src={image} alt="" />
                  <span>
                    <small>{type}</small>
                    <strong>{title}</strong>
                    <p>{meta}</p>
                  </span>
                  <Icon name="chevron" />
                </button>
              ))}
              <button onClick={onProject}>
                <div className="result-monogram">LO</div>
                <span>
                  <small>BUILDER</small>
                  <strong>Lodha</strong>
                  <p>18 projects across Mumbai</p>
                </span>
                <Icon name="chevron" />
              </button>
              <button onClick={onLocation}>
                <div className="result-place">
                  <Icon name="pin" />
                </div>
                <span>
                  <small>LOCALITY</small>
                  <strong>Worli, Mumbai</strong>
                  <p>42 projects · 186 videos</p>
                </span>
                <Icon name="chevron" />
              </button>
              <button onClick={onLocation}>
                <div className="result-place">
                  <Icon name="pin" />
                </div>
                <span>
                  <small>LANDMARK</small>
                  <strong>Bandra Kurla Complex</strong>
                  <p>19 projects within 5 km</p>
                </span>
                <Icon name="chevron" />
              </button>
            </div>
          </div>
        ) : (
          <div className="search-start-state">
            <div className="search-start-main">
              <section>
                <span>RECENT SEARCHES</span>
                {["3 BHK in Worli", "New launches in Bandra", "Villas near Mandwa Jetty"].map(
                  (item) => (
                    <button key={item} onClick={() => setQuery(item)}>
                      <Icon name="clock" size={15} />
                      <strong>{item}</strong>
                      <Icon name="arrow" size={15} />
                    </button>
                  ),
                )}
              </section>
              <section>
                <span>POPULAR LOCATIONS</span>
                {[
                  ["01", "Worli", "42 projects"],
                  ["02", "Bandra West", "31 projects"],
                  ["03", "Alibaug", "18 projects"],
                  ["04", "Lower Parel", "26 projects"],
                ].map(([n, place, count]) => (
                  <button key={place} onClick={onLocation}>
                    <b>{n}</b>
                    <strong>{place}</strong>
                    <small>{count}</small>
                    <Icon name="chevron" size={15} />
                  </button>
                ))}
              </section>
            </div>
            <aside>
              <span>SUGGESTED FOR YOU</span>
              <h2>Projects matched to your preferences</h2>
              {results.slice(0, 2).map(([image, , title, meta, action]) => (
                <button key={title} onClick={action}>
                  <img src={image} alt="" />
                  <span>
                    <strong>{title}</strong>
                    <small>{meta}</small>
                  </span>
                </button>
              ))}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default SearchPage;
