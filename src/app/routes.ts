import { page as feed } from "../features/feed/data";
import { page as discover } from "../features/discover/data";
import { page as opportunities } from "../features/opportunities/data";
import { page as insights } from "../features/insights/data";
import { page as lists } from "../features/saved-lists/data";
import { page as search } from "../features/search/data";
import { page as primaryResults } from "../features/primary-market/data";
import { page as secondaryResults } from "../features/secondary-market/data";
import { page as project } from "../features/project-detail/data";
import { page as property } from "../features/property-detail/data";
import { page as opportunity } from "../features/opportunity-detail/data";
import { page as expert } from "../features/expert-profile/data";
import type { Section, View } from "../lib/types";

export const pageRoutes = [
  feed,
  discover,
  opportunities,
  insights,
  lists,
  search,
  primaryResults,
  secondaryResults,
  project,
  property,
  opportunity,
  expert,
] as const;

export const VIEW_PATHS: Record<Exclude<View, null>, string> = {
  lists: "/lists",
  search: "/search",
  "primary-results": "/primary-results",
  "secondary-results": "/secondary-results",
  project: "/project",
  property: "/property",
  opportunity: "/opportunity",
  expert: "/expert",
};

export const PATH_VIEWS: Record<string, Exclude<View, null>> = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view]),
) as Record<string, Exclude<View, null>>;

export const SECTIONS = ["feed", "discover", "opportunities", "insights"] as const;

export function isSection(value: unknown): value is Section {
  return typeof value === "string" && SECTIONS.includes(value as Section);
}
