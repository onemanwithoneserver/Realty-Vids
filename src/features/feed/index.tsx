import { useIsMobile } from "../../lib/viewport";
import { page, type FeedProps } from "./data";
import { DesktopFeed } from "./desktop";
import { MobileFeed } from "./mobile";

export { page };
export type { FeedProps };

export default function VideoFeedHome(props: FeedProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileFeed {...props} /> : <DesktopFeed {...props} />;
}
