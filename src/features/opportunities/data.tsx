import { IMAGES, VIDEOS } from "../../lib/assets";
import { buildVerticalPool, createCuratedRow } from "../../lib/feed-utils";
import type { SelectedVideo, VideoFormat, VideoKind } from "../../lib/types";
import type { IconName } from "../../components/common/data";

export const page = { path: "/opportunities", label: "Opportunities" } as const;

export const OPPORTUNITY_CATEGORIES: readonly { label: string; icon: IconName; detail: string }[] =
  [
    { label: "Hot Deals", icon: "spark", detail: "12% below comps" },
    { label: "Early Launches", icon: "clock", detail: "Pre-release access" },
    { label: "Investment Picks", icon: "compass", detail: "5.8%+ yield" },
    { label: "Special Offers", icon: "bookmark", detail: "Stamp duty perks" },
    { label: "Rental Income", icon: "home", detail: "Tenanted assets" },
    { label: "Ready to Move", icon: "checkCircle", detail: "OC received" },
  ] as const;

export const OPPORTUNITY_COPY: Record<
  string,
  { badge: string; label: string; title: string; image: string }
> = {
  "Hot Deals": {
    badge: "12%",
    label: "BELOW BENCHMARK",
    title: "Why this Lower Parel home stands apart.",
    image: IMAGES.interior,
  },
  "Early Launches": {
    badge: "FIRST",
    label: "EARLY ACCESS",
    title: "See The Terraces before its public release.",
    image: IMAGES.tower,
  },
  "Investment Picks": {
    badge: "5.8%",
    label: "YIELD STORY",
    title: "A rental-income case worth understanding.",
    image: IMAGES.lounge,
  },
  "Special Offers": {
    badge: "₹18L",
    label: "VALUE INCLUDED",
    title: "Parking and stamp duty, clearly explained.",
    image: IMAGES.city,
  },
  "Rental Income": {
    badge: "24 MO",
    label: "LEASE ASSURED",
    title: "Inside an assured-rental arrangement.",
    image: IMAGES.skyline,
  },
  "Ready to Move": {
    badge: "READY",
    label: "OC RECEIVED",
    title: "Watch it today. Move sooner.",
    image: IMAGES.pool,
  },
};

export const OPPORTUNITY_BANNER_VIDEO = VIDEOS.opportunitiesBanner;

export const opportunityCuratedRows = [
  createCuratedRow(
    "HOT DEALS",
    "Verified value, clearly explained",
    [
      "The evidence behind a Lower Parel price gap",
      "An owner listing below its closest comparable",
      "Where the ₹24L documented benefit comes from",
      "A completed home with the carrying cost removed",
    ],
    0,
    ["VERIFIED DEAL"],
    ["Lower Parel · ₹5.95 Cr", "Bandra West · ₹7.1 Cr", "Powai · ₹3.8 Cr", "Worli · ₹6.4 Cr"],
  ),
  createCuratedRow(
    "EARLY LAUNCHES",
    "See the release before the public campaign",
    [
      "First access to The Terraces",
      "The first inventory release at Harbour One",
      "A plotted phase opens near Panvel",
      "Inside the launch brief for North Gardens",
    ],
    4,
    ["EARLY ACCESS"],
    ["Worli · Builder release", "Sewri · Phase one", "Panvel · Plotted", "Powai · New launch"],
  ),
  createCuratedRow(
    "INVESTMENT PICKS",
    "Understand the return story",
    [
      "A 5.8% rental yield with the lease reviewed",
      "The office suite with a tenant already in place",
      "Why this micro-market has lower vacancy",
      "An income property with costs fully modelled",
    ],
    8,
    ["INVESTMENT REVIEW"],
    ["BKC · Commercial", "Andheri East · Office", "Thane · Residential", "Lower Parel · Mixed use"],
  ),
  createCuratedRow(
    "READY TO MOVE · SPECIAL OFFERS",
    "Watch it today, decide with evidence",
    [
      "OC received: a finished three-bed walkthrough",
      "Parking and stamp duty included, line by line",
      "The remaining ready inventory at Parkside",
      "A villa offer with renovation priced in",
    ],
    12,
    ["READY & VERIFIED"],
    ["Worli · 3 BHK", "Bandra · 2 BHK", "Thane · 3 BHK", "Alibaug · Villa"],
  ),
];

export const opportunityVerticalPool = buildVerticalPool(
  "opportunity",
  [
    "A verified price gap in Lower Parel, broken down",
    "Early access to a launch before public release",
    "The rental-income case behind this compact office",
    "Ready-to-move inventory with the paperwork checked",
    "A stamp-duty benefit, explained line by line",
    "Why this owner listing sits below local comparables",
    "A lease-backed opportunity with evidence attached",
    "The remaining inventory in a completed Worli tower",
    "A resale villa where renovation is already priced in",
    "What makes this offer useful—not just urgent",
  ],
  "opportunity",
  ["Hot Deal", "Early Launch", "Investment Pick", "Ready to Move"],
  ["Lower Parel", "Worli", "BKC", "Bandra West", "Alibaug"],
  ["Verification Desk", "Realty Vids Research", "Naina Shah", "Investment Review"],
  5,
  true,
);

export interface OpportunitiesProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onOpportunity: () => void;
  onEnquire: () => void;
  previewPaused: boolean;
}
