import { IMAGES } from "../../lib/assets";

export const page = { path: "/project", label: "Project Detail" } as const;

export const PROJECT_STATS = [
  ["Starting From", "₹4.25 Cr"],
  ["Configurations", "3 & 4 Beds"],
  ["Possession", "December 2027"],
  ["RERA ID", "P52000047219"],
] as const;

export const PROJECT_AMENITIES = [
  "Private plunge pool",
  "Members wellness pavilion",
  "24/7 Estate concierge",
  "Shaded coastal trail",
  "Private chef’s table",
  "Dedicated EV bays",
] as const;

export const PROJECT_CONFIGS = [
  { type: "3 BHK Residence", size: "1,820–2,110 sq ft carpet", price: "₹4.25–5.4 Cr" },
  { type: "4 BHK Sky Villa", size: "2,540–3,120 sq ft carpet", price: "₹6.1–7.8 Cr" },
  { type: "Signature Garden Villa", size: "3,480 sq ft carpet", price: "₹9.2 Cr" },
] as const;

export const PROJECT_CONNECTIVITY = [
  ["Mandwa Ro-Ro Jetty", "20 min"],
  ["Alibaug Town Centre", "18 min"],
  ["Kihim Beach", "12 min"],
  ["South Mumbai by Speedboat", "55 min"],
] as const;

export const PROJECT_VIDEOS = [
  { image: IMAGES.pool, title: "A day at The Reserve", duration: "03:42" },
  { image: IMAGES.interior, title: "Inside the 4-bedroom residence", duration: "05:18" },
  { image: IMAGES.lounge, title: "Meet the landscape architect", duration: "07:05" },
] as const;

export const RELATED_PROJECTS = [
  { image: IMAGES.tower, title: "Aurelia Residences", meta: "Worli · From ₹6.8 Cr" },
  { image: IMAGES.lounge, title: "Maison 77", meta: "Bandra West · From ₹8.2 Cr" },
] as const;

export interface ProjectDetailProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onVideo: () => void;
  onEnquire: () => void;
}
