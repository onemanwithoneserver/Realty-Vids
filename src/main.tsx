import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const githubPagesPath = sessionStorage.getItem("realty-vids-redirect");
if (githubPagesPath) {
  sessionStorage.removeItem("realty-vids-redirect");
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  window.history.replaceState(null, "", `${basePath}${githubPagesPath}`);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
