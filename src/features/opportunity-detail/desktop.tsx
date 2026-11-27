import { IMAGES } from "../../lib/assets";
import { DetailHeader, Icon } from "../../components/common";
import { OPPORTUNITY_CHECKS, OPPORTUNITY_EVIDENCE, type OpportunityDetailProps } from "./data";

export function DesktopOpportunityDetail({
  saved,
  toggle,
  onBack,
  onEnquire,
}: OpportunityDetailProps) {
  const isSaved = saved.has("deal1");

  return (
    <section className="max-w-[1320px] mx-auto px-8 py-9">
      <DetailHeader label="VERIFIED OPPORTUNITY" onBack={onBack} />

      {/* Deal Header Banner */}
      <div className="ios-card p-8 flex flex-wrap items-center justify-between gap-8 border-[var(--accent-border)]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="rv-badge-verified">
              <Icon name="verified" size={16} />
              Realty Vids Verified
            </span>
            <span className="ios-eyebrow">Limited Inventory · Lower Parel</span>
          </div>
          <h1 className="ios-large-title text-[44px] mt-3">Parkside Residences</h1>
          <p className="mt-2.5 text-[16px] text-[var(--text-secondary)] leading-relaxed">
            A ready-to-move 3 BHK residence priced 12% below recent sub-registrar transactions in
            the same Lower Parel micro-market.
          </p>
          <div className="inline-flex items-center gap-3 mt-5 px-4 py-2 rounded-full bg-[var(--amber-soft)] text-[var(--amber)] text-[13px] font-bold">
            <Icon name="clock" size={18} />
            <span>Valid for 6 more days</span>
            <span>•</span>
            <span>2 residences remaining</span>
          </div>
        </div>

        <div className="p-7 rounded-[24px] rv-accent-fill text-white text-center min-w-[230px] shadow-[var(--accent-glow)]">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/95">
            Your Advantage
          </span>
          <strong className="block font-[800] text-[46px] leading-none mt-1.5">₹80L</strong>
          <small className="block mt-2 text-[13px] text-white/95 font-medium">
            12% below area benchmark
          </small>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-8 items-start">
        <div className="xl:col-span-8 space-y-7">
          <div className="rounded-[26px] overflow-hidden aspect-[16/9] bg-black shadow-md">
            <img
              src={IMAGES.interior}
              alt="Parkside apartment interior"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OPPORTUNITY_EVIDENCE.map((ev) => (
              <article
                key={ev.label}
                className={`ios-card p-6 ${
                  ev.highlight ? "border-[var(--accent)] bg-[var(--accent-soft)]" : ""
                }`}
              >
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
                  {ev.label}
                </span>
                <strong className="block mt-2 font-[800] text-[26px] tracking-[-0.025em] text-[var(--text-primary)]">
                  {ev.value}
                </strong>
                <small className="block mt-1 text-[13px] text-[var(--text-secondary)]">
                  {ev.note}
                </small>
              </article>
            ))}
          </div>

          <div className="ios-card p-7">
            <span className="ios-eyebrow">How We Verified It</span>
            <h2 className="ios-section-title text-[28px] mt-1.5">Evidence, not promotion.</h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              Our independent desk compares the offered consideration against registered sale deeds,
              current developer price sheets and floor-rise adjustments. Paid placement never
              influences verification.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {OPPORTUNITY_CHECKS.map((item) => (
                <div
                  key={item}
                  className="p-3.5 rounded-2xl bg-[var(--bg-subtle)] flex items-center gap-3 text-[14px] font-semibold"
                >
                  <Icon name="checkCircle" size={20} className="text-[var(--emerald)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="xl:col-span-4 sticky top-[calc(var(--preview-bar-h)+var(--topbar-h)+24px)] ios-card p-7 space-y-5">
          <div>
            <span className="ios-eyebrow">Reserve Your Interest</span>
            <h3 className="ios-section-title text-[24px] mt-1">Inspect the comparison dossier</h3>
            <p className="mt-2 text-[14px] text-[var(--text-secondary)] leading-relaxed">
              Speak directly with our verification advisor for exact unit numbers, registered comp
              sheets and private viewing slots.
            </p>
          </div>

          <div className="space-y-2.5">
            <button type="button" onClick={onEnquire} className="btn-ios-primary w-full">
              Request Full Dossier
            </button>
            <button
              type="button"
              onClick={() => toggle("deal1")}
              className="btn-ios-secondary w-full"
            >
              <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
              <span>{isSaved ? "Opportunity Saved" : "Save Opportunity"}</span>
            </button>
          </div>

          <p className="text-[12px] text-[var(--text-tertiary)] text-center">
            Zero spam guarantee. Your enquiry stays strictly linked to this opportunity.
          </p>
        </aside>
      </div>
    </section>
  );
}
