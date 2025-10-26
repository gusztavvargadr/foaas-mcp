# CI/CD Pipeline with Testing

## Overview

The CI/CD pipeline ensures that **only tested and verified images** are published to the registry. This provides a quality gate that prevents broken builds from reaching users.

## Pipeline Flow

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Trigger (PR, Push to main, or Tag)                       │
└─────────────────────────────────────┬───────────────────────┘
                                      │
┌─────────────────────────────────────▼───────────────────────┐
│ 2. Build Docker Image (amd64 only for testing)              │
│    - Multi-stage build                                       │
│    - With VERSION, COMMIT_SHA, BUILD_DATE args              │
└─────────────────────────────────────┬───────────────────────┘
                                      │
┌─────────────────────────────────────▼───────────────────────┐
│ 3. Run Automated Tests                                       │
│    ✓ List all tools (18 expected)                          │
│    ✓ Call simple tool (foaas_awesome)                      │
│    ✓ Call complex tool (foaas_legend)                      │
│    ✓ Verify shared schemas ("AI assistant" in responses)   │
└─────────────────────────────────────┬───────────────────────┘
                                      │
                            ┌─────────▼─────────┐
                            │  Tests Failed?    │
                            └─────────┬─────────┘
                                      │
                        ┌─────────────┼─────────────┐
                        │ YES                    NO │
                        ▼                           ▼
            ┌───────────────────┐      ┌───────────────────────┐
            │ ❌ STOP            │      │ ✅ Continue            │
            │ Do not push        │      │ (Main/Tags only)      │
            │ Report failure     │      └───────────┬───────────┘
            └───────────────────┘                  │
                                      ┌────────────▼────────────┐
                                      │ 4. Rebuild Multi-Arch   │
                                      │    (amd64 + arm64)      │
                                      └────────────┬────────────┘
                                                   │
                                      ┌────────────▼────────────┐
                                      │ 5. Push to Registry     │
                                      │    ghcr.io/...          │
                                      └─────────────────────────┘
```

## Test Details

The `test-server.sh` script performs the following checks:

1. **List Tools Test**
   - Sends `tools/list` request
   - Expects 18 tools (14 individual, 4 group)

2. **Simple Tool Call Test**
   - Calls `foaas_awesome` with `from: "AI assistant"`
   - Verifies response contains "This is Fucking Awesome."

3. **Complex Tool Call Test**
   - Calls `foaas_legend` with `name: "the developer"` and `from: "AI assistant"`
   - Verifies response contains "you're a fucking legend."

4. **Shared Schema Verification**
   - Checks that "AI assistant" appears in response subtitles
   - Confirms refactored shared schemas are working

## Event-Based Behavior

| Event | Build | Test | Push |
|-------|-------|------|------|
| Pull Request | ✅ amd64 | ✅ Yes | ❌ No |
| Push to main | ✅ amd64 → multi-arch | ✅ Yes | ✅ Yes (if tests pass) |
| Version Tag | ✅ amd64 → multi-arch | ✅ Yes | ✅ Yes (if tests pass) |

## Benefits

1. **Quality Assurance**: Broken builds never reach the registry
2. **Fast Feedback**: PRs are tested without multi-arch overhead
3. **Cost Efficient**: Multi-arch builds only for publishable commits
4. **Confidence**: Every published image has been verified
5. **Debugging**: Test failures visible in GitHub Actions logs

## Local Testing

You can run the same tests locally:

```bash
# Build local image
npm run docker:build

# Run tests
npm test

# Or test a specific image
./test-server.sh foaas-mcp:local
```

## Viewing Test Results

In GitHub Actions:
1. Navigate to Actions tab
2. Click on the workflow run
3. Expand "Test MCP Server" step
4. View detailed test output with ✅/❌ indicators
