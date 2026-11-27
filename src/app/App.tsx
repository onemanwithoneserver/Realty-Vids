import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import type { AppTheme, ViewMode } from "../lib/types";
import AppShell from "./AppShell";
import { pageRoutes } from "./routes";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const themes: AppTheme[] = ["light", "dark"];
const viewModes: ViewMode[] = ["desktop", "mobile"];

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/light/desktop/discover" replace />} />
      {themes.map((theme) => (
        <Route
          key={theme}
          path={`/${theme}`}
          element={<Navigate to={`/${theme}/desktop/discover`} replace />}
        />
      ))}
      {themes.flatMap((theme) =>
        viewModes.flatMap((viewMode) => [
          <Route
            key={`${theme}-${viewMode}-index`}
            path={`/${theme}/${viewMode}`}
            element={<Navigate to={`/${theme}/${viewMode}/discover`} replace />}
          />,
          ...pageRoutes.map(({ path }) => (
            <Route
              key={`${theme}-${viewMode}${path}`}
              path={`/${theme}/${viewMode}${path}`}
              element={<AppShell theme={theme} viewMode={viewMode} />}
            />
          )),
        ]),
      )}
      {themes.flatMap((theme) =>
        pageRoutes.map(({ path }) => (
          <Route
            key={`${theme}-legacy${path}`}
            path={`/${theme}${path}`}
            element={<Navigate to={`/${theme}/desktop${path}`} replace />}
          />
        )),
      )}
      {pageRoutes.map(({ path }) => (
        <Route key={path} path={path} element={<Navigate to={`/light/desktop${path}`} replace />} />
      ))}
      <Route path="*" element={<Navigate to="/light/desktop/discover" replace />} />
    </Routes>
  );
}

export default function App() {
  if (import.meta.env.BASE_URL === "/") {
    return (
      <BrowserRouter basename={routerBasename}>
        <AppRoutes />
      </BrowserRouter>
    );
  }
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
