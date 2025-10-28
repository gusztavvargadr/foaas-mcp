# Demo Fork Template with Codespaces

**Status**: Backlog

## Goal

Create a GitHub repository template with fork/Skills-like experience that makes it easy for users to try FOAAS MCP without local setup. Includes GitHub Codespaces support for instant cloud-based testing.

## Concept

Similar to GitHub Skills or template repositories - users can:
1. **Fork** or **Use this template** to create their own copy
2. **Open in Codespaces** for instant cloud environment
3. **Follow guided steps** to test FOAAS MCP integration
4. **Complete challenges** to learn MCP and GitHub Copilot features

## Repository Structure

```
foaas-mcp-demo/
├── .devcontainer/
│   ├── devcontainer.json          # Codespaces configuration
│   └── postCreateCommand.sh       # Auto-setup script
├── .github/
│   ├── workflows/
│   │   └── welcome.yml            # Welcome message on fork
│   └── ISSUE_TEMPLATE/
│       └── challenge.md           # Challenge submission template
├── .vscode/
│   ├── mcp.json                   # Pre-configured MCP settings
│   └── settings.json              # VS Code defaults
├── challenges/
│   ├── 01-setup.md                # Verify installation
│   ├── 02-basic-usage.md          # Simple tool calls
│   ├── 03-code-review.md          # Review comment scenarios
│   ├── 04-creative-writing.md     # Fun use cases
│   └── 05-advanced.md             # Coding agent with GHCR
├── examples/
│   ├── sample-issues/             # Pre-created issues for testing
│   ├── sample-prs/                # Sample PRs to review
│   └── prompts.md                 # Suggested prompts to try
├── .gitignore
├── README.md                      # Quick start guide
└── TUTORIAL.md                    # Full walkthrough
```

## Key Features

### 1. GitHub Codespaces Integration

**devcontainer.json**:
```json
{
  "name": "FOAAS MCP Demo",
  "image": "mcr.microsoft.com/devcontainers/typescript-node:20",
  "features": {
    "ghcr.io/devcontainers/features/docker-in-docker:2": {}
  },
  "postCreateCommand": ".devcontainer/postCreateCommand.sh",
  "customizations": {
    "vscode": {
      "extensions": [
        "GitHub.copilot",
        "GitHub.copilot-chat"
      ],
      "settings": {
        "github.copilot.enable": {
          "*": true
        }
      }
    }
  }
}
```

**postCreateCommand.sh**:
```bash
#!/bin/bash
# Pull FOAAS MCP Docker image
docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest

# Configure MCP (mcp.json already in .vscode/)
echo "✅ FOAAS MCP Demo environment ready!"
echo "👉 Open GitHub Copilot Chat and try: '@workspace use foaas_awesome tool'"
```

### 2. Interactive Challenges

**Challenge progression**:
- **Challenge 1**: Verify MCP server is running (`List tools` prompt)
- **Challenge 2**: Call a simple tool (`Use foaas_awesome`)
- **Challenge 3**: Add review comment to sample PR
- **Challenge 4**: Generate creative content with context
- **Challenge 5**: Use coding agent with GHCR image

Each challenge includes:
- Clear objective
- Sample prompt
- Expected outcome
- Troubleshooting tips
- Success criteria

### 3. Pre-populated Content

**Sample Issues** (5-10 issues with labels):
- `bug` - "Authentication fails on startup"
- `feature` - "Add support for custom responses"
- `question` - "How do I configure FOAAS URL?"
- `bikeshedding` - "Should we use tabs or spaces?"
- `good first issue` - "Add more examples to README"

**Sample PRs** (3-5 PRs with different states):
- Draft PR with questionable code (for `foaas_think` testing)
- PR with missing documentation (for `foaas_rtfm`)
- PR with excellent work (for `foaas_legend`)

### 4. Guided Tutorial

