import { useIsMobile } from "../../lib/viewport";
import { PRIMARY_NAV, USER_PROFILE, type NavigationProps } from "./data";
import { DesktopSidebar, DesktopTopbar } from "./desktop";
import { MobileTabBar, MobileTopBar } from "./mobile";

export { PRIMARY_NAV, USER_PROFILE };
export type { NavigationProps };

export function AppTopChrome(props: NavigationProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileTopBar {...props} /> : <DesktopTopbar {...props} />;
}

export function AppSideChrome(props: NavigationProps) {
  const isMobile = useIsMobile();
  if (isMobile) return null;
  return <DesktopSidebar {...props} />;
}

export function AppBottomChrome(
  props: Pick<NavigationProps, "active" | "currentView" | "onSelectSection">,
) {
  const isMobile = useIsMobile();
  if (!isMobile) return null;
  return <MobileTabBar {...props} />;
}
