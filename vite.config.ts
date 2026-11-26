import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  base: mode === "pages" || process.env.GITHUB_PAGES === "true" ? "/Realty-Vids/" : "/",
  build: {
    sourcemap: mode === "development" ? "inline" : false,
    minify: mode !== "development",
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: Number(process.env.PORT || 8443),
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: Number(process.env.PORT || 8443),
  },
}));
