import { useIsMobile } from "../../lib/viewport";
import type {
  FeaturedBannerProps,
  ResultsToolbarProps,
  VerticalFeedProps,
  VideoCardProps,
} from "./data";
import {
  BrandLogo,
  DesktopDetailHeader,
  DesktopFeaturedBanner,
  DesktopResultsToolbar,
  DesktopVerticalFeed,
  DesktopVideoCard,
  PlayOrb,
  SharedIcon,
} from "./desktop";
import {
  HorizontalScrollRail,
  MobileDetailHeader,
  MobileFeaturedBanner,
  MobileResultsToolbar,
  MobileVerticalFeed,
  MobileVideoCard,
} from "./mobile";

export { BrandLogo as Brand, HorizontalScrollRail, PlayOrb as PlayButton, SharedIcon as Icon };
export type { FeaturedBannerProps, ResultsToolbarProps, VerticalFeedProps, VideoCardProps };

export function DetailHeader(props: { label: string; onBack: () => void }) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDetailHeader {...props} /> : <DesktopDetailHeader {...props} />;
}

export function FeaturedVideoBanner(props: FeaturedBannerProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFeaturedBanner {...props} /> : <DesktopFeaturedBanner {...props} />;
}

export function VideoRailCard(props: VideoCardProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileVideoCard {...props} /> : <DesktopVideoCard {...props} />;
}

export function VerticalVideoFeed(props: VerticalFeedProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileVerticalFeed {...props} /> : <DesktopVerticalFeed {...props} />;
}

export function ResultsHeader(props: ResultsToolbarProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileResultsToolbar {...props} /> : <DesktopResultsToolbar {...props} />;
}
