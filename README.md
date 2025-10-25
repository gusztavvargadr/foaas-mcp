# FOAAS MCP Server

⚠️ **EXPLICIT CONTENT WARNING** ⚠️

A secure, Docker-based [Model Context Protocol](https://modelcontextprotocol.io) server that provides access to [FOAAS](https://foaas.io/) (Fuck Off As A Service). All responses contain explicit language and sarcasm by design.

## Features

- 🐳 **Docker-First**: Runs in isolated containers for security
- 🔧 **18 MCP Tools**: 14 individual operations + 4 intelligent group tools
- 🎲 **Smart Randomization**: Group tools intelligently select appropriate responses
- 📊 **Structured Responses**: Separate message and attribution for flexible use
- 🔒 **Security Focused**: Non-root user, minimal Debian image, stdio-only transport
- 🚀 **TypeScript**: Fully typed with strict mode

## Quick Start

### Prerequisites

- Docker installed and running
- VS Code with GitHub Copilot (recommended)

### Setup

1. **Clone and build**:
   ```bash
   git clone https://github.com/gusztavvargadr/foaas-mcp.git
   cd foaas-mcp
   npm install  # Only needed for local development
   npm run docker:build
   ```

2. **Use with VS Code**:
   - The `.vscode/mcp.json` is pre-configured to use Docker
   - Restart MCP server (GitHub Copilot status bar → restart MCP servers)
   - Test in GitHub Copilot chat
   - Start using FOAAS tools!

### Example Usage

In GitHub Copilot chat:
```
Tell the author of the latest issue to GFY
Express appreciation for the great work
Decline the feature request politely
```

## Available Tools

### Individual Tools (14)

Direct 1:1 mapping to FOAAS operations:

**Appreciation** (sarcastic):
- `foaas_thanks` - Sarcastic "fuck you very much"
- `foaas_awesome` - Enthusiastic "this is fucking awesome"
- `foaas_legend` - Call someone a "fucking legend"

**Dismissals**:
- `foaas_because` - Answer "why" with "because fuck you"
- `foaas_zero` - "Zero fucks given"
- `foaas_bye` - "Fuckity bye-bye"

**Confrontations**:
- `foaas_off` - Classic "Fuck off"
- `foaas_gfy` - Military style "Golf Foxtrot Yankee"
- `foaas_chainsaw` - Heathers reference
- `foaas_dalton` - Road House hero praise
- `foaas_keep` - Extended "keep fucking off" dismissal

**Broad Dismissals**:
- `foaas_everyone` - "Everyone can fuck off"
- `foaas_flying` - "I don't give a flying fuck"
- `foaas_asshole` - General purpose insult

### Group Tools (4)

Intelligent tools with randomization:

- `express_appreciation` - Randomly: thanks/awesome/legend
- `decline_request` - Randomly: because/zero/bye
- `tell_off` - Randomly: off/gfy/chainsaw/dalton/keep
- `express_frustration` - Randomly: everyone/flying/asshole

## Architecture

### Project Structure

```
foaas-mcp/
├── src/
│   ├── foaas/
│   │   ├── client.ts       # FOAAS API client
│   │   └── types.ts        # TypeScript interfaces
│   ├── tools/
│   │   ├── individual/     # 14 individual tools
│   │   └── groups/         # 4 group tools
│   ├── server.ts           # MCP server setup
│   └── index.ts            # Entry point (stdio)
├── .vscode/
│   └── mcp.json            # VS Code MCP configuration
├── Dockerfile              # Multi-stage secure build
└── package.json
```

### Technology Stack

- **MCP SDK**: @modelcontextprotocol/sdk v1.20.2
- **Transport**: stdio (stdin/stdout)
- **Language**: TypeScript 5.9.3 (ES2022)
- **Validation**: Zod v3.25.76
- **Runtime**: Node.js 20.19.5 on Debian 12 (Bookworm Slim)
- **Container**: Docker with non-root user, dumb-init

## Security Features

### Docker Isolation

1. **Process Isolation**: Runs in isolated container
2. **Non-root User**: Executes as `nodejs` user (UID 1001)
3. **Minimal Base**: Debian 12 Bookworm Slim (security-focused, regular updates)
4. **Pinned Version**: Node.js 20.19.5 (specific version)
5. **No Network Exposure**: stdio transport only
6. **Multi-stage Build**: Smaller final image, no build tools
7. **Signal Handling**: dumb-init for proper process management

### Why Docker by Default?

- ✅ **No Local Dependencies**: Don't need Node.js installed
- ✅ **Consistent Environment**: Same runtime everywhere
- ✅ **Automatic Cleanup**: VS Code manages container lifecycle
- ✅ **Attack Surface Minimization**: Isolated, minimal container
- ✅ **Security Updates**: Debian Bookworm gets regular security patches
- ✅ **Can't Break Host**: Contained failures

### Why Debian Bookworm Slim over Alpine?

- ✅ **Regular Security Updates**: Debian has excellent security team and update cadence
- ✅ **Better glibc Support**: Full glibc instead of musl, better Node.js compatibility
- ✅ **Fewer CVEs**: Debian stable has fewer reported vulnerabilities
- ✅ **Production Ready**: Widely used in enterprise environments

## Configuration

### VS Code (Recommended)

Pre-configured in `.vscode/mcp.json`:

```json
{
  "servers": {
    "foaas-mcp-dev": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--name",
        "foaas-mcp-stdio",
        "foaas-mcp"
      ],
      "type": "stdio"
    }
  }
}
```

**Features**:
- VS Code starts/stops container automatically
- No port conflicts or network exposure
- Logs visible in Output panel (Model Context Protocol)
- Container removed after use (`--rm` flag)

### Local Development (Alternative)

For rapid iteration only:

```bash
# Build TypeScript
npm run build

# Run locally (no Docker)
npm run dev
```

**⚠️ Remember**: Always rebuild Docker before committing:
```bash
npm run docker:build
```

## Development

### Adding a New Tool

1. **Create tool file** in `src/tools/individual/`:
   ```typescript
   import { z } from 'zod';
   import type { FoaasClient } from '../../foaas/client.js';
   
   export const newTool = {
     name: 'foaas_operation',
     description: '⚠️ EXPLICIT CONTENT: Description',
     inputSchema: z.object({
       from: z.string().describe('Who is sending')
     }),
     handler: async (args, client) => {
       const response = await client.operation(args.from);
       return {
         content: [
           { type: 'text', text: response.message },
           { type: 'text', text: response.subtitle }
         ]
       };
     }
   };
   ```

2. **Add FOAAS client method** in `src/foaas/client.ts`:
   ```typescript
   async operation(from: string): Promise<FoaasResponse> {
     return this.request(`/operation/${from}`);
   }
   ```

3. **Register in `src/server.ts`**:
   ```typescript
   import { newTool } from './tools/individual/new.js';
   // Add to individualTools array
   ```

4. **Test**:
   ```bash
   npm run docker:build
   # Restart MCP server (GitHub Copilot status bar) and test in Copilot
   ```

### Updating Dependencies

```bash
npm update
npm run docker:build
```

### Debugging

**VS Code Logs**:
- View → Output → "Model Context Protocol"
- Shows server startup and tool calls

**Container Test**:
```bash
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | docker run --rm -i foaas-mcp
```

## Troubleshooting

### Container not starting

1. Check Docker is running: `docker ps`
2. Rebuild image: `npm run docker:build`
3. Check VS Code Output panel

### Tools not appearing

1. Restart MCP server (GitHub Copilot status bar → restart MCP servers)
2. Verify `.vscode/mcp.json` exists
3. Check Docker image built: `docker images | grep foaas-mcp`

### Permission errors

Docker runs as non-root user by default. If issues:
```bash
docker run --rm -i --user root foaas-mcp
```

## GitHub Copilot Instructions

This repository includes `.github/copilot-instructions.md` to help GitHub Copilot understand the Docker-first workflow, tool patterns, and security considerations when assisting with development.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes (always test with Docker)
4. Rebuild Docker image
5. Submit a pull request

## License

MIT License - See LICENSE file for details

## Acknowledgments

- [FOAAS](https://foaas.io/) - The original Fuck Off As A Service
- [Model Context Protocol](https://modelcontextprotocol.io) - AI integration standard
- [GitHub Copilot](https://github.com/features/copilot) - AI pair programmer

---

⚠️ **Content Warning**: This project contains explicit language. Use responsibly and only in appropriate contexts.
