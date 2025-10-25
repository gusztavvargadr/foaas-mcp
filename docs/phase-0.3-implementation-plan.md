# Phase 0.3: PoC Implementation Plan

**Date**: October 25, 2025  
**Goal**: Create a minimal working MCP server with 4 category-based tools, HTTP transport, and Docker support

---

## 📋 Implementation Checklist

### 1. Project Initialization (15 min)

```bash
# Initialize project
npm init -y

# Install dependencies
npm install @modelcontextprotocol/sdk express cors zod

# Install dev dependencies  
npm install -D typescript @types/node @types/express tsx

# Initialize TypeScript
npx tsc --init
```

**Files to create**:
- `package.json` - Project manifest with scripts
- `tsconfig.json` - TypeScript configuration
- `.gitignore` - Exclude node_modules, dist, etc.

---

### 2. Project Structure (10 min)

```
foaas-mcp/
├── src/
│   ├── index.ts              # Entry point (HTTP or stdio based on env)
│   ├── server.ts             # MCP server setup and tool registration
│   ├── transport.ts          # Transport initialization (HTTP/stdio)
│   ├── tools/
│   │   ├── express-appreciation.ts
│   │   ├── decline-request.ts
│   │   ├── tell-off.ts
│   │   └── express-frustration.ts
│   ├── foaas/
│   │   ├── client.ts         # FOAAS API client
│   │   └── types.ts          # TypeScript types for FOAAS
│   └── utils/
│       └── logger.ts         # Simple logging utility
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
├── package.json
├── tsconfig.json
└── README.md
```

---

### 3. Core Implementation Tasks

#### 3.1 FOAAS API Client (30 min)

**File**: `src/foaas/client.ts`

```typescript
export class FoaasClient {
  private baseUrl = 'https://foaas.io';
  
  async fetch(operation: string, params: Record<string, string>): Promise<FoaasResponse> {
    // Build URL with parameters
    // Fetch with Accept: application/json
    // Parse response
    // Handle errors
  }
  
  // Specific operation methods
  async thanks(from: string): Promise<FoaasResponse>
  async off(name: string, from: string): Promise<FoaasResponse>
  // ... etc
}
```

**Decision 1**: ~~Caching~~ → **No caching for PoC**
- Keep it simple, always fetch fresh from API
- Can add caching later if performance becomes an issue

---

#### 3.2 MCP Tools Implementation (60 min)

**Dual Approach**: Individual tools + Grouped tools with randomization

We'll implement **TWO sets of tools**:

##### A. Individual Operation Tools (14 tools)
Each FOAAS operation gets its own tool for direct access:

**Appreciation & Praise**:
- `foaas_thanks` (from)
- `foaas_awesome` (from)
- `foaas_legend` (name, from)

**Dismissals & Rejections**:
- `foaas_because` (from)
- `foaas_zero` (from)
- `foaas_bye` (from)

**Direct Confrontations**:
- `foaas_off` (name, from)
- `foaas_gfy` (name, from)
- `foaas_chainsaw` (name, from)
- `foaas_dalton` (name, from)
- `foaas_keep` (name, from)

**Broad Dismissals**:
- `foaas_everyone` (from)
- `foaas_flying` (from)
- `foaas_asshole` (from)

##### B. Category Group Tools (4 tools with randomization)
Simplified access with automatic operation selection:

```typescript
// src/tools/groups/express-appreciation.ts
export const expressAppreciationTool = {
  name: 'express_appreciation',
  description: '⚠️ EXPLICIT CONTENT: Express sarcastic or genuine appreciation. Randomly selects from: thanks, awesome, or legend.',
  inputSchema: z.object({
    target: z.string().optional().describe('Person/thing to appreciate (required for "legend")'),
    from: z.string().describe('Who is expressing appreciation'),
    operation: z.enum(['thanks', 'awesome', 'legend', 'random']).default('random')
      .describe('Which operation to use (default: random)')
  }),
  handler: async (args, foaasClient) => {
    let op = args.operation;
    
    // Randomize if requested or default
    if (op === 'random') {
      if (args.target) {
        op = 'legend'; // Only legend uses target
      } else {
        op = ['thanks', 'awesome'][Math.floor(Math.random() * 2)];
      }
    }
    
    // Call appropriate operation
    const response = await foaasClient[op](args);
    
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
```

**Implementation strategy**:
1. Individual tools are thin wrappers around FOAAS client
2. Group tools contain selection logic + randomization
3. Both share the same FOAAS client
4. Group tools default to `operation: 'random'`

**Pattern for individual tools**:

