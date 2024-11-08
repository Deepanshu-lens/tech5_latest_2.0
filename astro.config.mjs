// @ts-check
import { defineConfig } from "astro/config";

import dotenv from "dotenv";

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import icon from "astro-icon";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    svelte(),
    icon(),
  ],
  devToolbar: { enabled: false },
  experimental: {
    serverIslands: true,
  },
});
