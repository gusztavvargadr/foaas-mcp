# Logging Modes (Debug vs Production)

**Status**: Backlog

## Goal

Implement configurable logging with debug mode for local development and production mode for minimal logging.

## Context

Current logging is minimal. Need better visibility during development while keeping production logs clean and focused.

## Proposed Logging Levels

### Debug Mode (Local Development)
**What to log:**
- All MCP protocol messages (request/response)
- Tool invocations with full parameters
- FOAAS API requests and responses
- Timing information
- Docker container lifecycle events
- Configuration values
- Detailed error stack traces
- Performance metrics

**Use cases:**
- Local development
- Troubleshooting
- Testing new tools
- Performance optimization
- Understanding MCP protocol

### Info Mode (Default)
**What to log:**
- Tool invocations (name only, not parameters)
- Configuration loaded
- Startup/shutdown events
- FOAAS API errors
- Basic error messages

**Use cases:**
- Standard operation
- Basic monitoring
- Error tracking

### Production Mode (Minimal)
**What to log:**
- Warnings only
- Errors only
- Critical failures
- Startup/shutdown confirmation

**Use cases:**
- Production deployments
- Clean logs
- Security (no sensitive data)
- Performance (minimal overhead)

## Implementation

### Environment Variable
```bash
# Debug mode
LOG_LEVEL=debug

# Info mode (default)
LOG_LEVEL=info

# Production mode
LOG_LEVEL=production
# or
LOG_LEVEL=warn
```

### Logger Implementation

**src/utils/logger.ts:**
```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private level: LogLevel;
  
  constructor() {
    const level = process.env.LOG_LEVEL || 'info';
    this.level = this.parseLevel(level);
  }
  
  debug(message: string, data?: any): void {
    if (this.level <= LogLevel.DEBUG) {
      console.error(`[DEBUG] ${message}`, data || '');
    }
  }
  
  info(message: string, data?: any): void {
    if (this.level <= LogLevel.INFO) {
      console.error(`[INFO] ${message}`, data || '');
    }
  }
  
  warn(message: string, data?: any): void {
    if (this.level <= LogLevel.WARN) {
      console.error(`[WARN] ${message}`, data || '');
    }
  }
  
  error(message: string, error?: Error): void {
    console.error(`[ERROR] ${message}`, error || '');
  }
}

export const logger = new Logger();
```

### Usage in Code

**Tool execution:**
```typescript
logger.debug('Tool invoked', {
  name: 'foaas_legend',
  params: { to: 'John', from: 'Jane' }
});

const response = await client.legend(to, from);

logger.debug('FOAAS API response', response);
logger.info(`Tool executed: foaas_legend`);
```

**Error handling:**
```typescript
try {
  const response = await client.legend(to, from);
} catch (error) {
  logger.error('FOAAS API call failed', error);
  throw error;
}
```

**Startup:**
```typescript
logger.info(`FOAAS MCP Server starting`);
logger.debug(`Configuration`, { logLevel, apiUrl });
logger.info(`Registered ${tools.length} tools`);
logger.debug(`Tools`, tools.map(t => t.name));
```

## Docker Configuration

### Debug Mode
```bash
docker run --rm -i \
  -e LOG_LEVEL=debug \
  foaas-mcp:local
```

### Production Mode
```bash
docker run --rm -i \
  -e LOG_LEVEL=production \
  ghcr.io/gusztavvargadr/foaas-mcp:latest
```

### docker-compose.yml
```yaml
services:
  foaas-mcp-debug:
    image: foaas-mcp:local
    environment:
      - LOG_LEVEL=debug
  
  foaas-mcp-production:
    image: ghcr.io/gusztavvargadr/foaas-mcp:latest
    environment:
      - LOG_LEVEL=production
```

## VS Code Configuration

**.vscode/mcp.json:**
```json
{
  "mcpServers": {
    "foaas-mcp-debug": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "LOG_LEVEL=debug",
        "foaas-mcp:local"
      ]
    },
    "foaas-mcp-production": {
      "command": "docker",
      "args": [
        "run", "--rm", "-i",
        "-e", "LOG_LEVEL=production",
        "ghcr.io/gusztavvargadr/foaas-mcp:latest"
      ]
    }
  }
}
```

## Log Output Examples

### Debug Mode
```
[DEBUG] FOAAS MCP Server starting
[DEBUG] Configuration { logLevel: 'debug', apiUrl: 'https://foaas.io' }
[INFO] Registered 23 tools
[DEBUG] Tools ['foaas_thanks', 'foaas_awesome', ...]
[DEBUG] Tool invoked { name: 'foaas_legend', params: { to: 'John', from: 'Jane' } }
[DEBUG] FOAAS API request GET https://foaas.io/legend/John/Jane
[DEBUG] FOAAS API response { message: '...', subtitle: '...' } (42ms)
[INFO] Tool executed: foaas_legend
```

### Production Mode
```
[INFO] FOAAS MCP Server starting
[INFO] Registered 23 tools
[WARN] FOAAS API slow response (5000ms)
[ERROR] FOAAS API call failed Error: Network timeout
```

## Benefits

### Debug Mode
- ✅ Full visibility during development
- ✅ Easier troubleshooting
- ✅ Performance profiling
- ✅ Protocol debugging
- ✅ Parameter validation

### Production Mode
- ✅ Clean logs
- ✅ Better performance
- ✅ No sensitive data exposure
- ✅ Focus on actionable issues
- ✅ Reduced log volume

## Structured Logging (Future)

Consider structured logging for better parsing:
```typescript
logger.debug('tool_invoked', {
  tool: 'foaas_legend',
  params: { to: 'John', from: 'Jane' },
  timestamp: Date.now()
});
```

Output as JSON:
```json
{
  "level": "debug",
  "message": "tool_invoked",
  "tool": "foaas_legend",
  "params": { "to": "John", "from": "Jane" },
  "timestamp": 1698365432000
}
```

## Testing

### Test all log levels
```bash
# Test debug mode
LOG_LEVEL=debug npm run dev

# Test production mode
LOG_LEVEL=production npm run dev

# Test invalid level (should default to info)
LOG_LEVEL=invalid npm run dev
```

### Verify output
- Debug shows everything
- Info shows moderate detail
- Production shows minimal
- Errors always shown

## Documentation Updates

- README.md - Add LOG_LEVEL to configuration
- DEVELOPMENT.md - Document debug mode usage
- Dockerfile - Add ENV LOG_LEVEL with default
- .github/copilot-instructions.md - Note logging practices

## Related

- [Configuration Options](configuration-options.md) - General config
- [Offline Mode](offline-mode.md) - Development setup
- Current minimal logging in `src/server.ts`
