# Phase 0.2: MCP Packaging & Transport Research

**Date**: October 25, 2025  
**Status**: ✅ Complete

## Executive Summary

MCP servers support multiple transport mechanisms. For security and flexibility, **Docker + HTTP transport** is recommended for this project, with **stdio transport** as a fallback for local development.

---

## MCP Transport Options

### 1. **stdio Transport** (Process-based)
**How it works**: Client spawns server as child process, communicates via stdin/stdout

**Pros**:
- ✅ Simple for local development
- ✅ No network exposure
- ✅ Direct process control
- ✅ Works with Claude Desktop, VS Code Copilot

**Cons**:
- ❌ Only works locally
- ❌ Can't be used by remote agents (GitHub Copilot, ChatGPT)
- ❌ No isolation (same user/permissions)
- ❌ Process management complexity

**Use Case**: Local development only

---

### 2. **HTTP + SSE Transport** (Deprecated, Protocol 2024-11-05)
**How it works**: HTTP POST for client→server, Server-Sent Events (SSE) for server→client

**Status**: ⚠️ **DEPRECATED** - Use Streamable HTTP instead

**Endpoints**:
- `GET /sse` - Establish SSE stream
- `POST /messages?sessionId=<id>` - Send messages

**Not recommended for new projects**

---

### 3. **Streamable HTTP Transport** (Current Standard, Protocol 2025-03-26)
**How it works**: HTTP-based with SSE for server→client streaming

**Endpoints**:
- `POST /mcp` - Initialize session & send messages
- `GET /mcp` - Establish SSE stream (optional)
- `DELETE /mcp` - Terminate session

**Pros**:
- ✅ Works remotely (GitHub Copilot, ChatGPT, etc.)
- ✅ Stateful sessions with resumability
- ✅ Can run in Docker
- ✅ Can be exposed via HTTP
- ✅ Standard web security (CORS, OAuth, rate limiting)
- ✅ Multiple clients can connect

**Cons**:
- ⚠️ More complex to set up
- ⚠️ Requires HTTP server (Express, etc.)
- ⚠️ Need to manage sessions

**Use Case**: Production, remote access, multi-client scenarios

---

## Recommended Architecture for FOAAS MCP

### **Primary: Docker + Streamable HTTP**

```
┌─────────────────────────────────────────┐
│         Docker Container                │
│  ┌───────────────────────────────────┐  │
│  │   FOAAS MCP Server                │  │
│  │   - Express HTTP server           │  │
│  │   - Streamable HTTP transport     │  │
│  │   - Port 3000 exposed             │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
                 ↕ HTTP/SSE
┌─────────────────────────────────────────┐
│         MCP Clients                     │
│  - GitHub Copilot (VS Code)            │
│  - GitHub Copilot (GitHub.com)         │
│  - ChatGPT                             │
│  - Claude Desktop                      │
└─────────────────────────────────────────┘
```

**Benefits**:
- 🔒 **Security isolation** - Server runs in container
- 🌐 **Remote access** - GitHub Copilot can connect
- 🐳 **Easy deployment** - `docker run` to start
- 🔄 **Portability** - Works anywhere Docker runs
- 🛡️ **Resource limits** - Docker manages CPU/memory

---

### **Fallback: Local stdio**

```
┌─────────────────────────────────────────┐
│   MCP Client (VS Code Copilot)         │
│         spawns ↓                        │
│   ┌─────────────────────────────────┐   │
│   │  FOAAS MCP Server (Node.js)     │   │
│   │  - stdio transport              │   │
│   └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

**Use Case**: Quick local testing, air-gapped environments

---

## Implementation Options

### **Option A: Dual Transport Support** (Recommended for PoC)

Support both transports in the same codebase:

```typescript
// Start server with transport based on environment
if (process.env.MCP_TRANSPORT === 'http') {
  // HTTP mode - for Docker/remote
  const app = express();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID()
  });
  app.post('/mcp', (req, res) => transport.handleRequest(req, res, req.body));
  app.listen(3000);
} else {
  // stdio mode - for local
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
```

**Benefits**:
- ✅ Flexibility for different use cases
- ✅ Easy testing (stdio)
- ✅ Production ready (HTTP)
- ✅ One codebase

---

### **Option B: HTTP Only** (Simplest for Production)

Only implement Streamable HTTP:

```typescript
const app = express();
const transports: Record<string, StreamableHTTPServerTransport> = {};

app.post('/mcp', async (req, res) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;
  let transport: StreamableHTTPServerTransport;
  
  if (sessionId && transports[sessionId]) {
    transport = transports[sessionId];
  } else if (!sessionId && isInitializeRequest(req.body)) {
    transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
      onsessioninitialized: (sid) => {
        transports[sid] = transport;
      }
    });
    await server.connect(transport);
  } else {
    res.status(400).send('Invalid request');
    return;
  }
  
  await transport.handleRequest(req, res, req.body);
});

