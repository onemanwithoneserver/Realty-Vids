import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./AppShell";
import { pageRoutes } from "./pages/routes";
import type { AppTheme } from "./Top Header/Header";

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const themes: AppTheme[] = ["light", "dark"];

export default function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <Routes>
        <Route path="/" element={<Navigate to="/light/discover" replace />} />
        {themes.map((theme) => (
          <Route
            key={theme}
            path={`/${theme}`}
            element={<Navigate to={`/${theme}/discover`} replace />}
          />
        ))}
        {themes.flatMap((theme) =>
          pageRoutes.map(({ path }) => (
            <Route
              key={`${theme}${path}`}
              path={`/${theme}${path}`}
              element={<AppShell theme={theme} />}
            />
          )),
        )}
        {pageRoutes.map(({ path }) => (
          <Route key={path} path={path} element={<Navigate to={`/light${path}`} replace />} />
        ))}
        <Route path="*" element={<Navigate to="/light/discover" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
