import { useIsMobile } from "../../lib/viewport";
import { page, type SecondaryResultsProps } from "./data";
import { DesktopSecondaryMarket } from "./desktop";
import { MobileSecondaryMarket } from "./mobile";

export { page };
export type { SecondaryResultsProps };

export default function SecondaryResults(props: SecondaryResultsProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSecondaryMarket {...props} /> : <DesktopSecondaryMarket {...props} />;
}
