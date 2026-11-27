import { useIsMobile } from "../../lib/viewport";
import { page, type PropertyDetailProps } from "./data";
import { DesktopPropertyDetail } from "./desktop";
import { MobilePropertyDetail } from "./mobile";

export { page };
export type { PropertyDetailProps };

export default function PropertyDetail(props: PropertyDetailProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePropertyDetail {...props} /> : <DesktopPropertyDetail {...props} />;
}
