// @ts-check
import { defineConfig } from "astro/config";

import dotenv from 'dotenv';

import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

import node from "@astrojs/node";

import icon from "astro-icon";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  output: "hybrid",

  integrations: [tailwind({
    applyBaseStyles: false,
  }), svelte(), icon()],

  adapter: node({
    mode: "standalone",
  }),
  devToolbar: { enabled: false },
	experimental: {
		serverIslands: true,
	}
});