import { IMAGES } from "../../lib/assets";

export const page = { path: "/primary-results", label: "Primary Market" } as const;

export const PRIMARY_PROJECTS = [
  {
    id: "primary-result-0",
    image: IMAGES.tower,
    title: "Aurelia Residences",
    builder: "K Raheja",
    place: "Worli",
    price: "₹6.8–11.2 Cr",
    config: "3 & 4 BHK",
    status: "New launch",
    possession: "Dec 2028",
    videos: "6 videos",
  },
  {
    id: "primary-result-1",
    image: IMAGES.pool,
    title: "The Reserve",
    builder: "Lodha",
    place: "Alibaug",
    price: "₹4.25–7.8 Cr",
    config: "3 & 4 BHK",
    status: "Under construction",
    possession: "Dec 2027",
    videos: "12 videos",
  },
  {
    id: "primary-result-2",
    image: IMAGES.lounge,
    title: "Maison 77",
    builder: "Maison",
    place: "Bandra West",
    price: "₹8.2–10.4 Cr",
    config: "3 BHK",
    status: "Ready to move",
    possession: "OC received",
    videos: "4 videos",
  },
  {
    id: "primary-result-3",
    image: IMAGES.city,
    title: "The Skyline",
    builder: "Oberoi",
    place: "Parel",
    price: "₹5.6–9.1 Cr",
    config: "2, 3 & 4 BHK",
    status: "Upcoming",
    possession: "Launch Q2 2027",
    videos: "3 videos",
  },
] as const;

export const PRIMARY_MAP_MARKERS = [
  { left: 26, top: 26, count: "14", area: "Worli" },
  { left: 66, top: 32, count: "9", area: "Bandra" },
  { left: 46, top: 64, count: "11", area: "Lower Parel" },
  { left: 76, top: 72, count: "8", area: "Alibaug" },
] as const;

export interface PrimaryResultsProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onProject: () => void;
  onVideo: () => void;
  onFilters: () => void;
}
