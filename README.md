# dx-lab

[![CI](https://github.com/turbowars/dx-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/turbowars/dx-lab/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/dx-lab.svg)](https://www.npmjs.com/package/dx-lab)
[![license](https://img.shields.io/npm/l/dx-lab.svg)](./LICENSE)

A batteries-included **TypeScript library boilerplate**. Clone it, rename it, and
start shipping — the build, tests, linting, and release pipeline are already wired up.

## What's inside

| Concern        | Tool                                                    |
| -------------- | ------------------------------------------------------- |
| Language       | [TypeScript](https://www.typescriptlang.org/) (strict)  |
| Build          | [tsup](https://tsup.egoist.dev/) — dual **ESM + CJS** + `.d.ts` |
| Tests          | [Vitest](https://vitest.dev/)                           |
| Lint + format  | [Biome](https://biomejs.dev/)                           |
| Releases       | [Changesets](https://github.com/changesets/changesets)  |
| CI/CD          | GitHub Actions (test matrix + automated npm publish)    |

## Use it as a template

```bash
npx degit turbowars/dx-lab my-new-lib
cd my-new-lib
pnpm install
```

> Uses [pnpm](https://pnpm.io/) — its global content-addressable store means
> every project you spin up from this template shares one copy of the dev
> tooling on disk instead of duplicating ~120 MB each time.

Then rename the package in [`package.json`](./package.json), drop your code in
[`src/`](./src), and you're off.

## Scripts

```bash
pnpm dev           # rebuild on change (watch mode)
pnpm build         # emit dist/ (ESM + CJS + types)
pnpm test          # run the test suite once
pnpm test:watch    # watch mode
pnpm test:coverage # coverage report
pnpm typecheck     # tsc --noEmit
pnpm lint          # Biome check (no writes)
pnpm format        # Biome check + autofix
pnpm check         # lint + typecheck + test (run before pushing)
```

## Usage

```ts
import { greet } from "dx-lab";

greet("world");                        // "Hello, world!"
greet("Dheeraj", { greeting: "Hey" }); // "Hey, Dheeraj!"
```

## Anatomy of `package.json`

`package.json` is strict JSON and **cannot contain comments**, so here is the
line-by-line explanation instead:

| Field | What it does |
| --- | --- |
| `name` / `version` | Package identity on npm. `version` is bumped by Changesets — don't edit by hand. |
| `description` / `keywords` | Shown on the npm page and in search results. |
| `type: "module"` | Source is treated as modern ESM (`import`/`export`) by default. |
| `main` | Entry point for old `require()` consumers → the CJS bundle. |
| `module` | Entry point for bundlers that prefer ESM → the ESM bundle. |
| `types` | Where TypeScript finds the type declarations. |
| `exports` | The modern, authoritative map. Node picks `import` vs `require` automatically and `types` feeds editors. Takes precedence over `main`/`module`. |
| `files` | Whitelist of what gets published. Only `dist/` ships — source and configs stay out of the tarball. |
| `sideEffects: false` | Promises the package has no import-time side effects, so bundlers can tree-shake unused exports away. |
| `engines.node` | Minimum Node version consumers need. |
| `packageManager` | Pins pnpm's version; `corepack` uses this to auto-install the right pnpm. |
| `scripts` | The commands you run with `pnpm <name>` (see the Scripts section above). |
| `pnpm.onlyBuiltDependencies` | Allow-list of deps permitted to run install scripts (pnpm blocks these by default for safety). |
| `devDependencies` | Build/test/lint tools. **None of these ship to consumers** — they exist only while developing. |

## Releasing

This repo uses Changesets. To cut a release:

1. Run `pnpm changeset` and describe your change (patch / minor / major).
2. Commit and push. On merge to `master`, the **Release** workflow opens a
   "Version Packages" PR.
3. Merge that PR — the workflow publishes to npm automatically.

> Requires an `NPM_TOKEN` secret in the GitHub repo settings.

## Contributing & philosophy

See [AGENTS.md](./AGENTS.md) for the coding philosophy (the Zen of Python applied
to TypeScript), conventions, and the change workflow. It's written for AI agents
and humans alike — every tool from Claude Code to Copilot reads it.

## License

[MIT](./LICENSE) © Dheeraj
