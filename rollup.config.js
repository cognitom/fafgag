import uglify from "rollup-plugin-uglify"
import resolve from "rollup-plugin-node-resolve"

const production = !process.env.ROLLUP_WATCH

export default {
  plugins: [
    resolve(),
    production && uglify()
  ],
  output: {
    format: "umd",
    name: "fafgag",
    sourcemap: !production
  }
}
