import { useIsMobile } from "../../lib/viewport";
import { page, type SearchPageProps } from "./data";
import { DesktopSearch } from "./desktop";
import { MobileSearch } from "./mobile";

export { page };
export type { SearchPageProps };

export default function SearchPage(props: SearchPageProps) {
  const isMobile = useIsMobile();
  return isMobile ? <MobileSearch {...props} /> : <DesktopSearch {...props} />;
}