```typescript
// src/tools/individual/thanks.ts
import { z } from 'zod';

export const thanksTool = {
  name: 'foaas_thanks',
  description: '⚠️ EXPLICIT CONTENT: Sarcastic "fuck you very much" response.',
  inputSchema: z.object({
    from: z.string().describe('Who is saying thanks')
  }),
  handler: async (args, foaasClient) => {
    const response = await foaasClient.thanks(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
```

**File structure**:
```
src/tools/
├── individual/          # 14 individual operation tools
│   ├── thanks.ts
│   ├── awesome.ts
│   ├── legend.ts
│   ├── because.ts
│   ├── zero.ts
│   ├── bye.ts
│   ├── off.ts
│   ├── gfy.ts
│   ├── chainsaw.ts
│   ├── dalton.ts
│   ├── keep.ts
│   ├── everyone.ts
│   ├── flying.ts
│   └── asshole.ts
└── groups/              # 4 category group tools
    ├── express-appreciation.ts
    ├── decline-request.ts
    ├── tell-off.ts
    └── express-frustration.ts
```

**Total tools registered**: 18 tools (14 individual + 4 groups)

---

#### 3.3 MCP Server Setup (30 min)

**File**: `src/server.ts`

```typescript
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { FoaasClient } from './foaas/client.js';
import { expressAppreciationTool } from './tools/express-appreciation.js';
// ... import other tools

export function createMcpServer() {
  const server = new McpServer(
    {
      name: 'foaas-mcp',
      version: '0.1.0'
    },
    {
      capabilities: {
        tools: {}
      }
    }
  );
  
  const foaasClient = new FoaasClient();
  
  // Register tools
  server.tool(
    expressAppreciationTool.name,
    expressAppreciationTool.description,
    expressAppreciationTool.inputSchema,
    (args) => expressAppreciationTool.handler(args, foaasClient)
  );
  // ... register other tools
  
  return server;
}
```

**Question 4**: Should we add a health check endpoint?
- Useful for Docker health checks and monitoring
- Simple GET /health → 200 OK
- **Recommendation**: Yes, add basic health endpoint

---

#### 3.4 Transport Layer (30 min)

**File**: `src/transport.ts`

```typescript
import express from 'express';
import cors from 'cors';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { randomUUID } from 'node:crypto';

export async function startHttpTransport(server: McpServer, port: number) {
  const app = express();
  app.use(express.json());
  app.use(cors({
    origin: '*', // TODO: Configure in production
    exposedHeaders: ['Mcp-Session-Id']
  }));
  
  // Health check
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
  });
  
  const transports: Record<string, StreamableHTTPServerTransport> = {};
  
  app.post('/mcp', async (req, res) => {
    // Session management logic
    // Handle initialize requests
    // Route to transport
  });
  
  app.listen(port, () => {
    console.log(`MCP server listening on http://localhost:${port}`);
  });
}
```

**Question 5**: Should we implement stdio transport as well in PoC?
- Pro: Easier for quick local testing without HTTP
- Con: More code, not needed for main goal (remote access)
- **Recommendation**: Skip for PoC, add later if needed (30 min task)

---

#### 3.5 Entry Point (15 min)

**File**: `src/index.ts`

```typescript
import { createMcpServer } from './server.js';
import { startHttpTransport } from './transport.js';

async function main() {
  const server = createMcpServer();
  const port = parseInt(process.env.PORT || '3000');
  
  await startHttpTransport(server, port);
}

main().catch(console.error);
```

**Question 6**: Configuration - environment variables or config file?
- Environment variables for Docker-friendly deployment
- Config file for local development
- **Recommendation**: Start with env vars only, add config file in Phase 1

---

### 4. Docker Setup (20 min)

#### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy built source
COPY dist/ ./dist/

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

# Run
CMD ["node", "dist/index.js"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  foaas-mcp:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
    restart: unless-stopped
```

**Question 7**: Should we add environment-specific compose files?
- `docker-compose.yml` - Production
- `docker-compose.dev.yml` - Development with hot reload
- **Recommendation**: Single file for PoC, add dev compose in Phase 1

---

### 5. Build & Scripts (10 min)

**package.json scripts**:

```json
{
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/index.ts",
    "start": "node dist/index.js",
    "docker:build": "docker build -t foaas-mcp .",
    "docker:run": "docker run -p 3000:3000 foaas-mcp",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down"
  }
}
```

---

## 🧪 Testing Plan

### Manual Testing Checklist

1. **Local Development**:
   ```bash
   npm run dev
   # Test with curl or MCP inspector
   ```

2. **Build & Run**:
   ```bash
   npm run build
   npm start
   # Test with curl
   ```

3. **Docker Local**:
   ```bash
   npm run docker:build
   npm run docker:run
   # Test with curl
   ```

4. **Test Each Tool**:
   ```bash
   # Test express_appreciation
   curl -X POST http://localhost:3000/mcp \
     -H "Content-Type: application/json" \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"express_appreciation","arguments":{"from":"Developer","style":"thanks"}}}'
   ```

