# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
# Install dependencies
bun install

# Run dev server with hot reload (http://localhost:3000)
bun run dev

# Run tests
bun test

# Run a single test file
bun test src/tests/index.test.ts

# Lint
bunx eslint .

# Lint with auto-fix
bunx eslint . --fix
```

## Architecture

This is a Bun + Hono API server project in early development. The entry point is `src/index.ts`, which exports the Hono app instance as the default export (Bun convention).

- **Framework**: [Hono](https://hono.dev/) via `@hono/zod-openapi` (`OpenAPIHono`), which extends Hono with Zod schema validation and OpenAPI spec generation.
- **Runtime**: Bun (not Node.js)
- **Linting**: `@antfu/eslint-config` with formatters enabled (handles both linting and formatting)
- **Tests**: Bun's built-in test runner (`bun:test`), located in `src/tests/`. Tests call `app.fetch()` directly without spinning up an HTTP server.

## Data

`data/artic-api-data/` is a git submodule containing a sample of the [Art Institute of Chicago public API dataset](https://api.artic.edu/docs). The `json/` subdirectory contains records keyed by ID for each API endpoint. `getting-started/allArtworks.jsonl` and `getting-started/someArtworks.csv` are smaller samples for quick reference. Images are not included in the dataset.
