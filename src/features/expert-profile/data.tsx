import { IMAGES } from "../../lib/assets";

export const page = { path: "/expert", label: "Expert Profile" } as const;

export const EXPERT_METRICS = [
  ["12", "Years Experience"],
  ["86", "Video Insights"],
  ["28K", "Buyer Followers"],
] as const;

export const EXPERT_VIDEOS = [
  { image: IMAGES.skyline, title: "Is 2026 the year to buy—or wait?", duration: "12:46" },
  { image: IMAGES.aerial, title: "Three Mumbai corridors to watch next", duration: "08:24" },
  { image: IMAGES.city, title: "Reading a residential price cycle clearly", duration: "09:12" },
] as const;

export interface ExpertProfileProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onVideo: () => void;
  onConsult: () => void;
}
