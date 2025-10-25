# GitHub Copilot Instructions for FOAAS MCP

## Project Overview

This is a Model Context Protocol (MCP) server that exposes FOAAS (Fuck Off As A Service) functionality to AI clients. The project uses Docker by default for security and isolation.

## Important Context

⚠️ **Content Warning**: This project intentionally contains explicit language as it wraps the FOAAS API. All tools return profane messages by design.

## Development Workflow

### Docker-First Approach

This project uses **Docker as the primary runtime** for security reasons:

1. **Building**: Always rebuild the Docker image after code changes:
   ```bash
   npm run docker:build
   ```

2. **Testing with VS Code MCP**: 
   - The `.vscode/mcp.json` is configured to use Docker via stdio
   - Restart the MCP server to pick up changes (GitHub Copilot status bar → restart)
   - The server runs in a container automatically

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

### When Adding New Tools

1. **Individual Tool Pattern**:
   ```typescript
   export const newTool = {
     name: 'foaas_operation',
     description: '⚠️ EXPLICIT CONTENT: Brief description',
     inputSchema: z.object({
       param: z.string().describe('REQUIRED: Parameter description. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
     }),
     handler: async (args, client) => {
       const response = await client.operation(args.param);
       return {
         content: [
           { type: 'text', text: response.message },
           { type: 'text', text: response.subtitle }
         ]
       };
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

1. **Required Parameters**:
   - Start description with `REQUIRED:` prefix
   - Provide context-aware guidance for the AI
   - Example: `'REQUIRED: Who is expressing appreciation. Use "Copilot" when called by AI, otherwise use the current user\'s name.'`

2. **Optional Parameters**:
   - Start description with `OPTIONAL:` prefix
   - Explain when/why the parameter is needed
   - Example: `'OPTIONAL: Person to appreciate (required for "legend" operation). Use context: issue author, PR creator, etc.'`

3. **Context-Aware `from` Parameters**:
   - Always suggest `"Copilot"` for AI callers
   - Guide human users to use their own name
   - Pattern: `'REQUIRED: Who is [action]. Use "Copilot" when called by AI, otherwise use the current user\'s name.'`

4. **Context-Aware `name`/`target` Parameters**:
   - Provide situational examples based on common use cases
   - Help AI understand who the message should target
   - Pattern: `'REQUIRED: Who/what to [action]. Use context: issue author, PR creator, person making request, annoying bug, etc.'`

5. **Parameter Ordering**:
   - Put most important required parameters first
   - Put `from` parameter before `target`/`name` for consistency
   - Put optional parameters last

**Example - Good Schema**:
```typescript
inputSchema: z.object({
  from: z.string().describe('REQUIRED: Who is giving praise. Use "Copilot" when called by AI, otherwise use the current user\'s name.'),
  name: z.string().describe('REQUIRED: Person to praise. Use context: issue author, PR creator, helpful contributor, etc.'),
  operation: z.enum(['thanks', 'awesome']).default('thanks').describe('OPTIONAL: Which operation. Default: thanks')
})
```

**Example - Poor Schema**:
```typescript
inputSchema: z.object({
  name: z.string().describe('Person'),
  from: z.string().describe('Sender')
})
```

### Testing Changes

1. Rebuild Docker image: `npm run docker:build`
2. Restart MCP server (GitHub Copilot status bar → restart MCP servers)
3. Manually test tools via GitHub Copilot chat
4. Check logs in VS Code Output panel (Model Context Protocol)

## Docker Configuration

### Dockerfile
- Multi-stage build (builder + production)
- Node.js 20.19.5 on Debian 12 Bookworm Slim for security
- Builds TypeScript in builder stage
- Production stage only includes compiled JS and prod dependencies
- Runs as non-root user (nodejs)
- Uses dumb-init for proper signal handling

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

### Adding a New FOAAS Operation

1. Update `src/foaas/client.ts` with new method
2. Create tool file in `src/tools/individual/newop.ts`
3. Import and register in `src/server.ts`
4. Rebuild: `npm run docker:build`
5. Restart MCP server and test

### Updating Dependencies

```bash
npm update
npm run docker:build
```

### Debugging

- **VS Code MCP Logs**: View → Output → "Model Context Protocol"
- **Container Logs**: `docker logs foaas-mcp-stdio` (if running)

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

## When Helping Users

1. Always remind them that Docker is the default runtime
2. For tool usage, provide examples with actual tool names
3. For errors, check both application and Docker logs
4. For new features, guide them through the full Docker workflow
