import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load all env vars (including REACT_APP_*) so the existing config keeps working.
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    build: {
      outDir: "build", // keep the path nginx already serves
      // The React/MUI/Emotion/Redux core (~530 kB) is intentionally one chunk;
      // splitting it further breaks module init order. Bumped so the deliberate
      // size doesn't emit a noisy warning.
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Split heavy vendors into their own chunks so the main bundle
          // stays small and vendor code caches independently across deploys.
          // Function form only buckets modules already in the graph (unlike the
          // object form, which force-includes whole packages and can pull in
          // unused, unresolved deep imports from @mui/lab).
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            // Only peel off leaf libraries that don't have circular deps with
            // the React core. Splitting React/MUI/Emotion/Redux apart causes a
            // cross-chunk "cannot access before initialization" crash, so they
            // all stay together in the default vendor chunk.
            if (id.includes("swiper")) return "swiper";
            if (id.includes("sweetalert2")) return "sweetalert";
            return "vendor";
          },
        },
      },
    },
    server: {
      port: 3000,
      open: false,
    },
    define: {
      "process.env.REACT_APP_API_URL": JSON.stringify(
        env.REACT_APP_API_URL ?? ""
      ),
      "process.env.PUBLIC_URL": JSON.stringify(""),
    },
  };
});
