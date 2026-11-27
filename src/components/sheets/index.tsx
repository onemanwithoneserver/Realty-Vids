import { useIsMobile } from "../../lib/viewport";
import type { ActionSheetProps } from "./data";
import { DesktopActionSheet } from "./desktop";
import { MobileActionSheet } from "./mobile";

export type { ActionSheetProps };

export function ActionSheet(props: ActionSheetProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileActionSheet {...props} /> : <DesktopActionSheet {...props} />;
}
