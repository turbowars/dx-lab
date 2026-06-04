# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

To record a change for the next release, run:

```bash
npx changeset
```

Pick the bump type (patch / minor / major) and write a short summary. The CLI
writes a markdown file here; `changeset version` later consumes it to bump
`package.json` and update the changelog, and `changeset publish` ships it to npm.
