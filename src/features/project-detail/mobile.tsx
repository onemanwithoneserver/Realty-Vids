import { IMAGES } from "../../lib/assets";
import { DetailHeader, HorizontalScrollRail, Icon, PlayButton } from "../../components/common";
import {
  PROJECT_AMENITIES,
  PROJECT_CONFIGS,
  PROJECT_CONNECTIVITY,
  PROJECT_STATS,
  PROJECT_VIDEOS,
  type ProjectDetailProps,
} from "./data";

export function MobileProjectDetail({
  saved,
  toggle,
  onBack,
  onVideo,
  onEnquire,
}: ProjectDetailProps) {
  const isSaved = saved.has("reserve-project");

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="Project Detail" onBack={onBack} />

      <div
        onClick={onVideo}
        className="relative aspect-[4/4.2] rounded-3xl overflow-hidden bg-black shadow-md"
      >
        <img src={IMAGES.pool} alt="The Reserve" className="w-full h-full object-cover" />
        <div className="rv-hero-scrim" />
        <span className="rv-badge-glass absolute top-3.5 left-3.5 !text-[10px]">
          LODHA · ALIBAUG
        </span>
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <h1 className="font-[800] text-[30px] leading-tight text-white">The Reserve</h1>
          <p className="mt-1 text-[13px] text-white/85">
            18 acres of preserved gardens & private villas.
          </p>
          <button type="button" className="btn-ios-primary w-full mt-3 !min-h-[44px]">
            <Icon name="play" size={20} />
            <span>Watch Project Film</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        {PROJECT_STATS.map(([label, val]) => (
          <div key={label} className="ios-card p-3.5">
            <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
              {label}
            </span>
            <strong className="block mt-1 font-bold text-[15px] text-[var(--text-primary)] truncate">
              {val}
            </strong>
          </div>
        ))}
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">The Project</span>
        <h2 className="font-bold text-[20px] mt-1">Space to arrive. Room to exhale.</h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          42 low-density residences with private gardens and a members-only coastal wellness
          pavilion.
        </p>
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">Configurations</span>
        <div className="space-y-2 mt-3">
          {PROJECT_CONFIGS.map((cfg) => (
            <button
              key={cfg.type}
              type="button"
              onClick={onEnquire}
              className="w-full p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center justify-between text-left border-0"
            >
              <div>
                <strong className="block text-[14px] font-bold">{cfg.type}</strong>
                <small className="text-[11px] text-[var(--text-secondary)]">{cfg.size}</small>
              </div>
              <strong className="text-[14px] font-extrabold text-[var(--accent)]">
                {cfg.price}
              </strong>
            </button>
          ))}
        </div>
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">Amenities</span>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {PROJECT_AMENITIES.map((a) => (
            <div
              key={a}
              className="p-2.5 rounded-xl bg-[var(--bg-subtle)] text-[12px] font-semibold"
            >
              ✓ {a}
            </div>
          ))}
        </div>
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">Connectivity</span>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {PROJECT_CONNECTIVITY.map(([place, time]) => (
            <div key={place} className="p-2.5 rounded-xl bg-[var(--bg-subtle)]">
              <strong className="block text-[12px] font-bold truncate">{place}</strong>
              <span className="text-[11px] font-semibold text-[var(--accent)]">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <span className="ios-eyebrow !text-[10px] mb-3 block">More Project Videos</span>
        <HorizontalScrollRail snap={false} ariaLabel="More project videos">
          {PROJECT_VIDEOS.map((vid) => (
            <button
              key={vid.title}
              type="button"
              onClick={onVideo}
              className="w-56 shrink-0 ios-card overflow-hidden text-left border-0 p-0"
            >
              <div className="relative aspect-video bg-black">
                <img src={vid.image} alt="" className="w-full h-full object-cover" />
                <span className="absolute inset-0 grid place-items-center">
                  <PlayButton small />
                </span>
              </div>
              <div className="p-3">
                <strong className="block text-[13px] font-bold truncate">{vid.title}</strong>
                <small className="text-[11px] text-[var(--text-tertiary)]">{vid.duration}</small>
              </div>
            </button>
          ))}
        </HorizontalScrollRail>
      </div>

      {/* Sticky Action Bar */}
      <div className="sticky bottom-[calc(var(--mobile-tabbar-h)+8px)] z-30 mt-6 p-2.5 rounded-2xl ios-glass-heavy border border-[var(--border-strong)] shadow-lg grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => toggle("reserve-project")}
          className="btn-ios-secondary !min-h-[42px] !text-[13px]"
        >
          <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={18} />
          <span>{isSaved ? "Saved" : "Save"}</span>
        </button>
        <button
          type="button"
          onClick={onEnquire}
          className="btn-ios-primary !min-h-[42px] !text-[13px]"
        >
          <span>Enquire Now</span>
        </button>
      </div>
    </section>
  );
}
