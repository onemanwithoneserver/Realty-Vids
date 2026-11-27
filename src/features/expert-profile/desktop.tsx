import { DetailHeader, Icon, PlayButton } from "../../components/common";
import { EXPERT_METRICS, EXPERT_VIDEOS, type ExpertProfileProps } from "./data";

export function DesktopExpertProfile({
  saved,
  toggle,
  onBack,
  onVideo,
  onConsult,
}: ExpertProfileProps) {
  const isSaved = saved.has("expert-rhea");

  return (
    <section className="max-w-[1200px] mx-auto px-8 py-9">
      <DetailHeader label="EXPERT PROFILE" onBack={onBack} />

      <div className="ios-card p-8 flex flex-wrap items-center justify-between gap-8">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="w-24 h-24 rounded-[28px] rv-accent-fill text-white font-[800] text-[30px] grid place-items-center shadow-[var(--accent-glow)]">
            RM
          </div>
          <div>
            <span className="rv-badge-verified">
              <Icon name="verified" size={16} />
              Verified Market Economist
            </span>
            <h1 className="ios-large-title text-[40px] mt-2">Rhea Mehta</h1>
            <p className="mt-1 text-[15px] text-[var(--text-secondary)]">
              Property Economist · Mumbai Residential & Infrastructure Corridors
            </p>
            <div className="flex items-center gap-6 mt-4">
              {EXPERT_METRICS.map(([num, label]) => (
                <div key={label}>
                  <strong className="font-[800] text-[20px] text-[var(--text-primary)]">
                    {num}
                  </strong>{" "}
                  <span className="text-[13px] text-[var(--text-secondary)]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="button" onClick={() => toggle("expert-rhea")} className="btn-ios-secondary">
            <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={19} />
            <span>{isSaved ? "Expert Saved" : "Follow Expert"}</span>
          </button>
          <button type="button" onClick={onConsult} className="btn-ios-primary">
            <span>Request 1:1 Consultation</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        <div className="lg:col-span-5 ios-card p-7">
          <span className="ios-eyebrow">Advisory Approach</span>
          <h2 className="ios-section-title text-[26px] mt-1.5">
            Clarity for consequential decisions.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">
            Rhea translates sub-registrar transaction data, RERA disclosures and infrastructure
            timelines into calm, evidence-backed guidance for end-use families and long-horizon
            investors.
          </p>
        </div>

        <div className="lg:col-span-7 ios-card p-7">
          <span className="ios-eyebrow">Featured Video Briefings</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {EXPERT_VIDEOS.map((vid) => (
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
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute inset-0 grid place-items-center">
                    <PlayButton small />
                  </span>
                </div>
                <div className="p-3.5">
                  <strong className="block text-[14px] font-bold text-[var(--text-primary)] line-clamp-2 group-hover:text-[var(--accent)]">
                    {vid.title}
                  </strong>
                  <small className="block mt-1 text-[12px] text-[var(--text-tertiary)]">
                    {vid.duration}
                  </small>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
