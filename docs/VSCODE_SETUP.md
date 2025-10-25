# VS Code MCP Configuration Guide

## Overview

This guide explains how to configure the FOAAS MCP Server with VS Code's GitHub Copilot using **stdio transport** (the simplest and recommended method).

## Prerequisites

1. **VS Code** with GitHub Copilot extension installed
2. **Project built**: Run `npm run build`

## Configuration Steps

### 1. Build the Project

```bash
npm install
npm run build
```

### 2. Configure VS Code

The MCP configuration is already set up in `.vscode/mcp.json`:

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

**How it works:**
- ✅ VS Code starts the MCP server automatically when needed
- ✅ Communication via stdin/stdout (standard process pipes)
- ✅ No port conflicts or HTTP server needed
- ✅ Server lifecycle managed by VS Code

### 3. Reload VS Code

After building, reload the VS Code window:
1. Press `Cmd/Ctrl + Shift + P`
2. Type "Reload Window"
3. Press Enter

### 4. Verify Connection

Check the MCP output panel in VS Code:
1. Open VS Code Output panel (View → Output)
2. Select "MCP" from the dropdown
3. Look for "Connection state: Running"

You should see:
```
[info] Starting server foaas-mcp-dev
[info] Connection state: Running
```

### 5. Test the Tools

Open GitHub Copilot Chat and try:
- "Use foaas_thanks to thank TestBot"
- "Use express_appreciation from CopilotUser"
- "Tell off BuggyCode using tell_off"

## Troubleshooting

### Tools don't appear in Copilot

**Problem**: VS Code hasn't loaded the MCP server

**Solution**: 
1. Ensure project is built: `npm run build`
2. Reload VS Code window (Cmd/Ctrl + Shift + P → "Reload Window")
3. Check MCP output logs for errors

### Error: Cannot find module 'dist/index.js'

**Problem**: Project not built

**Solution**: 
```bash
npm run build
```

### Server starts but initialize times out

**Problem**: Possible issue with MCP protocol version or tool definitions

**Solution**:
1. Check MCP output logs for specific errors
2. Rebuild: `npm run build`
3. Try minimal test: `echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node dist/index.js`

### Want to use HTTP/SSE instead?

For remote access or testing with other MCP clients:

```bash
# Start HTTP server
npm run dev:http
```

Then use this configuration in a separate MCP client:
```json
{
  "servers": {
    "foaas-mcp-http": {
      "url": "http://localhost:3000/sse",
      "type": "sse"
    }
  }
}
```

## Testing Connection

```bash
# Build the project
npm run build

# Test stdio transport directly
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}' | node dist/index.js

# Should return JSON with list of 18 tools
```

For HTTP testing:
```bash
# Start HTTP server
npm run dev:http

# Test endpoints
curl http://localhost:3000/
curl http://localhost:3000/health
```

## Available Tools

Once connected, you'll have access to 18 MCP tools:

### Individual Tools (14)
- `foaas_thanks`, `foaas_awesome`, `foaas_legend`
- `foaas_because`, `foaas_zero`, `foaas_bye`
- `foaas_off`, `foaas_gfy`, `foaas_chainsaw`, `foaas_dalton`, `foaas_keep`
- `foaas_everyone`, `foaas_flying`, `foaas_asshole`

### Group Tools (4)
- `express_appreciation` - Random appreciation with smart target detection
- `decline_request` - Random dismissal
- `tell_off` - Random confrontation
- `express_frustration` - Random frustration

## Production Setup

For local use with VS Code, the stdio transport (default) is recommended.

For remote deployment or web-based MCP clients:

```bash
# Build
npm run build

# Run HTTP server
npm start:http

# Or with Docker
npm run docker:build
npm run docker:run
```

Configure remote clients to use:
```json
{
  "servers": {
    "foaas-mcp-remote": {
      "url": "https://your-domain.com/sse",
      "type": "sse"
    }
  }
}
```

## Security Notes

⚠️ **Content Warning**: All tools return explicit language from FOAAS API

🔒 **Local Development**: Server runs without authentication on localhost

🌐 **Remote Access**: For remote deployment, add authentication middleware

## Support

- Repository: https://github.com/gusztavvargadr/foaas-mcp
- FOAAS API: https://foaas.io/
- MCP Protocol: https://modelcontextprotocol.io/
