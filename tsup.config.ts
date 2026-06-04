// tsup is the bundler. It takes our TypeScript source and produces the actual
// files that get published to npm (everything in `dist/`). It's a thin, zero-
// config-friendly wrapper around esbuild — fast, and it handles types for us.
//
// `defineConfig` is just a helper that gives us autocomplete + type-checking
// on the options object below. It returns the object unchanged.
import { defineConfig } from "tsup";

export default defineConfig({
  // The file(s) tsup starts from. It follows every import out of here to
  // figure out what to bundle. One entry → one set of output files.
  entry: ["src/index.ts"],

  // Output BOTH module formats so the package works everywhere:
  //   - "esm" → dist/index.js   (modern `import`)
  //   - "cjs" → dist/index.cjs  (legacy `require`)
  format: ["esm", "cjs"],

  // Generate TypeScript declaration files (.d.ts). This is what gives
  // consumers autocomplete and type-checking when they use the package.
  dts: true,

  // Emit source maps (.map files) so debuggers can map the bundled output
  // back to the original TypeScript lines.
  sourcemap: true,

  // Wipe the `dist/` folder before each build so stale files never linger.
  clean: true,

  // Drop unused code from the output (dead-code elimination).
  treeshake: true,

  // Keep the output readable. For a LIBRARY, minifying is usually a mistake —
  // let the consumer's own bundler minify in their app. Readable dist also
  // makes debugging easier.
  minify: false,

  // Which JS syntax level to emit. Must stay in sync with `target` in
  // tsconfig.json so the type-checker and the bundler agree.
  target: "es2022",
});
