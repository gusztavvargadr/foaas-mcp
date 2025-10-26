# VS Code Extension Distribution

**Status**: Backlog

## Goal

Package FOAAS MCP as a VS Code extension to simplify installation and automatic tool registration.

## Context

Current installation requires manual Docker setup and MCP configuration. A VS Code extension would provide one-click installation and automatic configuration.

## Benefits

### User Experience
- One-click installation from VS Code Marketplace
- Automatic MCP server registration
- No manual Docker commands
- No `.vscode/mcp.json` editing
- Bundled with extension
- Auto-updates via VS Code

### Distribution
- Centralized marketplace distribution
- Version management
- User ratings and reviews
- Discovery via search
- Extension recommendations

### Integration
- Native VS Code integration
- Settings UI for configuration
- Status bar integration
- Extension commands
- Better error messages

## Implementation Approach

### Extension Structure
```
vscode-foaas-mcp/
  package.json           # Extension manifest
  src/
    extension.ts         # Extension entry point
    mcp-manager.ts       # MCP server lifecycle
    docker-manager.ts    # Docker container management
  resources/
    docker/              # Bundled Dockerfile
  README.md
```

### Extension Features

**Activation:**
- Activate on VS Code startup
- Check Docker availability
- Pull/build Docker image
- Register MCP server with Copilot
- Show status in status bar

**Commands:**
- `FOAAS MCP: Start Server`
- `FOAAS MCP: Stop Server`
- `FOAAS MCP: Restart Server`
- `FOAAS MCP: View Logs`
- `FOAAS MCP: Update Image`

**Settings:**
- Docker image tag (latest, specific version)
- Auto-start on VS Code launch
- Debug mode toggle
- Custom FOAAS API URL (offline mode)
- Tool filtering (enable/disable specific tools)

**Status Bar:**
- Show server status (running, stopped, error)
- Click to open commands
- Show tool count
- Update notifications

### Technical Implementation

**MCP Server Registration:**
```typescript
import * as vscode from 'vscode';

export async function activate(context: vscode.ExtensionContext) {
  // Start Docker container
  const containerId = await startDockerContainer();
  
  // Register MCP server with Copilot
  await vscode.commands.executeCommand('github.copilot.mcp.registerServer', {
    name: 'foaas-mcp',
    transport: 'stdio',
    command: 'docker',
    args: ['exec', '-i', containerId, 'node', 'dist/index.js']
  });
  
  // Update status bar
  updateStatusBar('FOAAS MCP: Running');
}
```

**Docker Management:**
```typescript
class DockerManager {
  async ensureImage(): Promise<void> {
    // Check if image exists
    // Pull from GHCR if needed
    // Build locally if offline
  }
  
  async startContainer(): Promise<string> {
    // Start container with stdio
    // Return container ID
    // Handle errors
  }
  
  async stopContainer(id: string): Promise<void> {
    // Stop and remove container
  }
}
```

### Distribution

**VS Code Marketplace:**
- Publisher account setup
- Extension packaging (`vsce package`)
- Marketplace publishing
- Update workflow in CI/CD

**Extension Metadata:**
```json
{
  "name": "foaas-mcp",
  "displayName": "FOAAS MCP Server",
  "description": "MCP server exposing FOAAS for GitHub Copilot",
  "version": "0.1.0",
  "publisher": "gusztavvargadr",
  "engines": {
    "vscode": "^1.85.0"
  },
  "categories": ["Other", "Machine Learning"],
  "keywords": ["copilot", "mcp", "foaas", "ai"],
  "icon": "resources/icon.png",
  "repository": "github:gusztavvargadr/foaas-mcp"
}
```

## Considerations

### Pros
- ✅ Much easier installation
- ✅ Automatic updates
- ✅ Better user experience
- ✅ Wider distribution
- ✅ Native VS Code integration

### Cons
- ❌ Additional maintenance (extension code)
- ❌ Need VS Code extension publishing account
- ❌ Still requires Docker installed
- ❌ More complex packaging
- ❌ Two distribution channels (GHCR + Marketplace)

### Docker Requirement
- Extension still needs Docker
- Check for Docker on activation
- Provide helpful error if missing
- Link to Docker installation guide
- Consider bundled alternative (future)

### Security
- Extension runs with VS Code permissions
- Docker socket access required
- Image pulled from trusted GHCR
- Code signing for extension
- Regular security audits

## Alternative: Extension Pack

Instead of managing Docker, create an extension pack that:
- Provides documentation and setup guide
- Includes helpful commands
- Links to GHCR image
- Simplifies configuration file creation
- Lighter weight approach

## Implementation Phases

### Phase 1: Basic Extension
- Extension scaffolding
- Docker container management
- MCP server registration
- Basic commands

### Phase 2: Enhanced UX
- Settings UI
- Status bar integration
- Log viewer
- Error handling

### Phase 3: Marketplace
- Extension packaging
- Marketplace setup
- CI/CD automation
- Documentation

## Related

- [Offline Mode](offline-mode.md) - Bundled operation
- [Configuration Options](configuration-options.md) - Extension settings
- Current Docker setup and MCP configuration
- VS Code Extension API documentation
