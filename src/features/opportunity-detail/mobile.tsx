import { IMAGES } from "../../lib/assets";
import { DetailHeader, Icon } from "../../components/common";
import { OPPORTUNITY_CHECKS, OPPORTUNITY_EVIDENCE, type OpportunityDetailProps } from "./data";

export function MobileOpportunityDetail({
  saved,
  toggle,
  onBack,
  onEnquire,
}: OpportunityDetailProps) {
  const isSaved = saved.has("deal1");

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="Verified Deal" onBack={onBack} />

      <div className="p-5 rounded-3xl rv-accent-fill text-white shadow-lg">
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-wider">
          <Icon name="verified" size={14} />
          Realty Vids Verified
        </span>
        <h1 className="mt-2 font-[800] text-[28px] leading-tight">Parkside Residences</h1>
        <p className="mt-1 text-[13px] text-white/95">
          Lower Parel · Ready 3 BHK · 6 days remaining
        </p>
        <div className="mt-4 pt-3.5 border-t border-white/25 flex items-baseline justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white/95">
            Documented Advantage
          </span>
          <strong className="font-[800] text-[28px]">₹80L (12%)</strong>
        </div>
      </div>

      <div className="mt-4 rounded-2xl overflow-hidden aspect-video bg-black">
        <img src={IMAGES.interior} alt="Parkside interior" className="w-full h-full object-cover" />
      </div>

      <div className="space-y-2.5 mt-4">
        {OPPORTUNITY_EVIDENCE.map((ev) => (
          <div key={ev.label} className="ios-card p-4 flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-bold uppercase text-[var(--text-tertiary)]">
                {ev.label}
              </span>
              <small className="text-[12px] text-[var(--text-secondary)]">{ev.note}</small>
            </div>
            <strong className="font-extrabold text-[18px] text-[var(--text-primary)]">
              {ev.value}
            </strong>
          </div>
        ))}
      </div>

      <div className="ios-card p-4 mt-4 space-y-2">
        <span className="ios-eyebrow !text-[10px]">Evidence, Not Promotion</span>
        {OPPORTUNITY_CHECKS.map((c) => (
          <div key={c} className="flex items-center gap-2 text-[12px] font-semibold">
            <Icon name="checkCircle" size={17} className="text-[var(--emerald)] shrink-0" />
            <span>{c}</span>
          </div>
        ))}
      </div>

      <div className="sticky bottom-[calc(var(--mobile-tabbar-h)+8px)] z-30 mt-6 p-2.5 rounded-2xl ios-glass-heavy border border-[var(--border-strong)] shadow-lg grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => toggle("deal1")}
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
          <span>Request Details</span>
        </button>
      </div>
    </section>
  );
}
