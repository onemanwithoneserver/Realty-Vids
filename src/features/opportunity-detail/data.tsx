export const page = { path: "/opportunity", label: "Opportunity Detail" } as const;

export const OPPORTUNITY_EVIDENCE = [
  {
    label: "Opportunity Price",
    value: "₹5.95 Cr",
    note: "3 BHK · 1,462 sq ft carpet",
    highlight: true,
  },
  {
    label: "Area Benchmark",
    value: "₹6.75 Cr",
    note: "Based on 8 registered sales",
    highlight: false,
  },
  {
    label: "Effective Rate",
    value: "₹40,697 / sq ft",
    note: "All-inclusive before taxes",
    highlight: false,
  },
] as const;

export const OPPORTUNITY_CHECKS = [
  "Title & RERA registration checked",
  "Price confirmed against Nov 2026 comps",
  "8 comparable tower sales audited",
  "Zero paid verification placement",
] as const;

export interface OpportunityDetailProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onEnquire: () => void;
}
