import { IMAGES } from "../../lib/assets";

export const page = { path: "/search", label: "Search" } as const;

export const SEARCH_CATEGORIES = [
  "All",
  "Projects",
  "Properties",
  "Builders",
  "Cities & localities",
  "Landmarks",
] as const;

export const RECENT_SEARCHES = [
  "3 BHK in Worli",
  "New launches in Bandra",
  "Villas near Mandwa Jetty",
] as const;

export const POPULAR_LOCATIONS = [
  { rank: "01", place: "Worli", count: "42 projects" },
  { rank: "02", place: "Bandra West", count: "31 projects" },
  { rank: "03", place: "Alibaug", count: "18 projects" },
  { rank: "04", place: "Lower Parel", count: "26 projects" },
] as const;

export const FEATURED_SEARCH_RESULTS = [
  {
    id: "aurelia",
    image: IMAGES.tower,
    type: "PROJECT",
    category: "Projects",
    title: "Aurelia Residences",
    meta: "Worli · K Raheja · From ₹6.8 Cr",
    target: "project" as const,
  },
  {
    id: "altamount",
    image: IMAGES.interior,
    type: "PROPERTY",
    category: "Properties",
    title: "Sea-facing residence",
    meta: "Altamount Rd · 3 BHK · ₹9.4 Cr",
    target: "property" as const,
  },
  {
    id: "reserve",
    image: IMAGES.pool,
    type: "PROJECT",
    category: "Projects",
    title: "The Reserve",
    meta: "Alibaug · Lodha · From ₹4.25 Cr",
    target: "project" as const,
  },
  {
    id: "lodha",
    monogram: "LO",
    type: "BUILDER",
    category: "Builders",
    title: "Lodha",
    meta: "18 verified projects across Mumbai",
    target: "project" as const,
  },
  {
    id: "worli",
    pin: true,
    type: "LOCALITY",
    category: "Cities & localities",
    title: "Worli, Mumbai",
    meta: "42 projects · 186 video tours",
    target: "location" as const,
  },
  {
    id: "bkc",
    pin: true,
    type: "LANDMARK",
    category: "Landmarks",
    title: "Bandra Kurla Complex",
    meta: "19 projects within 5 km",
    target: "location" as const,
  },
] as const;

export interface SearchPageProps {
  onBack: () => void;
  onProject: () => void;
  onProperty: () => void;
  onLocation: () => void;
}
