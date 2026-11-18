import { defineConfig } from "vite";

// GitHub Pages serves the site from /naturelle-spa/; local dev and preview stay at the root.
const base = process.env.GITHUB_PAGES ? "/naturelle-spa/" : "/";

export default defineConfig({
  base,
  server: {
    host: "127.0.0.1",
    port: 4173,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
