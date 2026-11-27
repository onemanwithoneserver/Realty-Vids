import type { AppTheme, PageRouteMeta, ViewMode } from "../../lib/types";

export interface PreviewBarProps {
  viewMode: ViewMode;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onViewModeChange: (mode: ViewMode) => void;
  view: string;
  onViewChange: (view: string) => void;
  routes: readonly PageRouteMeta[];
  onClose?: () => void;
}
