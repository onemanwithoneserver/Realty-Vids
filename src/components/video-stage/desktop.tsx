import { useViewport } from "../../lib/viewport";
import { Icon, PlayButton } from "../common";
import {
  DEFAULT_PREVIEW_VIDEO,
  RELATED_STAGE_VIDEOS,
  STAGE_CONTENT,
  type InlineVideoStageProps,
} from "./data";

export function DesktopVideoStage({
  kind,
  format,
  selected,
  saved,
  toggle,
  onClose,
  onProject,
  onProperty,
  onExpert,
  onEnquire,
  onSelectRelated,
}: InlineVideoStageProps) {
  const { onShareFeedback } = useViewport();
  const base = STAGE_CONTENT[kind];
  const content = selected ? { ...base, ...selected } : base;
  const videoSaveId = `inline-video-${kind}-${format}`;
  const detailsAction =
    kind === "property" ? onProperty : kind === "education" ? onExpert : onProject;

  return (
    <section className="max-w-[1320px] mx-auto px-8 pt-6 pb-4">
      <div className="ios-card p-6 lg:p-7 border-[var(--border-strong)] shadow-lg">
        <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[var(--border-subtle)]">
          <div className="inline-flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="ios-eyebrow">Now Playing · {content.recordLabel}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="btn-ios-secondary !min-h-[38px] !px-4 !text-[13px]"
          >
            <Icon name="close" size={18} />
            <span>Close Player</span>
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
          <div className="xl:col-span-8">
            <div
              className={`rounded-2xl overflow-hidden bg-black shadow-md ${
                format === "portrait" ? "max-w-[380px] mx-auto aspect-[9/16]" : "aspect-video"
              }`}
            >
              <video
                key={selected?.videoSrc ?? kind}
                autoPlay
                muted={!selected?.videoSrc}
                loop
                playsInline
                controls
                poster={content.poster}
                className="w-full h-full object-cover"
              >
                <source src={selected?.videoSrc ?? DEFAULT_PREVIEW_VIDEO} type="video/webm" />
              </video>
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="ios-eyebrow">{content.eyebrow}</span>
                <h2 className="ios-section-title text-[26px] mt-1">{content.title}</h2>
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => toggle(videoSaveId)}
                  className={
                    saved.has(videoSaveId)
                      ? "btn-ios-primary !min-h-[42px]"
                      : "btn-ios-secondary !min-h-[42px]"
                  }
                >
                  <Icon name={saved.has(videoSaveId) ? "bookmarkFilled" : "bookmark"} size={19} />
                  <span>{saved.has(videoSaveId) ? "Saved" : "Save Film"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShareFeedback(`Shared "${content.title}"`)}
                  className="btn-ios-secondary !min-h-[42px]"
                >
                  <Icon name="share" size={19} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onExpert}
              className="mt-4 w-full p-3.5 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] border border-[var(--border-subtle)] flex items-center gap-3.5 text-left transition"
            >
              <div className="w-11 h-11 rounded-full rv-accent-fill text-white font-bold text-[13px] grid place-items-center shrink-0">
                RV
              </div>
              <div className="flex-1 min-w-0">
                <strong className="block text-[14px] font-bold text-[var(--text-primary)]">
                  {content.creator}
                </strong>
                <span className="block text-[12px] text-[var(--text-secondary)]">
                  {content.creatorMeta}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[var(--accent)] inline-flex items-center gap-1">
                Creator Profile <Icon name="chevron" size={18} />
              </span>
            </button>
          </div>

          <aside className="xl:col-span-4 p-6 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)] flex flex-col gap-5">
            <div>
              <span className="ios-eyebrow">{content.recordLabel} Context</span>
              <h3 className="ios-section-title text-[22px] mt-1">{content.record}</h3>
              <p className="mt-1.5 text-[13px] text-[var(--text-secondary)] leading-relaxed">
                {content.meta}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {base.facts.map(([label, value]) => (
                <div
                  key={label}
                  className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
                >
                  <span className="block text-[10px] font-bold tracking-[0.1em] uppercase text-[var(--text-tertiary)]">
                    {label}
                  </span>
                  <strong className="block mt-1 text-[14px] font-bold text-[var(--text-primary)]">
                    {value}
                  </strong>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 pt-2">
              {kind !== "education" && (
                <button type="button" onClick={onEnquire} className="btn-ios-primary w-full">
                  <span>Enquire Now</span>
                </button>
              )}
              <button type="button" onClick={detailsAction} className="btn-ios-secondary w-full">
                <span>View {content.recordLabel} Details</span>
                <Icon name="arrow" size={18} />
              </button>
              <button
                type="button"
                onClick={() => toggle(base.saveId)}
                className="btn-ios-secondary w-full"
              >
                <Icon name={saved.has(base.saveId) ? "bookmarkFilled" : "bookmark"} size={19} />
                <span>
                  {saved.has(base.saveId)
                    ? `${content.recordLabel} Saved`
                    : `Save ${content.recordLabel}`}
                </span>
              </button>
            </div>
          </aside>
        </div>

        <div className="mt-7 pt-6 border-t border-[var(--border-subtle)]">
          <span className="ios-eyebrow mb-3 block">Up Next · Related Films</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_STAGE_VIDEOS.map((vid) => (
              <button
                key={vid.title}
                type="button"
                onClick={() => onSelectRelated(vid.kind)}
                className="group p-2.5 rounded-2xl bg-[var(--bg-subtle)] hover:bg-[var(--bg-chip-hover)] border border-[var(--border-subtle)] flex items-center gap-3.5 text-left transition"
              >
                <div className="relative w-28 aspect-video rounded-xl overflow-hidden shrink-0 bg-black">
                  <img src={vid.image} alt="" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center scale-75">
                    <PlayButton small />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <strong className="block text-[13px] font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)]">
                    {vid.title}
                  </strong>
                  <span className="block mt-1 text-[11px] text-[var(--text-tertiary)]">
                    {vid.creator} · {vid.duration}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
