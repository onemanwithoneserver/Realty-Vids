import { IMAGES } from "../../lib/assets";
import { DetailHeader, Icon } from "../../components/common";
import {
  PROPERTY_COMMUTES,
  PROPERTY_SPECS,
  PROPERTY_VERIFICATIONS,
  type PropertyDetailProps,
} from "./data";

export function MobilePropertyDetail({
  saved,
  toggle,
  onBack,
  onVideo,
  onEnquire,
}: PropertyDetailProps) {
  const isSaved = saved.has("altamount-property");

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="Property Detail" onBack={onBack} />

      <div
        onClick={onVideo}
        className="relative aspect-[4/3.6] rounded-3xl overflow-hidden bg-black shadow-md"
      >
        <img
          src={IMAGES.interior}
          alt="Altamount Residence"
          className="w-full h-full object-cover"
        />
        <div className="rv-hero-scrim" />
        <span className="rv-badge-glass absolute top-3.5 left-3.5 !text-[10px]">
          VERIFIED RESALE
        </span>
        <button
          type="button"
          className="btn-ios-primary absolute bottom-4 left-4 right-4 !min-h-[42px]"
        >
          <Icon name="play" size={20} />
          <span>Watch Home Walkthrough</span>
        </button>
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">Altamount Road · Mumbai</span>
        <div className="flex items-baseline justify-between gap-2 mt-1">
          <h1 className="font-bold text-[21px] leading-snug">Sea-facing residence</h1>
          <strong className="font-extrabold text-[20px] text-[var(--accent)] shrink-0">
            ₹9.4 Cr
          </strong>
        </div>
        <p className="mt-1 text-[12px] text-[var(--text-secondary)]">
          3 BHK · 2,180 sq ft carpet · 2 parking
        </p>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {PROPERTY_SPECS.map(([label, val]) => (
            <div key={label} className="p-2.5 rounded-xl bg-[var(--bg-subtle)]">
              <span className="block text-[9px] font-bold uppercase text-[var(--text-tertiary)]">
                {label}
              </span>
              <strong className="block text-[13px] font-bold mt-0.5">{val}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="ios-card p-4 mt-4 space-y-2">
        <span className="ios-eyebrow !text-[10px]">Verification Summary</span>
        {PROPERTY_VERIFICATIONS.map((v) => (
          <div
            key={v}
            className="flex items-center gap-2 text-[12px] font-semibold text-[var(--emerald)]"
          >
            <Icon name="checkCircle" size={16} />
            <span>{v}</span>
          </div>
        ))}
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">Commute Times</span>
        <div className="grid grid-cols-2 gap-2 mt-2.5">
          {PROPERTY_COMMUTES.map(([place, time]) => (
            <div key={place} className="p-2.5 rounded-xl bg-[var(--bg-subtle)]">
              <strong className="block text-[12px] font-bold truncate">{place}</strong>
              <span className="text-[11px] font-semibold text-[var(--accent)]">{time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sticky bottom-[calc(var(--mobile-tabbar-h)+8px)] z-30 mt-6 p-2.5 rounded-2xl ios-glass-heavy border border-[var(--border-strong)] shadow-lg grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => toggle("altamount-property")}
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
          <span>Contact Seller</span>
        </button>
      </div>
    </section>
  );
}