app.listen(3000);
```

**Use with Docker**:
```bash
docker run -p 3000:3000 foaas-mcp
```

**Benefits**:
- ✅ Simpler codebase
- ✅ Production-focused
- ✅ Better for remote agents

---

## Docker Setup

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY dist/ ./dist/

# Expose HTTP port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Run server in HTTP mode
ENV MCP_TRANSPORT=http
CMD ["node", "dist/index.js"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  foaas-mcp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MCP_TRANSPORT=http
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 3s
      retries: 3
```

### Running
```bash
# Build
docker build -t foaas-mcp .

# Run
docker run -p 3000:3000 foaas-mcp

# Or with compose
docker-compose up -d
```

---

## Client Configuration

### **GitHub Copilot in VS Code**

For HTTP transport (recommended):
```json
{
  "github.copilot.chat.mcp.servers": {
    "foaas": {
      "transport": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

For stdio transport (local only):
```json
{
  "github.copilot.chat.mcp.servers": {
    "foaas": {
      "transport": "stdio",
      "command": "node",
      "args": ["/path/to/foaas-mcp/dist/index.js"]
    }
  }
}
```

For Docker + stdio (via npx):
```json
{
  "github.copilot.chat.mcp.servers": {
    "foaas": {
      "transport": "stdio", 
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "foaas-mcp",
        "node",
        "dist/index.js",
        "--stdio"
      ]
    }
  }
}
```

---

### **GitHub Copilot on GitHub.com**

Requires HTTP transport (servers must be publicly accessible or on GitHub infrastructure):

```yaml
# .github/copilot-mcp.yml
servers:
  foaas:
    transport: http
    url: https://your-server.com/mcp
    # OR for GitHub-hosted:
    url: http://foaas-mcp:3000/mcp
```

**Note**: Research needed on GitHub Copilot's MCP support on github.com (may require GitHub Actions, Codespaces, or specific infrastructure)

---

### **ChatGPT / Other Remote Clients**

HTTP transport required:
```json
{
  "mcpServers": {
    "foaas": {
      "url": "https://your-server.com/mcp",
      "transport": "http"
    }
  }
}
```

---

## Security Considerations for HTTP Transport

### 1. **Authentication**
```typescript
// OAuth 2.0 support (built into MCP SDK)
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
  // OAuth handled by SDK
});
```

### 2. **CORS**
```typescript
import cors from 'cors';
app.use(cors({
  origin: ['https://github.com', 'https://copilot.github.com'],
  exposedHeaders: ['Mcp-Session-Id']
}));
```

### 3. **Rate Limiting**
```typescript
import rateLimit from 'express-rate-limit';
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/mcp', limiter);
```

### 4. **DNS Rebinding Protection** (Built-in)
```typescript
const transport = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => randomUUID(),
  enableDnsRebindingProtection: true,
  allowedHosts: ['localhost', '127.0.0.1'],
  allowedOrigins: ['https://github.com']
});
```

### 5. **Content Security**
```typescript
// Add content warnings to tool descriptions
{
  name: "tell_off",
  description: "⚠️ EXPLICIT CONTENT: Tells someone to f**k off. For entertainment purposes only.",
  // ...
}
```

---

## Future: HTTP Transport Note

**From Requirements**: "maybe include a note for later about serving this over http transport instead of stdio"

### HTTP-Only Mode (Future Enhancement)

After PoC, can remove stdio support entirely:

**Benefits**:
- Cleaner codebase
- Better security model
- Easier remote deployment
- Standard web monitoring/logging
- Load balancing support

**Migration Path**:
1. PoC: Dual transport (stdio + HTTP)
2. V1.0: Prefer HTTP, keep stdio for compatibility
3. V2.0: HTTP only

**Deployment Options**:
- Docker on local machine
- Cloud hosting (AWS, Azure, GCP)
- Serverless (AWS Lambda, Cloud Functions)
- Kubernetes for scale

---

## Package.json Configuration

### For NPM Distribution

```json
{
  "name": "foaas-mcp",
  "version": "0.1.0",
  "type": "module",
  "bin": {
    "foaas-mcp": "./dist/index.js"
  },
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist",
    "Dockerfile",
    "docker-compose.yml"
  ],
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "start:stdio": "MCP_TRANSPORT=stdio node dist/index.js",
    "start:http": "MCP_TRANSPORT=http node dist/index.js",
    "docker:build": "docker build -t foaas-mcp .",
    "docker:run": "docker run -p 3000:3000 foaas-mcp"
  },
  "keywords": [
    "mcp",
    "mcp-server",
    "model-context-protocol",
    "foaas",
    "github-copilot",
    "ai"
  ]
}
```

### Usage

```bash
# Install globally
npm install -g foaas-mcp

