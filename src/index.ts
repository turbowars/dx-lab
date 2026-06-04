/**
 * dx-lab — batteries-included TypeScript library boilerplate.
 *
 * This is the single entry point of the package. Whatever you `export` from
 * this file is what people get when they `import { ... } from "dx-lab"`.
 * The build step (tsup) reads THIS file, follows every import, and produces
 * the bundled output in `dist/`.
 *
 * The `greet` function below is just a placeholder so the pipeline has
 * something real to build, type-check, and test. Delete it and add your own
 * modules when you start a real project.
 */

/**
 * Options that tweak how {@link greet} builds its message.
 *
 * Marking both fields optional (the `?`) means callers can pass none, some,
 * or all of them — `greet("x")`, `greet("x", { greeting: "Hi" })`, etc.
 */
export interface GreetOptions {
  /** Word placed before the name. Defaults to `"Hello"`. */
  greeting?: string;
  /** Character(s) placed after the name. Defaults to `"!"`. */
  punctuation?: string;
}

/**
 * Build a friendly greeting string.
 *
 * @example
 * ```ts
 * greet("world");                          // "Hello, world!"
 * greet("Dheeraj", { greeting: "Hey" });   // "Hey, Dheeraj!"
 * ```
 *
 * @param name - Who to greet.
 * @param options - Optional overrides; defaults to an empty object so the
 *                   destructuring below always has something to read from.
 * @returns The composed greeting string.
 */
export function greet(name: string, options: GreetOptions = {}): string {
  // Pull the two fields out of `options`. The `= "..."` parts are default
  // values that kick in whenever the caller left that field undefined.
  const { greeting = "Hello", punctuation = "!" } = options;

  // Template literal (backticks) stitches the pieces together. The `${...}`
  // slots are replaced with the variable values at runtime.
  return `${greeting}, ${name}${punctuation}`;
}