**TUTORIAL.md sections**:
1. **Setup** (5 min) - Fork, Codespaces, verify installation
2. **Basic Usage** (10 min) - Try tools in Copilot Chat
3. **GitHub Integration** (15 min) - Issue comments, PR reviews
4. **Creative Mode** (10 min) - Fun scenarios and use cases
5. **Advanced** (20 min) - Coding agent, custom scenarios
6. **Next Steps** - Link to main repo, contribution guide

## User Flow

### Option A: Fork & Codespaces (Zero Setup)
1. Click "Use this template" or "Fork"
2. Click "Code" → "Create codespace on main"
3. Wait 30-60 seconds for environment setup
4. Open `TUTORIAL.md` in Codespaces
5. Follow guided challenges
6. Everything works instantly (Docker, MCP, Copilot)

### Option B: Local Clone
1. Clone repository
2. Run `npm run setup` (pulls Docker image, configures MCP)
3. Restart VS Code
4. Follow `TUTORIAL.md`

## Technical Components

### Automation
- **Welcome workflow**: Opens "Start Here" issue on fork
- **Challenge checker**: GitHub Action validates challenge completion
- **Badge system**: Awards badges for completed challenges (optional)

### MCP Configuration
Pre-configured `.vscode/mcp.json`:
```json
{
  "mcpServers": {
    "foaas-mcp": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "ghcr.io/gusztavvargadr/foaas-mcp:latest"
      ]
    }
  }
}
```

### Sample Prompts File
`examples/prompts.md` with copy-paste ready prompts:
- "Use @foaas_legend to praise this contributor"
- "Add a review comment with @foaas_think on this function"
- "Generate a fun response to this bikeshedding issue"

## Benefits

- **Zero friction**: Works immediately in Codespaces
- **Guided learning**: Clear progression through features
- **Safe sandbox**: Fork doesn't affect main repo
- **Social proof**: Users can share their completed forks
- **Marketing**: "Try it now" button in main README
- **Validation**: Real users testing real scenarios
- **Feedback**: Issue templates collect structured feedback

## Marketing Integration

**Main README.md call-to-action**:
```markdown
## 🚀 Try it Now (No Installation Required)

Want to experience FOAAS MCP without setup? 

1. **Fork the demo**: [foaas-mcp-demo](https://github.com/gusztavvargadr/foaas-mcp-demo)
2. **Open in Codespaces**: Click "Code" → "Create codespace"
3. **Follow the tutorial**: Complete 5 challenges in ~30 minutes

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/gusztavvargadr/foaas-mcp-demo)
```

## Implementation Phases

### Phase 1: Basic Template (MVP)
- Devcontainer configuration
- Basic README and TUTORIAL
- Pre-configured MCP settings
- 2-3 simple challenges

### Phase 2: Content & Examples
- Sample issues and PRs
- Comprehensive prompts file
- Complete 5-challenge progression
- Troubleshooting guide

### Phase 3: Automation
- Welcome workflow
- Challenge validation
- Badge system
- Analytics tracking

## Considerations

- **Codespaces costs**: Free tier is 60 hours/month (sufficient for trials)
- **Docker image size**: Already optimized (~200MB)
- **Maintenance**: Need to keep demo in sync with main repo
- **Dependencies**: Requires GitHub Copilot subscription
- **Scope**: Could be complex to build and maintain
- **Alternative**: Simple "fork and try" without heavy automation

## Success Metrics

- Number of forks/uses
- Codespaces sessions created
- Challenges completed (via issues)
- User feedback collected
- Conversion to main repo stars/contributions

## Inspiration

- GitHub Skills (learning labs)
- Template repositories (instant projects)
- Replit templates (instant environments)
- Glitch projects (remix and try)

## Priority

**Medium-High** - Great for launch and user acquisition, but requires investment. Consider building **after** initial launch to validate interest first. Could be v0.3.0 or v0.4.0 feature.

## Alternative: Lightweight Version

If full template is too much, create simpler version:
- Just `.vscode/mcp.json` and README
- Single "Try This" section with 3-5 prompts
- No Codespaces (local only)
- No automation/challenges
- Still provides "try before commit" experience
