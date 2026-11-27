import { GALLERY_POOL, IMAGES, VIDEOS } from "../../lib/assets";
import type {
  CuratedRow,
  SelectedVideo,
  VerticalVideoItem,
  VideoFormat,
  VideoKind,
} from "../../lib/types";
import type { IconName } from "../../components/common/data";

export const page = { path: "/discover", label: "Discover" } as const;

export const DISCOVER_MARKETS = [
  {
    id: "Primary Market",
    shortLabel: "Primary",
    detail: "New launches & verified builder projects",
    inventoryBadge: "42 Projects",
  },
  {
    id: "Secondary Market",
    shortLabel: "Secondary",
    detail: "Verified resale homes & owner inventory",
    inventoryBadge: "186 Properties",
  },
] as const;

export const DISCOVER_CATEGORIES: readonly { label: string; icon: IconName }[] = [
  { label: "All Properties", icon: "play" },
  { label: "Flats", icon: "apartment" },
  { label: "Villas", icon: "villa" },
  { label: "Open Plots", icon: "plot" },
  { label: "Commercial", icon: "commercial" },
] as const;

export const DISCOVER_HERO_OPTIONS: Record<
  string,
  Record<
    "primary" | "secondary",
    { image: string; title: string; description: string; location: string; facts: string }
  >
> = {
  "All Properties": {
    primary: {
      image: IMAGES.city,
      title: "Aurelia.\nSee life from here.",
      description:
        "A cinematic first look at a new Worli landmark shaped around sky decks and sea light.",
      location: "WORLI · FROM ₹6.8 CR",
      facts: "3 & 4 BHK · POSSESSION 2028",
    },
    secondary: {
      image: IMAGES.interior,
      title: "A home above the city.",
      description:
        "Walk inside an independently verified owner-listed residence on Altamount Road.",
      location: "ALTAMOUNT ROAD · ₹9.4 CR",
      facts: "3 BHK · 2,180 SQ FT",
    },
  },
  Flats: {
    primary: {
      image: IMAGES.lounge,
      title: "A new residential landmark takes shape.",
      description: "Tour a builder-led apartment tower before its public weekend release.",
      location: "WORLI · FROM ₹5.9 CR",
      facts: "2, 3 & 4 BHK · NEW LAUNCH",
    },
    secondary: {
      image: IMAGES.interior,
      title: "A resale apartment made for city life.",
      description:
        "Walk through a verified owner-listed home in Lower Parel with zero brokerage surprises.",
      location: "LOWER PAREL · ₹4.8 CR",
      facts: "3 BHK · OWNER LISTING",
    },
  },
  Villas: {
    primary: {
      image: IMAGES.pool,
      title: "More room, closer to the coast.",
      description: "A first look at a private gated collection of landscaped coastal villas.",
      location: "ALIBAUG · FROM ₹4.2 CR",
      facts: "3 & 4 BHK VILLAS · NEW PHASE",
    },
    secondary: {
      image: IMAGES.discover10,
      title: "A lived-in villa with a garden story.",
      description:
        "Tour a ready-to-occupy villa surrounded by mature trees and private courtyard decks.",
      location: "LONAVALA · ₹6.1 CR",
      facts: "4 BHK · VERIFIED RESALE",
    },
  },
  "Open Plots": {
    primary: {
      image: IMAGES.aerial,
      title: "A plotted development shaped by open space.",
      description: "See internal roads, underground utilities and the first phase from above.",
      location: "PANVEL · FROM ₹1.2 CR",
      facts: "2,000–4,000 SQ FT · NEW DEVELOPMENT",
    },
    secondary: {
      image: IMAGES.city,
      title: "A resale plot with the groundwork visible.",
      description: "Review boundary markers, road access and the surrounding neighbourhood growth.",
      location: "KARJAT · ₹86 L",
      facts: "2,400 SQ FT · OWNER LISTING",
    },
  },
  Commercial: {
    primary: {
      image: IMAGES.skyline,
      title: "A new workplace designed for what’s next.",
      description: "Explore a Grade-A builder commercial launch in Bandra Kurla Complex.",
      location: "BKC · FROM ₹7.5 CR",
      facts: "OFFICE SUITES · POSSESSION 2027",
    },
    secondary: {
      image: IMAGES.lounge,
      title: "A tenanted office with an income story.",
      description: "Understand the floor plate, active lease covenant and yield opportunity.",
      location: "ANDHERI EAST · ₹3.6 CR",
      facts: "1,180 SQ FT · TENANTED",
    },
  },
};

export const DISCOVER_VIDEO_VIDEOS = {
  primary: VIDEOS.discoverPrimary,
  secondary: VIDEOS.discoverSecondary,
} as const;

