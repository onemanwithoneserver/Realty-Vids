import { Link } from "react-router-dom";
import { getThemeBrandAssets } from "../../lib/assets";
import { Icon } from "../common";
import type { PreviewBarProps } from "./data";

export function MobilePreviewBar({
  viewMode,
  theme,
  onThemeChange,
  onViewModeChange,
  view,
  onViewChange,
  routes,
  onClose,
}: PreviewBarProps) {
  const brand = getThemeBrandAssets(theme);

  return (
    <header className="sticky top-0 z-[95] h-13 px-3 ios-glass border-b border-[var(--border-subtle)] flex items-center justify-between gap-2">
      <Link
        to={`/${theme}/${viewMode}/discover`}
        aria-label="Realty Vids home"
        className="inline-flex items-center gap-1.5 no-underline text-[var(--text-primary)] shrink-0"
      >
        <span className="rv-brand-logo h-7 hidden sm:inline-block">
          <img src={brand.logo} alt="Realty Vids" />
        </span>
        <img src={brand.symbol} alt="Realty Vids" className="w-7 h-7 object-contain sm:hidden" />
      </Link>

      <div className="flex items-center gap-1.5 min-w-0">
        <div className="inline-flex items-center p-0.5 rounded-full bg-[var(--bg-chip)] border border-[var(--border-subtle)]">
          <button
            type="button"
            aria-label="Desktop viewport"
            onClick={() => onViewModeChange("desktop")}
            className={`w-8 h-8 rounded-full grid place-items-center border-0 ${
              viewMode === "desktop"
                ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs"
                : "bg-transparent text-[var(--text-tertiary)]"
            }`}
          >
            <Icon name="desktop" size={18} />
          </button>
          <button
            type="button"
            aria-label="Mobile viewport"
            onClick={() => onViewModeChange("mobile")}
            className={`w-8 h-8 rounded-full grid place-items-center border-0 ${
              viewMode === "mobile"
                ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs"
                : "bg-transparent text-[var(--text-tertiary)]"
            }`}
          >
            <Icon name="mobile" size={18} />
          </button>
        </div>

        <select
          aria-label="Navigate to a view"
          value={view}
          onChange={(e) => onViewChange(e.target.value)}
          className="h-9 max-w-[132px] px-2.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] text-[12px] font-semibold text-[var(--text-primary)]"
        >
          {routes.map((page) => (
            <option key={page.path} value={page.path}>
              {page.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
          aria-label="Toggle theme"
          className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-primary)]"
        >
          <Icon name={theme === "light" ? "dark" : "light"} size={19} />
        </button>

        <button
          type="button"
          onClick={onClose}
          aria-label="Hide preview bar"
          className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-secondary)]"
        >
          <Icon name="close" size={19} />
        </button>
      </div>
    </header>
  );
}
