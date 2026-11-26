import { buildVerticalPool, createCuratedRow, verticalImages } from "../data-utils";

export const page = { path: "/feed", label: "My Feed" } as const;

export const feedVerticalPool = buildVerticalPool(
  "feed",
  [
    "A calm first look at Mumbai’s next waterfront address",
    "Three details worth noticing before a site visit",
    "Why this floor plan works harder than it looks",
    "The neighbourhood walk buyers usually miss",
    "Inside a home shaped around natural light",
    "What ₹6 crore buys across three Mumbai micro-markets",
    "A creator’s guide to reading the sample apartment",
    "The design move that makes this villa feel private",
    "Construction progress, explained without the jargon",
    "A saved topic returns with a clearer market update",
  ],
  "project",
  ["For You", "Design", "Neighbourhood", "Market"],
  ["Worli", "Bandra West", "Alibaug", "Powai", "Lower Parel"],
  ["Realty Vids Studios", "Mira Shah", "Aarav Mehta", "Studio Ardete"],
  0,
);

export { discoverVideoRails } from "../discover/data";
