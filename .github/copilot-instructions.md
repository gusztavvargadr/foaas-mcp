# GitHub Copilot Instructions for FOAAS MCP

## Project Overview

MCP server exposing FOAAS (Fuck Off As A Service) via Docker. Uses stdio transport for VS Code integration.

⚠️ **Content Warning**: Intentionally contains explicit language.

## Architecture

**Transport**: stdio only (no HTTP) - simpler, more secure, sufficient for VS Code demo  
**Runtime**: Docker (Debian 12 Bookworm Slim + Node.js 20.19.5 + dumb-init)  
**Language**: TypeScript 5.9.3 (ES2022 modules, strict mode)  
**Tools**: 23 individual tools (all `foaas_*` prefix, direct 1:1 API mapping)

### Tool Design Pattern

**Individual tools only** (`foaas_*`): Direct 1:1 mapping to FOAAS API operations
- Example: `foaas_legend` → `GET /legend/{name}/{from}`
- Example: `foaas_logs` → `GET /logs/{from}`
- Direct, predictable, AI picks best contextual fit
- No randomization - precise control over responses

**Why individual tools only?**
- Consistent parameters within each tool
- AI can select the perfect response for context
- Simpler architecture (1 tool = 1 operation)
- Better demo of MCP's smart tool selection
- Removed group tools due to parameter inconsistency

### Key Files

- `src/server.ts` - MCP server setup, tool registration (import → array → register)
- `src/foaas/client.ts` - FOAAS API client (all operations, URL encoding, error handling)
- `src/tools/shared/schemas.ts` - Shared Zod schemas (`fromParam`, `toParam`, `formatFoaasResponse`)
- `src/tools/individual/*.ts` - Individual tool implementations (1 file = 1 tool)

## Development Workflow

### Build & Test Loop
```bash
npm run docker:build    # Build local image (foaas-mcp:local)
npm test               # Run ./test-server.sh (tools list + 2 sample calls)
```

**Critical**: Always test Docker image before committing. Tests run against actual container.

### VS Code Testing
1. Build local image: `npm run docker:build`
2. Restart MCP server (GitHub Copilot status bar → Restart MCP Servers)
3. Ensure `.vscode/mcp.json` has `foaas-mcp-local` server enabled
4. Test in Copilot chat with natural language

### Debugging
- **MCP logs**: View → Output → "Model Context Protocol"
- **Manual container test**: `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run --rm -i foaas-mcp:local`
- **Test specific tool**: Update JSON-RPC request with `tools/call` method

## Code Guidelines

### Shared Schemas (REQUIRED)
Always use from `src/tools/shared/schemas.ts`:

```typescript
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

// from = who is sending/performing action (always required)
// to = who/what is receiving/targeted (required for operations with targets)
// formatFoaasResponse(message, subtitle) = standard response format
```

**Why consistent `from`/`to`?** Makes parameter direction immediately clear to AI agents and developers.

### Adding a New Individual Tool

**1. Create tool file** (`src/tools/individual/newop.ts`):
```typescript
import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const newopTool = {
  name: 'foaas_newop',
  description: 'Use for [specific use case]. [When/why to use this tool].',
  inputSchema: z.object({
    to: toParam,  // Include if operation takes a target
    from: fromParam
  }),
  handler: async (args, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.newop(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
```

**Description guidelines:**
- Focus purely on use cases and scenarios (no explicit content warnings)
- Keep responses as surprises - describe when to use, not what it says
- Be specific about the situation (e.g., "debugging issues", "code review requests")

**2. Add client method** (`src/foaas/client.ts`):
```typescript
async newop(name: string, from: string): Promise<FoaasResponse> {
  return this.fetch(`/newop/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
```
```


**3. Register in server** (`src/server.ts`):
```typescript
import { newopTool } from './tools/individual/newop.js';
const allTools = [...existing, newopTool];
```

**4. Build, test, commit**:
```bash
npm run docker:build && npm test
```

## Tool Categories

**Individual (`foaas_*`)** - 23 operations:
- **Appreciation**: thanks, awesome, legend, dalton (praise/thanks)
- **Rejections**: because, zero, bye (decline requests)
- **Confrontations**: off, gfy, chainsaw, keep (direct dismissal)
- **Frustration**: everyone, flying, asshole (universal frustration)
- **Code Review & Quality**: logs, rtfm, think, thinking, shutup, look, ridiculous, understand, cool

## CI/CD Pipeline

**On Pull Requests:**
1. Build Docker image (linux/amd64 only)
2. Run automated tests (`./test-server.sh`)
3. Report status (❌ no push to registry)

**On Main Branch / Version Tags:**
1. Build Docker image (linux/amd64 only)
2. Run automated tests
3. **If tests pass**: Rebuild multi-platform (linux/amd64 + linux/arm64)
4. Push to GHCR with appropriate tags

**Tags generated:**
- PRs: `pr-<number>` (e.g., `pr-5`)
- Main commits: `sha-<commit>` (e.g., `sha-a1b2c3d`)
- Version tags: `v1.0.0`, `1.0.0`, `1.0`, `1`, `latest`

**Critical**: Failed tests = no registry push. This ensures broken images never reach users.

## Security Model

- **Docker isolation**: Process runs in container, not host
- **Non-root user**: nodejs UID 1001 (not root)
- **dumb-init**: Proper signal handling (PID 1 reaping)
- **Minimal base**: Debian 12 Bookworm Slim (better CVE management than Alpine)
- **No network**: stdio transport only (zero network exposure)
- **URL encoding**: All user inputs encoded in FOAAS client

## Documentation Structure

- `README.md` - User-facing quick start (installation, usage, examples)
- `docs/DEVELOPMENT.md` - Developer guide (architecture, workflows, debugging)
- `docs/TOOLS.md` - Tool reference (detailed tool documentation)
- `docs/ROADMAP.md` - Project progress and decisions (living document)
- `.github/copilot-instructions.md` - This file (AI coding assistant guide)

**Rule**: Keep docs minimal, no duplication. Each doc has a specific audience and purpose.
