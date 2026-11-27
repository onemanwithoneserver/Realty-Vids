import { useIsMobile } from "../../lib/viewport";
import type { InlineVideoStageProps } from "./data";
import { DesktopVideoStage } from "./desktop";
import { MobileVideoStage } from "./mobile";

export type { InlineVideoStageProps };

export function InlineExpandedPlayer(props: InlineVideoStageProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileVideoStage {...props} /> : <DesktopVideoStage {...props} />;
}
