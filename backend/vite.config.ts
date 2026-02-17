import swc from "unplugin-swc"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  plugins: [tsconfigPaths(), swc.vite({ module: { type: "es6" } })],
})
