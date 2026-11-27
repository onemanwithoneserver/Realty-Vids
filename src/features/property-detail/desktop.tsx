import { IMAGES } from "../../lib/assets";
import { DetailHeader, Icon, PlayButton } from "../../components/common";
import {
  PROPERTY_COMMUTES,
  PROPERTY_SPECS,
  PROPERTY_VERIFICATIONS,
  type PropertyDetailProps,
} from "./data";

export function DesktopPropertyDetail({
  saved,
  toggle,
  onBack,
  onVideo,
  onEnquire,
}: PropertyDetailProps) {
  const isSaved = saved.has("altamount-property");

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <DetailHeader label="SECONDARY MARKET PROPERTY" onBack={onBack} />

      {/* Photo Mosaic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[430px]">
        <div
          onClick={onVideo}
          className="lg:col-span-8 relative rounded-[26px] overflow-hidden bg-black cursor-pointer group"
        >
          <img
            src={IMAGES.interior}
            alt="Sea-facing Altamount apartment living room"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
          />
          <div className="rv-hero-scrim" />
          <span className="rv-badge-verified absolute top-5 left-5 !bg-emerald-950/85 !text-emerald-100 !border-emerald-400/50 backdrop-blur-md">
            <Icon name="verified" size={16} />
            Verified Resale
          </span>
          <button type="button" className="btn-ios-primary absolute bottom-6 left-6 !h-12 !px-6">
            <Icon name="play" size={21} />
            <span>Watch Home Tour</span>
          </button>
        </div>

        <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
          <div
            onClick={onVideo}
            className="relative rounded-[22px] overflow-hidden bg-black cursor-pointer"
          >
            <img
              src={IMAGES.lounge}
              alt="Dining area"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
          <div
            onClick={onVideo}
            className="relative rounded-[22px] overflow-hidden bg-black cursor-pointer"
          >
            <img
              src={IMAGES.city}
              alt="Sea view"
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-black/45 grid place-items-center">
              <span className="rv-badge-glass !text-[12px] !px-4 !py-2">+ 18 Verified Photos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-9 items-start">
        <div className="xl:col-span-8 space-y-7">
          <div className="ios-card p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="ios-eyebrow">Altamount Road · Mumbai</span>
                <h1 className="ios-section-title text-[34px] mt-1">
                  Sea-facing residence at Altamount
                </h1>
                <p className="mt-1.5 text-[15px] text-[var(--text-secondary)]">
                  3 Bedroom · 2,180 sq ft carpet · 2 covered parking bays
                </p>
              </div>
              <div className="text-right">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                  Asking Price
                </span>
                <strong className="font-[800] text-[34px] tracking-[-0.03em] text-[var(--accent)]">
                  ₹9.4 Cr
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 mt-6">
              {PROPERTY_SPECS.map(([label, val]) => (
                <div key={label} className="p-4 rounded-2xl bg-[var(--bg-subtle)]">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                    {label}
                  </span>
                  <strong className="block mt-1 text-[15px] font-bold text-[var(--text-primary)]">
                    {val}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="ios-card p-7">
            <span className="ios-eyebrow">About This Home</span>
            <h2 className="ios-section-title text-[26px] mt-1.5">
              A considered home with an uninterrupted horizon.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Warm natural stone, generous proportions and a protected western sea outlook
              distinguish this privately held residence. Photographed and independently reviewed by
              the Realty Vids Secondary Desk.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-5">
              {PROPERTY_VERIFICATIONS.map((item) => (
                <span
                  key={item}
                  className="rv-badge-verified !normal-case !tracking-normal !text-[12px]"
                >
                  <Icon name="check" size={16} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="ios-card p-7">
            <span className="ios-eyebrow">Location & Commute</span>
            <div className="rv-radar-map h-52 mt-4 p-5 flex items-center justify-center">
              <span className="rv-radar-ring w-36 h-36" />
              <div className="relative z-10 px-4 py-2 rounded-full bg-[var(--bg-elevated)] border border-[var(--accent-border)] shadow-md inline-flex items-center gap-2 font-bold text-[14px]">
                <Icon name="pin" size={19} className="text-[var(--accent)]" />
                <span>Altamount Road, South Mumbai</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {PROPERTY_COMMUTES.map(([place, time]) => (
                <div key={place} className="p-3.5 rounded-2xl bg-[var(--bg-subtle)]">
                  <strong className="block text-[13px] font-bold">{place}</strong>
                  <span className="text-[12px] font-semibold text-[var(--accent)]">{time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ios-card p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full rv-accent-fill text-white font-bold grid place-items-center">
                AM
              </div>
              <div>
                <strong className="block text-[15px] font-bold">
                  Owner represented by Aarav Mehta
                </strong>
                <small className="text-[13px] text-[var(--text-secondary)]">
                  Authority & identity verified · Updated 2 days ago
                </small>
              </div>
            </div>
            <button type="button" onClick={onEnquire} className="btn-ios-secondary">
              Contact Seller Desk
            </button>
          </div>
        </div>

        <aside className="xl:col-span-4 sticky top-[calc(var(--preview-bar-h)+var(--topbar-h)+24px)] ios-card p-7 space-y-5">
          <div>
            <span className="ios-eyebrow">Private Resale</span>
            <h3 className="ios-section-title text-[24px] mt-1">Arrange a confidential viewing</h3>
            <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Receive the verified property dossier, society summary and private viewing slots.
            </p>
          </div>

          <div className="space-y-2.5">
            <button type="button" onClick={onEnquire} className="btn-ios-primary w-full">
              Request Viewing
            </button>
            <button
              type="button"
              onClick={() => toggle("altamount-property")}
              className="btn-ios-secondary w-full"
            >
              <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
              <span>{isSaved ? "Property Saved" : "Save Property"}</span>
            </button>
          </div>

          <p className="text-[12px] text-[var(--text-tertiary)] text-center">
            Exact building wing and residence number are shared upon owner confirmation.
          </p>
        </aside>
      </div>
    </section>
  );
}