# Run with stdio (local)
foaas-mcp

# Run with HTTP (Docker)
foaas-mcp --http

# Or via npx
npx foaas-mcp --http
```

---

## Distribution Methods

### 1. **npm Package** (Easiest for users)
```bash
npm install -g foaas-mcp
# or
npx foaas-mcp
```

### 2. **Docker Image** (Most secure)
```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest
docker run -p 3000:3000 ghcr.io/gusztavvargadr/foaas-mcp:latest
```

### 3. **GitHub Releases** (Source + binary)
- Tagged releases with built dist/
- Users can clone and build
- Pre-built binaries for major platforms

### 4. **Direct GitHub** (Development)
```bash
npx github:gusztavvargadr/foaas-mcp
```

---

## Recommended Approach for PoC

### Phase 0.3 Implementation:

1. **Start with HTTP transport only** (Streamable HTTP)
   - Simpler for PoC
   - Works with all clients
   - Docker-ready from day 1

2. **Add stdio later if needed** (Phase 1)
   - Quick testing
   - Local development
   - 30 minutes to add

3. **Docker from the start**
   - Write Dockerfile in Phase 0.3
   - Test locally with Docker
   - Document Docker usage

### PoC Testing Order:

1. **Local HTTP** (no Docker)
   ```bash
   npm start
   # Connect VS Code Copilot to http://localhost:3000/mcp
   ```

2. **Local Docker**
   ```bash
   docker run -p 3000:3000 foaas-mcp
   # Same client config
   ```

3. **Remote access** (if possible)
   - Deploy to cloud/tunnel
   - Test GitHub Copilot from github.com
   - Test ChatGPT integration

---

## Open Questions for Phase 0.4

1. **GitHub Copilot on GitHub.com**: 
   - How exactly does MCP configuration work?
   - Is it per-repo, per-org, or user settings?
   - Do servers need to be GitHub-hosted or public?

2. **ChatGPT MCP Support**:
   - What's the configuration format?
   - Authentication requirements?
   - Beta/GA status?

3. **Tunneling for Testing**:
   - Use ngrok/cloudflare tunnel for remote testing?
   - Or deploy to free tier cloud (Render, Railway, Fly.io)?

---

## Success Criteria for Phase 0.2

- ✅ Understand transport options (stdio, SSE, Streamable HTTP)
- ✅ Choose primary transport: **Streamable HTTP**
- ✅ Choose deployment method: **Docker**
- ✅ Understand client configuration for GitHub Copilot
- ✅ Plan for remote access (HTTP transport)
- ✅ Document security considerations
- ✅ Ready to implement in Phase 0.3

---

**Phase 0.2 Status**: ✅ **Complete - Ready for Phase 0.3 (PoC Implementation)**

**Recommendation**: Build PoC with Streamable HTTP + Docker for maximum flexibility and security.

