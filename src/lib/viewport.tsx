import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AppTheme, ViewMode } from "./types";

interface ViewportContextValue {
  viewMode: ViewMode;
  theme: AppTheme;
  isMobile: boolean;
  isPreviewFrame: boolean;
  headerVisible: boolean;
  locationLabel: string;
  radiusKm: number;
  onShareFeedback: (message: string) => void;
}

const ViewportContext = createContext<ViewportContextValue>({
  viewMode: "desktop",
  theme: "light",
  isMobile: false,
  isPreviewFrame: false,
  headerVisible: true,
  locationLabel: "Mumbai",
  radiusKm: 25,
  onShareFeedback: () => {},
});

export function ViewportProvider({
  viewMode,
  theme,
  headerVisible,
  locationLabel,
  radiusKm,
  onShareFeedback,
  children,
}: {
  viewMode: ViewMode;
  theme: AppTheme;
  headerVisible: boolean;
  locationLabel: string;
  radiusKm: number;
  onShareFeedback: (message: string) => void;
  children: ReactNode;
}) {
  const [narrowScreen, setNarrowScreen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 920 : false,
  );

  useEffect(() => {
    const query = window.matchMedia("(max-width: 919px)");
    const update = () => setNarrowScreen(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const isMobile = viewMode === "mobile" || narrowScreen;
  const isPreviewFrame = viewMode === "mobile" && !narrowScreen;

  return (
    <ViewportContext.Provider
      value={{
        viewMode,
        theme,
        isMobile,
        isPreviewFrame,
        headerVisible,
        locationLabel,
        radiusKm,
        onShareFeedback,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
}

export function useViewport() {
  return useContext(ViewportContext);
}

export function useIsMobile(): boolean {
  return useContext(ViewportContext).isMobile;
}
