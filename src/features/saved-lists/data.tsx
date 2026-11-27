import { IMAGES } from "../../lib/assets";
import type { IconName } from "../../components/common/data";

export const page = { path: "/lists", label: "My Lists" } as const;

export const SAVED_PROJECT_ITEMS = [
  {
    image: IMAGES.pool,
    title: "The Reserve",
    meta: "Alibaug · Lodha · From ₹4.25 Cr",
    badge: "Coastal Sanctuary",
  },
  {
    image: IMAGES.tower,
    title: "Aurelia Residences",
    meta: "Worli · K Raheja · From ₹6.8 Cr",
    badge: "New Launch",
  },
  {
    image: IMAGES.lounge,
    title: "Maison 77",
    meta: "Bandra West · From ₹8.2 Cr",
    badge: "OC Received",
  },
  {
    image: IMAGES.city,
    title: "The Skyline",
    meta: "Lower Parel · Oberoi · From ₹7.1 Cr",
    badge: "Sky Decks",
  },
] as const;

export const SAVED_VIDEO_ITEMS = [
  {
    image: IMAGES.skyline,
    title: "Is 2026 the year to buy—or to wait?",
    duration: "12:46",
    creator: "Rhea Mehta",
  },
  {
    image: IMAGES.interior,
    title: "Why this layout feels larger than 2,100 sq ft",
    duration: "00:48",
    creator: "Studio Ardete",
  },
  {
    image: IMAGES.aerial,
    title: "Mumbai’s next eastern waterfront growth corridor",
    duration: "08:24",
    creator: "Realty Vids Research",
  },
] as const;

export function getListCategories(savedSize: number): readonly {
  name: string;
  count: number;
  icon: IconName;
}[] {
  return [
    { name: "Projects", count: 4, icon: "apartment" },
    { name: "Properties", count: 2, icon: "home" },
    { name: "Opportunities", count: 1, icon: "spark" },
    { name: "Videos", count: savedSize + 3, icon: "play" },
    { name: "Experts", count: 2, icon: "user" },
    { name: "Searches", count: 3, icon: "search" },
    { name: "Topics", count: 5, icon: "bookmark" },
  ];
}

export interface SavedListsProps {
  saved: Set<string>;
  onBack: () => void;
  onCreate: () => void;
  onProject: () => void;
  onVideo: () => void;
}
