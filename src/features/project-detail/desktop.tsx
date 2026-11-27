import { IMAGES } from "../../lib/assets";
import { DetailHeader, Icon, PlayButton } from "../../components/common";
import {
  PROJECT_AMENITIES,
  PROJECT_CONFIGS,
  PROJECT_CONNECTIVITY,
  PROJECT_STATS,
  PROJECT_VIDEOS,
  RELATED_PROJECTS,
  type ProjectDetailProps,
} from "./data";

export function DesktopProjectDetail({
  saved,
  toggle,
  onBack,
  onVideo,
  onEnquire,
}: ProjectDetailProps) {
  const isSaved = saved.has("reserve-project");

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <DetailHeader label="PROJECT DOSSIER" onBack={onBack} />

      {/* Hero Stage */}
      <div
        onClick={onVideo}
        className="relative h-[460px] rounded-[28px] overflow-hidden bg-black shadow-lg cursor-pointer group"
      >
        <img
          src={IMAGES.pool}
          alt="The Reserve landscaped pool and residence"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
        <div className="rv-hero-scrim" />
        <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between gap-6 z-10">
          <div>
            <span className="rv-badge-glass">LODHA · ALIBAUG</span>
            <h1 className="mt-3 font-[800] text-[48px] leading-none tracking-[-0.038em] text-white">
              The Reserve
            </h1>
            <p className="mt-2.5 text-[16px] text-white/85 max-w-xl">
              A private sanctuary shaped around preserved tropical gardens and unhurried coastal
              living.
            </p>
          </div>
          <button type="button" className="btn-ios-primary !h-13 !px-6 shrink-0">
            <Icon name="play" size={22} />
            <span>Watch Project Film</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-9 items-start">
        <div className="xl:col-span-8 space-y-8">
          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PROJECT_STATS.map(([label, val]) => (
              <div key={label} className="ios-card p-5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                  {label}
                </span>
                <strong className="block mt-1.5 font-[800] text-[20px] text-[var(--text-primary)]">
                  {val}
                </strong>
              </div>
            ))}
          </div>

          {/* Story */}
          <div className="ios-card p-7">
            <span className="ios-eyebrow">The Architecture</span>
            <h2 className="ios-section-title text-[30px] mt-1.5">
              Space to arrive. Room to exhale.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Set across 18 acres of preserved coastal landscape, The Reserve brings together 42
              low-density residences, shaded courtyard gardens and a members-only wellness pavilion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {[
                [IMAGES.interior, "Inside the residences"],
                [IMAGES.lounge, "Design with intention"],
              ].map(([img, caption]) => (
                <button
                  key={caption}
                  type="button"
                  onClick={onVideo}
                  className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border-0 p-0 text-left"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute inset-0 grid place-items-center">
                    <PlayButton small />
                  </span>
                  <span className="absolute bottom-3.5 left-4 text-[14px] font-bold text-white">
                    {caption}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div className="ios-card p-7">
            <span className="ios-eyebrow">Signature Amenities</span>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5 mt-4">
              {PROJECT_AMENITIES.map((item, idx) => (
                <div
                  key={item}
                  className="p-4 rounded-2xl bg-[var(--bg-subtle)] flex items-center gap-3"
                >
                  <span className="w-8 h-8 rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] font-extrabold text-[12px] grid place-items-center shrink-0">
                    0{idx + 1}
                  </span>
                  <strong className="text-[14px] font-semibold text-[var(--text-primary)]">
                    {item}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & Configurations */}
          <div className="ios-card p-7">
            <span className="ios-eyebrow">Pricing & Configurations</span>
            <div className="space-y-3 mt-4">
              {PROJECT_CONFIGS.map((cfg) => (
                <button
                  key={cfg.type}
                  type="button"
                  onClick={onEnquire}
                  className="w-full p-4 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] flex items-center justify-between gap-4 text-left border-0 transition"
                >
                  <div>
                    <strong className="block font-bold text-[16px] text-[var(--text-primary)]">
                      {cfg.type}
                    </strong>
                    <small className="text-[13px] text-[var(--text-secondary)]">{cfg.size}</small>
                  </div>
                  <div className="flex items-center gap-3">
                    <strong className="font-[800] text-[18px] text-[var(--accent)]">
                      {cfg.price}
                    </strong>
                    <Icon name="chevron" size={20} className="text-[var(--text-tertiary)]" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Connectivity */}
          <div className="ios-card p-7">
            <span className="ios-eyebrow">Location & Connectivity</span>
            <div className="rv-radar-map h-56 mt-4 p-5 flex items-center justify-center">
              <span className="rv-radar-ring w-36 h-36" />
              <div className="relative z-10 px-4 py-2.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-border)] shadow-md inline-flex items-center gap-2 font-bold text-[14px]">
                <Icon name="pin" size={20} className="text-[var(--accent)]" />
                <span>The Reserve · Alibaug</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {PROJECT_CONNECTIVITY.map(([place, time]) => (
                <div key={place} className="p-3.5 rounded-2xl bg-[var(--bg-subtle)]">
                  <strong className="block text-[13px] font-bold text-[var(--text-primary)]">
                    {place}
                  </strong>
                  <span className="text-[12px] font-semibold text-[var(--accent)]">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* More Videos & Related */}
          <div className="ios-card p-7">
            <span className="ios-eyebrow">More Project Films</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {PROJECT_VIDEOS.map((vid) => (
                <button
                  key={vid.title}
                  type="button"
                  onClick={onVideo}
                  className="group rounded-2xl overflow-hidden bg-[var(--bg-subtle)] text-left border-0 p-0"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={vid.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                    <span className="absolute inset-0 grid place-items-center">
                      <PlayButton small />
                    </span>
                  </div>
                  <div className="p-3.5">
                    <strong className="block text-[14px] font-bold text-[var(--text-primary)]">
                      {vid.title}
                    </strong>
                    <small className="text-[12px] text-[var(--text-tertiary)]">
                      {vid.duration}
                    </small>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="ios-card p-7">
            <span className="ios-eyebrow">Related Projects</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {RELATED_PROJECTS.map((rel) => (
                <div
                  key={rel.title}
                  className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] flex items-center gap-3.5"
                >
                  <img
                    src={rel.image}
                    alt=""
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <strong className="block text-[15px] font-bold text-[var(--text-primary)]">
                      {rel.title}
                    </strong>
                    <small className="text-[12px] text-[var(--text-secondary)]">{rel.meta}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Concierge Card */}
        <aside className="xl:col-span-4 sticky top-[calc(var(--preview-bar-h)+var(--topbar-h)+24px)] ios-card p-7 space-y-5">
          <div>
            <span className="ios-eyebrow">Your Next Step</span>
            <h3 className="ios-section-title text-[24px] mt-1">Experience The Reserve</h3>
            <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Receive the verified floor-plan dossier, current unit inventory and a private coastal
              walkthrough.
            </p>
          </div>

          <div className="space-y-2.5">
            <button type="button" onClick={onEnquire} className="btn-ios-primary w-full">
              <span>Request Private Viewing</span>
            </button>
            <button
              type="button"
              onClick={() => toggle("reserve-project")}
              className="btn-ios-secondary w-full"
            >
              <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
              <span>{isSaved ? "Project Saved" : "Save Project"}</span>
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-[var(--bg-subtle)] flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full rv-accent-fill text-white font-bold text-[13px] grid place-items-center shrink-0">
              NS
            </div>
            <div>
              <strong className="block text-[14px] font-bold text-[var(--text-primary)]">
                Naina Shah
              </strong>
              <small className="text-[12px] text-[var(--text-secondary)]">
                Lead Project Advisor · Responds in ~10m
              </small>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[var(--emerald-soft)] text-[var(--emerald)] flex items-center gap-2.5 text-[13px] font-semibold">
            <Icon name="verified" size={19} />
            <span>RERA & Builder Title Verified</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
