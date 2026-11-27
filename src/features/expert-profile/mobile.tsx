import { DetailHeader, Icon, PlayButton } from "../../components/common";
import { EXPERT_METRICS, EXPERT_VIDEOS, type ExpertProfileProps } from "./data";

export function MobileExpertProfile({
  saved,
  toggle,
  onBack,
  onVideo,
  onConsult,
}: ExpertProfileProps) {
  const isSaved = saved.has("expert-rhea");

  return (
    <section className="px-5 pb-28">
      <DetailHeader label="Expert Profile" onBack={onBack} />

      <div className="ios-card p-5 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl rv-accent-fill text-white font-[800] text-[26px] grid place-items-center shadow-md">
          RM
        </div>
        <span className="rv-badge-verified mt-3">
          <Icon name="verified" size={14} />
          Verified Economist
        </span>
        <h1 className="font-[800] text-[26px] mt-2">Rhea Mehta</h1>
        <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
          Property Economist · Mumbai Residential Markets
        </p>

        <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-2xl bg-[var(--bg-subtle)]">
          {EXPERT_METRICS.map(([num, label]) => (
            <div key={label}>
              <strong className="block font-extrabold text-[17px]">{num}</strong>
              <small className="text-[10px] text-[var(--text-secondary)]">{label}</small>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2.5 mt-4">
          <button
            type="button"
            onClick={() => toggle("expert-rhea")}
            className="btn-ios-secondary !min-h-[42px] !text-[13px]"
          >
            <Icon name={isSaved ? "bookmarkFilled" : "bookmark"} size={18} />
            <span>{isSaved ? "Following" : "Follow"}</span>
          </button>
          <button
            type="button"
            onClick={onConsult}
            className="btn-ios-primary !min-h-[42px] !text-[13px]"
          >
            <span>Consult</span>
          </button>
        </div>
      </div>

      <div className="ios-card p-4 mt-4">
        <span className="ios-eyebrow !text-[10px]">About</span>
        <h2 className="font-bold text-[18px] mt-1">Clarity for consequential decisions.</h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--text-secondary)]">
          Rhea translates market data, policy and micro-market signals into grounded guidance for
          homebuyers and investors.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        <span className="ios-eyebrow !text-[10px] block">Video Insights</span>
        {EXPERT_VIDEOS.map((vid) => (
          <button
            key={vid.title}
            type="button"
            onClick={onVideo}
            className="w-full ios-card p-3 flex items-center gap-3 text-left"
          >
            <div className="relative w-28 aspect-video rounded-xl overflow-hidden bg-black shrink-0">
              <img src={vid.image} alt="" className="w-full h-full object-cover" />
              <span className="absolute inset-0 grid place-items-center scale-75">
                <PlayButton small />
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <strong className="block text-[14px] font-bold line-clamp-2">{vid.title}</strong>
              <small className="text-[11px] text-[var(--text-tertiary)]">{vid.duration}</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
