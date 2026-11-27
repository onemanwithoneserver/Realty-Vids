import { IMAGES, VIDEOS } from "../../lib/assets";
import type { SelectedVideo, VideoFormat, VideoKind } from "../../lib/types";

export interface VideoStageRecord {
  poster: string;
  eyebrow: string;
  title: string;
  creator: string;
  creatorMeta: string;
  recordLabel: string;
  record: string;
  meta: string;
  saveId: string;
  facts: readonly [string, string][];
}

export const STAGE_CONTENT: Record<VideoKind, VideoStageRecord> = {
  project: {
    poster: IMAGES.tower,
    eyebrow: "PROJECT WALKTHROUGH · 06:24",
    title: "Aurelia: a new perspective on city living",
    creator: "Realty Vids Studios",
    creatorMeta: "Property films · 42K followers",
    recordLabel: "PROJECT",
    record: "Aurelia Residences",
    meta: "K Raheja · Worli · From ₹6.8 Cr · 3 & 4 BHK",
    saveId: "inline-project-aurelia",
    facts: [
      ["Builder", "K Raheja"],
      ["Location", "Worli"],
      ["Starting", "₹6.8 Cr"],
      ["Config", "3 & 4 BHK"],
    ],
  },
  property: {
    poster: IMAGES.interior,
    eyebrow: "HOME WALKTHROUGH · 02:18",
    title: "Inside a sea-facing residence above Mumbai",
    creator: "Aarav Mehta",
    creatorMeta: "Secondary market advisor",
    recordLabel: "PROPERTY",
    record: "Sea-facing residence",
    meta: "Owner listing · Altamount Road · ₹9.4 Cr · 3 BHK",
    saveId: "inline-property-altamount",
    facts: [
      ["Listed By", "Owner"],
      ["Location", "Altamount Rd"],
      ["Asking", "₹9.4 Cr"],
      ["Carpet", "2,180 sq ft"],
    ],
  },
  opportunity: {
    poster: IMAGES.lounge,
    eyebrow: "VERIFIED OPPORTUNITY · 04:36",
    title: "Why this residence sits 12% below benchmark",
    creator: "Realty Vids Verification Desk",
    creatorMeta: "Independent opportunity reviews",
    recordLabel: "OPPORTUNITY",
    record: "Parkside Residences",
    meta: "₹80L advantage · Independently verified · 6 days left",
    saveId: "inline-opportunity-parkside",
    facts: [
      ["Reason", "Below benchmark"],
      ["Benefit", "Save ₹80L"],
      ["Status", "Verified"],
      ["Validity", "6 days left"],
    ],
  },
  education: {
    poster: IMAGES.skyline,
    eyebrow: "MARKET OUTLOOK · 12:46",
    title: "Is 2026 the year to buy—or to wait?",
    creator: "Rhea Mehta",
    creatorMeta: "Property economist · 28K followers",
    recordLabel: "TOPIC",
    record: "Mumbai Market Outlook",
    meta: "Learning hub · 24 related videos · Updated weekly",
    saveId: "inline-topic-mumbai",
    facts: [
      ["Topic", "Market timing"],
      ["Audience", "All buyers"],
      ["Creator", "Rhea Mehta"],
      ["Series", "Big Picture"],
    ],
  },
};

export const RELATED_STAGE_VIDEOS = [
  {
    image: IMAGES.tower,
    title: "Aurelia: a new perspective on Worli",
    creator: "Realty Vids Studios",
    duration: "06:24",
    kind: "project" as VideoKind,
  },
  {
    image: IMAGES.pool,
    title: "A slower way of living by the coast",
    creator: "Mira Shah",
    duration: "04:42",
    kind: "property" as VideoKind,
  },
  {
    image: IMAGES.city,
    title: "What Mumbai’s next corridor gets right",
    creator: "Rhea Mehta",
    duration: "08:06",
    kind: "education" as VideoKind,
  },
] as const;

export const DEFAULT_PREVIEW_VIDEO = VIDEOS.preview;

export interface InlineVideoStageProps {
  kind: VideoKind;
  format: VideoFormat;
  selected?: SelectedVideo;
  saved: Set<string>;
  toggle: (id: string) => void;
  onClose: () => void;
  onProject: () => void;
  onProperty: () => void;
  onExpert: () => void;
  onEnquire: () => void;
  onSelectRelated: (kind: VideoKind) => void;
}
