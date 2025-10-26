# Local Development Guide

## Quick Start

### Option 1: Docker Compose (Recommended)

Build and test locally with Docker:

```bash
# Build local Docker image
npm run docker:build

# The image will be tagged as foaas-mcp:local
# VS Code MCP will use this via .vscode/mcp.json
```

### Option 2: Direct Node.js (Fast Iteration)

For rapid development without Docker:

```bash
# Install dependencies
npm install

# Run in watch mode (auto-rebuilds on changes)
npm run dev
```

## Available npm Scripts

### Building

- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm run docker:build`** - Build local Docker image via docker-compose
- **`npm run docker:build:local`** - Same as above (explicit)
- **`npm run docker:build:ci`** - Build for CI with version tags (used by GitHub Actions)

### Running

- **`npm run dev`** - Run in watch mode (TypeScript, no Docker)
- **`npm start`** - Run compiled JavaScript (requires `npm run build` first)
- **`npm run docker:run`** - Run Docker container interactively

### Docker Compose Helpers

- **`npm run docker:up`** - Start container in background
- **`npm run docker:down`** - Stop and remove container
- **`npm run docker:logs`** - View container logs

## Testing with VS Code MCP

The `.vscode/mcp.json` defines two servers:

1. **`foaas-mcp-registry`** - Uses published image from GitHub Container Registry
2. **`foaas-mcp-local`** - Uses your locally built image (`foaas-mcp:local`)

### Switch Between Versions

In VS Code:
1. Open GitHub Copilot status bar
2. Click "MCP Servers"
3. Enable/disable servers as needed
4. Restart MCP servers to apply changes

### Local Development Workflow

```bash
# 1. Make code changes
vim src/tools/individual/newop.ts

# 2. Build local image
npm run docker:build

# 3. TEST THE SERVER (mandatory!)
npm test

# 4. Restart MCP server in VS Code
# GitHub Copilot status bar → Restart MCP servers

# 5. Test your changes via Copilot chat
```

## Testing the MCP Server

**Always test after building!** 

### Automated Testing (Recommended)
```bash
npm test                    # Test local build
npm run test:local          # Test foaas-mcp:local
npm run test:registry       # Test published version
```

The test script (`test-server.sh`) automatically verifies:
- ✅ Server starts without errors
- ✅ All 18 tools are listed (14 individual, 4 group)
- ✅ Simple tool calls work (foaas_awesome)
- ✅ Complex tool calls work (foaas_legend)
- ✅ Shared schemas are working ("AI assistant" in responses)

### Manual Testing

Use these commands if you need to debug specific issues:

### Test 1: List All Tools
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run --rm -i foaas-mcp:local
```
Expected: JSON response with 18 tools

### Test 2: Call a Simple Tool
```bash
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"AI assistant"}}}' | docker run --rm -i foaas-mcp:local
```
Expected: Response with "This is Fucking Awesome." and "- AI assistant"

### Test 3: Call a Complex Tool
```bash
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"foaas_legend","arguments":{"name":"the developer","from":"AI assistant"}}}' | docker run --rm -i foaas-mcp:local
```
Expected: Response with "the developer, you're a fucking legend." and "- AI assistant"

### What to Check
- ✅ Server starts without errors
- ✅ All 18 tools are listed (14 individual, 4 group)
- ✅ Tool calls return proper FOAAS responses
- ✅ "AI assistant" appears in response subtitles
- ✅ No TypeScript compilation errors
- ✅ Shared schemas are working (check fromParam descriptions)

**Pro Tip:** Just run `npm test` - it checks all of the above!

## Docker Compose Configuration

The `docker-compose.yml` file:
- Builds from local Dockerfile
- Tags image as `foaas-mcp:local`
- Sets build args for local development
- Optimized for stdio MCP server usage

## CI/CD vs Local Builds

| Aspect | Local (`docker:build`) | CI (`docker:build:ci`) |
|--------|----------------------|------------------------|
| Command | `docker compose build` | GitHub Actions workflow |
| Image Tag | `foaas-mcp:local` | Version-specific (e.g., `v1.0.0`, `sha-abc123`) |
| Build Args | Hardcoded for dev | Dynamic from CI environment |
| Platforms | Current arch only | Multi-arch (amd64, arm64) |
| Testing | Manual via `npm test` | **Automatic before push** |
| Registry | Local only | Pushed to ghcr.io (only if tests pass) |

**CI/CD Pipeline Steps:**
1. Build image (amd64 for testing)
2. Run automated tests (`test-server.sh`)
3. If tests pass, rebuild for multi-platform
4. Push to GitHub Container Registry

## Troubleshooting

### "Image not found: foaas-mcp:local"

Run `npm run docker:build` to create the local image.

### MCP server not picking up changes

1. Rebuild: `npm run docker:build`
2. Restart MCP servers in VS Code
3. Check logs: `npm run docker:logs`

### Container won't start

```bash
# Check if image exists
docker images | grep foaas-mcp

# Rebuild from scratch
docker compose build --no-cache
```
