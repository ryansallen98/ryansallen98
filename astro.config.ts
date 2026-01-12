// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";
import yaml from "@rollup/plugin-yaml";
import sitemap from "@astrojs/sitemap";
import { loadEnv } from "vite";

const env = loadEnv("", process.cwd(), "");
const site = env.SITE_URL;

// https://astro.build/config
export default defineConfig({
  site: site,
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
  integrations: [
    alpinejs({ entrypoint: "/src/scripts/alpine/index.ts" }),
    icon(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname; // Exclude admin pages from sitemap
        return !pathname.startsWith("/admin");
      },
    }),
  ],
});
