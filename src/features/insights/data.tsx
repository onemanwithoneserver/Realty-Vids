import { IMAGES, VIDEOS } from "../../lib/assets";
import { buildVerticalPool, createCuratedRow } from "../../lib/feed-utils";
import type { SelectedVideo, VideoFormat, VideoKind } from "../../lib/types";
import type { IconName } from "../../components/common/data";

export const page = { path: "/insights", label: "Insights" } as const;

export const INSIGHT_CATEGORIES: readonly { label: string; icon: IconName; detail: string }[] = [
  { label: "Learn", icon: "play", detail: "Buyer fundamentals" },
  { label: "Market Updates", icon: "spark", detail: "Quarterly data" },
  { label: "Expert Advice", icon: "user", detail: "Advisor checklists" },
  { label: "Locality Insights", icon: "pin", detail: "Micro-markets" },
  { label: "Expert Talks", icon: "compass", detail: "Round tables" },
  { label: "Industry Updates", icon: "list", detail: "Policy & RERA" },
] as const;

export const INSIGHT_COPY: Record<
  string,
  { eyebrow: string; title: string; description: string; poster: string }
> = {
  Learn: {
    eyebrow: "LEARN THE FUNDAMENTALS",
    title: "How to read a project before you visit.",
    description:
      "A practical video guide to timelines, RERA approvals and the questions worth asking.",
    poster: IMAGES.discover02,
  },
  "Market Updates": {
    eyebrow: "THE BIG PICTURE",
    title: "Is 2026 the year to buy—or wait?",
    description: "Three market voices unpack rates, supply and the neighbourhoods worth watching.",
    poster: IMAGES.skyline,
  },
  "Expert Advice": {
    eyebrow: "EXPERT ADVICE",
    title: "Five questions to ask before you shortlist.",
    description: "Experienced advisors share the signals they check before recommending a home.",
    poster: IMAGES.discover03,
  },
  "Locality Insights": {
    eyebrow: "LOCALITY STORY · WORLI",
    title: "Worli beyond the skyline.",
    description: "Understand connectivity, upcoming supply and daily life through local voices.",
    poster: IMAGES.discover01,
  },
  "Expert Talks": {
    eyebrow: "EXPERT ROUND TABLE",
    title: "What informed buyers are doing differently.",
    description:
      "A candid discussion with three independent Mumbai residential market specialists.",
    poster: IMAGES.lounge,
  },
  "Industry Updates": {
    eyebrow: "INDUSTRY UPDATE",
    title: "What the latest policy changes mean.",
    description: "A clear plain-language briefing on stamp duty, FSI and infrastructure corridors.",
    poster: IMAGES.aerial,
  },
};

export const INSIGHTS_BANNER_VIDEO = VIDEOS.insightsBanner;

export const insightCuratedRows = [
  createCuratedRow(
    "LEARN",
    "Build your property fluency",
    [
      "How to read carpet area correctly",
      "A simple guide to project timelines",
      "What possession clauses actually mean",
      "Rental yield in under six minutes",
    ],
    3,
    ["VIDEO LESSON"],
    ["Buyer basics", "Project literacy", "Legal context", "Investment basics"],
  ),
  createCuratedRow(
    "MARKET UPDATES",
    "Understand what is changing",
    [
      "The quarter in Mumbai housing demand",
      "Interest rates and the real monthly impact",
      "Where new supply is entering the market",
      "Three signals informed buyers are watching",
    ],
    7,
    ["MARKET UPDATE"],
    ["Mumbai", "Finance", "Supply", "Quarterly outlook"],
  ),
  createCuratedRow(
    "EXPERT ADVICE",
    "Questions worth asking first",
    [
      "Five checks before you shortlist",
      "How an advisor reviews builder credibility",
      "The hidden costs to add to your budget",
      "When a site visit should change your mind",
    ],
    11,
    ["EXPERT TALK"],
    ["Rhea Mehta", "Naina Shah", "Vikram Sethi", "Anika Desai"],
  ),
  createCuratedRow(
    "LOCALITY INSIGHTS · EXPERT TALKS",
    "Know the place behind the price",
    [
      "Worli beyond the skyline",
      "Bandra West through a resident’s routine",
      "The connectivity story reshaping Sewri",
      "A round table on Mumbai’s next corridors",
    ],
    15,
    ["LOCALITY VIDEO", "EXPERT ROUND TABLE"],
    ["Worli", "Bandra West", "Sewri", "Mumbai"],
  ),
];

export const insightVerticalPool = buildVerticalPool(
  "insight",
  [
    "How to compare carpet area without getting lost",
    "What interest-rate changes mean for a real buyer",
    "Five questions to ask before you shortlist",
    "Worli beyond the skyline: a locality video guide",
    "Reading a project timeline in under six minutes",
    "The difference between yield and appreciation",
    "What an independent property advisor checks first",
    "Why maintenance costs belong in your budget",
    "A plain-language guide to possession risk",
    "Three market signals worth watching this quarter",
  ],
  "education",
  ["Learn", "Market Update", "Expert Advice", "Locality Insight"],
  ["Mumbai", "Worli", "Bandra West", "Thane", "Navi Mumbai"],
  ["Rhea Mehta", "Vikram Sethi", "Anika Desai", "Realty Vids Learning"],
  10,
);

export interface InsightsProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onExpert: () => void;
  previewPaused: boolean;
}
