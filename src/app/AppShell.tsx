import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "../components/common";
import { AppBottomChrome, AppSideChrome, AppTopChrome } from "../components/navigation";
import PreviewBar from "../components/preview-bar";
import { ActionSheet } from "../components/sheets";
import { InlineExpandedPlayer } from "../components/video-stage";
import type {
  AppTheme,
  Section,
  SelectedVideo,
  Sheet,
  VideoFormat,
  VideoKind,
  View,
  ViewMode,
} from "../lib/types";
import { ViewportProvider, useViewport } from "../lib/viewport";
import { isSection, pageRoutes, PATH_VIEWS, VIEW_PATHS } from "./routes";

const VideoFeedHome = lazy(() => import("../features/feed"));
const VideoDiscoverHome = lazy(() => import("../features/discover"));
const VideoOpportunitiesHome = lazy(() => import("../features/opportunities"));
const VideoInsightsHome = lazy(() => import("../features/insights"));
const MyLists = lazy(() => import("../features/saved-lists"));
const SearchPage = lazy(() => import("../features/search"));
const PrimaryResults = lazy(() => import("../features/primary-market"));
const SecondaryResults = lazy(() => import("../features/secondary-market"));
const ProjectDetail = lazy(() => import("../features/project-detail"));
const PropertyDetail = lazy(() => import("../features/property-detail"));
const OpportunityDetail = lazy(() => import("../features/opportunity-detail"));
const ExpertProfile = lazy(() => import("../features/expert-profile"));

