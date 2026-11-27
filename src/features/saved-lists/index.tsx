import { useIsMobile } from "../../lib/viewport";
import { page, type SavedListsProps } from "./data";
import { DesktopSavedLists } from "./desktop";
import { MobileSavedLists } from "./mobile";

export { page };
export type { SavedListsProps };

export default function MyLists(props: SavedListsProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSavedLists {...props} /> : <DesktopSavedLists {...props} />;
}
