import { buildVerticalPool, createCuratedRow, verticalImages } from "../data-utils";

export const page = { path: "/insights", label: "Insights" } as const;

export const insightCuratedRows = [
  createCuratedRow(
    "LEARN",
    "Build your property fluency",
    [
      "How to read carpet area correctly",
      "A simple guide to project timelines",
      "What possession clauses actually mean",
      "Rental yield in under six minutes",
    ],
    3,
    ["VIDEO LESSON"],
    ["Buyer basics", "Project literacy", "Legal context", "Investment basics"],
  ),
  createCuratedRow(
    "MARKET UPDATES",
    "Understand what is changing",
    [
      "The quarter in Mumbai housing demand",
      "Interest rates and the real monthly impact",
      "Where new supply is entering the market",
      "Three signals informed buyers are watching",
    ],
    7,
    ["MARKET UPDATE"],
    ["Mumbai", "Finance", "Supply", "Quarterly outlook"],
  ),
  createCuratedRow(
    "EXPERT ADVICE",
    "Questions worth asking first",
    [
      "Five checks before you shortlist",
      "How an advisor reviews builder credibility",
      "The hidden costs to add to your budget",
      "When a site visit should change your mind",
    ],
    11,
    ["EXPERT TALK"],
    ["Rhea Mehta", "Naina Shah", "Vikram Sethi", "Anika Desai"],
  ),
  createCuratedRow(
    "LOCALITY INSIGHTS · EXPERT TALKS",
    "Know the place behind the price",
    [
      "Worli beyond the skyline",
      "Bandra West through a resident’s routine",
      "The connectivity story reshaping Sewri",
      "A round table on Mumbai’s next corridors",
    ],
    15,
    ["LOCALITY VIDEO", "EXPERT ROUND TABLE"],
    ["Worli", "Bandra West", "Sewri", "Mumbai"],
  ),
];

export const insightVerticalPool = buildVerticalPool(
  "insight",
  [
    "How to compare carpet area without getting lost",
    "What interest-rate changes mean for a real buyer",
    "Five questions to ask before you shortlist",
    "Worli beyond the skyline: a locality video guide",
    "Reading a project timeline in under six minutes",
    "The difference between yield and appreciation",
    "What an independent property advisor checks first",
    "Why maintenance costs belong in your budget",
    "A plain-language guide to possession risk",
    "Three market signals worth watching this quarter",
  ],
  "education",
  ["Learn", "Market Update", "Expert Advice", "Locality Insight"],
  ["Mumbai", "Worli", "Bandra West", "Thane", "Navi Mumbai"],
  ["Rhea Mehta", "Vikram Sethi", "Anika Desai", "Realty Vids Learning"],
  10,
);
