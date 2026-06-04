// Test file for `src/index.ts`. Vitest automatically finds any file matching
// `*.test.ts` (configured in vitest.config.ts) and runs it. These same tests
// run locally via `pnpm test` and in CI on every push.

// `describe`, `it`, and `expect` are Vitest's testing primitives.
//   - describe(): groups related tests under a label
//   - it():       defines a single test case ("it should do X")
//   - expect():   makes an assertion about a value
import { describe, expect, it } from "vitest";

// Import the function under test. Note the `.js` extension even though the file
// is `index.ts` — this is required by modern ESM/TypeScript module resolution
// ("Bundler"/"NodeNext"); the build maps `.js` back to the real `.ts` source.
import { greet } from "./index.js";

// Group all the `greet` assertions together so test output reads clearly.
describe("greet", () => {
  // Each `it` is one isolated scenario. The string describes the expectation.
  it("greets with sensible defaults", () => {
    // expect(actual).toBe(expected) fails the test if they aren't equal.
    expect(greet("world")).toBe("Hello, world!");
  });

  it("respects a custom greeting", () => {
    // Override only `greeting`; `punctuation` still falls back to its default.
    expect(greet("Dheeraj", { greeting: "Hey" })).toBe("Hey, Dheeraj!");
  });

  it("respects custom punctuation", () => {
    // Override only `punctuation`; `greeting` still falls back to its default.
    expect(greet("there", { punctuation: "." })).toBe("Hello, there.");
  });
});
