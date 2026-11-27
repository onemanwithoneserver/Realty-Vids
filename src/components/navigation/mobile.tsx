import { m } from "framer-motion";
import { useViewport } from "../../lib/viewport";
import { Brand, Icon } from "../common";
import { PRIMARY_NAV, type NavigationProps } from "./data";

export function MobileTopBar({
  savedCount,
  headerVisible,
  onOpenSearch,
  onOpenLocation,
  onOpenLists,
  onNotify,
}: NavigationProps) {
  const { locationLabel, isPreviewFrame } = useViewport();

  return (
    <header
      className={`sticky z-40 h-[var(--mobile-topbar-h)] px-5 ios-glass border-b border-[var(--border-subtle)] flex items-center justify-between gap-2.5 ${
        headerVisible && isPreviewFrame ? "top-[var(--preview-bar-h)]" : "top-0"
      }`}
    >
      <Brand className="[&_.rv-brand-logo]:h-8" />

      <button
        type="button"
        onClick={onOpenLocation}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-[var(--bg-chip)] border border-[var(--border-subtle)] text-[12px] font-bold text-[var(--text-primary)] max-w-[140px]"
      >
        <Icon name="pin" size={17} className="text-[var(--accent)] shrink-0" />
        <span className="truncate">{locationLabel}</span>
        <Icon name="expand" size={16} className="text-[var(--text-tertiary)] shrink-0" />
      </button>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onOpenSearch}
          aria-label="Search"
          className="w-9 h-9 rounded-full bg-[var(--bg-chip)] grid place-items-center text-[var(--text-primary)] border-0"
        >
          <Icon name="search" size={21} />
        </button>
        <button
          type="button"
          onClick={onNotify}
          aria-label="Notifications"
          className="relative w-9 h-9 rounded-full bg-[var(--bg-chip)] grid place-items-center text-[var(--text-primary)] border-0"
        >
          <Icon name="bell" size={21} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--accent)]" />
        </button>
        <button
          type="button"
          onClick={onOpenLists}
          aria-label="My Lists"
          className="relative w-9 h-9 rounded-full bg-[var(--bg-chip)] grid place-items-center text-[var(--text-primary)] border-0"
        >
          <Icon name="list" size={21} />
          {savedCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[var(--accent-fill)] text-white text-[9px] font-bold grid place-items-center">
              {savedCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

export function MobileTabBar({
  active,
  currentView,
  onSelectSection,
}: Pick<NavigationProps, "active" | "currentView" | "onSelectSection">) {
  const { isPreviewFrame } = useViewport();
  const [feedItem, ...clusterItems] = PRIMARY_NAV;
  const isFeedActive = !currentView && active === feedItem.id;

  return (
    <nav
      aria-label="Primary"
      className={`${
        isPreviewFrame ? "sticky bottom-4 w-full" : "fixed bottom-4 inset-x-0"
      } z-50 px-5 pb-[env(safe-area-inset-bottom)] flex items-center gap-2.5 pointer-events-none`}
    >
      {/* Standalone Circular My Feed Button */}
      <button
        type="button"
        onClick={() => onSelectSection(feedItem.id)}
        aria-label={feedItem.label}
        title={feedItem.label}
        aria-current={isFeedActive ? "page" : undefined}
        className={`pointer-events-auto w-[56px] h-[56px] rounded-full shrink-0 grid place-items-center transition-all duration-200 ${
          isFeedActive
            ? "rv-accent-fill border border-white/30 shadow-[var(--accent-glow)] scale-[1.03]"
            : "ios-glass-heavy border border-[var(--border-strong)] text-[var(--text-primary)] shadow-lg hover:scale-[1.03]"
        }`}
      >
        <Icon name={feedItem.icon} size={26} />
      </button>

      {/* Grouped 3-Control Pill Set */}
      <div className="pointer-events-auto flex-1 h-[56px] p-1.5 rounded-full ios-glass-heavy border border-[var(--border-strong)] shadow-lg grid grid-cols-3 items-center gap-1">
        {clusterItems.map((item) => {
          const isActive = !currentView && active === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectSection(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`relative isolate h-full rounded-full flex flex-col items-center justify-center gap-0.5 border-0 bg-transparent transition ${
                isActive
                  ? "text-white font-bold"
                  : "text-[var(--text-secondary)] font-semibold hover:text-[var(--text-primary)]"
              }`}
            >
              {isActive && (
                <m.span
                  layoutId="ios-floating-tab-pill"
                  transition={{ type: "spring", stiffness: 460, damping: 35 }}
                  className="absolute inset-0 z-0 pointer-events-none rounded-full rv-accent-fill shadow-xs"
                />
              )}
              <span className="relative z-10 inline-flex items-center justify-center">
                <Icon name={item.icon} size={21} />
              </span>
              <span className="relative z-10 text-[10px] leading-none tracking-[-0.01em] truncate max-w-full px-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
