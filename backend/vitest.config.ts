import { defineConfig, mergeConfig } from "vitest/config"

import viteConfig from "./vite.config"
export default defineConfig(() =>
  mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        environment: "node",
        globals: true,
        include: ["src/**/*.test.ts"],
      },
    })
  )
)
