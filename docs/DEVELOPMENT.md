# Development Guide

## Project Architecture

**Transport**: stdio only (no HTTP/network)  
**Runtime**: Docker (Debian 12 Bookworm Slim + Node.js 20.19.5)  
**Language**: TypeScript 5.9.3 (ES2022, strict mode)  
**Tools**: 18 total (14 `foaas_*` individual, 4 `proper_*` groups)

## Tool Categories

### Individual Tools (14) - Direct FOAAS API mapping
- `foaas_*` prefix: thanks, awesome, legend, dalton, because, zero, bye, off, gfy, chainsaw, keep, everyone, flying, asshole

### Group Tools (4) - Smart wrappers with randomization
- `proper_appreciation`: thanks/awesome/legend/dalton (target optional)
- `proper_rejection`: because/zero/bye (no target)
- `proper_confrontation`: off/gfy/chainsaw/keep (target required)
- `proper_frustration`: everyone/flying/asshole (no target)

**Why `proper_` prefix?** These are not standard FOAAS operations - they're intelligent wrappers that randomly select from multiple operations.

## Development Workflow

### 1. Build & Test
```bash
npm run docker:build    # Build local image
npm test               # Run automated tests
```

### 2. VS Code Testing
- Restart MCP server (GitHub Copilot status bar)
- Enable `foaas-mcp-local` server
- Test in Copilot chat

### 3. Always test Docker before committing

## Adding New Tools

**Individual tool:**
```typescript
// src/tools/individual/operation.ts
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const operationTool = {
  name: 'foaas_operation',
  description: '⚠️ EXPLICIT CONTENT: Description',
  inputSchema: z.object({ from: fromParam }),
  handler: async (args, client) => {
    const response = await client.operation(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
```

**Register in `src/server.ts`:**
```typescript
import { operationTool } from './tools/individual/operation.js';
const individualTools = [..., operationTool];
```

**Add client method in `src/foaas/client.ts`:**
```typescript
async operation(from: string): Promise<FoaasResponse> {
  return this.fetch(`/operation/${encodeURIComponent(from)}`);
}
```

## Shared Schemas

Always use shared schemas from `src/tools/shared/schemas.ts`:
- `fromParam` - Standard "from" parameter
- `targetPersonParam` - Generic target parameter
- `praisePersonParam` - For appreciation
- `dismissPersonParam` - For confrontation
- `formatFoaasResponse()` - Standard response formatter

## CI/CD Pipeline

**On PRs:**
1. Build Docker (amd64)
2. Run automated tests
3. Report results (no push)

**On main/tags:**
1. Build Docker (amd64)
2. Run automated tests
3. **If tests pass**: Rebuild multi-platform (amd64 + arm64)
4. Push to GHCR

**Tags:**
- `latest` - Latest stable release
- `v1.0.0` - Semantic versions
- `sha-<commit>` - Specific commits

## Debugging

**VS Code logs:** View → Output → "Model Context Protocol"

**Container test:**
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run --rm -i foaas-mcp:local
```

**Test specific tool:**
```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"AI assistant"}}}' | docker run --rm -i foaas-mcp:local
```
