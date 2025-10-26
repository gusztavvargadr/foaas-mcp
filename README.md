# FOAAS MCP Server

⚠️ **EXPLICIT CONTENT WARNING** ⚠️

A secure, Docker-based [Model Context Protocol](https://modelcontextprotocol.io) server exposing [FOAAS](https://foaas.io/) (Fuck Off As A Service) operations.

## Features

- 🐳 Docker-first (Debian 12, Node.js 20.19.5, non-root)
- 🔧 18 MCP tools (14 individual `foaas_*`, 4 group `proper_*`)
- 🎲 Smart randomization in group tools
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

## Available Tools

### Individual Tools (14)
Direct FOAAS API operations with `foaas_` prefix:

**Appreciation:** thanks, awesome, legend, dalton  
**Rejections:** because, zero, bye  
**Confrontations:** off, gfy, chainsaw, keep  
**Frustration:** everyone, flying, asshole

### Group Tools (4)
Intelligent wrappers with `proper_` prefix (not standard FOAAS):

- `proper_appreciation` - Random appreciation (target optional)
- `proper_rejection` - Random rejection (no target)
- `proper_confrontation` - Random confrontation (target required)
- `proper_frustration` - Random frustration (no target)

## Documentation

- **[Development Guide](docs/DEVELOPMENT.md)** - Architecture, workflow, adding tools
- **[Tools Reference](docs/TOOLS.md)** - Detailed tool documentation
- **[Roadmap](docs/ROADMAP.md)** - Project progress and decisions

## Example Usage

In GitHub Copilot chat:
```
Express appreciation for the contributor
Tell off that annoying bug
Decline this feature request
```

## Image Tags

- `latest` - Latest stable release
- `v1.0.0` - Semantic versions
- `sha-<commit>` - Specific commits (testing)

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