function ShellLayout({
  theme,
  viewMode,
  headerVisible,
  setHeaderVisible,
  onLocationApplied,
}: {
  theme: AppTheme;
  viewMode: ViewMode;
  headerVisible: boolean;
  setHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onLocationApplied: (city: string, radius: number) => void;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile, isPreviewFrame, locationLabel, radiusKm, onShareFeedback } = useViewport();
  const reduceMotion = useReducedMotion();

  const routePath =
    location.pathname.replace(/^\/(?:light|dark)\/(?:desktop|mobile)(?=\/|$)/, "") || "/discover";
  const routeSection = routePath.slice(1);
  const previousSection = (location.state as { active?: unknown } | null)?.active;
  const active: Section = isSection(routeSection)
    ? routeSection
    : isSection(previousSection)
      ? previousSection
      : "discover";
  const view: View = PATH_VIEWS[routePath] ?? null;

  const [saved, setSaved] = useState<Set<string>>(() => new Set(["short02"]));
  const [inlineVideo, setInlineVideo] = useState<{
    kind: VideoKind;
    format: VideoFormat;
    selected?: SelectedVideo;
  } | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const browsingScroll = useRef(0);
  const inlinePlayerRef = useRef<HTMLDivElement>(null);

  const setView = useCallback(
    (destination: View) => {
      if (!destination) {
        navigate(`/${theme}/${viewMode}/${active}`);
        return;
      }
      navigate(`/${theme}/${viewMode}${VIEW_PATHS[destination]}`, { state: { active } });
    },
    [active, navigate, theme, viewMode],
  );

  const openSection = (section: Section) => {
    setInlineVideo(null);
    navigate(`/${theme}/${viewMode}/${section}`);
  };

  const openVideo = (
    kind: VideoKind,
    format: VideoFormat = "landscape",
    selected?: SelectedVideo,
  ) => {
    browsingScroll.current = window.scrollY;
    setInlineVideo({ kind, format, selected });
    window.requestAnimationFrame(() =>
      inlinePlayerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const closeInlineVideo = () => {
    setInlineVideo(null);
    window.requestAnimationFrame(() => window.scrollTo({ top: browsingScroll.current }));
  };

  const openInlineDetail = (destination: "project" | "property" | "expert") => {
    setInlineVideo(null);
    setView(destination);
  };

  const handleSheetSuccess = (
    message: string,
    locationUpdate?: { city: string; radius: number },
  ) => {
    const completedSheet = sheet;
    setSheet(null);
    if (locationUpdate) {
      onLocationApplied(locationUpdate.city, locationUpdate.radius);
    }
    if (
      (completedSheet === "location" || completedSheet === "filters") &&
      view !== "primary-results" &&
      view !== "secondary-results"
    ) {
      setView("primary-results");
    }
    onShareFeedback(message);
  };

  const toggle = (id: string) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [active, view]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setView("search");
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setHeaderVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [setHeaderVisible, setView]);

  const navProps = {
    active,
    currentView: view,
    savedCount: saved.size,
    headerVisible,
    onSelectSection: openSection,
    onOpenLists: () => setView("lists"),
    onOpenSearch: () => setView("search"),
    onOpenLocation: () => setSheet("location"),
    onNotify: () => onShareFeedback("2 new verified films in Worli & Alibaug."),
  };

  const mainRoutes = (
    <AnimatePresence mode="wait" initial={false}>
      <m.main
        key={location.pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        className="flex-1 min-w-0"
      >
        <Suspense
          fallback={
            <div className="p-8 space-y-4" aria-label="Loading view">
              <div className="h-12 w-56 rv-skeleton" />
              <div className="h-80 w-full rv-skeleton" />
            </div>
          }
        >
          {inlineVideo && (
            <div ref={inlinePlayerRef}>
              <InlineExpandedPlayer
                kind={inlineVideo.kind}
                format={inlineVideo.format}
                selected={inlineVideo.selected}
                saved={saved}
                toggle={toggle}
                onClose={closeInlineVideo}
                onProject={() => openInlineDetail("project")}
                onProperty={() => openInlineDetail("property")}
                onExpert={() => openInlineDetail("expert")}
                onEnquire={() => setSheet("enquiry")}
                onSelectRelated={(kind) => setInlineVideo({ kind, format: "landscape" })}
              />
            </div>
          )}

          {view === "lists" && (
            <MyLists
              saved={saved}
              onBack={() => setView(null)}
              onCreate={() => setSheet("list")}
              onProject={() => setView("project")}
              onVideo={() => openVideo("project")}
            />
          )}
          {view === "search" && (
            <SearchPage
              onBack={() => setView(null)}
              onProject={() => setView("project")}
              onProperty={() => setView("property")}
              onLocation={() => setSheet("location")}
            />
          )}
          {view === "primary-results" && (
            <PrimaryResults
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onProject={() => setView("project")}
              onVideo={() => openVideo("project")}
              onFilters={() => setSheet("filters")}
            />
          )}
          {view === "secondary-results" && (
            <SecondaryResults
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onProperty={() => setView("property")}
              onVideo={() => openVideo("property")}
              onFilters={() => setSheet("filters")}
            />
          )}
          {view === "project" && (
            <ProjectDetail
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onVideo={() => openVideo("project")}
              onEnquire={() => setSheet("enquiry")}
            />
          )}
          {view === "property" && (
            <PropertyDetail
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onVideo={() => openVideo("property")}
              onEnquire={() => setSheet("enquiry")}
            />
          )}
          {view === "opportunity" && (
            <OpportunityDetail
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onEnquire={() => setSheet("enquiry")}
            />
          )}
          {view === "expert" && (
            <ExpertProfile
              saved={saved}
              toggle={toggle}
              onBack={() => setView(null)}
              onVideo={() => openVideo("education")}
              onConsult={() => setSheet("enquiry")}
            />
          )}
          {!view && active === "feed" && (
            <VideoFeedHome
              saved={saved}
              toggle={toggle}
              onVideo={openVideo}
              onProject={() => setView("project")}
              onCreateFeed={() => setSheet("feed")}
              previewPaused={Boolean(inlineVideo)}
            />
          )}
          {!view && active === "discover" && (
            <VideoDiscoverHome
              saved={saved}
              toggle={toggle}
              onVideo={openVideo}
              onProject={() => setView("project")}
              onProperty={() => setView("property")}
              onSearch={() => setView("search")}
              onLocation={() => setSheet("location")}
              onPrimary={() => setView("primary-results")}
              onSecondary={() => setView("secondary-results")}
              onEnquire={() => setSheet("enquiry")}
              previewPaused={Boolean(inlineVideo)}
            />
          )}
          {!view && active === "opportunities" && (
            <VideoOpportunitiesHome
              saved={saved}
              toggle={toggle}
              onVideo={openVideo}
              onOpportunity={() => setView("opportunity")}
              onEnquire={() => setSheet("enquiry")}
              previewPaused={Boolean(inlineVideo)}
            />
          )}
          {!view && active === "insights" && (
            <VideoInsightsHome
              saved={saved}
              toggle={toggle}
              onVideo={openVideo}
              onExpert={() => setView("expert")}
              previewPaused={Boolean(inlineVideo)}
            />
          )}
        </Suspense>
      </m.main>
    </AnimatePresence>
  );

  return (
    <>
      <AnimatePresence initial={false}>
        {headerVisible && (
          <PreviewBar
            key="preview-bar"
            viewMode={viewMode}
            theme={theme}
            routes={pageRoutes}
            onViewModeChange={(nextMode) =>
              navigate(`/${theme}/${nextMode}${routePath}`, { state: { active } })
            }
            onThemeChange={(nextTheme) =>
              navigate(`/${nextTheme}/${viewMode}${routePath}`, { state: { active } })
            }
            view={routePath}
            onViewChange={(path) => navigate(`/${theme}/${viewMode}${path}`, { state: { active } })}
            onClose={() => setHeaderVisible(false)}
          />
        )}
      </AnimatePresence>

      {!headerVisible && (
        <button
          type="button"
          onClick={() => setHeaderVisible(true)}
          title="Show Studio Bar (Ctrl+M)"
          className="fixed bottom-5 right-5 z-[100] h-9 px-3.5 rounded-full ios-glass-heavy border border-[var(--border-strong)] shadow-lg text-[12px] font-bold text-[var(--text-primary)] inline-flex items-center gap-1.5"
        >
          <Icon name="spark" size={16} className="text-[var(--accent)]" />
          <span>Studio Bar</span>
        </button>
      )}

      {isPreviewFrame ? (
        <div className="rv-device-stage">
          <AppTopChrome {...navProps} />
          {mainRoutes}
          <AppBottomChrome active={active} currentView={view} onSelectSection={openSection} />
        </div>
      ) : isMobile ? (
        <div className="min-h-screen flex flex-col">
          <AppTopChrome {...navProps} />
          {mainRoutes}
          <AppBottomChrome active={active} currentView={view} onSelectSection={openSection} />
        </div>
      ) : (
        <div className="rv-desktop-workspace">
          <AppSideChrome {...navProps} />
          <div className="rv-desktop-main">
            <AppTopChrome {...navProps} />
            {mainRoutes}
          </div>
        </div>
      )}

      <AnimatePresence>
        {sheet && (
          <ActionSheet
            key={sheet}
            type={sheet}
            initialCity={locationLabel}
            initialRadius={radiusKm}
            close={() => setSheet(null)}
            onSuccess={handleSheetSuccess}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function AppShell({ theme, viewMode }: { theme: AppTheme; viewMode: ViewMode }) {
  const [headerVisible, setHeaderVisible] = useState(true);
  const [locationLabel, setLocationLabel] = useState("Mumbai");
  const [radiusKm, setRadiusKm] = useState(25);
  const [toast, setToast] = useState("");
  const toastTimerRef = useRef<number | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(""), 3200);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <ViewportProvider
        viewMode={viewMode}
        theme={theme}
        headerVisible={headerVisible}
        locationLabel={locationLabel}
        radiusKm={radiusKm}
        onShareFeedback={showToast}
      >
        <ShellOuter
          theme={theme}
          viewMode={viewMode}
          headerVisible={headerVisible}
          setHeaderVisible={setHeaderVisible}
          toast={toast}
          onLocationApplied={(city, radius) => {
            setLocationLabel(city);
            setRadiusKm(radius);
          }}
        />
      </ViewportProvider>
    </LazyMotion>
  );
}

function ShellOuter({
  theme,
  viewMode,
  headerVisible,
  setHeaderVisible,
  toast,
  onLocationApplied,
}: {
  theme: AppTheme;
  viewMode: ViewMode;
  headerVisible: boolean;
  setHeaderVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toast: string;
  onLocationApplied: (city: string, radius: number) => void;
}) {
  const { isPreviewFrame } = useViewport();

  return (
    <div
      data-theme={theme}
      className={`rv-shell ${isPreviewFrame ? "is-preview-backdrop" : ""} ${
        !headerVisible ? "header-hidden" : ""
      }`}
    >
      <ShellLayout
        theme={theme}
        viewMode={viewMode}
        headerVisible={headerVisible}
        setHeaderVisible={setHeaderVisible}
        onLocationApplied={onLocationApplied}
      />

      <AnimatePresence>
        {toast && (
          <m.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 460, damping: 32 }}
            role="status"
            className="fixed bottom-24 lg:bottom-7 left-1/2 -translate-x-1/2 z-[150] px-5 py-3 rounded-full bg-[#16161d] text-white border border-white/15 shadow-2xl inline-flex items-center gap-2.5 text-[13px] font-semibold whitespace-nowrap max-w-[92vw]"
          >
            <Icon name="checkCircle" size={19} className="text-[#30d158] shrink-0" />
            <span className="truncate">{toast}</span>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
