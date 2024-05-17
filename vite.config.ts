import { fileURLToPath, URL } from "node:url"
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "./",
  build: {
    outDir: "docs",
  },
  server: {
    open: true,
  },
})
