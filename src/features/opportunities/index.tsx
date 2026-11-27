import { useIsMobile } from "../../lib/viewport";
import { page, type OpportunitiesProps } from "./data";
import { DesktopOpportunities } from "./desktop";
import { MobileOpportunities } from "./mobile";

export { page };
export type { OpportunitiesProps };

export default function VideoOpportunitiesHome(props: OpportunitiesProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileOpportunities {...props} /> : <DesktopOpportunities {...props} />;
}
