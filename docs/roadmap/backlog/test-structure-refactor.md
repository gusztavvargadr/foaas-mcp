# Test Structure Refactor

**Status**: Backlog

## Goal

Refactor test files to a dedicated root-level `tests/` or `__tests__/` directory instead of `src/__tests__/` to improve project organization and separation of concerns.

## Current Structure

```
src/
├── __tests__/
│   ├── client.test.ts
│   ├── schemas.test.ts
│   ├── server.test.ts
│   └── tools.test.ts
├── foaas/
├── tools/
├── index.ts
└── server.ts
```

## Proposed Structure Option A (Flat)

```
tests/
├── client.test.ts
├── schemas.test.ts
├── server.test.ts
└── tools.test.ts
src/
├── foaas/
├── tools/
├── index.ts
└── server.ts
```

## Proposed Structure Option B (Mirrored)

```
tests/
├── foaas/
│   └── client.test.ts
├── tools/
│   └── shared/
│       └── schemas.test.ts
├── server.test.ts
└── integration/
    └── tools.test.ts
src/
├── foaas/
├── tools/
├── index.ts
└── server.ts
```

## Benefits

- **Cleaner src/ directory**: Source code and tests separated at root level
- **Standard convention**: Many projects follow this pattern (Jest, Vitest docs recommend it)
- **Clearer intent**: Root-level `tests/` makes testing visible and intentional
- **Build optimization**: Easier to exclude tests from production builds
- **Better IDE support**: Some tools work better with root-level test directories

## Implementation Tasks

1. Create root-level `tests/` directory
2. Move test files from `src/__tests__/` to `tests/`
3. Update import paths in test files (adjust relative paths)
4. Update `vitest.config.ts` if needed (though Vitest auto-detects `*.test.ts`)
5. Update `.gitignore` if needed
6. Run tests to verify everything works
7. Remove empty `src/__tests__/` directory
8. Update documentation if tests are mentioned

## Considerations

- **Import paths**: Test files will need adjusted relative imports
  - `from '../foaas/client.js'` → `from '../src/foaas/client.js'`
  - `from '../tools/shared/schemas.js'` → `from '../src/tools/shared/schemas.js'`
- **Coverage reporting**: Verify coverage still works correctly
- **TypeScript config**: May need `tsconfig.test.json` or path adjustments
- **Low priority**: Current structure works fine, this is purely organizational
- **Breaking change risk**: Low (only affects dev environment, not runtime)

## Decision Factors

- **Option A** (flat): Simpler, less nesting, good for small test suites
- **Option B** (mirrored): Better organization for larger projects, mirrors src structure
- **Current** (in src): Works fine, common in TypeScript projects, no strong reason to change

## Recommendation

**Low priority**. Current structure (`src/__tests__/`) is a valid convention and works well. Only refactor if:
1. Project grows significantly in test count
2. Team prefers separation at root level
3. Build/tooling issues arise with current structure

For now, existing structure is perfectly acceptable for a project this size.
