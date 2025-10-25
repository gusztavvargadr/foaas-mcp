# FOAAS MCP Server

⚠️ **EXPLICIT CONTENT WARNING** ⚠️

This MCP (Model Context Protocol) server provides access to [FOAAS](https://foaas.io/) - Fuck Off As A Service. All responses contain explicit language and sarcasm.

## Features

- 🔧 **18 MCP Tools**: 14 individual FOAAS operations + 4 intelligent group tools
- 🎲 **Smart Randomization**: Group tools intelligently select appropriate operations
- 📊 **Structured Responses**: Separate message and attribution for flexible use
- 🐳 **Docker Support**: Secure deployment in isolated containers
- 🌐 **HTTP Transport**: SSE-based protocol for remote access
- 🚀 **TypeScript**: Fully typed with strict mode

## Quick Start

### Local Development (stdio - Recommended for VS Code)

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Test with VS Code - just reload window, VS Code will manage the server
```

The `.vscode/mcp.json` is already configured for stdio transport.

### HTTP Server (for remote access)

```bash
# Install dependencies
npm install

# Start HTTP development server
npm run dev:http
```

The server will run on `http://localhost:3000` with SSE endpoint at `/sse`.

### Docker

```bash
# Build and run with Docker Compose
npm run docker:build
npm run docker:run

# Or manually
docker build -t foaas-mcp .
docker run -p 3000:3000 foaas-mcp
```

## Available Tools

### Individual Tools (14)

Each tool maps 1:1 to a FOAAS operation:

**Appreciation** (sarcastic):
- `foaas_thanks` - Sarcastic thanks
- `foaas_awesome` - Enthusiastic praise
- `foaas_legend` - Call someone a legend

**Dismissals**:
- `foaas_because` - Answer "why" with dismissal
- `foaas_zero` - Express zero interest
- `foaas_bye` - End conversation

**Confrontations**:
- `foaas_off` - Classic "Fuck off"
- `foaas_gfy` - Military style dismissal
- `foaas_chainsaw` - Heathers reference
- `foaas_dalton` - Road House hero reference
- `foaas_keep` - Extended dismissal

**Broad Dismissals**:
- `foaas_everyone` - Dismiss everyone
- `foaas_flying` - Express apathy
- `foaas_asshole` - General insult

### Group Tools (4)

Intelligent tools with randomization:

- `express_appreciation` - Randomly selects from thanks/awesome/legend (smart target detection)
- `decline_request` - Randomly selects from because/zero/bye
- `tell_off` - Randomly selects from off/gfy/chainsaw/dalton/keep
- `express_frustration` - Randomly selects from everyone/flying/asshole

## Endpoints

- `GET /health` - Health check
- `GET /sse` - SSE endpoint for MCP protocol
- `POST /message` - Message endpoint for MCP protocol

## Configuration for MCP Clients

### VS Code (GitHub Copilot) - Recommended

The repository includes a pre-configured `.vscode/mcp.json` using **stdio transport**:

```json
{
  "servers": {
    "foaas-mcp-dev": {
      "command": "node",
      "args": ["dist/index.js"],
      "type": "stdio"
    }
  }
}
```

**Quick Setup:**
1. Build the project: `npm run build`
2. Reload VS Code window (Cmd/Ctrl + Shift + P → "Reload Window")
3. Open Copilot Chat and start using the tools

**Why stdio?**
- ✅ Simplest transport - no HTTP server needed
- ✅ VS Code manages server lifecycle automatically
- ✅ No port conflicts
- ✅ Works offline

📖 **Detailed guide**: See [VS Code Setup Guide](docs/VSCODE_SETUP.md)

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "foaas": {
      "url": "http://localhost:3000/sse"
    }
  }
}
```

## Architecture

```
src/
├── foaas/
│   ├── types.ts          # TypeScript interfaces
│   └── client.ts         # HTTP client for FOAAS API
├── tools/
│   ├── individual/       # 14 individual operation tools
│   └── groups/          # 4 intelligent group tools
├── server.ts            # MCP server initialization
├── transport.ts         # HTTP/SSE transport layer
└── index.ts             # Entry point
```

## Technology Stack

- **MCP SDK**: @modelcontextprotocol/sdk v1.20.2
- **Transport**: Streamable HTTP (SSE)
- **Framework**: Express.js v5.1.0
- **Language**: TypeScript 5.9.3 (ES2022)
- **Validation**: Zod v3.25.76
- **Runtime**: Node.js 20+

## Testing

```bash
# Health check
curl http://localhost:3000/health

# Test with MCP inspector (if available)
npx @modelcontextprotocol/inspector http://localhost:3000/sse
```

## Documentation

See the `docs/` directory for detailed documentation:
- [`VSCODE_SETUP.md`](docs/VSCODE_SETUP.md) - **VS Code configuration and troubleshooting guide**
- [`phase-0.1-api-research.md`](docs/phase-0.1-api-research.md) - FOAAS API testing and operation categorization
- [`phase-0.2-packaging-transport.md`](docs/phase-0.2-packaging-transport.md) - MCP packaging and transport decisions
- [`phase-0.3-implementation-plan.md`](docs/phase-0.3-implementation-plan.md) - Implementation plan and task breakdown
- [`phase-0.3-implementation-completion.md`](docs/phase-0.3-implementation-completion.md) - Implementation results and metrics
- [`ROADMAP.md`](docs/ROADMAP.md) - Project roadmap and future phases

## License

MIT

## Credits

- FOAAS API: https://foaas.io/
- MCP Protocol: https://modelcontextprotocol.io/
