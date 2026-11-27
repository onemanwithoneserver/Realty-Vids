import { useState } from "react";
import { DetailHeader, Icon, PlayButton } from "../../components/common";
import {
  getListCategories,
  SAVED_PROJECT_ITEMS,
  SAVED_VIDEO_ITEMS,
  type SavedListsProps,
} from "./data";

export function MobileSavedLists({ saved, onBack, onCreate, onProject, onVideo }: SavedListsProps) {
  const [category, setCategory] = useState("Projects");
  const categories = getListCategories(saved.size);

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="My Lists" onBack={onBack} />

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="ios-eyebrow">Research Workspace</span>
          <h1 className="ios-large-title text-[30px] mt-1">My Lists</h1>
        </div>
        <button
          type="button"
          onClick={onCreate}
          className="btn-ios-primary !min-h-[38px] !px-3.5 !text-[12px] mt-1"
        >
          <Icon name="plus" size={17} />
          <span>New List</span>
        </button>
      </div>

      <div className="-mx-5 px-5 scroll-px-5 flex gap-2.5 overflow-x-auto no-scrollbar my-5 py-1">
        {categories.map((item) => {
          const active = category === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setCategory(item.name)}
              className={`h-9 px-3.5 rounded-full inline-flex items-center gap-1.5 text-[12px] font-semibold shrink-0 border transition ${
                active
                  ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                  : "bg-[var(--bg-elevated)] border-[var(--border-subtle)] text-[var(--text-secondary)]"
              }`}
            >
              <span>{item.name}</span>
              <span className="opacity-80">({item.count})</span>
            </button>
          );
        })}
      </div>

      {category === "Projects" || category === "Properties" ? (
        <div className="space-y-3.5">
          {SAVED_PROJECT_ITEMS.slice(0, category === "Properties" ? 2 : 4).map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={onProject}
              className="w-full ios-card p-3.5 flex items-center gap-3.5 text-left"
            >
              <img src={item.image} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="ios-eyebrow !text-[9px]">{item.badge}</span>
                <strong className="block font-bold text-[15px] text-[var(--text-primary)] truncate mt-0.5">
                  {item.title}
                </strong>
                <p className="text-[12px] text-[var(--text-secondary)] truncate mt-0.5">
                  {item.meta}
                </p>
              </div>
              <Icon name="chevron" size={19} className="text-[var(--text-tertiary)] shrink-0" />
            </button>
          ))}
        </div>
      ) : category === "Videos" ? (
        <div className="space-y-3">
          {SAVED_VIDEO_ITEMS.map((vid) => (
            <button
              key={vid.title}
              type="button"
              onClick={onVideo}
              className="w-full ios-card overflow-hidden text-left"
            >
              <div className="relative aspect-video bg-black">
                <img src={vid.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute inset-0 grid place-items-center">
                  <PlayButton small />
                </span>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/65 text-white text-[11px] font-semibold">
                  {vid.duration}
                </span>
              </div>
              <div className="p-3.5">
                <strong className="block font-bold text-[14px] text-[var(--text-primary)]">
                  {vid.title}
                </strong>
                <span className="block mt-1 text-[12px] text-[var(--text-secondary)]">
                  {vid.creator}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="ios-card p-7 text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center mb-3">
            <Icon name="bookmark" size={28} />
          </div>
          <h3 className="font-bold text-[17px] text-[var(--text-primary)]">
            Saved {category.toLowerCase()}
          </h3>
          <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
            Items you save while exploring appear automatically here.
          </p>
          <button type="button" onClick={onProject} className="btn-ios-secondary mt-4 w-full">
            Explore {category.toLowerCase()}
          </button>
        </div>
      )}
    </section>
  );
}
