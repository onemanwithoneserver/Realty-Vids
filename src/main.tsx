import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

const githubPagesPath = sessionStorage.getItem("realty-vids-redirect");
if (githubPagesPath) {
  sessionStorage.removeItem("realty-vids-redirect");
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const route = githubPagesPath.startsWith("/") ? githubPagesPath : `/${githubPagesPath}`;
  const destination =
    import.meta.env.BASE_URL === "/" ? `${basePath}${route}` : `${basePath}/#${route}`;
  window.history.replaceState(null, "", destination);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
