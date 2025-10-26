# GitHub Copilot Instructions for FOAAS MCP

## Project Overview

This is a Model Context Protocol (MCP) server that exposes FOAAS (Fuck Off As A Service) functionality to AI clients. The project uses Docker by default for security and isolation.

## Important Context

⚠️ **Content Warning**: This project intentionally contains explicit language as it wraps the FOAAS API. All tools return profane messages by design.

## Development Workflow

### Docker-First Approach

This project uses **Docker as the primary runtime** for security reasons:

1. **Building Locally**:
   ```bash
   npm run docker:build
   ```
   This uses `docker-compose` to build a local image tagged as `foaas-mcp:local`.

2. **Testing with VS Code MCP**: 
   - The `.vscode/mcp.json` defines two servers:
     - `foaas-mcp-registry`: Published image from GHCR
     - `foaas-mcp-local`: Your local build
   - Restart the MCP server to pick up changes (GitHub Copilot status bar → restart)
   - The server runs in a container automatically

3. **CI/CD Builds**:
   - GitHub Actions uses the same Dockerfile
   - **Builds image first, tests it, then pushes only if tests pass**
   - Build args (VERSION, COMMIT_SHA) are set dynamically
   - Multi-platform builds for amd64 and arm64
   - Test results visible in GitHub Actions logs

### Local Development (Only for Iteration)

Only use local Node.js during rapid development:
```bash
npm run dev      # stdio transport only
```

**Always test with Docker before committing.**

## Architecture

### Transport Mode

**stdio only**: For VS Code MCP integration
- Used by: `.vscode/mcp.json`
- No network exposure
- Direct stdin/stdout communication
- Maximum security (no HTTP server needed)

### Tool Categories

1. **Individual Tools (14)**: Direct 1:1 mapping to FOAAS operations
   - Located in: `src/tools/individual/`
   - Example: `foaas_gfy`, `foaas_thanks`, `foaas_zero`

2. **Group Tools (4)**: Intelligent wrappers with randomization
   - Located in: `src/tools/groups/`
   - Example: `express_appreciation`, `decline_request`, `tell_off`, `express_frustration`
   - These randomly select from thematically related individual tools

## Code Guidelines

### Shared Schemas and Utilities

Common parameter definitions and utilities are centralized in `src/tools/shared/schemas.ts`:

- **`fromParam`**: Standard "from" parameter used in all tools
- **`targetPersonParam`**: Generic target/name parameter for person-directed operations
- **`praisePersonParam`**: Specific parameter for praise-oriented operations
- **`dismissPersonParam`**: Specific parameter for dismissal operations  
- **`disbeliefPersonParam`**: Specific parameter for disbelief expressions
- **`formatFoaasResponse()`**: Standard response formatter

**Always use these shared definitions** instead of duplicating schemas.

### When Adding New Tools

1. **Individual Tool Pattern**:
   ```typescript
   import { z } from 'zod';
   import type { FoaasClient } from '../../foaas/client.js';
   import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
   import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

   export const newTool = {
     name: 'foaas_operation',
     description: '⚠️ EXPLICIT CONTENT: Brief description',
     inputSchema: z.object({
       from: fromParam  // Use shared schema
     }),
     handler: async (args, client) => {
       const response = await client.operation(args.from);
       return formatFoaasResponse(response.message, response.subtitle);
     }
   };
   ```

2. **Register in `src/server.ts`**:
   - Import the tool
   - Add to `individualTools` or `groupTools` array

3. **Add FOAAS client method** in `src/foaas/client.ts`:
   ```typescript
   async operation(param: string): Promise<FoaasResponse> {
     return this.request(`/operation/${param}`);
   }
   ```

### Tool Schema Best Practices

When defining tool input schemas, follow these patterns to help AI clients understand what parameters to provide:

1. **Use Shared Schemas First**:
   - Check `src/tools/shared/schemas.ts` for existing parameter definitions
   - Only create new schemas if the existing ones don't fit

2. **Required Parameters**:
   - Start description with `REQUIRED:` prefix
   - Provide context-aware guidance for the AI
   - Example: `'REQUIRED: Who is expressing appreciation. Use "AI assistant" when called by an AI agent, otherwise use the current user\'s name.'`

3. **Optional Parameters**:
   - Start description with `OPTIONAL:` prefix
   - Explain when/why the parameter is needed
   - Example: `'OPTIONAL: Person to appreciate (required for "legend" operation). Use context: issue author, PR creator, etc.'`

4. **Context-Aware `name`/`target` Parameters**:
   - Provide situational examples based on common use cases
   - Help AI understand who the message should target
   - Pattern: `'REQUIRED: Who/what to [action]. Use context: issue author, PR creator, person making request, annoying bug, etc.'`

5. **Parameter Ordering**:
   - Put most important required parameters first
   - Put `from` parameter before `target`/`name` for consistency (when both present)
   - Put optional parameters last

**Example - Good Schema**:
```typescript
import { fromParam, praisePersonParam, formatFoaasResponse } from '../shared/schemas.js';

inputSchema: z.object({
  name: praisePersonParam,
  from: fromParam,
  operation: z.enum(['thanks', 'awesome']).default('thanks').describe('OPTIONAL: Which operation. Default: thanks')
})
```

