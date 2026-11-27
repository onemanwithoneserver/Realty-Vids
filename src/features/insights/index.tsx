import { useIsMobile } from "../../lib/viewport";
import { page, type InsightsProps } from "./data";
import { DesktopInsights } from "./desktop";
import { MobileInsights } from "./mobile";

export { page };
export type { InsightsProps };

export default function VideoInsightsHome(props: InsightsProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileInsights {...props} /> : <DesktopInsights {...props} />;
}
