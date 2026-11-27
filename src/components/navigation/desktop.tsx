import { m } from "framer-motion";
import { useViewport } from "../../lib/viewport";
import { Brand, Icon } from "../common";
import { PRIMARY_NAV, USER_PROFILE, type NavigationProps } from "./data";

export function DesktopSidebar({
  active,
  currentView,
  savedCount,
  headerVisible,
  onSelectSection,
  onOpenLists,
  onNotify,
}: NavigationProps) {
  return (
    <aside
      className={`fixed left-0 bottom-0 z-40 w-[var(--sidebar-w)] px-4 py-6 bg-[var(--bg-sidebar)] backdrop-blur-2xl border-r border-[var(--border-subtle)] flex flex-col justify-between transition-[top] duration-200 ${
        headerVisible ? "top-[var(--preview-bar-h)]" : "top-0"
      }`}
    >
      <div>
        <div className="px-2.5 mb-8">
          <Brand />
        </div>

        <nav aria-label="Primary navigation" className="space-y-1">
          <span className="block px-3 mb-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            Explore
          </span>
          {PRIMARY_NAV.map((item) => {
            const isActive = !currentView && active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSection(item.id)}
                className={`relative isolate w-full h-12 px-3.5 rounded-2xl flex items-center gap-3.5 text-left border-0 transition ${
                  isActive
                    ? "text-white font-bold"
                    : "bg-transparent text-[var(--text-secondary)] font-semibold hover:bg-[var(--bg-chip)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive && (
                  <m.span
                    layoutId="desktop-sidebar-pill"
                    transition={{ type: "spring", stiffness: 440, damping: 34 }}
                    className="absolute inset-0 z-0 pointer-events-none rounded-2xl rv-accent-fill shadow-[var(--accent-glow)]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center justify-center shrink-0">
                  <Icon name={item.icon} size={23} />
                </span>
                <span className="relative z-10 flex-1 text-[14px] tracking-[-0.01em]">
                  {item.label}
                </span>
              </button>
            );
          })}

          <span className="block px-3 pt-6 pb-2 text-[11px] font-bold tracking-[0.14em] uppercase text-[var(--text-tertiary)]">
            Your Workspace
          </span>

          <button
            type="button"
            onClick={onOpenLists}
            className={`relative w-full h-12 px-3.5 rounded-2xl flex items-center gap-3.5 text-left border-0 transition ${
              currentView === "lists"
                ? "rv-accent-fill text-white font-bold shadow-[var(--accent-glow)]"
                : "bg-transparent text-[var(--text-secondary)] font-semibold hover:bg-[var(--bg-chip)] hover:text-[var(--text-primary)]"
            }`}
          >
            <Icon name="list" size={23} />
            <span className="flex-1 text-[14px]">My Lists</span>
            <span
              className={`min-w-[24px] h-6 px-2 rounded-full text-[11px] font-bold grid place-items-center ${
                currentView === "lists"
                  ? "bg-white text-[#b81434]"
                  : "bg-[var(--bg-chip)] text-[var(--text-primary)]"
              }`}
            >
              {savedCount + 7}
            </span>
          </button>

          <button
            type="button"
            onClick={onNotify}
            className="w-full h-12 px-3.5 rounded-2xl flex items-center gap-3.5 text-left border-0 bg-transparent text-[var(--text-secondary)] font-semibold hover:bg-[var(--bg-chip)] hover:text-[var(--text-primary)] transition"
          >
            <Icon name="bell" size={23} />
            <span className="flex-1 text-[14px]">Notifications</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
          </button>
        </nav>
      </div>

      <button
        type="button"
        onClick={onOpenLists}
        className="w-full p-3 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center gap-3 text-left hover:border-[var(--border-strong)] transition shadow-2xs"
      >
        <div className="w-10 h-10 rounded-full rv-accent-fill text-white font-bold text-[13px] grid place-items-center shrink-0">
          {USER_PROFILE.initials}
        </div>
        <div className="min-w-0 flex-1">
          <strong className="block text-[13px] font-bold text-[var(--text-primary)] truncate">
            {USER_PROFILE.name}
          </strong>
          <span className="block text-[11px] text-[var(--text-tertiary)] truncate">
            {USER_PROFILE.role}
          </span>
        </div>
        <Icon name="chevron" size={18} className="text-[var(--text-tertiary)]" />
      </button>
    </aside>
  );
}

export function DesktopTopbar({
  headerVisible,
  onOpenSearch,
  onOpenLocation,
  onOpenLists,
  onNotify,
}: NavigationProps) {
  const { locationLabel, radiusKm } = useViewport();

  return (
    <header
      className={`sticky z-30 h-[var(--topbar-h)] px-8 ios-glass border-b border-[var(--border-subtle)] flex items-center justify-between gap-6 ${
        headerVisible ? "top-[var(--preview-bar-h)]" : "top-0"
      }`}
    >
      <button
        type="button"
        onClick={onOpenLocation}
        className="inline-flex items-center gap-2.5 h-11 pl-3 pr-4 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--accent-border)] transition shadow-2xs"
      >
        <span className="w-7 h-7 rounded-full bg-[var(--accent-soft)] text-[var(--accent)] grid place-items-center">
          <Icon name="pin" size={18} />
        </span>
        <div className="text-left leading-tight">
          <span className="block text-[13px] font-bold text-[var(--text-primary)]">
            {locationLabel}
          </span>
          <small className="block text-[10px] font-medium text-[var(--text-tertiary)]">
            Within {radiusKm} km
          </small>
        </div>
        <Icon name="expand" size={18} className="text-[var(--text-tertiary)] ml-0.5" />
      </button>

      <button
        type="button"
        onClick={onOpenSearch}
        className="flex-1 max-w-xl h-11 px-4 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center gap-3 text-left text-[13px] text-[var(--text-secondary)] hover:border-[var(--accent-border)] shadow-2xs transition"
      >
        <Icon name="search" size={20} className="text-[var(--text-tertiary)]" />
        <span className="flex-1 truncate">
          Search projects, resale homes, localities or market experts…
        </span>
        <kbd className="px-2 py-0.5 rounded-md bg-[var(--bg-subtle)] border border-[var(--border-subtle)] text-[11px] font-semibold text-[var(--text-tertiary)]">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={onNotify}
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid place-items-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
        >
          <Icon name="bell" size={21} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[var(--accent)]" />
        </button>
        <button
          type="button"
          onClick={onOpenLists}
          aria-label="Open My Lists"
          className="w-10 h-10 rounded-full rv-accent-fill text-white font-bold text-[12px] grid place-items-center border-0 shadow-xs"
        >
          {USER_PROFILE.initials}
        </button>
      </div>
    </header>
  );
}
