import { useIsMobile } from "../../lib/viewport";
import { page, type ProjectDetailProps } from "./data";
import { DesktopProjectDetail } from "./desktop";
import { MobileProjectDetail } from "./mobile";

export { page };
export type { ProjectDetailProps };

export default function ProjectDetail(props: ProjectDetailProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileProjectDetail {...props} /> : <DesktopProjectDetail {...props} />;
}
