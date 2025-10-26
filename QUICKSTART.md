# Quick Start Guide

## For Local Development

```bash
# 1. Clone the repository
git clone https://github.com/gusztavvargadr/foaas-mcp.git
cd foaas-mcp

# 2. Install dependencies
npm install

# 3. Build local Docker image
npm run docker:build

# 4. Configure VS Code MCP
# The .vscode/mcp.json is already configured with two servers:
# - foaas-mcp-registry (published version)
# - foaas-mcp-local (your local build)

# 5. Enable foaas-mcp-local in VS Code
# GitHub Copilot status bar → MCP Servers → Enable foaas-mcp-local

# 6. Test via GitHub Copilot
# Ask Copilot to use any FOAAS tool
```

## Quick Commands

| Task | Command |
|------|---------|
| Build local image | `npm run docker:build` |
| Test the server | `npm test` |
| Fast iteration (no Docker) | `npm run dev` |
| View container logs | `npm run docker:logs` |
| Rebuild from scratch | `docker compose build --no-cache` |

## Development Cycle

```bash
# 1. Make changes
vim src/tools/individual/mynewtool.ts

# 2. Build
npm run docker:build

# 3. Test (mandatory!)
npm test

# 4. Restart MCP in VS Code
# (GitHub Copilot status bar → Restart MCP servers)

# 5. Test via Copilot chat
```

## Architecture

- **Local Build**: Uses `docker-compose.yml` → `foaas-mcp:local`
- **CI/CD Build**: GitHub Actions → tests → `ghcr.io/gusztavvargadr/foaas-mcp:*`
- **Transport**: stdio only (no HTTP server needed)
- **Security**: Runs as non-root user in isolated container
- **Quality Gate**: All images are tested before being published

## More Details

- See [DEVELOPMENT.md](DEVELOPMENT.md) for comprehensive development guide
- See [.github/copilot-instructions.md](.github/copilot-instructions.md) for AI assistant guidance
