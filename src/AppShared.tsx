import { useEffect, useMemo, useRef, useState } from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import CheckIcon from "@mui/icons-material/Check";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import CloseIcon from "@mui/icons-material/Close";

import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";

import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";

import SearchIcon from "@mui/icons-material/Search";

import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import TuneIcon from "@mui/icons-material/Tune";
import { publicAsset } from "./publicAsset";

export type Section = "feed" | "discover" | "opportunities" | "insights";

export type View =
  | "lists"
  | "search"
  | "primary-results"
  | "secondary-results"
  | "project"
  | "property"
  | "opportunity"
  | "expert"
  | null;

export type Sheet = "location" | "filters" | "feed" | "list" | "enquiry" | null;

export type VideoKind = "project" | "property" | "opportunity" | "education";

export type VideoFormat = "landscape" | "portrait";

export type SelectedVideo = {
  title: string;
  creator: string;
  creatorMeta: string;
  poster: string;
  eyebrow: string;
  videoSrc?: string;
};

export const IMAGES = {
  tower: publicAsset("media/tower.jpg"),
  city: publicAsset("media/city.jpg"),
  pool: publicAsset("media/pool.jpg"),
  interior: publicAsset("media/interior.jpg"),
  lounge: publicAsset("media/lounge.jpg"),
  skyline: publicAsset("media/skyline.jpg"),
  aerial: publicAsset("media/aerial.jpg"),
};

export const streamVideos = [
  [
    IMAGES.tower,
    "Aurelia: a new perspective on Worli",
    "Realty Vids Studios",
    "Aurelia Residences · Worli",
    "06:24",
    "PROJECT FILM",
  ],
  [
    IMAGES.pool,
    "A slower way of living by the coast",
    "Mira Shah",
    "The Reserve · Alibaug",
    "04:42",
    "WALKTHROUGH",
  ],
  [
    IMAGES.interior,
    "A home designed around morning light",
    "Studio Ardete",
    "Maison 77 · Bandra West",
    "03:18",
    "DESIGN STORY",
  ],
  [
    IMAGES.city,
    "What Mumbai’s next corridor gets right",
    "Rhea Mehta",
    "Market perspective · Mumbai",
    "08:06",
    "MARKET",
  ],
] as const;

export const sectionMeta: Record<Section, { label: string; eyebrow: string; title: string }> = {
  feed: {
    label: "My Feed",
    eyebrow: "CURATED FOR YOU",
    title: "A smarter view of\nwhat’s next.",
  },
  discover: {
    label: "Discover",
    eyebrow: "DISCOVER MUMBAI",
    title: "Find a place that\nmoves you.",
  },
  opportunities: {
    label: "Opportunities",
    eyebrow: "CURATED ADVANTAGES",
    title: "More value in\nevery move.",
  },
  insights: {
    label: "Insights",
    eyebrow: "WATCH · LEARN · DECIDE",
    title: "Know the market,\nnot just the listings.",
  },
};

export const iconComponents = {
  home: HomeOutlinedIcon,
  compass: ExploreOutlinedIcon,
  spark: AutoAwesomeIcon,
  play: PlayCircleOutlinedIcon,
  list: FormatListBulletedIcon,
  bell: NotificationsNoneIcon,
  user: PersonOutlinedIcon,
  search: SearchIcon,
  pin: PlaceOutlinedIcon,
  bookmark: BookmarkBorderIcon,
  share: ShareOutlinedIcon,
  heart: FavoriteBorderIcon,
  arrow: ArrowForwardIcon,
  chevron: ChevronRightIcon,
  tune: TuneIcon,
  close: CloseIcon,
  check: CheckIcon,
  clock: AccessTimeIcon,
};

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const IconComponent = iconComponents[name as keyof typeof iconComponents];
  if (!IconComponent) return null;
  return <IconComponent sx={{ fontSize: size }} aria-hidden="true" />;
}

export function Brand({ compact = false, dark = false }: { compact?: boolean; dark?: boolean }) {
  return (
    <div className={`brand ${compact ? "brand-compact" : ""}`}>
      <img
        src={
          compact
            ? publicAsset("brand/realty-vids-symbol.svg")
            : dark
              ? publicAsset("brand/realty-vids-logo-dark.svg")
              : publicAsset("brand/realty-vids-logo.svg")
        }
        alt="Realty Vids"
      />
    </div>
  );
}

export const nav: { id: Section; icon: string; label: string }[] = [
  { id: "feed", icon: "home", label: "My Feed" },
  { id: "discover", icon: "compass", label: "Discover" },
  { id: "opportunities", icon: "spark", label: "Opportunities" },
  { id: "insights", icon: "play", label: "Insights" },
];

