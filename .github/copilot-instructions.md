# GitHub Copilot Instructions for FOAAS MCP

## Project Overview

MCP server exposing FOAAS (Fuck Off As A Service) via Docker. Uses stdio transport for VS Code integration.

⚠️ **Content Warning**: Intentionally contains explicit language.

## Architecture

**Transport**: stdio only (no HTTP)  
**Runtime**: Docker (Debian 12 + Node.js 20.19.5)  
**Tools**: 18 total
- 14 individual (`foaas_*`): Direct FOAAS API operations
- 4 groups (`proper_*`): Smart wrappers with randomization

**Why `proper_` prefix?** Groups are not standard FOAAS - they're intelligent wrappers.

## Development Workflow

**Build & Test:**
```bash
npm run docker:build    # Build local image
npm test               # Run automated tests
```

**VS Code Testing:**
1. Restart MCP server (Copilot status bar)
2. Enable `foaas-mcp-local` server
3. Test in Copilot chat

**Always test Docker before committing.**

## Tool Categories

**Individual (`foaas_*`):**
- Appreciation: thanks, awesome, legend, dalton
- Rejections: because, zero, bye
- Confrontations: off, gfy, chainsaw, keep
- Frustration: everyone, flying, asshole

**Groups (`proper_*`):**
- `proper_appreciation`: Random appreciation (target optional)
- `proper_rejection`: Random rejection (no target)
- `proper_confrontation`: Random confrontation (target required)
- `proper_frustration`: Random frustration (no target)

## Code Guidelines

### Shared Schemas
Always use from `src/tools/shared/schemas.ts`:
- `fromParam` - Standard "from" parameter (who sends)
- `toParam` - Standard "to" parameter (who receives)
- `formatFoaasResponse()` - Response formatter

**Consistent from/to naming**: All tools use `from` and `to` parameters for clear message direction. This makes it easier for AI agents to understand who is sending and who is receiving the message.

### Adding Tools

1. Create `src/tools/individual/operation.ts`
2. Add client method in `src/foaas/client.ts`
3. Register in `src/server.ts`
4. Build, test, commit

### Testing
```bash
npm run docker:build
npm test
# Restart MCP in VS Code and test
```

## Documentation

- `README.md` - User-facing quick start
- `docs/DEVELOPMENT.md` - Developer guide
- `docs/TOOLS.md` - Tool reference
- `docs/ROADMAP.md` - Project progress

Keep docs minimal, no duplication.

## CI/CD

**PRs**: Build (amd64) → Test → Report  
**Main/Tags**: Build → Test → **If pass**: Multi-platform build → Push to GHCR

Failed builds never published.

## Security

- Docker isolation
- Non-root user (UID 1001)
- stdio only (no network)
