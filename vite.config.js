import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps:{
    include: ['**/*.jsx'],
  },
  plugins: [react()],
  base: "/React-StarMatchGame/",
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
