// Vitest is the test runner. This file tells it where the tests live and how
// to run them. `defineConfig` (from vitest's own export) gives us typed,
// autocompleted options.
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Expose `describe`/`it`/`expect` as globals so test files don't have to
    // import them every time. (We still import them in index.test.ts for
    // clarity — both styles work; this just makes the import optional.)
    globals: true,

    // Run tests in a plain Node.js environment. Switch to "jsdom" or
    // "happy-dom" here if you ever test browser/DOM code.
    environment: "node",

    // Which files count as tests. Anything ending in `.test.ts` or `.spec.ts`
    // anywhere under `src/` is picked up automatically.
    include: ["src/**/*.{test,spec}.ts"],

    // Code-coverage settings, used by `pnpm test:coverage`.
    coverage: {
      // "v8" uses Node's built-in coverage — fast and accurate, no
      // instrumentation step needed.
      provider: "v8",

      // Measure coverage across all source files...
      include: ["src/**/*.ts"],

      // ...but don't count the test files themselves toward coverage.
      exclude: ["src/**/*.{test,spec}.ts"],
    },
  },
});
