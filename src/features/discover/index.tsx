import { useIsMobile } from "../../lib/viewport";
import { discoverVideoRails, page, type DiscoverProps } from "./data";
import { DesktopDiscover } from "./desktop";
import { MobileDiscover } from "./mobile";

export { discoverVideoRails, page };
export type { DiscoverProps };

export default function VideoDiscoverHome(props: DiscoverProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileDiscover {...props} /> : <DesktopDiscover {...props} />;
}
