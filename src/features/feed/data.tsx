import { IMAGES, VIDEOS } from "../../lib/assets";
import { buildVerticalPool } from "../../lib/feed-utils";
import { discoverVideoRails } from "../discover/data";
import type { SelectedVideo, VideoFormat, VideoKind } from "../../lib/types";

export const page = { path: "/feed", label: "My Feed" } as const;

export const FEED_TABS = ["All", "Education", "My Home", "Investment"] as const;

export const FEED_HERO = {
  image: IMAGES.tower,
  videoSrc: VIDEOS.feedBanner,
  eyebrow: "FEATURED FOR YOU",
  title: "Aurelia: Above the expected",
  creator: "Realty Vids Studios",
  category: "Personalised project film · Worli",
  duration: "06:24",
  summary:
    "A quiet cinematic journey through a new Worli address, curated around your recent South Mumbai shortlists.",
  badge: "REALTY VIDS ORIGINAL",
} as const;

export const QUICK_SHORTS = [
  {
    image: IMAGES.interior,
    title: "Why this room feels larger",
    creator: "Studio Ardete",
    duration: "0:48",
    kind: "project" as VideoKind,
  },
  {
    image: IMAGES.city,
    title: "Worli in 60 seconds",
    creator: "Realty Vids",
    duration: "0:57",
    kind: "education" as VideoKind,
  },
  {
    image: IMAGES.pool,
    title: "The quiet luxury test",
    creator: "Mira Shah",
    duration: "0:42",
    kind: "project" as VideoKind,
  },
  {
    image: IMAGES.lounge,
    title: "One detail to notice",
    creator: "Design Desk",
    duration: "0:51",
    kind: "project" as VideoKind,
  },
] as const;

export const feedVerticalPool = buildVerticalPool(
  "feed",
  [
    "A calm first look at Mumbai’s next waterfront address",
    "Three details worth noticing before a site visit",
    "Why this floor plan works harder than it looks",
    "The neighbourhood walk buyers usually miss",
    "Inside a home shaped around natural light",
    "What ₹6 crore buys across three Mumbai micro-markets",
    "A creator’s guide to reading the sample apartment",
    "The design move that makes this villa feel private",
    "Construction progress, explained without the jargon",
    "A saved topic returns with a clearer market update",
  ],
  "project",
  ["For You", "Design", "Neighbourhood", "Market"],
  ["Worli", "Bandra West", "Alibaug", "Powai", "Lower Parel"],
  ["Realty Vids Studios", "Mira Shah", "Aarav Mehta", "Studio Ardete"],
  0,
);

export { discoverVideoRails };

export interface FeedProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onProject: () => void;
  onCreateFeed: () => void;
  previewPaused: boolean;
}
