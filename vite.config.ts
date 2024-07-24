import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://AzloRog.github.io/sls-app",
  build: { chunkSizeWarningLimit: 1600 },
});
