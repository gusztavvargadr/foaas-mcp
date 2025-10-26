# Docker-First Architecture

**Completed**: October 26, 2025

## Goal

Build a secure, production-ready MCP server using Docker as the primary deployment method with stdio-only transport.

## Key Decisions

### Transport: stdio-only
- **Chosen**: stdio transport exclusively
- **Rejected**: HTTP/SSE transport
- **Reasoning**: Simpler, more secure, zero network exposure, sufficient for VS Code demonstration

### Base Image: Debian 12 Bookworm Slim
- **Chosen**: Debian Bookworm Slim
- **Rejected**: Alpine Linux
- **Reasoning**: Better CVE management, more familiar, well-maintained security updates

### Security Model
- **Non-root user**: nodejs UID 1001 (not root)
- **dumb-init**: Proper signal handling and PID 1 reaping
- **Zero vulnerabilities**: Clean npm audit
- **No network exposure**: stdio transport only

### Distribution: Docker Image Only
- **Chosen**: GitHub Container Registry (GHCR)
- **Rejected**: npm package distribution
- **Reasoning**: Security isolation, controlled environment, easier updates

## Implementation

### Dockerfile
- Multi-stage build for clean images
- Node.js 20.19.5 LTS
- Production dependencies only
- Health checks and proper labels

### Development Workflow
- `docker-compose.yml` for local builds
- `test-server.sh` for automated testing
- npm scripts for common tasks

### VS Code Integration
- `.vscode/mcp.json` configuration
- Dual server setup (local + registry)
- Restart workflow via status bar

## Impact

- Production-grade security from day one
- Consistent environment across all platforms
- Easy updates via image pulls
- Zero installation complexity for users
- Docker isolation protects host system

## Trade-offs Accepted

- Can't access remotely (stdio-only)
- Requires Docker installation
- Slightly larger image than Alpine (but better security)

All trade-offs acceptable for project scope and security priorities.
