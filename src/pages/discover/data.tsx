import { IMAGES, type VerticalVideoItem, type VideoKind } from "../../AppShared";
import { verticalImages } from "../data-utils";

export const page = { path: "/discover", label: "Discover" } as const;

export const discoverVideoRails = [
  {
    eyebrow: "FEATURED PROJECT WALKTHROUGHS",
    title: "Watch before you shortlist",
    videos: [
      [
        "/media/discover-01.jpg",
        "A courtyard-led residence in Juhu",
        "Realty Vids Studios",
        "Aranya House · Juhu",
        "07:12",
        "PROJECT FILM",
      ],
      [
        "/media/discover-02.jpg",
        "Inside a contemporary Alibaug retreat",
        "Mira Shah",
        "Casa Maré · Alibaug",
        "05:08",
        "WALKTHROUGH",
      ],
      [
        "/media/discover-03.jpg",
        "A family home built around the garden",
        "The Dimensions",
        "Verdant Villa · Pune",
        "04:36",
        "HOME TOUR",
      ],
      [
        "/media/discover-04.jpg",
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
        "/media/discover-05.jpg",
        "The low-rise community drawing new attention",
        "Nikhil Desai",
        "Palm County · Thane",
        "06:41",
        "TRENDING",
      ],
      [
        "/media/discover-06.jpg",
        "Why buyers are looking beyond the sea link",
        "Aarav Mehta",
        "West Bay · Navi Mumbai",
        "09:02",
        "MARKET WATCH",
      ],
      [
        "/media/discover-07.jpg",
        "Brick, shade and a quieter way to live",
        "Ananya Rao",
        "The Grove · Bengaluru",
        "04:18",
        "ARCHITECTURE",
      ],
      [
        "/media/discover-08.jpg",
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
        "/media/discover-09.jpg",
        "A vertical villa with views in every direction",
        "Open House India",
        "Sky Villa · Worli",
        "06:03",
        "VILLA TOUR",
      ],
      [
        "/media/discover-10.jpg",
        "Poolside living away from the city",
        "Kavya Menon",
        "The Palms · Karjat",
        "04:29",
        "WEEKEND HOME",
      ],
      [
        "/media/discover-11.jpg",
        "A timber-lined home made for slow weekends",
        "Design Dispatch",
        "Forest House · Lonavala",
        "05:34",
        "DESIGN TOUR",
      ],
      [
        "/media/discover-12.jpg",
        "Living among the trees without leaving Mumbai",
        "Rhea Mehta",
        "Canopy Villas · Aarey",
        "07:26",
        "VILLA STORY",
      ],
    ],
  },
  {
    eyebrow: "DISCOVER APARTMENTS",
    title: "The city, seen from inside",
    videos: [
      [
        "/media/discover-13.jpg",
        "Colour, character and a Bandra address",
        "Inside Mumbai",
        "Chapel Road Homes · Bandra",
        "03:46",
        "APARTMENT TOUR",
      ],
      [
        IMAGES.interior,
        "Morning light inside a sea-facing three-bed",
        "Aarav Mehta",
        "Altamount Road · Mumbai",
        "04:52",
        "RESIDENCE",
      ],
      [
        IMAGES.lounge,
        "A compact apartment that feels expansive",
        "Studio Ardete",
        "Park View · Lower Parel",
        "03:22",
        "SMALL SPACES",
      ],
      [
        IMAGES.city,
        "What the 38th floor changes about daily life",
        "Realty Vids Studios",
        "Crescent Tower · Mahalaxmi",
        "06:16",
        "HIGH-RISE",
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
      poster:
        verticalImages[(index + (market === "Secondary Market" ? 9 : 2)) % verticalImages.length],
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
      engagement: `${1.5 + index * 0.3}K`,
      verified: market === "Secondary Market",
    };
  });
}
