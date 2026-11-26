import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, domAnimation, LazyMotion, m, useReducedMotion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import Header, { type AppTheme, type ViewMode } from "./Top Header/Header";
import {
  Section,
  View,
  Sheet,
  VideoKind,
  VideoFormat,
  SelectedVideo,
  Icon,
  Sidebar,
  Topbar,
  BottomNav,
  SearchOverlay,
  InlineExpandedPlayer,
  ActionSheet,
} from "./AppShared";

const VideoFeedHome = lazy(() => import("./pages/feed"));
const VideoDiscoverHome = lazy(() => import("./pages/discover"));
const VideoOpportunitiesHome = lazy(() => import("./pages/opportunities"));
const VideoInsightsHome = lazy(() => import("./pages/insights"));
const MyLists = lazy(() => import("./pages/lists"));
const SearchPage = lazy(() => import("./pages/search"));
const PrimaryResults = lazy(() => import("./pages/primary-results"));
const SecondaryResults = lazy(() => import("./pages/secondary-results"));
const ProjectDetail = lazy(() => import("./pages/project"));
const PropertyDetail = lazy(() => import("./pages/property"));
const OpportunityDetail = lazy(() => import("./pages/opportunity"));
const ExpertProfile = lazy(() => import("./pages/expert"));

const viewPaths: Record<Exclude<View, null>, string> = {
  lists: "/lists",
  search: "/search",
  "primary-results": "/primary-results",
  "secondary-results": "/secondary-results",
  project: "/project",
  property: "/property",
  opportunity: "/opportunity",
  expert: "/expert",
};

const pathViews: Record<string, Exclude<View, null>> = Object.fromEntries(
  Object.entries(viewPaths).map(([view, path]) => [path, view]),
) as Record<string, Exclude<View, null>>;

const sections = ["feed", "discover", "opportunities", "insights"] as const;

function isSection(value: unknown): value is Section {
  return typeof value === "string" && sections.includes(value as Section);
}

export default function App({ theme, viewMode }: { theme: AppTheme; viewMode: ViewMode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const routePath =
    location.pathname.replace(/^\/(?:light|dark)\/(?:desktop|mobile)(?=\/|$)/, "") ||
    "/discover";
  const routeSection = routePath.slice(1);
  const previousSection = (location.state as { active?: unknown } | null)?.active;
  const active = isSection(routeSection)
    ? routeSection
    : isSection(previousSection)
      ? previousSection
      : "discover";
  const view = pathViews[routePath] ?? null;
  const [saved, setSaved] = useState<Set<string>>(new Set(["short02"]));
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [inlineVideo, setInlineVideo] = useState<{
    kind: VideoKind;
    format: VideoFormat;
    selected?: SelectedVideo;
  } | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [toast, setToast] = useState("");
  const browsingScroll = useRef(0);
  const inlinePlayerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const setView = (destination: View) => {
    if (!destination) {
      navigate(`/${theme}/${viewMode}/${active}`);
      return;
    }
    navigate(`/${theme}/${viewMode}${viewPaths[destination]}`, { state: { active } });
  };
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
  const showToast = (message: string) => {
    const completedSheet = sheet;
    setSheet(null);
    if (
      (completedSheet === "location" || completedSheet === "filters") &&
      view !== "primary-results" &&
      view !== "secondary-results"
    ) {
      setView("primary-results");
    }
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };
  const toggle = (id: string) => {
    setSaved((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
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
        setHeaderVisible((visible) => !visible);
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [active, navigate]);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`app-shell theme-${theme} ${viewMode === "mobile" ? "mobile-preview" : ""}`}
        data-theme={theme}
      >
        <AnimatePresence initial={false}>
          {headerVisible && (
            <Header
              key="app-header"
              viewMode={viewMode}
              theme={theme}
              onViewModeChange={(nextMode) =>
                navigate(`/${theme}/${nextMode}${routePath}`, { state: { active } })
              }
              onThemeChange={(nextTheme) =>
                navigate(`/${nextTheme}/${viewMode}${routePath}`, { state: { active } })
              }
              view={routePath}
              onViewChange={(path) =>
                navigate(`/${theme}/${viewMode}${path}`, { state: { active } })
              }
              onClose={() => setHeaderVisible(false)}
            />
          )}
        </AnimatePresence>
        <Sidebar
          active={active}
          setActive={openSection}
          currentView={view}
          onLists={() => setView("lists")}
        />
        <div className="main-shell">
          <Topbar
            onSearch={() => setView("search")}
            onLocation={() => setSheet("location")}
            onLists={() => setView("lists")}
          />
          <AnimatePresence mode="wait" initial={false}>
            <m.main
              key={location.pathname}
              className="route-transition"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
            >
              <Suspense fallback={<div className="route-loading" aria-label="Loading view" />}>
                {inlineVideo && (
                  <div className="inline-player-anchor" ref={inlinePlayerRef}>
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
        </div>
        <BottomNav active={active} setActive={openSection} />
        {searchOpen && (
          <SearchOverlay
            close={() => setSearchOpen(false)}
            onProject={() => setView("project")}
            onProperty={() => setView("property")}
            onLocation={() => setSheet("location")}
          />
        )}
        {sheet && <ActionSheet type={sheet} close={() => setSheet(null)} onSuccess={showToast} />}
        {toast && (
          <div className="toast">
            <Icon name="check" size={18} />
            {toast}
          </div>
        )}
      </div>
    </LazyMotion>
  );
}
