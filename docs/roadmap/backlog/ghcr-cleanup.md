# GHCR Cleanup & Tagging Strategy

**Status**: Backlog

## Goal

Implement automated cleanup of GitHub Container Registry (GHCR) to remove unstable versions and establish clear stable/unstable tagging.

## Context

Current CI/CD creates tags for every commit (`sha-<commit>`) and PR (`pr-<number>`). Over time, this accumulates many unused images consuming storage and making registry cluttered.

## Current Tagging (from CI/CD)

**Stable Tags** (kept permanently):
- `latest` - Latest stable release (from version tags)
- `vX.Y.Z` - Specific version (e.g., `v0.1.0`)
- `vX.Y` - Minor version (e.g., `v0.1`)
- `vX` - Major version (e.g., `v0`)

**Unstable Tags** (temporary):
- `sha-<commit>` - Specific commit from main branch
- `pr-<number>` - Pull request builds (not pushed currently)

## Proposed Cleanup Strategy

### Additional Tags

**Stable:**
- `stable` - Alias for `latest` (clearer naming)
- `vX.Y.Z` - Keep indefinitely

**Unstable:**
- `unstable` - Latest from main branch (not a release)
- `sha-<commit>` - Keep for 30 days, then delete
- `pr-<number>` - Keep for 7 days after PR close, then delete
- `dev` - Latest development build (replaces `unstable`)

### Retention Policy

**Keep Forever:**
- Version tags (`v*`)
- `latest` / `stable`

**Keep 30 Days:**
- Commit SHAs from main branch
- Useful for debugging recent issues
- Automatic cleanup after 30 days

**Keep 7 Days After PR Close:**
- PR-specific builds
- Testing and review period
- Cleanup after merge/close

**Keep 1 (Overwrite):**
- `unstable` / `dev` - Always points to latest main
- `pr-<number>` - Replaced on each push

## Implementation

### GitHub Actions Workflow

**New: `cleanup-ghcr.yml`**
```yaml
name: GHCR Cleanup

on:
  schedule:
    - cron: '0 2 * * 0'  # Weekly, Sunday 2 AM
  workflow_dispatch:      # Manual trigger

jobs:
  cleanup:
    runs-on: ubuntu-latest
    steps:
      - name: Delete old sha- tags
        uses: actions/github-script@v7
        with:
          script: |
            const cutoff = new Date();
            cutoff.setDate(cutoff.getDate() - 30);
            
            // Query package versions
            // Delete sha- tags older than 30 days
      
      - name: Delete old PR tags
        uses: actions/github-script@v7
        with:
          script: |
            // Query closed PRs
            // Delete pr- tags after 7 days of close
```

### Update Publishing Workflow

**Modify: `docker-publish.yml`**
```yaml
# Add unstable/dev tag for main branch
- name: Tag unstable
  if: github.ref == 'refs/heads/main'
  run: |
    docker tag $IMAGE_NAME $IMAGE_NAME:unstable
    docker push $IMAGE_NAME:unstable

# Ensure stable tag matches latest
- name: Tag stable
  if: startsWith(github.ref, 'refs/tags/v')
  run: |
    docker tag $IMAGE_NAME $IMAGE_NAME:stable
    docker push $IMAGE_NAME:stable
```

## Tag Usage Guide

### For Users

**Production:**
```json
{
  "mcpServers": {
    "foaas": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "ghcr.io/gusztavvargadr/foaas-mcp:stable"]
    }
  }
}
```

**Specific Version:**
```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:v0.1.0
```

**Testing Latest Dev:**
```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:unstable
```

### For Developers

**Test Specific Commit:**
```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:sha-a1b2c3d
# Available for 30 days
```

**Test PR Build:**
```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:pr-42
# Available during review + 7 days after close
```

## Storage Benefits

### Current Issue
- Unlimited accumulation of `sha-*` tags
- Storage costs increase over time
- Cluttered package versions list
- Hard to find relevant versions

### After Cleanup
- Controlled storage usage
- Clear version history
- Only relevant tags remain
- Predictable costs

### Example Savings
**Before:**
- 100 commits × 200MB = 20GB
- Grows indefinitely

**After:**
- ~10 recent commits (30 days) × 200MB = 2GB
- Stable versions kept
- 90% storage reduction

## Documentation Updates

### README.md
Document tag meanings and recommendations:
- `stable` / `latest` for production
- `vX.Y.Z` for specific versions
- `unstable` for testing latest
- Don't rely on `sha-*` or `pr-*` tags

### DEVELOPMENT.md
Document development workflow:
- Local testing with `:local` tag
- CI/CD creates temporary tags
- Cleanup schedule
- How to access older versions (Git tags)

## Monitoring

### Metrics to Track
- Number of package versions
- Total storage used
- Cleanup effectiveness
- Download statistics per tag

### Alerts
- Storage exceeds threshold
- Cleanup job failures
- Unexpected tag accumulation

## Related

- [GHCR & CI/CD](../completed/ghcr-cicd.md) - Current setup
- `.github/workflows/docker-publish.yml` - Publishing workflow
- GitHub Container Registry documentation
- Package retention policies
