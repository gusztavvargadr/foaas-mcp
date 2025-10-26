# GitHub Container Registry & CI/CD

**Completed**: October 26, 2025

## Goal

Set up automated Docker image publishing to GitHub Container Registry (GHCR) with comprehensive CI/CD pipeline for GitHub Copilot coding agent integration.

## What Was Built

### GHCR Setup
- Automated builds via `.github/workflows/docker-publish.yml`
- Multi-platform support (linux/amd64, linux/arm64)
- Smart tagging strategy:
  - PRs: `pr-<number>` (build only, no push)
  - Main commits: `sha-<commit>`
  - Version tags: `vX.Y.Z`, `vX.Y`, `vX`, `latest`

### CI/CD Pipeline
Three-step quality gate:
1. **Build**: Docker image (linux/amd64 for testing)
2. **Test**: Run `test-server.sh` (4 automated tests)
3. **Push**: Only if tests pass, rebuild multi-platform and push to GHCR

### Testing Integration
- Tests run on every PR
- Failed tests prevent registry push
- Zero broken images reach users

### Image Distribution
- Public registry: `ghcr.io/gusztavvargadr/foaas-mcp`
- Tags available: `latest`, `v0.1.0`, `sha-<commit>`

## Decisions

- **Test before push**: Quality gate ensures reliability
- **Multi-platform**: Support both amd64 and arm64
- **Smart tagging**: `latest` only on version tags (stable and predictable)
- **Public visibility**: Anyone can pull without authentication

## Integration

Successfully tested with:
- VS Code MCP (local and registry images)
- GitHub Copilot coding agent
- Dual server setup (development + production)

## Impact

- Zero-friction installation for users
- Automated quality assurance
- Production-ready image distribution
- GitHub Copilot coding agent compatibility
