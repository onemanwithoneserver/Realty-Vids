import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DesktopMacRoundedIcon from "@mui/icons-material/DesktopMacRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import LandscapeRoundedIcon from "@mui/icons-material/LandscapeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import VillaRoundedIcon from "@mui/icons-material/VillaRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import type { SelectedVideo, VerticalVideoItem, VideoFormat, VideoKind } from "../../lib/types";

export const ICON_MAP = {
  home: HomeRoundedIcon,
  compass: ExploreRoundedIcon,
  spark: AutoAwesomeRoundedIcon,
  play: PlayCircleFilledRoundedIcon,
  playTriangle: PlayArrowRoundedIcon,
  list: FormatListBulletedRoundedIcon,
  bell: NotificationsNoneRoundedIcon,
  user: PersonRoundedIcon,
  search: SearchRoundedIcon,
  pin: LocationOnRoundedIcon,
  bookmark: BookmarkBorderRoundedIcon,
  bookmarkFilled: BookmarkRoundedIcon,
  share: IosShareRoundedIcon,
  heart: FavoriteBorderRoundedIcon,
  heartFilled: FavoriteRoundedIcon,
  arrow: ArrowForwardRoundedIcon,
  back: ArrowBackIosNewRoundedIcon,
  chevron: ChevronRightRoundedIcon,
  expand: ExpandMoreRoundedIcon,
  tune: TuneRoundedIcon,
  close: CloseRoundedIcon,
  check: CheckRoundedIcon,
  checkCircle: CheckCircleRoundedIcon,
  verified: VerifiedRoundedIcon,
  clock: AccessTimeRoundedIcon,
  apartment: ApartmentRoundedIcon,
  villa: VillaRoundedIcon,
  plot: LandscapeRoundedIcon,
  commercial: BusinessCenterRoundedIcon,
  dark: DarkModeRoundedIcon,
  light: LightModeRoundedIcon,
  desktop: DesktopMacRoundedIcon,
  mobile: PhoneIphoneRoundedIcon,
  plus: AddRoundedIcon,
  volume: VolumeUpRoundedIcon,
  mute: VolumeOffRoundedIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;

export interface FeaturedBannerProps {
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
}

export interface VideoCardProps {
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
}

export interface VerticalFeedProps {
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
}

export interface ResultsToolbarProps {
  market: string;
  count: string;
  onBack: () => void;
  onFilters: () => void;
}

export function useVideoPreview(videoSrc: string, previewPaused: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [muted, setMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: "240px 0px", threshold: 0.18 },
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
    videoRef.current?.load();
  }, [shouldLoad, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewPaused || !visible || !pageVisible || reducedMotion || failed || !shouldLoad) {
      video.pause();
      return;
    }
    video.play().catch(() => {});
  }, [failed, pageVisible, previewPaused, ready, reducedMotion, shouldLoad, visible]);

  return {
    containerRef,
    videoRef,
    shouldLoad,
    ready,
    failed,
    muted,
    setMuted,
    reducedMotion,
    onCanPlay: () => setReady(true),
    onError: () => {
      setFailed(true);
      setReady(false);
    },
  };
}

export function useInfiniteVideoFeed(items: VerticalVideoItem[], contextKey: string) {
  const uniqueItems = useMemo(
    () => [...new Map(items.map((item) => [item.id, item])).values()],
    [items],
  );
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisibleCount(3);
    setLoading(false);
  }, [contextKey]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || visibleCount >= uniqueItems.length) return;
    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setLoading(true);
        timer = window.setTimeout(() => {
          setVisibleCount((current) => Math.min(current + 3, uniqueItems.length));
          setLoading(false);
        }, 440);
      },
      { rootMargin: "460px 0px" },
    );
    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (timer) window.clearTimeout(timer);
    };
  }, [uniqueItems.length, visibleCount]);

  return {
    visibleItems: uniqueItems.slice(0, visibleCount),
    loading,
    sentinelRef,
    hasMore: visibleCount < uniqueItems.length,
    total: uniqueItems.length,
    loadMore: () => setVisibleCount((current) => Math.min(current + 3, uniqueItems.length)),
  };
}

export function useHorizontalScrollArrows() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const syncScrollState = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const epsilon = 2;
    const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanScrollLeft(el.scrollLeft > epsilon);
    setCanScrollRight(maxScroll > epsilon && el.scrollLeft < maxScroll - epsilon);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    syncScrollState();
    const raf = window.requestAnimationFrame(syncScrollState);
    const onScroll = () => syncScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncScrollState);

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(syncScrollState) : null;
    observer?.observe(el);

    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncScrollState);
      observer?.disconnect();
    };
  }, [syncScrollState]);

  const scrollByStep = useCallback((direction: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    const step = Math.max(210, Math.round(el.clientWidth * 0.78));
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return { railRef, canScrollLeft, canScrollRight, scrollByStep };
}
