# FOAAS MCP Server

⚠️ **EXPLICIT CONTENT WARNING** ⚠️

A secure, Docker-based [Model Context Protocol](https://modelcontextprotocol.io) server exposing [FOAAS](https://foaas.io/) (Fuck Off As A Service) operations. Perfect for adding humorous (and explicit) responses to development workflows.

## Features

- 🐳 Docker-first (Debian 12, Node.js 20.19.5, non-root)
- 🔧 23 MCP tools covering common dev scenarios
- � Scenario-based organization (bug reports, code reviews, PRs, etc.)
- 🔒 stdio-only transport (no network exposure)

## Quick Start

### Using Pre-built Image

```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest
```

**VS Code Configuration** (`.vscode/mcp.json`):
```json
{
  "mcpServers": {
    "foaas": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "ghcr.io/gusztavvargadr/foaas-mcp:latest"]
    }
  }
}
```

### Building from Source

```bash
git clone https://github.com/gusztavvargadr/foaas-mcp.git
cd foaas-mcp
npm run docker:build
```

Restart MCP server in VS Code (GitHub Copilot status bar → Restart MCP Servers).

## Available Tools (23 Total)

All tools provide direct 1:1 mapping to FOAAS operations with `foaas_` prefix:

**Appreciation & Praise (4):** thanks, awesome, legend, dalton  
**Rejections & Dismissals (3):** because, zero, bye  
**Direct Confrontations (4):** off, gfy, chainsaw, keep  
**General Frustration (3):** everyone, flying, asshole  
**Code Review & Quality (9):** logs, rtfm, think, thinking, shutup, look, ridiculous, understand, cool

## Documentation

- **[Development Guide](docs/DEVELOPMENT.md)** - Architecture, workflow, adding tools
- **[Tools Reference](docs/TOOLS.md)** - Detailed tool documentation
- **[Roadmap](docs/roadmap/)** - Development roadmap and feature tracking
- **[Demo Repository](https://github.com/gusztavvargadr/foaas-mcp-demo)** - Sample issues, PRs, and recording guides

## Example Usage

**Development Scenarios:**

```
# Bug Reports
"Someone reported 'it doesn't work' with no details" → foaas_logs
"Question already answered in docs" → foaas_rtfm

# Code Reviews
"Acknowledge this great bug fix from @contributor" → foaas_legend
"This code makes no sense" → foaas_understand
"Stop arguing about variable names" → foaas_shutup

# Pull Requests & Issues
"Respond to this absurd feature request" → foaas_ridiculous
"Close this duplicate issue" → foaas_bye
"Sarcastic approval for whitespace PR" → foaas_cool

# General Team Communication
"Praise the teammate who fixed production" → foaas_dalton
"React to this impossible deadline" → foaas_ridiculous
```

See [docs/TOOLS.md](docs/TOOLS.md) for complete scenario guide and tool reference.

## Image Tags

- `latest` - Latest stable release
- `v1.0.0` - Semantic versions
- `sha-<commit>` - Specific commits (testing)

## Documentation

- [TOOLS.md](docs/TOOLS.md) - Complete tool reference with scenarios
- [DEVELOPMENT.md](docs/DEVELOPMENT.md) - Developer guide
- [Roadmap](docs/roadmap/) - Development roadmap and feature tracking

## Security

- Process isolation via Docker
- Non-root user (nodejs UID 1001)
- Minimal Debian 12 Bookworm Slim base
- stdio-only transport (no network)
- Regular security updates

## License

MIT License - See LICENSE file for details

## Links

- [FOAAS](https://foaas.io/) - Original API
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [GitHub Copilot](https://github.com/features/copilot) - AI integration