**Example - Poor Schema** (Don't do this):
```typescript
inputSchema: z.object({
  name: z.string().describe('Person'),
  from: z.string().describe('Sender')
})
```

### Testing Changes

**CRITICAL: Always test after every change!**

**Quick Test (Recommended):**
```bash
npm test
# or explicitly: npm run test:local
```

**Manual Tests:**
1. **Build**: `npm run docker:build`
2. **Test list_tools**: Verify all tools are registered
   ```bash
   echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run --rm -i foaas-mcp:local
   ```
3. **Test a simple tool**: Verify shared schemas work
   ```bash
   echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"AI assistant"}}}' | docker run --rm -i foaas-mcp:local
   ```
4. **Test a complex tool**: Verify person parameters work
   ```bash
   echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"foaas_legend","arguments":{"name":"the developer","from":"AI assistant"}}}' | docker run --rm -i foaas-mcp:local
   ```
5. **Restart MCP server** in VS Code (GitHub Copilot status bar → restart MCP servers)
6. **Enable foaas-mcp-local** server
7. **Manual test** via GitHub Copilot chat
8. **Check logs** in VS Code Output panel (Model Context Protocol)

**Expected Results:**
- All 18 tools should be listed (14 individual, 4 group)
- Tool calls should return proper FOAAS responses
- No errors in server logs
- "AI assistant" should appear in the subtitle of responses

## Docker Configuration

### docker-compose.yml
- Used for local development builds
- Tags image as `foaas-mcp:local`
- Single command to build: `npm run docker:build`
- Simplified workflow compared to raw docker commands

### Dockerfile
- Multi-stage build (builder + production)
- Node.js 20.19.5 on Debian 12 Bookworm Slim for security
- Builds TypeScript in builder stage
- Production stage only includes compiled JS and prod dependencies
- Runs as non-root user (nodejs)
- Uses dumb-init for proper signal handling
- Accepts build args for VERSION, COMMIT_SHA, BUILD_DATE

### docker-compose.yml
- **REMOVED**: No longer needed, stdio-only transport

## Security Notes

1. **Container Isolation**: Docker provides process and network isolation
2. **No Local Node Execution**: VS Code MCP connects to containerized server
3. **Minimal Attack Surface**: Debian Bookworm Slim with only production dependencies
4. **Network Control**: stdio mode requires no network exposure
5. **Non-root User**: Container runs as nodejs user (UID 1001)
6. **Regular Updates**: Debian Bookworm receives security updates

## Common Tasks

### Local Development Cycle

```bash
# 1. Make code changes
# 2. Build local image
npm run docker:build

# 3. Test (mandatory!)
npm test

# 4. Restart MCP server in VS Code
# 5. Test via Copilot (uses foaas-mcp-local server)
```

### Adding a New FOAAS Operation

1. Update `src/foaas/client.ts` with new method
2. Create tool file in `src/tools/individual/newop.ts` (use shared schemas!)
3. Import and register in `src/server.ts`
4. **Build**: `npm run docker:build`
5. **Test the server** (see Testing Changes section above)
6. **Restart MCP server** and test via VS Code

**Always verify:**
- Tool appears in list_tools output
- Tool call returns correct response
- Shared schemas (fromParam, etc.) are used
- formatFoaasResponse() is used in handler

### Switching Between Local and Registry Versions

In VS Code MCP settings:
- Enable `foaas-mcp-local` to test your changes
- Enable `foaas-mcp-registry` to test published version
- You can run both simultaneously to compare

### Updating Dependencies

```bash
npm update
npm run docker:build
```

### Debugging

- **VS Code MCP Logs**: View → Output → "Model Context Protocol"
- **Container Logs**: `npm run docker:logs`
- **Build from scratch**: `docker compose build --no-cache`

## MCP Protocol Details

- SDK Version: `@modelcontextprotocol/sdk@^1.20.2`
- Tool Schema: Zod with JSON Schema conversion
- Response Format: Array of text content blocks
- All tools return `[message, subtitle]` for flexibility

## Git Workflow

### Branch Strategy
- Main branch: `main`
- Feature branches: `feature/*`
- Always create PRs for review

### Commit Messages
Focus on what changed and why:
- "Add foaas_newop tool for XYZ operation"
- "Update Docker config to use stdio by default"
- "Fix client error handling for timeout"

### CI/CD Pipeline

**On Pull Requests:**
1. Checkout code
2. Build Docker image (amd64 only)
3. Run automated tests
4. Report results (no push)

**On Main Branch / Tags:**
1. Checkout code
2. Build Docker image (amd64 for testing)
3. Run automated tests
4. **If tests pass**: Rebuild for multi-platform (amd64 + arm64)
5. Push to GitHub Container Registry
6. Tag with version/SHA

**Failed builds are never published!**

## When Helping Users

1. Always remind them that Docker is the default runtime
2. For tool usage, provide examples with actual tool names
3. For errors, check both application and Docker logs
4. For new features, guide them through the full Docker workflow