export const discoverVideoRails: readonly CuratedRow[] = [
  {
    eyebrow: "FEATURED PROJECT WALKTHROUGHS",
    title: "Watch before you shortlist",
    videos: [
      [
        IMAGES.discover01,
        "A courtyard-led residence in Juhu",
        "Realty Vids Studios",
        "Aranya House · Juhu",
        "07:12",
        "PROJECT FILM",
      ],
      [
        IMAGES.discover02,
        "Inside a contemporary Alibaug retreat",
        "Mira Shah",
        "Casa Maré · Alibaug",
        "05:08",
        "WALKTHROUGH",
      ],
      [
        IMAGES.discover03,
        "A family home built around the garden",
        "The Dimensions",
        "Verdant Villa · Pune",
        "04:36",
        "HOME TOUR",
      ],
      [
        IMAGES.discover04,
        "Where warm materials meet clean geometry",
        "Studio Habitat",
        "House 18 · Goa",
        "03:54",
        "DESIGN STORY",
      ],
    ],
  },
  {
    eyebrow: "TRENDING PROJECTS",
    title: "What Mumbai is watching",
    videos: [
      [
        IMAGES.discover05,
        "The low-rise community drawing new attention",
        "Nikhil Desai",
        "Palm County · Thane",
        "06:41",
        "TRENDING",
      ],
      [
        IMAGES.discover06,
        "Why buyers are looking beyond the sea link",
        "Aarav Mehta",
        "West Bay · Navi Mumbai",
        "09:02",
        "MARKET WATCH",
      ],
      [
        IMAGES.discover07,
        "Brick, shade and a quieter way to live",
        "Ananya Rao",
        "The Grove · Bengaluru",
        "04:18",
        "ARCHITECTURE",
      ],
      [
        IMAGES.discover08,
        "A new residential pocket takes shape",
        "Realty Vids Research",
        "North Gardens · Powai",
        "05:47",
        "NEIGHBOURHOOD",
      ],
    ],
  },
  {
    eyebrow: "EXPLORE VILLAS",
    title: "Room to live differently",
    videos: [
      [
        IMAGES.discover09,
        "A vertical villa with views in every direction",
        "Open House India",
        "Sky Villa · Worli",
        "06:03",
        "VILLA TOUR",
      ],
      [
        IMAGES.discover10,
        "Poolside living away from the city",
        "Kavya Menon",
        "The Palms · Karjat",
        "04:29",
        "WEEKEND HOME",
      ],
      [
        IMAGES.discover11,
        "A timber-lined home made for slow weekends",
        "Design Dispatch",
        "Forest House · Lonavala",
        "05:34",
        "DESIGN TOUR",
      ],
      [
        IMAGES.discover12,
        "Living among the trees without leaving Mumbai",
        "Rhea Mehta",
        "Canopy Villas · Aarey",
        "07:26",
        "VILLA STORY",
      ],
    ],
  },
  {
    eyebrow: "NEW LAUNCH VIDEOS",
    title: "First looks, before everyone else",
    videos: [
      [
        IMAGES.tower,
        "First look: Aurelia Residences",
        "Realty Vids Launch Desk",
        "Aurelia · Worli",
        "02:48",
        "NEW LAUNCH",
      ],
      [
        IMAGES.aerial,
        "A plotted development built around open space",
        "Launch Preview",
        "Earth & Sky · Panvel",
        "05:11",
        "PLOTTED LIVING",
      ],
      [
        IMAGES.pool,
        "The Reserve opens its first phase",
        "Mira Shah",
        "The Reserve · Alibaug",
        "03:37",
        "EARLY ACCESS",
      ],
      [
        IMAGES.skyline,
        "Three towers reshaping the eastern waterfront",
        "Realty Vids Research",
        "Harbour One · Sewri",
        "08:14",
        "LAUNCH BRIEF",
      ],
    ],
  },
] as const;

export function buildDiscoverVerticalPool(market: string, category: string): VerticalVideoItem[] {
  const locations = ["Worli", "Bandra West", "Powai", "Thane", "Navi Mumbai", "Panvel"];
  const noun =
    {
      "All Properties": "property",
      Flats: "apartment",
      Villas: "villa",
      "Open Plots": "plot",
      Commercial: "workspace",
    }[category] ?? "property";
  const inventory = market === "Secondary Market" ? "resale" : "new";
  const actions = [
    "First look",
    "Full walkthrough",
    "Location context",
    "Design review",
    "Price and configuration",
    "Construction update",
    "Buyer perspective",
    "Neighbourhood tour",
    "Shortlist review",
    "What to inspect in person",
  ];

  return actions.map((action, index) => {
    const location = locations[index % locations.length];
    const duration = `${3 + (index % 6)}:${String(14 + ((index * 11) % 43)).padStart(2, "0")}`;
    return {
      id: `discover-${market}-${category}-${index}`,
      title: `${action}: a ${inventory} ${noun} in ${location}`,
      creator: ["Realty Vids Studios", "Open House India", "Mira Shah", "Aarav Mehta"][index % 4],
      creatorMeta: `${market} · ${category}`,
      poster: GALLERY_POOL[(index + (market === "Secondary Market" ? 9 : 2)) % GALLERY_POOL.length],
      eyebrow: `${category.toUpperCase()} · ${duration}`,
      kind: market === "Secondary Market" ? "property" : "project",
      format: index % 4 === 1 ? "portrait" : "landscape",
      category: `${market} · ${category}`,
      location,
      contextTitle: `${inventory === "new" ? "Builder project" : "Resale inventory"} · ${location}`,
      contextMeta:
        market === "Secondary Market"
          ? `${["Owner", "Verified broker"][index % 2]} listing · Asking price reviewed`
          : `${["New launch", "Under construction", "Ready phase"][index % 3]} · Builder inventory`,
      engagement: `${(1.5 + index * 0.3).toFixed(1)}K`,
      verified: market === "Secondary Market",
    };
  });
}

export interface DiscoverProps {
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onProject: () => void;
  onProperty: () => void;
  onSearch: () => void;
  onLocation: () => void;
  onPrimary: () => void;
  onSecondary: () => void;
  onEnquire: () => void;
  previewPaused: boolean;
}
