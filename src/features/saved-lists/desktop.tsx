import { useState } from "react";
import { DetailHeader, Icon, PlayButton } from "../../components/common";
import {
  getListCategories,
  SAVED_PROJECT_ITEMS,
  SAVED_VIDEO_ITEMS,
  type SavedListsProps,
} from "./data";

export function DesktopSavedLists({
  saved,
  onBack,
  onCreate,
  onProject,
  onVideo,
}: SavedListsProps) {
  const [category, setCategory] = useState("Projects");
  const categories = getListCategories(saved.size);

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <DetailHeader label="YOUR RESEARCH WORKSPACE" onBack={onBack} />

      <div className="flex flex-wrap items-end justify-between gap-6 mb-9">
        <div>
          <span className="ios-eyebrow">My Lists</span>
          <h1 className="ios-large-title text-[46px] mt-1.5">
            Everything worth
            <br />
            coming back to.
          </h1>
        </div>
        <button type="button" onClick={onCreate} className="btn-ios-primary">
          <Icon name="plus" size={20} />
          <span>Create Custom List</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        <aside className="lg:col-span-3 ios-card p-3 space-y-1">
          {categories.map((item) => {
            const active = category === item.name;
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => setCategory(item.name)}
                className={`w-full h-12 px-3.5 rounded-2xl flex items-center gap-3 text-left border-0 transition ${
                  active
                    ? "rv-accent-fill text-white font-bold shadow-[var(--accent-glow)]"
                    : "bg-transparent text-[var(--text-secondary)] font-semibold hover:bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]"
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="flex-1 text-[14px]">{item.name}</span>
                <span
                  className={`min-w-[26px] h-6 px-2 rounded-full text-[11px] font-bold grid place-items-center ${
                    active
                      ? "bg-white text-[#b81434]"
                      : "bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-9 ios-card p-7">
          <div className="flex items-center justify-between gap-4 pb-5 mb-6 border-b border-[var(--border-subtle)]">
            <div>
              <span className="ios-eyebrow">Saved {category}</span>
              <h2 className="ios-section-title text-[26px] mt-1">{category}</h2>
            </div>
            <button type="button" onClick={onCreate} className="btn-ios-secondary !min-h-[40px]">
              <Icon name="tune" size={18} />
              <span>Organise</span>
            </button>
          </div>

          {category === "Projects" || category === "Properties" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SAVED_PROJECT_ITEMS.slice(0, category === "Properties" ? 2 : 4).map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={onProject}
                  className="group p-3.5 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] border border-[var(--border-subtle)] flex items-center gap-4 text-left transition"
                >
                  <img
                    src={item.image}
                    alt=""
                    className="w-24 h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="ios-eyebrow !text-[10px]">
                      {category === "Projects" ? item.badge : "Verified Resale"}
                    </span>
                    <strong className="block mt-1 font-bold text-[17px] text-[var(--text-primary)] truncate group-hover:text-[var(--accent)]">
                      {item.title}
                    </strong>
                    <p className="mt-1 text-[13px] text-[var(--text-secondary)] truncate">
                      {item.meta}
                    </p>
                  </div>
                  <Icon name="chevron" size={20} className="text-[var(--text-tertiary)]" />
                </button>
              ))}
            </div>
          ) : category === "Videos" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SAVED_VIDEO_ITEMS.map((vid) => (
                <button
                  key={vid.title}
                  type="button"
                  onClick={onVideo}
                  className="group rounded-2xl overflow-hidden bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-left transition hover:-translate-y-1"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={vid.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <PlayButton small />
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/65 text-white text-[11px] font-semibold">
                      {vid.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <strong className="block font-bold text-[14px] text-[var(--text-primary)] line-clamp-2">
                      {vid.title}
                    </strong>
                    <small className="block mt-1 text-[12px] text-[var(--text-secondary)]">
                      {vid.creator} · Saved Film
                    </small>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-14 px-6 text-center max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center mb-4">
                <Icon
                  name={
                    category === "Searches"
                      ? "search"
                      : category === "Experts"
                        ? "user"
                        : "bookmark"
                  }
                  size={30}
                />
              </div>
              <h3 className="ios-section-title text-[22px]">
                Your saved {category.toLowerCase()} live here
              </h3>
              <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed">
                Keep watching and shortlisting—every {category.toLowerCase().slice(0, -1)} you
                bookmark syncs automatically across desktop and mobile.
              </p>
              <button type="button" onClick={onProject} className="btn-ios-secondary mt-5">
                <span>Explore {category.toLowerCase()}</span>
                <Icon name="arrow" size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
