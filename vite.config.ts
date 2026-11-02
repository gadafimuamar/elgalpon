import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Transpilar a ES2017 para soportar browsers que no soportan ?? (ES2020)
    // Safari 13+ (iOS 13+) soporta ?? pero navegadores viejos no
    target: "es2017",
  },
  server: {
    host: true,
    strictPort: false,
  },
  build: {
    target: "es2017",
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
