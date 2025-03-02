import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // Add process and process.env for compatibility with Node.js modules
    "process.env": {},
    "process.browser": true,
    "process.version": '"v16.0.0"',
    process: {
      env: {},
      browser: true,
      version: '"v16.0.0"',
    },
  },
  resolve: {
    alias: {
      // Polyfills for Node.js modules
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      assert: "assert",
      util: "util",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
    },
  },
});
