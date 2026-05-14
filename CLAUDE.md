# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from inside `lib/`:

```bash
npm install               # install dev dependencies
npm run build             # compile src/ → dist/ (ESM + CJS + .d.ts rollup)
npm test                  # unit tests in watch mode
npx vitest run test/unit  # unit tests, single run (no watch)
npm run test:integration  # integration tests against live archive.org
```

To run a single unit test file:
```bash
npx vitest run test/unit/query-builder.test.ts
```

## Architecture

The library lives entirely in `lib/src/`. There are no runtime dependencies — only native `fetch`.

### Builder composition (HOF mixin pattern)

`QueryBuilder` is the base class. `FieldSelectionQueryBuilder` and `FilterQueryBuilder` are higher-order functions that accept a `Constructor<QueryBuilder>` and return an extended class:

```
InternetArchiveRequestBuilder
  = FilterQueryBuilder(
      FieldSelectionQueryBuilder(
        QueryBuilder
      )
    )
```

This is the canonical way to add new builder capabilities — write a new HOF mixin function and compose it in. The `Constructor<T>` type in `types/constructor.ts` enables this pattern.

`InternetArchiveScrapeBuilder` is a plain subclass of `QueryBuilder` (no mixins) because the scrape API has a distinct query format (comma-joined `fields`, `count`, `cursor`).

### Two search APIs

- `ia.search(builder)` → `advancedsearch.php` — page-based, capped at 10k results
- `ia.scrape(builder)` → `services/search/v1/scrape` — cursor-based, no result cap

### Build output

Vite builds a dual ESM + CJS bundle from a single entry point (`src/index.ts`). The `build` script copies `dist/index.d.ts` to `dist/index.d.cts` for the CJS types path declared in `package.json` exports.

### Tests

Unit tests mock global `fetch` via `test/unit/setup.ts` and use JSON fixtures in `test/unit/fixtures/`. Integration tests hit live `archive.org` — they run single-threaded (`maxWorkers: 1`) with a 15 s timeout.
