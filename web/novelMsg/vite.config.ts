import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "^/novel": {
        target: "http://127.0.0.1:3000/novel",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/novel/, ""),
      },
    },
  },
});
