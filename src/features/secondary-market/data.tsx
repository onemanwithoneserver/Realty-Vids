import { IMAGES } from "../../lib/assets";

export const page = { path: "/secondary-results", label: "Secondary Market" } as const;

export const SECONDARY_PROPERTIES = [
  {
    id: "secondary-result-0",
    image: IMAGES.interior,
    title: "Sea-facing residence",
    type: "Apartment · 3 BHK",
    price: "₹9.4 Cr",
    size: "2,180 sq ft",
    place: "Altamount Road",
    detail: "Floor 24 of 31 · Semi-furnished",
    source: "OWNER",
    availability: "Available now",
  },
  {
    id: "secondary-result-1",
    image: IMAGES.lounge,
    title: "Garden apartment",
    type: "Apartment · 3 BHK",
    price: "₹7.75 Cr",
    size: "1,640 sq ft",
    place: "Bandra West",
    detail: "Floor 2 of 8 · Furnished",
    source: "BROKER",
    availability: "Viewings this week",
  },
  {
    id: "secondary-result-2",
    image: IMAGES.city,
    title: "High-floor city home",
    type: "Apartment · 2 BHK",
    price: "₹6.9 Cr",
    size: "1,280 sq ft",
    place: "Worli",
    detail: "Floor 31 of 42 · Unfurnished",
    source: "OWNER",
    availability: "Available now",
  },
  {
    id: "secondary-result-3",
    image: IMAGES.pool,
    title: "Private coastal villa",
    type: "Villa · 4 BHK",
    price: "₹12.2 Cr",
    size: "3,450 sq ft",
    place: "Alibaug",
    detail: "Ground + 1 · Fully furnished",
    source: "BROKER",
    availability: "By appointment",
  },
  {
    id: "secondary-result-4",
    image: IMAGES.discover09,
    title: "Sky-deck duplex residence",
    type: "Duplex · 4 BHK",
    price: "₹14.8 Cr",
    size: "2,940 sq ft",
    place: "Prabhadevi",
    detail: "Floor 38 · Private lift lobby",
    source: "OWNER",
    availability: "Docs verified",
  },
  {
    id: "secondary-result-5",
    image: IMAGES.discover13,
    title: "Heritage lane apartment",
    type: "Apartment · 3 BHK",
    price: "₹6.4 Cr",
    size: "1,520 sq ft",
    place: "Chapel Road, Bandra",
    detail: "Boutique building · Renovated",
    source: "OWNER",
    availability: "Available now",
  },
] as const;

export interface SecondaryResultsProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onProperty: () => void;
  onVideo: () => void;
  onFilters: () => void;
}
