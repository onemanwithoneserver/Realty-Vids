import { useIsMobile } from "../../lib/viewport";
import { page, type PrimaryResultsProps } from "./data";
import { DesktopPrimaryMarket } from "./desktop";
import { MobilePrimaryMarket } from "./mobile";

export { page };
export type { PrimaryResultsProps };

export default function PrimaryResults(props: PrimaryResultsProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobilePrimaryMarket {...props} /> : <DesktopPrimaryMarket {...props} />;
}
