import { useEffect, useState } from "react";
import type { PreviewBarProps } from "./data";
import { DesktopPreviewBar } from "./desktop";
import { MobilePreviewBar } from "./mobile";

export type { PreviewBarProps };

export default function PreviewBar(props: PreviewBarProps) {
  const [compactWindow, setCompactWindow] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 760 : false,
  );

  useEffect(() => {
    const q = window.matchMedia("(max-width: 759px)");
    const update = () => setCompactWindow(q.matches);
    update();
    q.addEventListener("change", update);
    return () => q.removeEventListener("change", update);
  }, []);

  return compactWindow ? <MobilePreviewBar {...props} /> : <DesktopPreviewBar {...props} />;
}
