import type { AppTheme } from "./types";

export function publicAsset(path: string): string {
  return `${import.meta.env.BASE_URL}${encodeURI(path.replace(/^\/+/, ""))}`;
}

export const IMAGES = {
  tower: publicAsset("media/tower.jpg"),
  city: publicAsset("media/city.jpg"),
  pool: publicAsset("media/pool.jpg"),
  interior: publicAsset("media/interior.jpg"),
  lounge: publicAsset("media/lounge.jpg"),
  skyline: publicAsset("media/skyline.jpg"),
  aerial: publicAsset("media/aerial.jpg"),
  discover01: publicAsset("media/discover-01.jpg"),
  discover02: publicAsset("media/discover-02.jpg"),
  discover03: publicAsset("media/discover-03.jpg"),
  discover04: publicAsset("media/discover-04.jpg"),
  discover05: publicAsset("media/discover-05.jpg"),
  discover06: publicAsset("media/discover-06.jpg"),
  discover07: publicAsset("media/discover-07.jpg"),
  discover08: publicAsset("media/discover-08.jpg"),
  discover09: publicAsset("media/discover-09.jpg"),
  discover10: publicAsset("media/discover-10.jpg"),
  discover11: publicAsset("media/discover-11.jpg"),
  discover12: publicAsset("media/discover-12.jpg"),
  discover13: publicAsset("media/discover-13.jpg"),
} as const;

export const VIDEOS = {
  preview: publicAsset("media/realty-preview.webm"),
  feedBanner: publicAsset("media/banner-feed.webm"),
  discoverPrimary: publicAsset("media/banner-discover-primary.webm"),
  discoverSecondary: publicAsset("media/banner-discover-secondary.webm"),
  opportunitiesBanner: publicAsset("media/banner-opportunities.webm"),
  insightsBanner: publicAsset("media/banner-insights.webm"),
} as const;

const LOGO_SVG_DIR = "media/Realty Vids Logo Files/SVG";

export const BRAND_ASSETS = {
  light: {
    logo: publicAsset(`${LOGO_SVG_DIR}/Primary Logo.svg`),
    symbol: publicAsset(`${LOGO_SVG_DIR}/Primary Symbol.svg`),
  },
  dark: {
    logo: publicAsset(`${LOGO_SVG_DIR}/Black BG White Logo.svg`),
    accentLogo: publicAsset(`${LOGO_SVG_DIR}/Black BG Red Logo.svg`),
    symbol: publicAsset(`${LOGO_SVG_DIR}/White Symbol.svg`),
  },
} as const;

export function getThemeBrandAssets(theme: AppTheme) {
  return BRAND_ASSETS[theme];
}

export const GALLERY_POOL: readonly string[] = [
  IMAGES.discover01,
  IMAGES.discover02,
  IMAGES.discover03,
  IMAGES.discover04,
  IMAGES.discover05,
  IMAGES.discover06,
  IMAGES.discover07,
  IMAGES.discover08,
  IMAGES.discover09,
  IMAGES.discover10,
  IMAGES.discover11,
  IMAGES.discover12,
  IMAGES.discover13,
  IMAGES.tower,
  IMAGES.city,
  IMAGES.pool,
  IMAGES.interior,
  IMAGES.lounge,
  IMAGES.skyline,
  IMAGES.aerial,
];
