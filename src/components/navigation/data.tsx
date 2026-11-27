import type { Section, View } from "../../lib/types";
import type { IconName } from "../common/data";

export interface NavItem {
  id: Section;
  icon: IconName;
  label: string;
  subtitle: string;
}

export const PRIMARY_NAV: readonly NavItem[] = [
  { id: "feed", icon: "home", label: "My Feed", subtitle: "Curated stream" },
  { id: "discover", icon: "compass", label: "Discover", subtitle: "Primary & resale" },
  { id: "opportunities", icon: "spark", label: "Opportunities", subtitle: "Verified deals" },
  { id: "insights", icon: "play", label: "Insights", subtitle: "Market fluency" },
] as const;

export const USER_PROFILE = {
  initials: "AK",
  name: "Arjun Kapoor",
  role: "Verified Buyer · Mumbai",
} as const;

export interface NavigationProps {
  active: Section;
  currentView: View;
  savedCount: number;
  headerVisible: boolean;
  onSelectSection: (section: Section) => void;
  onOpenLists: () => void;
  onOpenSearch: () => void;
  onOpenLocation: () => void;
  onNotify: () => void;
}
