// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";
import icon from "astro-icon";
import yaml from "@rollup/plugin-yaml";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss(), yaml()],
  },

  integrations: [
    alpinejs({ entrypoint: "/src/scripts/alpine/index.ts" }),
    icon(),
  ],
});
