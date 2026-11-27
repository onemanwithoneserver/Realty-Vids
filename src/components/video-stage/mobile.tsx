import { useState } from "react";
import { useViewport } from "../../lib/viewport";
import { HorizontalScrollRail, Icon, PlayButton } from "../common";
import {
  DEFAULT_PREVIEW_VIDEO,
  RELATED_STAGE_VIDEOS,
  STAGE_CONTENT,
  type InlineVideoStageProps,
} from "./data";

export function MobileVideoStage({
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
  const [contextOpen, setContextOpen] = useState(true);
  const base = STAGE_CONTENT[kind];
  const content = selected ? { ...base, ...selected } : base;
  const videoSaveId = `inline-video-${kind}-${format}`;
  const detailsAction =
    kind === "property" ? onProperty : kind === "education" ? onExpert : onProject;

  return (
    <section className="px-5 pt-4 pb-6">
      <div className="ios-card overflow-hidden border-[var(--border-strong)] shadow-lg">
        <div className="px-4 h-12 flex items-center justify-between border-b border-[var(--border-subtle)]">
          <span className="ios-eyebrow !text-[10px]">Now Playing · {content.recordLabel}</span>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-[var(--bg-chip)] text-[12px] font-semibold text-[var(--text-primary)] border-0"
          >
            <Icon name="close" size={16} />
            <span>Close</span>
          </button>
        </div>

        <div
          className={`bg-black overflow-hidden ${
            format === "portrait" ? "aspect-[9/14]" : "aspect-video"
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

        <div className="p-4">
          <span className="ios-eyebrow !text-[10px]">{content.eyebrow}</span>
          <h2 className="mt-1 font-bold text-[19px] leading-snug tracking-[-0.022em] text-[var(--text-primary)]">
            {content.title}
          </h2>

          <button
            type="button"
            onClick={onExpert}
            className="mt-3 w-full p-2.5 rounded-xl bg-[var(--bg-subtle)] flex items-center gap-2.5 text-left border-0"
          >
            <div className="w-9 h-9 rounded-full rv-accent-fill text-white font-bold text-[12px] grid place-items-center shrink-0">
              RV
            </div>
            <div className="flex-1 min-w-0">
              <strong className="block text-[13px] font-bold text-[var(--text-primary)] truncate">
                {content.creator}
              </strong>
              <span className="block text-[11px] text-[var(--text-secondary)] truncate">
                {content.creatorMeta}
              </span>
            </div>
            <Icon name="chevron" size={18} className="text-[var(--text-tertiary)]" />
          </button>

          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={() => toggle(videoSaveId)}
              className={`flex-1 h-10 rounded-full inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold border ${
                saved.has(videoSaveId)
                  ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                  : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-primary)]"
              }`}
            >
              <Icon name={saved.has(videoSaveId) ? "bookmarkFilled" : "bookmark"} size={18} />
              <span>{saved.has(videoSaveId) ? "Saved" : "Save Film"}</span>
            </button>
            <button
              type="button"
              onClick={() => onShareFeedback(`Shared "${content.title}"`)}
              className="flex-1 h-10 rounded-full bg-[var(--bg-subtle)] text-[12px] font-semibold text-[var(--text-primary)] inline-flex items-center justify-center gap-1.5 border-0"
            >
              <Icon name="share" size={18} />
              <span>Share</span>
            </button>
          </div>

          {/* Collapsible iOS Context Card */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-subtle)]">
            <button
              type="button"
              onClick={() => setContextOpen((v) => !v)}
              className="w-full flex items-center justify-between text-left bg-transparent border-0 p-0"
            >
              <div>
                <span className="ios-eyebrow !text-[10px]">{content.recordLabel}</span>
                <h3 className="font-bold text-[16px] text-[var(--text-primary)]">
                  {content.record}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-[var(--accent)]">
                {contextOpen ? "Hide" : "Details"}
              </span>
            </button>

            {contextOpen && (
              <div className="mt-3 space-y-3">
                <p className="text-[12px] text-[var(--text-secondary)]">{content.meta}</p>
                <div className="grid grid-cols-2 gap-2">
                  {base.facts.map(([label, val]) => (
                    <div
                      key={label}
                      className="p-2.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)]"
                    >
                      <span className="block text-[9px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                        {label}
                      </span>
                      <strong className="block text-[12px] font-bold text-[var(--text-primary)] mt-0.5">
                        {val}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={detailsAction}
                    className="btn-ios-secondary !min-h-[40px] !px-3 !text-[12px]"
                  >
                    View {content.recordLabel}
                  </button>
                  {kind !== "education" && (
                    <button
                      type="button"
                      onClick={onEnquire}
                      className="btn-ios-primary !min-h-[40px] !px-3 !text-[12px]"
                    >
                      Enquire Now
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span className="ios-eyebrow !text-[10px] mb-2 block">Related Videos</span>
            <HorizontalScrollRail
              edgeBleed={false}
              snap={false}
              className="!gap-2.5 !pb-2"
              ariaLabel="Related videos"
            >
              {RELATED_STAGE_VIDEOS.map((vid) => (
                <button
                  key={vid.title}
                  type="button"
                  onClick={() => onSelectRelated(vid.kind)}
                  className="w-48 shrink-0 p-2 rounded-xl bg-[var(--bg-subtle)] text-left border-0"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <img src={vid.image} alt="" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 grid place-items-center scale-75">
                      <PlayButton small />
                    </span>
                  </div>
                  <strong className="block mt-2 text-[12px] font-bold text-[var(--text-primary)] line-clamp-1">
                    {vid.title}
                  </strong>
                  <span className="block text-[10px] text-[var(--text-tertiary)]">
                    {vid.creator} · {vid.duration}
                  </span>
                </button>
              ))}
            </HorizontalScrollRail>
          </div>
        </div>
      </div>
    </section>
  );
}