export function Sidebar({
  active,
  setActive,
  currentView,
  onLists,
}: {
  active: Section;
  setActive: (s: Section) => void;
  currentView: View;
  onLists: () => void;
}) {
  return (
    <aside className="sidebar">
      <Brand dark />
      <nav className="side-nav" aria-label="Primary">
        <span className="nav-label">EXPLORE</span>
        {nav.map((item) => (
          <button
            key={item.id}
            className={active === item.id ? "active" : ""}
            onClick={() => setActive(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
        <span className="nav-label nav-label-space">YOUR SPACE</span>
        <button className={currentView === "lists" ? "active" : ""} onClick={onLists}>
          <Icon name="list" />
          <span>My Lists</span>
          <b>8</b>
        </button>
        <button>
          <Icon name="bell" />
          <span>Notifications</span>
          <i />
        </button>
      </nav>
      <div className="side-profile">
        <div className="avatar">AK</div>
        <div>
          <strong>Arjun Kapoor</strong>
          <span>Buyer · Mumbai</span>
        </div>
        <Icon name="chevron" size={16} />
      </div>
    </aside>
  );
}

export function Topbar({
  onSearch,
  onLocation,
  onLists,
}: {
  onSearch: () => void;
  onLocation: () => void;
  onLists: () => void;
}) {
  return (
    <header className="topbar">
      <Brand />
      <button className="location" onClick={onLocation}>
        <Icon name="pin" size={17} />
        <span>Mumbai</span>
        <small>Within 25 km</small>
      </button>
      <button className="search-trigger" onClick={onSearch}>
        <Icon name="search" />
        <span>Search projects, localities or experts</span>
        <kbd>⌘ K</kbd>
      </button>
      <button className="icon-button notification" aria-label="Notifications">
        <Icon name="bell" />
      </button>
      <button className="icon-button mobile-lists" aria-label="Open My Lists" onClick={onLists}>
        <Icon name="list" />
      </button>
      <div className="avatar">AK</div>
    </header>
  );
}

export function BottomNav({
  active,
  setActive,
}: {
  active: Section;
  setActive: (s: Section) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      {nav.map((item) => (
        <button
          key={item.id}
          className={active === item.id ? "active" : ""}
          onClick={() => setActive(item.id)}
        >
          <Icon name={item.icon} size={21} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export function PlayButton({ small = false }: { small?: boolean }) {
  return (
    <span className={`play-button ${small ? "small" : ""}`}>
      <span />
    </span>
  );
}

export function SaveButton({
  id,
  saved,
  toggle,
}: {
  id: string;
  saved: Set<string>;
  toggle: (id: string) => void;
}) {
  const active = saved.has(id);
  return (
    <button
      className={`save-button ${active ? "saved" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        toggle(id);
      }}
      aria-label={active ? "Remove from saved" : "Save"}
    >
      <Icon name={active ? "check" : "bookmark"} size={18} />
    </button>
  );
}

export function HeroHeading({ section }: { section: Section }) {
  const meta = sectionMeta[section];
  return (
    <div className="hero-heading">
      <span>{meta.eyebrow}</span>
      <h1>
        {meta.title.split("\n").map((line, i) => (
          <span key={i}>{line}</span>
        ))}
      </h1>
    </div>
  );
}

export function StreamCategory({
  label,
  icon,
  active,
  onClick,
  detail,
}: {
  label: string;
  icon: string;
  active: boolean;
  onClick: () => void;
  detail?: string;
}) {
  return (
    <button className={`stream-category ${active ? "active" : ""}`} onClick={onClick}>
      <span>
        <Icon name={icon} size={27} />
      </span>
      <strong>{label}</strong>
      {detail && <small>{detail}</small>}
    </button>
  );
}

export function CinematicFeaturedBanner({
  image,
  videoSrc,
  eyebrow,
  title,
  creator,
  category,
  duration,
  summary,
  badge,
  verified = false,
  previewPaused,
  onWatch,
  onDetails,
  detailsLabel,
}: {
  image: string;
  videoSrc: string;
  eyebrow: string;
  title: string;
  creator: string;
  category: string;
  duration: string;
  summary: string;
  badge?: string;
  verified?: boolean;
  previewPaused: boolean;
  onWatch: () => void;
  onDetails: () => void;
  detailsLabel: string;
}) {
  const bannerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = bannerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "240px 0px", threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    setReady(false);
    setFailed(false);
    setAutoplayBlocked(false);
    videoRef.current?.load();
  }, [shouldLoad, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewPaused || !visible || !pageVisible || reducedMotion || failed || !shouldLoad) {
      video.pause();
      return;
    }
    video.play().catch((error: unknown) => {
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setAutoplayBlocked(true);
      }
    });
  }, [failed, pageVisible, previewPaused, ready, reducedMotion, shouldLoad, visible]);

  return (
    <article
      className={`stream-hero cinematic-featured-banner ${
        ready && !failed && !reducedMotion ? "preview-ready" : ""
      }`}
      onClick={onWatch}
      ref={bannerRef}
    >
      <img className="cinematic-featured-poster" src={image} alt="" />
      <video
        key={videoSrc}
        className="cinematic-featured-video"
        ref={videoRef}
        autoPlay={!reducedMotion}
        muted
        loop
        playsInline
        preload="metadata"
        poster={image}
        onCanPlay={() => {
          setReady(true);
          setAutoplayBlocked(false);
        }}
        onError={() => {
          setFailed(true);
          setReady(false);
        }}
        aria-hidden="true"
      >
        {shouldLoad && <source src={videoSrc} type="video/webm" />}
      </video>
      <div className="stream-hero-shade" />
      {!ready && !failed && !reducedMotion && (
        <span className="cinematic-preview-state">Loading preview</span>
      )}
      {(failed || autoplayBlocked || reducedMotion) && (
        <span className="cinematic-preview-state">
          {reducedMotion ? "Preview paused" : "Preview available on play"}
        </span>
      )}
      <div className="cinematic-featured-copy">
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <div className="cinematic-featured-channel">
          <strong>{creator}</strong>
          <small>{category}</small>
        </div>
        <p>{summary}</p>
        <div className="cinematic-featured-actions">
          <button
            onClick={(event) => {
              event.stopPropagation();
              onWatch();
            }}
          >
            <span className="featured-play-icon">
              <Icon name="play" size={17} />
            </span>
            Watch Now
          </button>
          <button
            onClick={(event) => {
              event.stopPropagation();
              onDetails();
            }}
          >
            {detailsLabel}
          </button>
        </div>
      </div>
      <div className="cinematic-featured-meta">
        <span>{duration}</span>
        {verified && <strong>VERIFIED</strong>}
        {badge && <b>{badge}</b>}
      </div>
    </article>
  );
}

export function useCompactCategoryRail() {
  const markerRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => {
      const stickyTop = window.innerWidth <= 700 ? 62 : 76;
      setCompact((markerRef.current?.getBoundingClientRect().top ?? stickyTop + 1) <= stickyTop);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return { markerRef, compact };
}

export function StreamVideoCard({
  image,
  title,
  creator,
  context,
  duration,
  label,
  portrait = false,
  saved,
  saveId,
  toggle,
  onOpen,
}: {
  image: string;
  title: string;
  creator: string;
  context: string;
  duration: string;
  label: string;
  portrait?: boolean;
  saved: Set<string>;
  saveId: string;
  toggle: (id: string) => void;
  onOpen: () => void;
}) {
  return (
    <article className={`stream-video-card ${portrait ? "portrait" : ""}`} onClick={onOpen}>
      <div>
        <img src={image} alt="" />
        <div className="stream-card-shade" />
        <span className="stream-label">{label}</span>
        <span className="stream-duration">{duration}</span>
        <PlayButton small />
        <button
          className={saved.has(saveId) ? "saved" : ""}
          onClick={(e) => {
            e.stopPropagation();
            toggle(saveId);
          }}
          aria-label={saved.has(saveId) ? "Remove saved video" : "Save video"}
        >
          <Icon name={saved.has(saveId) ? "check" : "bookmark"} size={16} />
        </button>
      </div>
      <h3>{title}</h3>
      <p>{creator}</p>
      <small>{context}</small>
    </article>
  );
}

export type VerticalVideoItem = SelectedVideo & {
  id: string;
  kind: VideoKind;
  format: VideoFormat;
  category: string;
  location: string;
  contextTitle: string;
  contextMeta: string;
  engagement: string;
  verified?: boolean;
};

export function useInfiniteVideoFeed(items: VerticalVideoItem[], contextKey: string) {
  const uniqueItems = useMemo(
    () => [...new Map(items.map((item) => [item.id, item])).values()],
    [items],
  );
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(3);
    setLoading(false);
    setError("");
  }, [contextKey]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= uniqueItems.length || error) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setLoading(true);
        timer = window.setTimeout(() => {
          try {
            setVisibleCount((current) => Math.min(current + 3, uniqueItems.length));
            setLoading(false);
          } catch {
            setLoading(false);
            setError("More videos could not be loaded.");
          }
        }, 520);
      },
      { rootMargin: "500px 0px" },
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [error, uniqueItems.length, visibleCount]);

  const retry = () => {
    setError("");
    setVisibleCount((current) => Math.min(current + 3, uniqueItems.length));
  };

  return {
    visibleItems: uniqueItems.slice(0, visibleCount),
    loading,
    error,
    retry,
    sentinelRef,
    hasMore: visibleCount < uniqueItems.length,
    total: uniqueItems.length,
  };
}

export function VerticalVideoCard({
  item,
  saved,
  toggle,
  onVideo,
  onDetails,
  onEnquire,
}: {
  item: VerticalVideoItem;
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onDetails?: () => void;
  onEnquire?: () => void;
}) {
  const [liked, setLiked] = useState(false);
  const saveId = `vertical-${item.id}`;
  const initials = item.creator
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return (
    <article className={`vertical-video-card ${item.format}`} data-video-id={item.id}>
      <button
        className="vertical-video-media"
        onClick={() =>
          onVideo(item.kind, item.format, {
            title: item.title,
            creator: item.creator,
            creatorMeta: item.creatorMeta,
            poster: item.poster,
            eyebrow: item.eyebrow,
          })
        }
        aria-label={`Play ${item.title}`}
      >
        <img src={item.poster} alt="" />
        <span className="vertical-video-shade" />
        <span className="vertical-video-badge">{item.category}</span>
        <span className="vertical-video-duration">{item.eyebrow.split(" · ").at(-1)}</span>
        <PlayButton />
      </button>
      <div className="vertical-video-copy">
        <div className="vertical-video-creator">
          <span>{initials}</span>
          <div>
            <strong>{item.creator}</strong>
            <small>{item.creatorMeta}</small>
          </div>
          {item.verified && <b>VERIFIED</b>}
        </div>
        <h3>{item.title}</h3>
        <div className="vertical-video-context">
          <Icon name={item.kind === "education" ? "play" : "pin"} size={16} />
          <div>
            <strong>{item.contextTitle}</strong>
            <small>{item.contextMeta}</small>
          </div>
        </div>
        <div className="vertical-video-actions">
          <button className={liked ? "active" : ""} onClick={() => setLiked(!liked)}>
            <Icon name="heart" size={17} /> {liked ? "Liked" : item.engagement}
          </button>
          <button className={saved.has(saveId) ? "active" : ""} onClick={() => toggle(saveId)}>
            <Icon name={saved.has(saveId) ? "check" : "bookmark"} size={17} />
            {saved.has(saveId) ? "Saved" : "Save Video"}
          </button>
          <button>
            <Icon name="share" size={17} /> Share
          </button>
          {onDetails && (
            <button className="vertical-detail-action" onClick={onDetails}>
              View Details
            </button>
          )}
          {onEnquire && item.kind !== "education" && (
            <button className="vertical-enquire-action" onClick={onEnquire}>
              Enquire
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

export function VerticalVideoFeed({
  eyebrow,
  title,
  description,
  items,
  contextKey,
  saved,
  toggle,
  onVideo,
  onDetails,
  onEnquire,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: VerticalVideoItem[];
  contextKey: string;
  saved: Set<string>;
  toggle: (id: string) => void;
  onVideo: (kind: VideoKind, format?: VideoFormat, selected?: SelectedVideo) => void;
  onDetails?: () => void;
  onEnquire?: () => void;
}) {
  const { visibleItems, loading, error, retry, sentinelRef, hasMore, total } = useInfiniteVideoFeed(
    items,
    contextKey,
  );
  return (
    <section className="vertical-feed-section">
      <header>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </header>
      <div className="vertical-feed-list">
        {visibleItems.map((item) => (
          <VerticalVideoCard
            key={item.id}
            item={item}
            saved={saved}
            toggle={toggle}
            onVideo={onVideo}
            onDetails={onDetails}
            onEnquire={onEnquire}
          />
        ))}
        {loading && (
          <div className="vertical-feed-skeleton" aria-label="Loading more videos">
            <span />
            <i />
            <i />
          </div>
        )}
        {error && (
          <div className="vertical-feed-state error">
            <p>{error}</p>
            <button onClick={retry}>Retry</button>
          </div>
        )}
        {!hasMore && !loading && !error && (
          <div className="vertical-feed-state">
            <strong>You’re up to date</strong>
            <p>There are no more relevant videos in this feed right now.</p>
          </div>
        )}
        <div
          className="vertical-feed-sentinel"
          ref={sentinelRef}
          data-loaded={visibleItems.length}
          data-total={total}
        />
      </div>
    </section>
  );
}

export function SearchOverlay({
  close,
  onProject,
  onProperty,
  onLocation,
}: {
  close: () => void;
  onProject: () => void;
  onProperty: () => void;
  onLocation: () => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  useEffect(() => {
    const listener = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [close]);
  return (
    <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Search">
      <button className="overlay-backdrop" onClick={close} aria-label="Close search" />
      <div className="search-panel discover-search-panel">
        <div className="search-box">
          <Icon name="search" size={23} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Projects, properties, builders, cities or landmarks"
          />
          <button onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="search-categories">
          {["All", "Projects", "Properties", "Builders", "Places"].map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {query ? (
          <div className="search-results">
            <span className="search-label">BEST MATCHES FOR “{query.toUpperCase()}”</span>
            <article
              onClick={() => {
                close();
                onProject();
              }}
            >
              <img src={IMAGES.tower} alt="" />
              <div>
                <span>PROJECT · WORLI</span>
                <strong>Aurelia Residences</strong>
                <p>3 & 4 BHK · From ₹6.8 Cr</p>
              </div>
              <Icon name="chevron" />
            </article>
            <article
              onClick={() => {
                close();
                onProperty();
              }}
            >
              <img src={IMAGES.interior} alt="" />
              <div>
                <span>INDIVIDUAL PROPERTY · ALTAMOUNT</span>
                <strong>Sea-facing 3 BHK residence</strong>
                <p>2,180 sq ft · Asking ₹9.4 Cr</p>
              </div>
              <Icon name="chevron" />
            </article>
            <article
              onClick={() => {
                close();
                onLocation();
              }}
            >
              <img src={IMAGES.city} alt="" />
              <div>
                <span>LOCALITY</span>
                <strong>Worli, Mumbai</strong>
                <p>42 projects · 186 videos</p>
              </div>
              <Icon name="chevron" />
            </article>
            <article
              onClick={() => {
                close();
                onProject();
              }}
            >
              <div className="search-monogram">LO</div>
              <div>
                <span>BUILDER</span>
                <strong>Lodha</strong>
                <p>18 projects across Mumbai</p>
              </div>
              <Icon name="chevron" />
            </article>
          </div>
        ) : (
          <>
            <div className="search-section">
              <span className="search-label">RECENT SEARCHES</span>
              <button>
                3 BHK in Worli <Icon name="close" size={14} />
              </button>
              <button>
                New launches in Bandra <Icon name="close" size={14} />
              </button>
            </div>
            <div className="search-section">
              <span className="search-label">POPULAR LOCATIONS</span>
              <div className="trending">
                <button>
                  <b>01</b>
                  <span>
                    <strong>Lower Parel</strong>
                    <small>12 new projects</small>
                  </span>
                </button>
                <button>
                  <b>02</b>
                  <span>
                    <strong>Alibaug villas</strong>
                    <small>Trending this week</small>
                  </span>
                </button>
                <button>
                  <b>03</b>
                  <span>
                    <strong>Ready to move</strong>
                    <small>24 opportunities</small>
                  </span>
                </button>
              </div>
            </div>
            <div className="search-suggestions">
              <span className="search-label">SUGGESTED PROJECTS</span>
              <div>
                {[
                  [IMAGES.pool, "The Reserve", "Alibaug · From ₹4.25 Cr"],
                  [IMAGES.tower, "Aurelia Residences", "Worli · From ₹6.8 Cr"],
                ].map(([image, title, meta]) => (
                  <button
                    key={title}
                    onClick={() => {
                      close();
                      onProject();
                    }}
                  >
                    <img src={image} alt="" />
                    <span>
                      <strong>{title}</strong>
                      <small>{meta}</small>
                    </span>
                    <Icon name="chevron" size={15} />
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function ResultsHeader({
  market,
  count,
  onBack,
  onFilters,
}: {
  market: string;
  count: string;
  onBack: () => void;
  onFilters: () => void;
}) {
  const [sort, setSort] = useState("Recommended");
  return (
    <>
      <DetailHeader label={`${market.toUpperCase()} RESULTS`} onBack={onBack} />
      <div className="results-heading">
        <div>
          <span>DISCOVER · MUMBAI · 25 KM</span>
          <h1>{market}</h1>
          <p>{count} demonstration results matched to your search</p>
        </div>
        <div>
          <button onClick={onFilters}>
            <Icon name="tune" size={17} /> Filters <b>2</b>
          </button>
          <label>
            Sort by
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option>Recommended</option>
              <option>Newest</option>
              <option>Price: low to high</option>
              <option>Possession</option>
            </select>
          </label>
        </div>
      </div>
      <div className="active-result-filters">
        <span>
          Mumbai · 25 km <button>×</button>
        </span>
        <span>
          3–4 BHK <button>×</button>
        </span>
        <button onClick={onFilters}>+ Add filter</button>
      </div>
    </>
  );
}

export function InlineExpandedPlayer({
  kind,
  format,
  selected,
  saved,
  toggle,
  onClose,
  onProject,
  onProperty,
  onExpert,
  onEnquire,
  onSelectRelated,
}: {
  kind: VideoKind;
  format: VideoFormat;
  selected?: SelectedVideo;
  saved: Set<string>;
  toggle: (id: string) => void;
  onClose: () => void;
  onProject: () => void;
  onProperty: () => void;
  onExpert: () => void;
  onEnquire: () => void;
  onSelectRelated: (kind: VideoKind) => void;
}) {
  const [contextOpen, setContextOpen] = useState(true);
  const baseContent = {
    project: {
      poster: IMAGES.tower,
      eyebrow: "PROJECT WALKTHROUGH · 06:24",
      title: "Aurelia: a new perspective on city living",
      creator: "Realty Vids Studios",
      creatorMeta: "Property films · 42K followers",
      recordLabel: "PROJECT",
      record: "Aurelia Residences",
      meta: "K Raheja · Worli · From ₹6.8 Cr · 3 & 4 BHK",
      saveId: "inline-project-aurelia",
    },
    property: {
      poster: IMAGES.interior,
      eyebrow: "HOME WALKTHROUGH · 02:18",
      title: "Inside a sea-facing residence above Mumbai",
      creator: "Aarav Mehta",
      creatorMeta: "Secondary market advisor",
      recordLabel: "PROPERTY",
      record: "Sea-facing residence",
      meta: "Owner listing · Altamount Road · ₹9.4 Cr · 3 BHK",
      saveId: "inline-property-altamount",
    },
    opportunity: {
      poster: IMAGES.lounge,
      eyebrow: "VERIFIED OPPORTUNITY · 04:36",
      title: "Why this residence sits 12% below benchmark",
      creator: "Realty Vids Verification Desk",
      creatorMeta: "Independent opportunity reviews",
      recordLabel: "OPPORTUNITY",
      record: "Parkside Residences",
      meta: "₹80L advantage · Independently verified · 6 days left",
      saveId: "inline-opportunity-parkside",
    },
    education: {
      poster: IMAGES.skyline,
      eyebrow: "MARKET OUTLOOK · 12:46",
      title: "Is 2026 the year to buy—or to wait?",
      creator: "Rhea Mehta",
      creatorMeta: "Property economist · 28K followers",
      recordLabel: "TOPIC",
      record: "Mumbai Market Outlook",
      meta: "Learning hub · 24 related videos · Updated weekly",
      saveId: "inline-topic-mumbai",
    },
  }[kind];
  const content = selected ? { ...baseContent, ...selected } : baseContent;
  const videoSaveId = `inline-video-${kind}-${format}`;
  const detailsAction =
    kind === "property" ? onProperty : kind === "education" ? onExpert : onProject;
  return (
    <section className={`inline-expanded-player ${format}`}>
      <div className="inline-player-topbar">
        <span>NOW PLAYING IN {content.recordLabel}</span>
        <button onClick={onClose}>
          <Icon name="close" size={18} /> Close player
        </button>
      </div>
      <div className="inline-player-layout">
        <div className="inline-video-column">
          <div className="inline-video-frame">
            <video
              autoPlay
              muted={!selected?.videoSrc}
              loop
              playsInline
              controls
              poster={content.poster}
            >
              <source
                src={selected?.videoSrc ?? publicAsset("media/realty-preview.webm")}
                type="video/webm"
              />
            </video>
          </div>
          <div className="inline-video-title">
            <span>{content.eyebrow}</span>
            <h2>{content.title}</h2>
            <button className="inline-creator" onClick={onExpert}>
              <span>RV</span>
              <div>
                <strong>{content.creator}</strong>
                <small>{content.creatorMeta}</small>
              </div>
              <Icon name="chevron" size={15} />
            </button>
            <div className="inline-video-actions">
              <button
                className={saved.has(videoSaveId) ? "saved" : ""}
                onClick={() => toggle(videoSaveId)}
              >
                <Icon name={saved.has(videoSaveId) ? "check" : "bookmark"} />
                {saved.has(videoSaveId) ? "Video saved" : "Save Video"}
              </button>
              <button>
                <Icon name="share" /> Share
              </button>
            </div>
          </div>
        </div>
        <aside className={`inline-context-panel ${contextOpen ? "open" : ""}`}>
          <button className="inline-context-toggle" onClick={() => setContextOpen(!contextOpen)}>
            <span />
            {contextOpen ? "Collapse details" : "Show details"}
          </button>
          <span>{content.recordLabel} CONTEXT</span>
          <h3>{content.record}</h3>
          <p>{content.meta}</p>
          <div className="inline-context-facts">
            {kind === "project" && (
              <>
                <span>
                  <small>BUILDER</small>K Raheja
                </span>
                <span>
                  <small>LOCATION</small>Worli
                </span>
                <span>
                  <small>FROM</small>₹6.8 Cr
                </span>
                <span>
                  <small>CONFIGURATION</small>3 & 4 BHK
                </span>
              </>
            )}
            {kind === "property" && (
              <>
                <span>
                  <small>LISTED BY</small>Owner
                </span>
                <span>
                  <small>LOCATION</small>Altamount Road
                </span>
                <span>
                  <small>ASKING</small>₹9.4 Cr
                </span>
                <span>
                  <small>SIZE</small>2,180 sq ft
                </span>
              </>
            )}
            {kind === "opportunity" && (
              <>
                <span>
                  <small>REASON</small>Below benchmark
                </span>
                <span>
                  <small>BENEFIT</small>Save ₹80L
                </span>
                <span>
                  <small>STATUS</small>Verified
                </span>
                <span>
                  <small>VALIDITY</small>6 days
                </span>
              </>
            )}
            {kind === "education" && (
              <>
                <span>
                  <small>TOPIC</small>Market timing
                </span>
                <span>
                  <small>LEVEL</small>All buyers
                </span>
                <span>
                  <small>CREATOR</small>Rhea Mehta
                </span>
                <span>
                  <small>SERIES</small>Big Picture
                </span>
              </>
            )}
          </div>
          <button className="inline-save-record" onClick={() => toggle(content.saveId)}>
            <Icon name={saved.has(content.saveId) ? "check" : "bookmark"} />
            {saved.has(content.saveId)
              ? `${content.recordLabel} saved`
              : `Save ${content.recordLabel}`}
          </button>
          <button className="inline-view-details" onClick={detailsAction}>
            View {content.recordLabel} Details <Icon name="arrow" size={16} />
          </button>
          {kind !== "education" && (
            <button className="inline-enquire" onClick={onEnquire}>
              Enquire Now
            </button>
          )}
        </aside>
      </div>
      <div className="inline-related">
        <span>RELATED VIDEOS</span>
        <div>
          {streamVideos.slice(0, 3).map(([image, title, creator, , duration], i) => (
            <button key={title} onClick={() => onSelectRelated(i === 2 ? "education" : kind)}>
              <span>
                <img src={image} alt="" />
                <PlayButton small />
                <b>{duration}</b>
              </span>
              <strong>{title}</strong>
              <small>{creator}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DetailHeader({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="detail-header">
      <button onClick={onBack}>
        <Icon name="arrow" size={17} /> Back
      </button>
      <span>{label}</span>
      <button aria-label="Share">
        <Icon name="share" size={17} />
      </button>
    </div>
  );
}

export function VideoExperience({
  kind,
  saved,
  toggle,
  onBack,
  onProject,
  onProperty,
  onExpert,
  onEnquire,
}: {
  kind: VideoKind;
  saved: Set<string>;
  toggle: (id: string) => void;
  onBack: () => void;
  onProject: () => void;
  onProperty: () => void;
  onExpert: () => void;
  onEnquire: () => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const content = {
    project: {
      image: IMAGES.tower,
      eyebrow: "PROJECT WALKTHROUGH · WORLI",
      title: "Aurelia: a new perspective on city living",
      description: "A cinematic journey through the residences, gardens and skyline of Aurelia.",
      creator: "Realty Vids Studios",
      creatorMeta: "Property films · 42K followers",
      record: "Aurelia Residences",
      recordMeta: "Worli · From ₹6.8 Cr · 3 & 4 BHK",
      saveId: "player-project-aurelia",
      recordLabel: "PROJECT",
    },
    property: {
      image: IMAGES.interior,
      eyebrow: "HOME WALKTHROUGH · ALTAMOUNT ROAD",
      title: "Inside a sea-facing home above Mumbai",
      description: "An unhurried walkthrough of a privately held three-bedroom residence.",
      creator: "Aarav Mehta",
      creatorMeta: "Secondary market advisor",
      record: "Sea-facing residence",
      recordMeta: "Altamount Road · ₹9.4 Cr · 3 BHK",
      saveId: "player-property-altamount",
      recordLabel: "PROPERTY",
    },
    opportunity: {
      image: IMAGES.lounge,
      eyebrow: "VERIFIED OPPORTUNITY · LOWER PAREL",
      title: "Why this residence sits 12% below benchmark",
      description: "The home, registered comparisons and the terms behind the opportunity.",
      creator: "Realty Vids Verification Desk",
      creatorMeta: "Independent opportunity reviews",
      record: "Parkside Residences",
      recordMeta: "₹5.95 Cr · Save ₹80L · 6 days left",
      saveId: "player-opportunity-parkside",
      recordLabel: "OPPORTUNITY",
    },
    education: {
      image: IMAGES.skyline,
      eyebrow: "MARKET OUTLOOK · MUMBAI",
      title: "Is 2026 the year to buy—or to wait?",
      description:
        "Three leading voices unpack rates, supply and the micro-markets worth watching.",
      creator: "Rhea Mehta",
      creatorMeta: "Property economist · 28K followers",
      record: "Mumbai Market Outlook",
      recordMeta: "Topic hub · 24 related videos",
      saveId: "player-topic-mumbai",
      recordLabel: "TOPIC",
    },
  }[kind];
  const recordAction =
    kind === "property" ? onProperty : kind === "education" ? onExpert : onProject;
  const videoSaveId = `video-${kind}-${content.title}`;
  return (
    <section className="video-experience">
      <DetailHeader label="NOW WATCHING" onBack={onBack} />
      <div className="watch-grid">
        <div
          className={`video-stage ${playing ? "playing" : ""}`}
          onClick={() => setPlaying(!playing)}
        >
          <img src={content.image} alt="" />
          <div className="feature-shade" />
          {!playing && <PlayButton />}
          <div className="video-progress">
            <span />
            <small>04:18 / 12:46</small>
          </div>
          <div className="vertical-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggle(videoSaveId);
              }}
            >
              <Icon name={saved.has(videoSaveId) ? "check" : "bookmark"} />
              <span>Save video</span>
            </button>
            <button>
              <Icon name="share" />
              <span>Share</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setInfoOpen(!infoOpen);
              }}
            >
              <Icon name="home" />
              <span>Details</span>
            </button>
          </div>
          <div className={`mobile-video-context ${infoOpen ? "open" : ""}`}>
            <button
              className="context-handle"
              onClick={(e) => {
                e.stopPropagation();
                setInfoOpen(!infoOpen);
              }}
            >
              <span />
            </button>
            <small>{content.recordLabel}</small>
            <h2>{content.record}</h2>
            <p>{content.recordMeta}</p>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(content.saveId);
                }}
              >
                <Icon name={saved.has(content.saveId) ? "check" : "bookmark"} /> Save{" "}
                {content.recordLabel.toLowerCase()}
              </button>
              {kind !== "education" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEnquire();
                  }}
                >
                  Enquire Now
                </button>
              )}
            </div>
          </div>
        </div>
        <aside className="video-info">
          <span className="project-place">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="player-actions">
            <button
              className={saved.has(videoSaveId) ? "saved" : ""}
              onClick={() => toggle(videoSaveId)}
            >
              <Icon name={saved.has(videoSaveId) ? "check" : "bookmark"} /> Save Video
            </button>
            <button>
              <Icon name="share" /> Share
            </button>
          </div>
          <button className="creator-line" onClick={onExpert}>
            <div className="expert-avatar">RM</div>
            <span>
              <strong>{content.creator}</strong>
              <small>{content.creatorMeta}</small>
            </span>
            <Icon name="chevron" />
          </button>
          <button className="related-project player-context-card" onClick={recordAction}>
            <img
              src={
                kind === "property"
                  ? IMAGES.interior
                  : kind === "education"
                    ? IMAGES.city
                    : IMAGES.tower
              }
              alt=""
            />
            <span>
              <small>{content.recordLabel}</small>
              <strong>{content.record}</strong>
              <em>{content.recordMeta}</em>
              <b>View {content.recordLabel.toLowerCase()}</b>
            </span>
          </button>
          <div className="player-conversion-actions">
            <button onClick={() => toggle(content.saveId)}>
              <Icon name={saved.has(content.saveId) ? "check" : "bookmark"} />
              {saved.has(content.saveId) ? "Saved" : `Save ${content.recordLabel}`}
            </button>
            {kind !== "education" && <button onClick={onEnquire}>Enquire Now</button>}
          </div>
          <div className="up-next">
            <span className="project-place">UP NEXT</span>
            {[
              [IMAGES.aerial, "Where Mumbai is growing next", "08:24"],
              [IMAGES.interior, "The layout mistakes buyers miss", "06:18"],
            ].map(([img, title, time]) => (
              <button key={title}>
                <img src={img} alt="" />
                <span>
                  <strong>{title}</strong>
                  <small>{time}</small>
                </span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ActionSheet({
  type,
  close,
  onSuccess,
}: {
  type: Exclude<Sheet, null>;
  close: () => void;
  onSuccess: (message: string) => void;
}) {
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [radius, setRadius] = useState(25);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [locationQuery, setLocationQuery] = useState("Mumbai, Maharashtra");
  const [choices, setChoices] = useState(
    new Set(["Apartment", "Villa", "3", "Project tours", "Education", "Market updates"]),
  );
  const choose = (value: string) => {
    setChoices((current) => {
      const next = new Set(current);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };
  const titles = {
    location: "Choose your search area",
    filters: "Refine your discovery",
    feed: "Create a custom feed",
    list: "Create a custom list",
    enquiry: "Request a private consultation",
  };
  const submit = () => {
    if ((type === "feed" || type === "list") && !name.trim()) {
      setError(`Add a name for your custom ${type}.`);
      return;
    }
    setError("");
    setStep("loading");
    setTimeout(() => {
      setStep("success");
      setTimeout(
        () =>
          onSuccess(
            type === "enquiry"
              ? "Enquiry sent. An advisor will contact you shortly."
              : `${type === "feed" ? "Custom feed" : type === "list" ? "Custom list" : "Preferences"} saved.`,
          ),
        650,
      );
    }, 500);
  };
  return (
    <div className="sheet-layer" role="dialog" aria-modal="true">
      <button className="overlay-backdrop" onClick={close} aria-label="Close" />
      <div className={`action-sheet ${type === "location" ? "location-selector-sheet" : ""}`}>
        <div className="sheet-handle" />
        <header>
          <div>
            <span>{type === "enquiry" ? "PERSONALISED SUPPORT" : "MAKE IT YOURS"}</span>
            <h2>{titles[type]}</h2>
          </div>
          <button onClick={close}>
            <Icon name="close" />
          </button>
        </header>
        {step === "success" ? (
          <div className="sheet-success">
            <span>
              <Icon name="check" size={28} />
            </span>
            <h3>All set</h3>
            <p>Your details have been saved successfully.</p>
          </div>
        ) : step === "loading" ? (
          <div className="sheet-loading">
            <span />
            <span />
            <span />
            <p>Saving your preferences…</p>
          </div>
        ) : (
          <div className="sheet-form">
            {type === "location" && (
              <div className="location-selector-layout">
                <div className="location-controls">
                  <label>
                    City, locality or landmark
                    <span className="location-search-input">
                      <Icon name="search" size={17} />
                      <input
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        placeholder="Search Mumbai, Worli or a landmark"
                      />
                    </span>
                  </label>
                  <fieldset>
                    <legend>QUICK SELECT</legend>
                    <div className="location-quick-list">
                      {[
                        ["Mumbai", "City"],
                        ["Worli", "Locality"],
                        ["Bandra West", "Locality"],
                        ["BKC", "Business district"],
                        ["Mandwa Jetty", "Landmark"],
                      ].map(([place, kind]) => (
                        <button
                          key={place}
                          className={locationQuery.startsWith(place) ? "selected" : ""}
                          onClick={() => setLocationQuery(`${place}, Mumbai`)}
                        >
                          <Icon name="pin" size={15} />
                          <span>
                            <strong>{place}</strong>
                            <small>{kind}</small>
                          </span>
                          {locationQuery.startsWith(place) && <Icon name="check" size={15} />}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>SEARCH RADIUS</legend>
                    <div className="radius-options">
                      {[2, 5, 10, 15, 25, 50].map((value) => (
                        <button
                          key={value}
                          className={radius === value ? "selected" : ""}
                          onClick={() => setRadius(value)}
                        >
                          {value} km
                        </button>
                      ))}
                      <button
                        className={![2, 5, 10, 15, 25, 50].includes(radius) ? "selected" : ""}
                      >
                        Custom
                      </button>
                    </div>
                  </fieldset>
                  <fieldset className="nearby-inventory">
                    <legend>NEARBY INVENTORY · 42 RESULTS</legend>
                    {[
                      ["Aurelia Residences", "Worli · 3.2 km"],
                      ["Maison 77", "Bandra · 8.6 km"],
                      ["Sea-facing residence", "Altamount · 5.1 km"],
                    ].map(([title, meta], i) => (
                      <button key={title}>
                        <b>{i + 1}</b>
                        <span>
                          <strong>{title}</strong>
                          <small>{meta}</small>
                        </span>
                        <Icon name="chevron" size={14} />
                      </button>
                    ))}
                  </fieldset>
                  <button
                    className="clear-location"
                    onClick={() => {
                      setLocationQuery("");
                      setRadius(25);
                    }}
                  >
                    Clear selection
                  </button>
                </div>
                <div className="location-map">
                  <span className="map-orbit location-orbit-one" />
                  <span className="map-orbit location-orbit-two" />
                  <button className="map-point main">
                    <Icon name="pin" />
                    <span>
                      <strong>{locationQuery || "Choose a point"}</strong>
                      <small>{radius} km radius</small>
                    </span>
                  </button>
                  <button className="map-point secondary worli">Worli</button>
                  <button className="map-point secondary bandra">Bandra</button>
                  {[
                    [35, 38, "8"],
                    [62, 26, "12"],
                    [72, 62, "6"],
                    [27, 70, "4"],
                  ].map(([left, top, count], i) => (
                    <button
                      key={i}
                      className="inventory-marker"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <Icon name="home" size={12} />
                      <span>{count}</span>
                    </button>
                  ))}
                  <div className="map-scale">
                    <span /> 2 km
                  </div>
                  <button className="use-map-point">
                    <Icon name="pin" size={14} /> Use map centre
                  </button>
                </div>
                <div className="location-actions">
                  <button className="secondary-button" onClick={close}>
                    Cancel
                  </button>
                  <button className="primary-button" onClick={submit}>
                    Apply location
                  </button>
                </div>
              </div>
            )}
            {type === "filters" && (
              <>
                <fieldset>
                  <legend>PROPERTY TYPE</legend>
                  <div className="choice-grid">
                    {["Apartment", "Villa", "Plot", "Penthouse"].map((x) => (
                      <button
                        className={choices.has(x) ? "selected" : ""}
                        key={x}
                        onClick={() => choose(x)}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>PROJECT STATUS</legend>
                  <div className="choice-grid">
                    {["New launch", "Ready to move", "Under construction", "Upcoming"].map((x) => (
                      <button
                        className={choices.has(x) ? "selected" : ""}
                        key={x}
                        onClick={() => choose(x)}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>LISTED BY</legend>
                  <div className="choice-grid compact">
                    {["Builder", "Owner", "Broker", "Verified"].map((x) => (
                      <button
                        className={choices.has(x) ? "selected" : ""}
                        key={x}
                        onClick={() => choose(x)}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>BUDGET</legend>
                  <div className="field-row">
                    <label>
                      Minimum
                      <input defaultValue="₹3 Cr" />
                    </label>
                    <label>
                      Maximum
                      <input defaultValue="₹9 Cr" />
                    </label>
                  </div>
                </fieldset>
                <fieldset>
                  <legend>BEDROOMS</legend>
                  <div className="choice-grid compact">
                    {["2", "3", "4", "5+"].map((x) => (
                      <button
                        className={choices.has(x) ? "selected" : ""}
                        key={x}
                        onClick={() => choose(x)}
                      >
                        {x} BHK
                      </button>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
            {type === "feed" && (
              <>
                <label>
                  Feed name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mumbai investment watch"
                  />
                </label>
                <fieldset>
                  <legend>WHAT SHOULD IT INCLUDE?</legend>
                  <div className="choice-grid">
                    {[
                      "Project tours",
                      "Education",
                      "Market updates",
                      "Opportunities",
                      "Expert advice",
                      "Locality guides",
                    ].map((x) => (
                      <button
                        className={choices.has(x) ? "selected" : ""}
                        key={x}
                        onClick={() => choose(x)}
                      >
                        {x}
                      </button>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
            {type === "list" && (
              <>
                <label>
                  List name
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Homes to visit this month"
                  />
                </label>
                <label>
                  Note
                  <textarea placeholder="What are you comparing or researching?" />
                </label>
                <fieldset>
                  <legend>ADD SAVED ITEMS</legend>
                  <div className="select-items">
                    {[
                      "The Reserve · Project",
                      "Aurelia Residences · Project",
                      "2026 market outlook · Video",
                    ].map((x, i) => (
                      <label key={x}>
                        <input type="checkbox" defaultChecked={i < 2} />
                        {x}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}
            {type === "enquiry" && (
              <>
                <label>
                  Full name
                  <input defaultValue="Arjun Kapoor" />
                </label>
                <div className="field-row">
                  <label>
                    Mobile
                    <input defaultValue="+91 98765 43210" />
                  </label>
                  <label>
                    Email
                    <input defaultValue="arjun@example.com" />
                  </label>
                </div>
                <label>
                  What would you like help with?
                  <textarea defaultValue="I’d like current availability, pricing and a private viewing." />
                </label>
                <label className="consent">
                  <input type="checkbox" defaultChecked /> I agree to be contacted about this
                  enquiry.
                </label>
              </>
            )}
            {error && <p className="form-error">{error}</p>}
            {type !== "location" && (
              <button className="primary-button sheet-submit" onClick={submit}>
                {type === "enquiry"
                  ? "Submit enquiry"
                  : type === "filters"
                    ? "Show 42 results"
                    : "Save and continue"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
