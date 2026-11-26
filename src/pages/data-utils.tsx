import { IMAGES, type VerticalVideoItem, type VideoKind } from "../AppShared";
import { publicAsset } from "../publicAsset";

export const verticalImages = [
  publicAsset("media/discover-01.jpg"),
  publicAsset("media/discover-02.jpg"),
  publicAsset("media/discover-03.jpg"),
  publicAsset("media/discover-04.jpg"),
  publicAsset("media/discover-05.jpg"),
  publicAsset("media/discover-06.jpg"),
  publicAsset("media/discover-07.jpg"),
  publicAsset("media/discover-08.jpg"),
  publicAsset("media/discover-09.jpg"),
  publicAsset("media/discover-10.jpg"),
  publicAsset("media/discover-11.jpg"),
  publicAsset("media/discover-12.jpg"),
  publicAsset("media/discover-13.jpg"),
  IMAGES.tower,
  IMAGES.city,
  IMAGES.pool,
  IMAGES.interior,
  IMAGES.lounge,
  IMAGES.skyline,
  IMAGES.aerial,
];

export type CuratedVideo = [string, string, string, string, string, string];

export type CuratedRow = { eyebrow: string; title: string; videos: CuratedVideo[] };

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
    videos: videoTitles.map((videoTitle, index) => [
      verticalImages[(imageOffset + index) % verticalImages.length],
      videoTitle,
      creators[index % creators.length],
      contexts[index % contexts.length],
      `0${3 + index}:${[18, 42, 27, 54][index]}`,
      labels[index % labels.length],
    ]),
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
      poster: verticalImages[(imageOffset + index) % verticalImages.length],
      eyebrow: `${category.toUpperCase()} · ${duration}`,
      kind,
      format: index % 4 === 2 ? "portrait" : "landscape",
      category,
      location,
      contextTitle: kind === "education" ? category : `${location} video context`,
      contextMeta:
        kind === "opportunity"
          ? `₹${[18, 24, 36, 52][index % 4]}L documented benefit · Independently reviewed`
          : kind === "education"
            ? `${2 + (index % 5)} key ideas · Video learning series`
            : `${["2 & 3 BHK", "3 BHK", "4 BHK", "2,400 sq ft"][index % 4]} · Updated today`,
      engagement: `${1.2 + index * 0.4}K`,
      verified,
    };
  });
}
