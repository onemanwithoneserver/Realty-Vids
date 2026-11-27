import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { getThemeBrandAssets } from "../../lib/assets";
import { Icon } from "../common";
import type { PageRouteMeta } from "../../lib/types";
import type { PreviewBarProps } from "./data";

function ViewSelectDropdown({
  value,
  routes,
  onChange,
}: {
  value: string;
  routes: readonly PageRouteMeta[];
  onChange: (path: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selectedPage = routes.find((p) => p.path === value) ?? routes[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  const choose = (path: string) => {
    onChange(path);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const dir = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index + dir + routes.length) % routes.length);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative flex items-center gap-2.5" ref={rootRef}>
      <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-[var(--text-tertiary)] hidden xl:inline">
        Screen
      </span>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Navigate to a view"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="h-10 min-w-[210px] pl-4 pr-3 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center justify-between gap-3 text-[13px] font-semibold text-[var(--text-primary)] shadow-2xs hover:border-[var(--accent-border)] transition"
      >
        <span className="truncate">{selectedPage.label}</span>
        <span
          className={`transition-transform duration-200 text-[var(--text-secondary)] ${open ? "rotate-180 text-[var(--accent)]" : ""}`}
        >
          <Icon name="expand" size={22} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            role="listbox"
            aria-label="App screens"
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute z-[120] top-[calc(100%+8px)] right-0 w-72 max-h-[65vh] overflow-y-auto p-2 rounded-2xl ios-glass-heavy border border-[var(--border-strong)] shadow-xl"
          >
            {routes.map((page, index) => {
              const isSelected = page.path === value;
              return (
                <button
                  key={page.path}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => choose(page.path)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  className={`w-full min-h-[40px] px-3.5 rounded-xl flex items-center justify-between gap-3 text-[13px] text-left border-0 transition ${
                    isSelected
                      ? "bg-[var(--accent-soft)] text-[var(--accent)] font-bold"
                      : "bg-transparent text-[var(--text-secondary)] font-medium hover:bg-[var(--bg-chip)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <span>{page.label}</span>
                  {isSelected && <Icon name="check" size={19} />}
                </button>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DesktopPreviewBar({
  viewMode,
  theme,
  onThemeChange,
  onViewModeChange,
  view,
  onViewChange,
  routes,
  onClose,
}: PreviewBarProps) {
  const reduceMotion = useReducedMotion();
  const brand = getThemeBrandAssets(theme);

  return (
    <m.header
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="sticky top-0 z-[95] h-[var(--preview-bar-h)] px-6 ios-glass border-b border-[var(--border-subtle)] flex items-center justify-between gap-4"
    >
      <Link
        to={`/${theme}/${viewMode}/discover`}
        aria-label="Realty Vids home"
        className="inline-flex items-center gap-2.5 no-underline text-[var(--text-primary)]"
      >
        <span className="rv-brand-logo h-8">
          <img src={brand.logo} alt="Realty Vids" />
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] text-[10px] font-bold tracking-[0.08em] uppercase">
          Studio
        </span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="ios-segmented" role="group" aria-label="Preview size">
          {(["desktop", "mobile"] as const).map((mode) => {
            const active = viewMode === mode;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={active}
                onClick={() => onViewModeChange(mode)}
                className={`ios-segment-btn ${active ? "is-active" : ""}`}
              >
                {active && (
                  <m.span
                    layoutId="preview-mode-pill"
                    className="ios-segment-pill"
                    transition={{ type: "spring", stiffness: 460, damping: 34 }}
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <Icon name={mode} size={20} />
                  <span className="capitalize">{mode}</span>
                </span>
              </button>
            );
          })}
        </div>

        <ViewSelectDropdown value={view} routes={routes} onChange={onViewChange} />

        <button
          type="button"
          onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          className="h-10 px-3.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] transition"
        >
          <Icon name={theme === "light" ? "dark" : "light"} size={20} />
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          title="Hide preview bar (Ctrl+M to reopen)"
          aria-label="Hide preview bar"
          className="w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--accent)] hover:border-[var(--accent-border)] transition"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
    </m.header>
  );
}
