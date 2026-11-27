import { useState } from "react";
import { IMAGES } from "../../lib/assets";
import type { Sheet } from "../../lib/types";

export const SHEET_TITLES: Record<Exclude<Sheet, null>, { eyebrow: string; title: string }> = {
  location: { eyebrow: "SEARCH AREA & RADIUS", title: "Choose your search area" },
  filters: { eyebrow: "PRECISION DISCOVERY", title: "Refine your discovery" },
  feed: { eyebrow: "CUSTOM STREAM", title: "Create a custom feed" },
  list: { eyebrow: "RESEARCH COLLECTION", title: "Create a custom list" },
  enquiry: { eyebrow: "CONCIERGE ADVISORY", title: "Request a private consultation" },
};

export const QUICK_LOCATIONS = [
  { place: "Mumbai", kind: "Metropolitan region", projects: 148 },
  { place: "Worli", kind: "South Mumbai seafront", projects: 42 },
  { place: "Bandra West", kind: "Coastal residential", projects: 31 },
  { place: "BKC", kind: "Financial district", projects: 19 },
  { place: "Alibaug", kind: "Coastal villas & plots", projects: 18 },
] as const;

export const RADIUS_STEPS = [2, 5, 10, 15, 25, 50] as const;

export const NEARBY_INVENTORY = [
  { title: "Aurelia Residences", meta: "Worli · 3.2 km", image: IMAGES.tower },
  { title: "Maison 77", meta: "Bandra West · 8.6 km", image: IMAGES.lounge },
  { title: "Sea-facing residence", meta: "Altamount Rd · 5.1 km", image: IMAGES.interior },
] as const;

export const FILTER_GROUPS = {
  propertyType: ["Apartment", "Villa", "Plot", "Penthouse"],
  projectStatus: ["New launch", "Ready to move", "Under construction", "Upcoming"],
  listedBy: ["Builder", "Owner", "Broker", "Verified"],
  bedrooms: ["2", "3", "4", "5+"],
  feedTopics: [
    "Project tours",
    "Education",
    "Market updates",
    "Opportunities",
    "Expert advice",
    "Locality guides",
  ],
  savedItems: [
    "The Reserve · Alibaug Project",
    "Aurelia Residences · Worli Project",
    "2026 Market Outlook · Insight Film",
  ],
} as const;

export interface ActionSheetProps {
  type: Exclude<Sheet, null>;
  initialCity?: string;
  initialRadius?: number;
  close: () => void;
  onSuccess: (message: string, locationUpdate?: { city: string; radius: number }) => void;
}

export function useActionSheetForm({
  type,
  initialCity = "Mumbai",
  initialRadius = 25,
  onSuccess,
}: Omit<ActionSheetProps, "close">) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [radius, setRadius] = useState(initialRadius);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [locationQuery, setLocationQuery] = useState(`${initialCity}, Maharashtra`);
  const [choices, setChoices] = useState(
    () => new Set(["Apartment", "Villa", "3", "Project tours", "Education", "Market updates"]),
  );

  const toggleChoice = (value: string) => {
    setChoices((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  const submit = () => {
    if ((type === "feed" || type === "list") && !name.trim()) {
      setError(`Please enter a name for your custom ${type}.`);
      return;
    }
    setError("");
    setStep("loading");
    const cleanCity = locationQuery.split(",")[0]?.trim() || "Mumbai";
    window.setTimeout(() => {
      setStep("success");
      window.setTimeout(() => {
        onSuccess(
          type === "enquiry"
            ? "Enquiry sent. A dedicated advisor will reach out shortly."
            : type === "location"
              ? `Location updated to ${cleanCity} (${radius} km).`
              : `${type === "feed" ? "Custom feed" : type === "list" ? "Custom list" : "Filters"} applied.`,
          type === "location" ? { city: cleanCity, radius } : undefined,
        );
      }, 620);
    }, 440);
  };

  return {
    step,
    radius,
    setRadius,
    name,
    setName,
    error,
    locationQuery,
    setLocationQuery,
    choices,
    toggleChoice,
    submit,
  };
}
