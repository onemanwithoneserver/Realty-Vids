import { useEffect } from "react";
import { m } from "framer-motion";
import { Icon } from "../common";
import {
  FILTER_GROUPS,
  NEARBY_INVENTORY,
  QUICK_LOCATIONS,
  RADIUS_STEPS,
  SHEET_TITLES,
  useActionSheetForm,
  type ActionSheetProps,
} from "./data";

export function SheetBodyContent({
  type,
  form,
  close,
}: {
  type: ActionSheetProps["type"];
  form: ReturnType<typeof useActionSheetForm>;
  close: () => void;
}) {
  const {
    step,
    radius,
    setRadius,
    name,
    setName,
    error,
    locationQuery,
    setLocationQuery,
    choices,
    toggleChoice,
    submit,
  } = form;

  if (step === "success") {
    return (
      <div className="py-12 px-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--emerald-soft)] text-[var(--emerald)] grid place-items-center mb-4">
          <Icon name="checkCircle" size={36} />
        </div>
        <h3 className="ios-section-title text-[22px]">All set</h3>
        <p className="mt-1.5 text-[14px] text-[var(--text-secondary)]">
          Your preferences have been saved to your workspace.
        </p>
      </div>
    );
  }

  if (step === "loading") {
    return (
      <div className="py-14 px-6 text-center space-y-3">
        <div className="inline-flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[var(--accent)] animate-bounce" />
          <span className="w-3 h-3 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:120ms]" />
          <span className="w-3 h-3 rounded-full bg-[var(--accent)] animate-bounce [animation-delay:240ms]" />
        </div>
        <p className="text-[14px] font-medium text-[var(--text-secondary)]">
          Updating your experience…
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {type === "location" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 space-y-4">
            <label className="block">
              <span className="block text-[12px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                City, Locality or Landmark
              </span>
              <div className="h-12 px-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] flex items-center gap-2.5">
                <Icon name="search" size={20} className="text-[var(--text-tertiary)]" />
                <input
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Search Mumbai, Worli or a landmark"
                  className="flex-1 bg-transparent border-0 focus:outline-none text-[14px] font-medium"
                />
                {locationQuery && (
                  <button
                    type="button"
                    onClick={() => setLocationQuery("")}
                    className="w-6 h-6 rounded-full bg-[var(--bg-chip)] grid place-items-center border-0"
                  >
                    <Icon name="close" size={14} />
                  </button>
                )}
              </div>
            </label>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Quick Select
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_LOCATIONS.map(({ place, kind }) => {
                  const selected = locationQuery.toLowerCase().startsWith(place.toLowerCase());
                  return (
                    <button
                      key={place}
                      type="button"
                      onClick={() => setLocationQuery(`${place}, Maharashtra`)}
                      className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition ${
                        selected
                          ? "bg-[var(--accent-soft)] border-[var(--accent-border)]"
                          : "bg-[var(--bg-subtle)] border-transparent hover:border-[var(--border-strong)]"
                      }`}
                    >
                      <Icon
                        name="pin"
                        size={19}
                        className={
                          selected ? "text-[var(--accent)]" : "text-[var(--text-tertiary)]"
                        }
                      />
                      <div className="flex-1 min-w-0">
                        <strong className="block text-[13px] font-bold text-[var(--text-primary)] truncate">
                          {place}
                        </strong>
                        <small className="block text-[11px] text-[var(--text-secondary)] truncate">
                          {kind}
                        </small>
                      </div>
                      {selected && <Icon name="check" size={18} className="text-[var(--accent)]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Search Radius
              </span>
              <div className="flex flex-wrap gap-2">
                {RADIUS_STEPS.map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setRadius(val)}
                    className={`h-9 px-3.5 rounded-full text-[13px] font-semibold border transition ${
                      radius === val
                        ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                        : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {val} km
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="rv-radar-map min-h-[240px] flex-1 p-4 flex flex-col justify-between">
              <span className="rv-radar-ring w-32 h-32" />
              <span className="rv-radar-ring w-52 h-52 opacity-60" />

              <div className="flex justify-between items-start relative z-10">
                <span className="px-2.5 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[11px] font-bold shadow-xs">
                  42 Verified Listings
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--accent-fill)] text-white text-[11px] font-bold">
                  {radius} km
                </span>
              </div>

              <div className="my-auto mx-auto relative z-10 px-4 py-2.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--accent-border)] shadow-md flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-[var(--accent-fill)] text-white grid place-items-center">
                  <Icon name="pin" size={18} />
                </span>
                <div>
                  <strong className="block text-[13px] font-bold text-[var(--text-primary)]">
                    {locationQuery.split(",")[0] || "Mumbai"}
                  </strong>
                  <small className="block text-[11px] text-[var(--text-secondary)]">
                    Active search centre
                  </small>
                </div>
              </div>

              <div className="space-y-1.5 relative z-10">
                {NEARBY_INVENTORY.slice(0, 2).map((item) => (
                  <div
                    key={item.title}
                    className="px-3 py-2 rounded-xl ios-glass border border-[var(--border-subtle)] flex items-center justify-between text-[12px]"
                  >
                    <strong className="font-semibold truncate">{item.title}</strong>
                    <span className="text-[var(--text-secondary)] shrink-0 ml-2">{item.meta}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 flex items-center justify-end gap-3 pt-3 border-t border-[var(--border-subtle)]">
            <button type="button" onClick={close} className="btn-ios-secondary">
              Cancel
            </button>
            <button type="button" onClick={submit} className="btn-ios-primary">
              Apply Location
            </button>
          </div>
        </div>
      )}

      {type === "filters" && (
        <div className="space-y-5">
          {[
            ["Property Type", FILTER_GROUPS.propertyType],
            ["Project Status", FILTER_GROUPS.projectStatus],
            ["Listed By", FILTER_GROUPS.listedBy],
          ].map(([legend, items]) => (
            <div key={String(legend)}>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                {legend}
              </span>
              <div className="flex flex-wrap gap-2">
                {(items as readonly string[]).map((item) => {
                  const active = choices.has(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleChoice(item)}
                      className={`h-10 px-4 rounded-full text-[13px] font-semibold border transition ${
                        active
                          ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                          : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Minimum Budget
              </span>
              <input
                defaultValue="₹3 Cr"
                className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px] font-semibold"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Maximum Budget
              </span>
              <input
                defaultValue="₹9 Cr"
                className="w-full h-11 px-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px] font-semibold"
              />
            </label>
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
              Bedrooms
            </span>
            <div className="grid grid-cols-4 gap-2">
              {FILTER_GROUPS.bedrooms.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => toggleChoice(b)}
                  className={`h-10 rounded-xl text-[13px] font-bold border transition ${
                    choices.has(b)
                      ? "bg-[var(--accent-fill)] border-[var(--accent-fill)] text-white"
                      : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)]"
                  }`}
                >
                  {b} BHK
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "feed" && (
        <div className="space-y-4">
          <label className="block">
            <span className="block text-[12px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
              Custom Feed Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. South Mumbai Sea-Facing Watch"
              className="w-full h-12 px-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
            />
          </label>
          <div>
            <span className="block text-[12px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
              Include Video Formats
            </span>
            <div className="flex flex-wrap gap-2">
              {FILTER_GROUPS.feedTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleChoice(topic)}
                  className={`h-10 px-4 rounded-full text-[13px] font-semibold border transition ${
                    choices.has(topic)
                      ? "bg-[var(--accent-soft)] border-[var(--accent-border)] text-[var(--accent)]"
                      : "bg-[var(--bg-subtle)] border-transparent text-[var(--text-secondary)]"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {type === "list" && (
        <div className="space-y-4">
          <label className="block">
            <span className="block text-[12px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
              Collection Name
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Homes to Tour This Month"
              className="w-full h-12 px-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
            />
          </label>
          <label className="block">
            <span className="block text-[12px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
              Research Notes
            </span>
            <textarea
              rows={2}
              placeholder="What are you comparing across these homes?"
              className="w-full p-3.5 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
            />
          </label>
          <div className="space-y-2">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)]">
              Add From Saved Items
            </span>
            {FILTER_GROUPS.savedItems.map((item, idx) => (
              <label
                key={item}
                className="p-3 rounded-xl bg-[var(--bg-subtle)] flex items-center gap-3 text-[13px] font-medium cursor-pointer"
              >
                <input
                  type="checkbox"
                  defaultChecked={idx < 2}
                  className="accent-[var(--accent)] w-4 h-4"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {type === "enquiry" && (
        <div className="space-y-4">
          <label className="block">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
              Full Name
            </span>
            <input
              defaultValue="Arjun Kapoor"
              className="w-full h-11 px-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
            />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Mobile
              </span>
              <input
                defaultValue="+91 98765 43210"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
              />
            </label>
            <label className="block">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Email
              </span>
              <input
                defaultValue="arjun@example.com"
                className="w-full h-11 px-4 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
              />
            </label>
          </div>
          <label className="block">
            <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
              Message
            </span>
            <textarea
              rows={3}
              defaultValue="I’d like current availability, verified pricing and a private viewing slot."
              className="w-full p-3.5 rounded-xl bg-[var(--bg-subtle)] border border-[var(--border-strong)] text-[14px]"
            />
          </label>
          <label className="flex items-center gap-2.5 text-[12px] text-[var(--text-secondary)]">
            <input type="checkbox" defaultChecked className="accent-[var(--accent)] w-4 h-4" />
            <span>
              I agree to be contacted by a verified Realty Vids advisor regarding this request.
            </span>
          </label>
        </div>
      )}

      {error && (
        <p className="text-[13px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3.5 py-2 rounded-xl">
          {error}
        </p>
      )}

      {type !== "location" && (
        <button type="button" onClick={submit} className="btn-ios-primary w-full !min-h-[48px]">
          {type === "enquiry"
            ? "Submit Private Enquiry"
            : type === "filters"
              ? "Show 42 Verified Results"
              : "Save & Continue"}
        </button>
      )}
    </div>
  );
}

export function DesktopActionSheet(props: ActionSheetProps) {
  const { type, close } = props;
  const form = useActionSheetForm(props);
  const meta = SHEET_TITLES[type];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-[130] grid place-items-center p-6"
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
    >
      <m.button
        type="button"
        aria-label="Close modal"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm border-0"
      />
      <m.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className={`relative z-10 w-full ${
          type === "location" ? "max-w-3xl" : "max-w-lg"
        } max-h-[88vh] overflow-y-auto rounded-[28px] bg-[var(--bg-elevated)] border border-[var(--border-strong)] p-7 shadow-2xl`}
      >
        <header className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-[var(--border-subtle)]">
          <div>
            <span className="ios-eyebrow">{meta.eyebrow}</span>
            <h2 className="ios-section-title text-[24px] mt-1">{meta.title}</h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="w-9 h-9 rounded-full bg-[var(--bg-subtle)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-0"
          >
            <Icon name="close" size={20} />
          </button>
        </header>

        <SheetBodyContent type={type} form={form} close={close} />
      </m.div>
    </div>
  );
}
