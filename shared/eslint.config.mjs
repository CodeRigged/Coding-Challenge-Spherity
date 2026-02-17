import { defineConfig } from "eslint/config"

import baseConfig from "../eslint.config.mjs"

export default defineConfig(...baseConfig, {
  ignores: ["build", "node_modules", "tsconfig.tsbuildinfo"],
  // Add shared-specific rules or overrides here if needed
})
