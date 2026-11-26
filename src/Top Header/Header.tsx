import CloseIcon from "@mui/icons-material/Close";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { m, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import ViewDropdown from "./ViewDropdown";
import { publicAsset } from "../publicAsset";

export type AppTheme = "light" | "dark";
export type ViewMode = "desktop" | "mobile";

interface HeaderProps {
  viewMode: ViewMode;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
  onViewModeChange: (mode: ViewMode) => void;
  view: string;
  onViewChange: (view: string) => void;
  onClose?: () => void;
}

export default function Header({
  viewMode,
  theme,
  onThemeChange,
  onViewModeChange,
  view,
  onViewChange,
  onClose,
}: HeaderProps) {
  const reduceMotion = useReducedMotion();
  const animateMode = (mode: ViewMode) => onViewModeChange(mode);

  return (
    <m.header
      className="app-header"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <Link
        className="app-header-brand"
        to={`/${theme}/${viewMode}/discover`}
        aria-label="Realty Vids home"
      >
        <img src={publicAsset("brand/realty-vids-symbol.svg")} alt="" />
        <span>Realty Vids</span>
      </Link>
      <div className="app-header-controls">
        <div className="view-mode-switch" role="group" aria-label="Preview size">
          <button
            type="button"
            aria-pressed={viewMode === "desktop"}
            className={viewMode === "desktop" ? "active" : ""}
            onClick={() => animateMode("desktop")}
            title="Desktop viewport"
          >
            <DesktopWindowsIcon sx={{ fontSize: 22 }} aria-hidden="true" />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            aria-pressed={viewMode === "mobile"}
            className={viewMode === "mobile" ? "active" : ""}
            onClick={() => animateMode("mobile")}
            title="Mobile viewport"
          >
            <SmartphoneIcon sx={{ fontSize: 22 }} aria-hidden="true" />
            <span>Mobile</span>
          </button>
        </div>
        <ViewDropdown value={view} onChange={onViewChange} />
        <button
          type="button"
          className="app-theme-switch"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          onClick={() => onThemeChange(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: 22 }} aria-hidden="true" />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: 22 }} aria-hidden="true" />
          )}
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </button>
        <button
          type="button"
          className="app-header-close"
          onClick={onClose}
          title="Hide header (Ctrl+M to reopen)"
          aria-label="Hide header"
        >
          <CloseIcon sx={{ fontSize: 22 }} aria-hidden="true" />
        </button>
      </div>
    </m.header>
  );
}
