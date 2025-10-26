# Build Script Externalization

**Status**: Backlog

## Goal

Externalize CI build logic into portable scripts that work identically locally and in CI, inspired by Cake/Nuke build systems from the .NET ecosystem.

## Problem Statement

Current CI setup has several issues:
- **Complex bash in YAML** - ~200+ lines of embedded bash scripts
- **Local/CI drift** - Different execution paths locally vs in CI
- **Hard to test** - Must push commits to test CI changes
- **Poor maintainability** - YAML is not a good scripting language
- **Vendor lock-in** - Logic tied to GitHub Actions specifics

## Proposed Solution

Create reusable build scripts that CI simply invokes:

```bash
# Local development
npm run ci:test           # Run all tests (unit + coverage + Docker)
npm run ci:build          # Build Docker image
npm run ci:publish        # Push to registry
npm run ci:summary        # Generate build summary

# CI workflow becomes minimal:
- run: npm run ci:test
- run: npm run ci:build  
- run: npm run ci:publish
```

## Implementation Options

### Option A: Plain Node.js Scripts
- Create `scripts/ci/` directory
- Write scripts in TypeScript using tsx
- Use existing dependencies (no new tools)
- Example: `scripts/ci/test.ts`, `scripts/ci/build.ts`

### Option B: Use zx (Google's bash in JS)
- Install `zx` package
- Write bash-like scripts in JavaScript
- Better for shell command orchestration
- Example: `scripts/ci/test.mjs`

### Option C: Use a Build Tool
- **Taskfile** - Simple YAML-based task runner
- **Just** - Command runner (like make but better)
- **Nx** - Full-featured build system (might be overkill)

## Scope

### Scripts to Externalize

1. **Test Script** (`scripts/ci/test.ts`)
   - Run unit tests
   - Generate coverage report
   - Parse results for summary generation
   - Exit with proper codes

2. **Build Script** (`scripts/ci/build.ts`)
   - Build Docker image
   - Tag appropriately
   - Run integration tests
   - Extract metadata (size, tags, etc.)

3. **Publish Script** (`scripts/ci/publish.ts`)
   - Push multi-platform image
   - Generate registry URLs
   - Output digest information

4. **Summary Script** (`scripts/ci/summary.ts`)
   - Generate GitHub Actions summary markdown
   - Works with generic input (can be adapted for other CI)
   - Reusable for local reporting

### CI Workflow Simplification

GitHub Actions workflow should become:

```yaml
- name: Set up Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '20'

- name: Install dependencies
  run: npm ci

- name: Run tests
  run: npm run ci:test

- name: Build Docker image
  run: npm run ci:build

- name: Publish to registry
  if: github.event_name != 'pull_request'
  run: npm run ci:publish
  env:
    DOCKER_REGISTRY: ${{ env.REGISTRY }}
    DOCKER_USERNAME: ${{ github.actor }}
    DOCKER_PASSWORD: ${{ secrets.GITHUB_TOKEN }}
```

## Benefits

✅ **Consistency** - Same scripts work locally and in CI  
✅ **Testability** - Debug build logic without pushing commits  
✅ **Simplicity** - CI config becomes 20-30 lines instead of 200+  
✅ **Portability** - Easy to migrate to different CI systems  
✅ **Better tooling** - Real programming language with IDE support  
✅ **Versioned** - Build logic is in the repo, versioned with code  
✅ **Reusability** - Scripts can be called from multiple CI jobs/workflows

## Considerations

### Pros
- Dramatically reduces CI complexity
- Improves local development workflow
- Makes CI changes testable locally
- Easier to maintain and understand

### Cons
- Initial effort to refactor existing CI logic
- Need to handle environment differences (local vs CI)
- Another layer of abstraction

### Environment Handling

Scripts should detect environment:
```typescript
const isCI = process.env.CI === 'true';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

if (isGitHubActions) {
  // Write to $GITHUB_STEP_SUMMARY
} else {
  // Print to console
}
```

## Related

- Inspired by .NET build tools: Cake, Nuke, FAKE
- Similar to JavaScript tools: Nx, Turborepo, Taskfile
- Follows "build scripts as code" philosophy

## Success Criteria

- [ ] CI workflow reduced to <50 lines
- [ ] All build steps work identically locally and in CI
- [ ] Can test full CI pipeline locally without Docker
- [ ] Summary generation works in both environments
- [ ] Easy to add new build steps
- [ ] Documentation for local CI testing

## Estimated Effort

~4-6 hours:
- 2 hours: Create test + build scripts
- 1 hour: Create publish + summary scripts
- 1 hour: Simplify CI workflow
- 1 hour: Testing and documentation

## Dependencies

None - can be implemented anytime after v0.1.0 release

## Notes

This refactoring would make the complexity added in the unit-tests PR (workflow summaries, coverage extraction, etc.) much cleaner and more maintainable. The bash-in-YAML approach works but is a code smell that should be addressed.
