import { useIsMobile } from "../../lib/viewport";
import { page, type OpportunityDetailProps } from "./data";
import { DesktopOpportunityDetail } from "./desktop";
import { MobileOpportunityDetail } from "./mobile";

export { page };
export type { OpportunityDetailProps };

export default function OpportunityDetail(props: OpportunityDetailProps) {
  const isMobile = useIsMobile();
  return isMobile ? (
    <MobileOpportunityDetail {...props} />
  ) : (
    <DesktopOpportunityDetail {...props} />
  );
}
