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
