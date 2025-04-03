import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === "build" ? "/ui/dist" : undefined,
  define: {
    global: "window",
  },
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".js", ".jsx"],
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [vue()],
}));
