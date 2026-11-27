export type AppTheme = "light" | "dark";
export type ViewMode = "desktop" | "mobile";

export type Section = "feed" | "discover" | "opportunities" | "insights";

export type View =
  | "lists"
  | "search"
  | "primary-results"
  | "secondary-results"
  | "project"
  | "property"
  | "opportunity"
  | "expert"
  | null;

export type Sheet = "location" | "filters" | "feed" | "list" | "enquiry" | null;

export type VideoKind = "project" | "property" | "opportunity" | "education";
export type VideoFormat = "landscape" | "portrait";

export interface SelectedVideo {
  title: string;
  creator: string;
  creatorMeta: string;
  poster: string;
  eyebrow: string;
  videoSrc?: string;
}

export interface VerticalVideoItem extends SelectedVideo {
  id: string;
  kind: VideoKind;
  format: VideoFormat;
  category: string;
  location: string;
  contextTitle: string;
  contextMeta: string;
  engagement: string;
  verified?: boolean;
}

export type CuratedVideoTuple = readonly [
  image: string,
  title: string,
  creator: string,
  context: string,
  duration: string,
  label: string,
];

export interface CuratedRow {
  eyebrow: string;
  title: string;
  videos: readonly CuratedVideoTuple[];
}

export interface PageRouteMeta {
  readonly path: string;
  readonly label: string;
  readonly group?: "Main Tabs" | "Discovery & Research" | "Details & Profiles";
}
