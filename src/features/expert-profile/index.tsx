import { useIsMobile } from "../../lib/viewport";
import { page, type ExpertProfileProps } from "./data";
import { DesktopExpertProfile } from "./desktop";
import { MobileExpertProfile } from "./mobile";

export { page };
export type { ExpertProfileProps };

export default function ExpertProfile(props: ExpertProfileProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileExpertProfile {...props} /> : <DesktopExpertProfile {...props} />;
}
