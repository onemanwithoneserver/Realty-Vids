import { GALLERY_POOL } from "./assets";
import type { CuratedRow, VerticalVideoItem, VideoKind } from "./types";

export function createCuratedRow(
  eyebrow: string,
  title: string,
  videoTitles: string[],
  imageOffset: number,
  labels: string[],
  contexts: string[],
): CuratedRow {
  const creators = ["Realty Vids Studios", "Verification Desk", "Mira Shah", "Aarav Mehta"];
  return {
    eyebrow,
    title,
    videos: videoTitles.map(
      (videoTitle, index) =>
        [
          GALLERY_POOL[(imageOffset + index) % GALLERY_POOL.length],
          videoTitle,
          creators[index % creators.length],
          contexts[index % contexts.length],
          `0${3 + index}:${[18, 42, 27, 54][index % 4]}`,
          labels[index % labels.length],
        ] as const,
    ),
  };
}

export function buildVerticalPool(
  prefix: string,
  titles: string[],
  kind: VideoKind,
  categories: string[],
  locations: string[],
  creators: string[],
  imageOffset: number,
  verified = false,
): VerticalVideoItem[] {
  return titles.map((title, index) => {
    const duration = `${String(2 + (index % 7)).padStart(2, "0")}:${String(
      12 + ((index * 13) % 47),
    ).padStart(2, "0")}`;
    const category = categories[index % categories.length];
    const location = locations[index % locations.length];
    const creator = creators[index % creators.length];
    return {
      id: `${prefix}-${index + 1}`,
      title,
      creator,
      creatorMeta: `${category} · ${location}`,
      poster: GALLERY_POOL[(imageOffset + index) % GALLERY_POOL.length],
      eyebrow: `${category.toUpperCase()} · ${duration}`,
      kind,
      format: index % 4 === 2 ? "portrait" : "landscape",
      category,
      location,
      contextTitle: kind === "education" ? category : `${location} Market Brief`,
      contextMeta:
        kind === "opportunity"
          ? `₹${[18, 24, 36, 52][index % 4]}L documented benefit · Independently reviewed`
          : kind === "education"
            ? `${2 + (index % 5)} key takeaways · Video learning series`
            : `${["2 & 3 BHK", "3 BHK", "4 BHK", "2,400 sq ft"][index % 4]} · Updated today`,
      engagement: `${(1.2 + index * 0.4).toFixed(1)}K`,
      verified,
    };
  });
}
