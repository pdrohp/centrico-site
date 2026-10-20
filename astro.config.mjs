import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  server: {
    port: Number(process.env.PORT) || 4321,
    host: true,
  },
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle island deps at startup so Vite never re-optimizes mid-session
    // (that left the browser with stale ?v= hashes → 504 and blank sections).
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "react-dom/client",
        "framer-motion",
        "lucide-react",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "@radix-ui/react-slot",
        "@radix-ui/react-toast",
      ],
    },
  },
});