**Question 8**: Should we write automated tests in PoC?
- Pro: Catch issues early, better code quality
- Con: Slows down PoC development
- **Recommendation**: No automated tests in PoC, add in Phase 1

---

## ⏱️ Time Estimate

| Task | Estimated Time | Priority |
|------|----------------|----------|
| Project initialization | 15 min | Must |
| Project structure | 10 min | Must |
| FOAAS client | 30 min | Must |
| Individual tools (14 tools) | 45 min | Must |
| Group tools (4 tools) | 30 min | Must |
| MCP server setup | 30 min | Must |
| HTTP transport | 30 min | Must |
| Entry point | 15 min | Must |
| Dockerfile | 10 min | Must |
| docker-compose | 10 min | Must |
| Testing & debugging | 45 min | Must |
| **Total** | **~4.5 hours** | |

**Buffer for issues**: +30 min = **5 hours total**

Note: Individual + group tools add ~30 min compared to original plan

---

## 🔍 Decisions Made

### 1. **Caching Strategy** ✅
**Decision**: No caching in PoC
- Keep it simple, always fetch fresh
- Can add later if needed

### 2. **Tool Architecture** ✅
**Decision**: Dual approach - Individual + Grouped tools
- 14 individual operation tools (`foaas_thanks`, `foaas_off`, etc.)
- 4 category group tools with randomization (`express_appreciation`, etc.)
- Total: 18 tools
- Gives AI both specific control and convenient shortcuts

### 3. **Response Format** ✅
**Decision**: Structured response (separate message and subtitle)
```typescript
{
  content: [
    { type: 'text', text: response.message },
    { type: 'text', text: response.subtitle }
  ]
}
```
- Flexible: AI can use message alone if sender is implicit in context
- Can also combine both when attribution is needed

### 4. **Style/Operation Selection** ✅
**Decision**: Use API defaults, add `operation` parameter to group tools
- Individual tools: Direct mapping to FOAAS operations
- Group tools: `operation` parameter with 'random' as default
- Style parameter reserved for future enhancement

### 5. **Randomization** ✅
**Decision**: Implement in group tools only
- Group tools default to `operation: 'random'`
- Intelligently selects based on available parameters
- Example: If `target` provided → can use 'legend', otherwise random between 'thanks'/'awesome'

### 6. **Stdio Transport** ✅
**Decision**: Skip for PoC
- Saves 30-45 minutes
- Can add in Phase 1 if needed
- HTTP is primary goal for remote access

---

## 🎯 PoC Success Criteria

At the end of Phase 0.3, we should have:

- ✅ Working MCP server with **18 tools total**:
  - 14 individual operation tools
  - 4 category group tools with randomization
- ✅ HTTP transport on port 3000
- ✅ Structured response format (message + subtitle)
- ✅ Docker image that builds and runs
- ✅ Can be tested with curl/HTTP client
- ✅ Basic error handling
- ✅ Health check endpoint
- ✅ Ready for GitHub Copilot integration testing (Phase 0.4)

**Not required for PoC**:
- ❌ Caching
- ❌ Automated tests
- ❌ Stdio transport
- ❌ Rate limiting
- ❌ Structured logging
- ❌ Production-grade error handling

---

## 📝 Notes & Considerations

### TypeScript Configuration
- Target: ES2022 (modern Node.js)
- Module: ES2022 with `.js` extensions in imports
- Strict mode enabled

### Dependencies Rationale
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `express` - HTTP server (most popular, well-documented)
- `cors` - CORS middleware for cross-origin requests
- `zod` - Schema validation (required by MCP SDK)

### Alternative Approaches Considered

1. **Fastify instead of Express**
   - Pro: Faster, modern
   - Con: Less familiar, more dependencies
   - **Decision**: Express for simplicity

2. **Native fetch() instead of axios**
   - Pro: Built-in Node.js 18+
   - Con: Less features
   - **Decision**: Use native fetch (no extra dependency)

3. **All tools in one file vs separate files**
   - Pro (separate): Better organization, easier to maintain
   - Con (separate): More files to navigate
   - **Decision**: Separate files for better structure

---

## 🚀 Ready to Start!

All decisions have been made based on your preferences:

✅ **No caching** - Keep it simple, always fresh  
✅ **Structured responses** - Message + subtitle separately  
✅ **Dual tool approach** - 14 individual + 4 group tools  
✅ **Randomization in groups** - Default to 'random' operation  
✅ **No style parameter yet** - Use API defaults  
✅ **Skip stdio transport** - HTTP only for PoC  

**Total implementation time**: ~5 hours with buffer

**Ready to proceed with implementation?** The plan is complete and aligned with your requirements!

