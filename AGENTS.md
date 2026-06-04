# AGENTS.md

Instructions for any AI agent or human contributor working in this repository.
This is the vendor-neutral standard read by Claude Code, Cursor, GitHub Copilot,
and others. Read it before making changes.

---

## What this project is

**dx-lab** is a batteries-included **TypeScript library boilerplate** — a
clone-and-go template for spinning up new publishable npm packages. It ships
dual ESM + CommonJS bundles with type declarations.

- **Package manager:** pnpm (pinned via `packageManager` in `package.json`)
- **Build:** tsup → `dist/` (ESM + CJS + `.d.ts`)
- **Tests:** Vitest
- **Lint + format:** Biome (config in `biome.jsonc`)
- **Releases:** Changesets + GitHub Actions

---

## Coding philosophy — The Zen of Python

We adopt **The Zen of Python** (Tim Peters, [PEP 20](https://peps.python.org/pep-0020/))
as our base coding philosophy. The language here is TypeScript, but the wisdom
is universal. The verbatim aphorisms, and how we apply each one:

> **Beautiful is better than ugly.**

Code is read far more than it is written. Favor clean structure, meaningful
names, and consistent style. Biome enforces the mechanical part; taste is on you.

> **Explicit is better than implicit.**

Prefer explicit types on public APIs, named exports over default exports, and
clear option objects over positional boolean arguments. No magic. This is why
`tsconfig.json` runs in `strict` mode.

> **Simple is better than complex.** / **Complex is better than complicated.**

Reach for the simplest thing that works. When complexity is unavoidable, keep it
*structured and explainable* — not tangled. A clever one-liner that needs a
paragraph to understand is the wrong trade.

> **Flat is better than nested.**

Avoid deep nesting. Use early returns and guard clauses instead of pyramids of
`if`. Keep the module tree shallow.

> **Sparse is better than dense.**

Give code room to breathe. One idea per line. Don't cram.

> **Readability counts.**

The headline rule. This repo deliberately over-comments so every line is
understandable by a human. Match that bar: when you add code, comment the
*why*. (See "Commenting" below.)

> **Special cases aren't special enough to break the rules.** / **Although practicality beats purity.**

Be consistent — but ship working software. If a pragmatic exception is truly
warranted, make it loudly (a comment explaining why), not silently.

> **Errors should never pass silently.** / **Unless explicitly silenced.**

Never swallow errors. Don't write empty `catch {}` blocks. If you intentionally
ignore an error, leave a comment saying why it's safe.

> **In the face of ambiguity, refuse the temptation to guess.**

If requirements are unclear, ask or make the assumption explicit in a comment —
don't silently pick a behavior and hope.

> **There should be one — and preferably only one — obvious way to do it.**

One canonical helper per job. Don't add a second utility that overlaps an
existing one. Consolidate.

> **Now is better than never.** / **Although never is often better than *right* now.**

Ship incremental progress; don't wait for perfection. But don't rush broken or
half-thought-out code into `master` either.

> **If the implementation is hard to explain, it's a bad idea.** / **If the implementation is easy to explain, it may be a good idea.**

The explainability test: if you can't comment it clearly, redesign it.

> **Namespaces are one honking great idea — let's do more of those!**

Keep things scoped. Export through the single `src/index.ts` entry point. Group
related code into modules rather than dumping everything into one global space.

---

## Project structure

```
dx-lab/
├── src/
│   ├── index.ts        # The single public entry point — exports define the API
│   └── index.test.ts   # Tests live next to source
├── dist/               # Build output (generated, git-ignored, the ONLY thing published)
├── .github/workflows/  # CI (test matrix) and Release (auto-publish) pipelines
├── .changeset/         # Pending release notes (strict JSON — no comments)
├── tsconfig.json       # TypeScript config (JSONC — commented)
├── tsup.config.ts      # Build config
├── vitest.config.ts    # Test config
├── biome.jsonc         # Lint + format config (JSONC — commented)
└── package.json        # Manifest (strict JSON — documented in README instead)
```

---

## Commands

Run these with pnpm (never npm or yarn — the lockfile is `pnpm-lock.yaml`):

| Command | Purpose |
| --- | --- |
| `pnpm install` | Install dependencies |
| `pnpm dev` | Rebuild on change (watch mode) |
| `pnpm build` | Emit `dist/` (ESM + CJS + types) |
| `pnpm test` | Run the test suite once |
| `pnpm test:watch` | Tests in watch mode |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | Biome check (no writes) |
| `pnpm format` | Biome check + autofix |
| `pnpm check` | lint + typecheck + test — **run this before every commit** |

---

## Conventions

- **TypeScript strict mode** is on. Don't weaken it. Don't use `any` to dodge a
  type error — fix the type.
- **Named exports only.** Everything public flows through `src/index.ts`.
- **ESM-first**, with CJS produced by the build. Use `import`/`export`; remember
  the `.js` extension on relative imports (e.g. `import { x } from "./x.js"`)
  even though the file is `.ts`.
- **Formatting/linting is automated** — run `pnpm format` rather than
  hand-aligning code. Double quotes, semicolons, 2-space indent, 100-col width.
- **No new runtime dependencies** without a strong reason — this is a library;
  every dep becomes the consumer's burden. Dev dependencies are fine.

### Commenting

This repo's defining trait: **comments everywhere, explaining the *why*.** When
you add or change code, keep that bar. Configs that support comments
(`*.ts`, `tsconfig.json`, `biome.jsonc`, YAML) should be annotated. Strict-JSON
files (`package.json`, `.changeset/config.json`) cannot hold comments — document
those in the README instead.

---

## Making a change (the workflow)

1. Write the code + its tests, commenting the *why*.
2. Run `pnpm check` — lint, typecheck, and tests must all pass.
3. Run `pnpm build` if you touched anything that affects output.
4. Record a release note: `pnpm changeset` (pick patch / minor / major).
5. Commit. CI re-runs everything; the Release workflow handles publishing.

**Definition of done:** `pnpm check` passes, behavior is covered by a test, the
*why* is commented, and a changeset exists if the public API changed.
