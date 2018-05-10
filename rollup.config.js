import { join } from "path"
import alias from "rollup-plugin-alias"
import resolve from "rollup-plugin-node-resolve"
import uglify from "rollup-plugin-uglify"

const production = !process.env.ROLLUP_WATCH

export default {
  plugins: [
    alias({
      "zen-observable": join(__dirname, "zen-observable-adapter.js")
    }),
    resolve(),
    production && uglify()
  ],
  output: {
    format: "umd",
    name: "fafgag",
    sourcemap: !production
  }
}
