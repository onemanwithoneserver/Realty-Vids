import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./AppShell";
import { pageRoutes } from "./pages/routes";
import type { AppTheme, ViewMode } from "./Top Header/Header";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const themes: AppTheme[] = ["light", "dark"];
const viewModes: ViewMode[] = ["desktop", "mobile"];

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
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
          <Route
            key={path}
            path={path}
            element={<Navigate to={`/light/desktop${path}`} replace />}
          />
        ))}
        <Route path="*" element={<Navigate to="/light/desktop/discover" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
