export const page = { path: "/property", label: "Property Detail" } as const;

export const PROPERTY_SPECS = [
  ["Floor", "24 of 31"],
  ["Building Age", "6 years"],
  ["Status", "Ready to move"],
  ["Tenure", "Freehold"],
  ["Orientation", "West · Sea"],
  ["Furnishing", "Semi-furnished"],
] as const;

export const PROPERTY_VERIFICATIONS = [
  "Ownership & society NOC reviewed",
  "Carpet area documents checked",
  "Listing verified 2 days ago",
] as const;

export const PROPERTY_COMMUTES = [
  ["Kemps Corner", "6 min"],
  ["Marine Drive", "12 min"],
  ["BKC", "28 min"],
  ["International Airport", "36 min"],
] as const;

export interface PropertyDetailProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onVideo: () => void;
  onEnquire: () => void;
}
