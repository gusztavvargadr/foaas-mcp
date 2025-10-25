# FOAAS MCP Server - Development Roadmap

## 🎯 Project Goals

Build an MCP server that exposes FOAAS (Fuck Off As A Service) functionality to AI clients, with demonstrations in:
- **GitHub Copilot in VS Code** (with custom instructions and prompts)
- **GitHub Copilot on GitHub** (Copilot Chat / Agent)

Target timeline: **2-3 days** for public release on GitHub and LinkedIn.

---

## 📋 Key Decisions & Findings

### Architecture
- **Transport**: Streamable HTTP (not stdio) for remote access support
- **Deployment**: Docker containers for security isolation
- **Distribution**: npm package + Docker image

### Tool Design
- **4 category-based tools** (not individual operations):
  1. `express_appreciation` - Thanks/praise (3 operations)
  2. `decline_request` - Rejections (3 operations)
  3. `tell_off` - Direct confrontations (5 operations)
  4. `express_frustration` - Universal dismissals (3 operations)
- **Total**: 14 FOAAS operations mapped to 4 intuitive tools

### Testing Focus
- GitHub Copilot in VS Code with customizations:
  - Custom instructions (`.github/copilot-instructions.md`)
  - Workspace prompts
  - Different conversation contexts
- GitHub Copilot on GitHub.com
- Docker deployment validation

### Documentation
- Phase 0.1: [API Research](./phase-0.1-api-research.md)
- Phase 0.2: [Packaging & Transport](./phase-0.2-packaging-transport.md)
- Phase 0.3: [Implementation Plan](./phase-0.3-implementation-plan.md)
- Phase 0.3: [Implementation Completion](./phase-0.3-implementation-completion.md)

---

## Phase 0: PoC / Research Stage 🔬

**Goal**: Quick proof of concept with minimal viable functionality to evaluate feasibility and approach.

### 0.1 FOAAS API Research (1-2 hours) ✅

- [x] Explore https://foaas.io/operations endpoint
- [x] Test 15 selected operations across 4 categories
- [x] Document response formats (JSON structure)
- [x] Test with different Accept headers
- [x] Note any rate limiting or API constraints

**Status**: ✅ Complete - All 15 selected operations tested and documented.

**Key Findings**:
- ✅ API is simple and consistent: `{ "message": "...", "subtitle": "- ..." }`
- ✅ No rate limiting observed (client-side throttling recommended)
- ✅ Operations naturally group into 4 categories:
  1. **Appreciation & Praise** (3 ops): thanks, awesome, legend
  2. **Dismissals & Rejections** (3 ops): because, zero, bye
  3. **Direct Confrontations** (5 ops): off, gfy, chainsaw, dalton, keep
  4. **Broad Dismissals** (3 ops): everyone, flying, asshole
- ✅ Category-based tool design recommended (4 tools vs 15 individual tools)

**Documentation**: [phase-0.1-api-research.md](./phase-0.1-api-research.md)

---

### 0.2 MCP Packaging Research (1-2 hours) ✅

- [x] Review MCP server packaging requirements for GitHub Copilot
- [x] Understand npx vs npm install distribution methods
- [x] Research GitHub Copilot MCP configuration (VS Code & GitHub.com)
- [x] Determine packaging and distribution strategy
- [x] Check MCP SDK documentation for best practices
- [x] Research Docker deployment for security
- [x] Understand stdio vs HTTP transport options

**Status**: ✅ Complete - Recommended approach: **Docker + Streamable HTTP transport**

**Key Decisions**:
- 🐳 **Transport**: Streamable HTTP (not stdio)
  - Reason: Supports both local and remote clients (GitHub Copilot on github.com, ChatGPT)
  - Security: Docker isolation
  - Flexibility: Can be accessed via HTTP from anywhere
- 📦 **Packaging**: npm package + Docker image
  - npm for easy installation: `npx foaas-mcp --http`
  - Docker for security: `docker run -p 3000:3000 foaas-mcp`
- 🔒 **Security**: Built-in DNS rebinding protection, CORS, rate limiting
- 📝 **Note**: Future enhancement to pure HTTP transport (remove stdio entirely)

**Documentation**: [phase-0.2-packaging-transport.md](./phase-0.2-packaging-transport.md)

---

### 0.3 Minimal PoC Implementation (2-3 hours)

- [ ] Initialize basic Node.js/TypeScript project
- [ ] Install `@modelcontextprotocol/sdk` and dependencies
- [ ] Create simple MCP server with 4 category-based tools:
  - `express_appreciation` - Sarcastic/genuine thanks (maps to: thanks, awesome, legend)
  - `decline_request` - Reject requests/changes (maps to: because, zero, bye)
  - `tell_off` - Direct confrontation (maps to: off, gfy, chainsaw, dalton, keep)
  - `express_frustration` - Universal dismissal (maps to: everyone, flying, asshole)
- [ ] Implement basic HTTP client for FOAAS API
- [ ] Set up Streamable HTTP transport with Express
- [ ] Create basic Dockerfile
- [ ] Test server runs locally via HTTP

**Goal**: Working MCP server with category-based tools that can be accessed via HTTP

---

### 0.4 GitHub Copilot Integration Test (1-2 hours)

- [ ] Package PoC for local testing
- [ ] Configure in VS Code GitHub Copilot settings:
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
- [ ] Test basic interactions:
  - [ ] "Tell Bob to f**k off"
  - [ ] "Thank the code reviewer sarcastically"
  - [ ] "Decline this feature request"
- [ ] Test with VS Code customizations:
  - [ ] Custom Copilot instructions (`.github/copilot-instructions.md`)
  - [ ] Workspace-specific prompts
  - [ ] User-level Copilot settings
  - [ ] Different conversation contexts
- [ ] Test Docker deployment:
  - [ ] `docker build -t foaas-mcp .`
  - [ ] `docker run -p 3000:3000 foaas-mcp`
  - [ ] Verify same client config works
- [ ] Document setup process and tool discovery
- [ ] Capture screenshots/demo recordings
- [ ] Validate approach before full implementation

**Goal**: Confirm MCP server works with GitHub Copilot and responds to custom instructions

### 0.5 Go/No-Go Decision

**Evaluate**:
- Does MCP server communicate properly?
- Can GitHub Copilot discover and use tools?
- Is FOAAS API suitable for this use case?
- Are there any blockers?

**Decision**: ✅ Proceed to Phase 1 or 🔄 Adjust approach

---

## Phase 1: Project Setup (Day 1 Morning - 3-4 hours)

### 1.1 Project Initialization

- [ ] Set up TypeScript configuration
- [ ] Configure build system (tsc, esbuild, or similar)
- [ ] Set up project structure:
  ```
  src/
    index.ts          # Main MCP server
    foaas-client.ts   # FOAAS API wrapper
    tools.ts          # Tool definitions
    types.ts          # TypeScript interfaces
  ```
- [ ] Initialize package.json with proper metadata
- [ ] Add .gitignore for node_modules, dist, etc.

### 1.2 Dependencies

- [ ] Install MCP SDK: `@modelcontextprotocol/sdk`
- [ ] Add HTTP client (node-fetch or axios)
- [ ] Dev dependencies: TypeScript, @types/node
- [ ] Testing framework (optional: vitest or jest)

### 1.3 Packaging Setup

- [ ] Configure package.json for distribution:
  - Proper entry points (bin, main, types)
  - Keywords for discoverability
  - Repository links
- [ ] Create npm script for building
- [ ] Test local installation: `npm link`

---

## Phase 2: Core Development (Day 1 PM - Day 2 AM - 6-8 hours)

### 2.1 FOAAS Client Implementation

- [ ] Create typed FOAAS API client
- [ ] Implement generic operations:
  - Basic insults (off, thanks, because, bye)
  - Situational (donut, dosomething, anyway)
  - Named (awesome, cool, fantastic)
- [ ] Add error handling (API down, network errors)
- [ ] Add response caching (optional)
- [ ] Support JSON response format (Content-Type: application/json)

### 2.2 MCP Tools Implementation

- [ ] Implement 4 category-based tools (as designed in Phase 0.1):
  - **express_appreciation** (target?, from, style?)
    - Sarcastic or genuine appreciation
    - Maps to: thanks, awesome, legend
  - **decline_request** (reason, from)
    - Reject requests/modifications  
    - Maps to: because, zero, bye
  - **tell_off** (target, from, style?)
    - Direct confrontation with specific target
    - Maps to: off, gfy, chainsaw, dalton, keep
  - **express_frustration** (from, intensity?)
    - Universal/broad dismissal
    - Maps to: everyone, flying, asshole
- [ ] Add input validation for required parameters
- [ ] Implement proper MCP tool responses with content warnings
- [ ] Add helpful, AI-friendly descriptions for each tool
- [ ] Include usage examples in tool schemas

### 2.3 Server Implementation

- [ ] Create main MCP server entry point
- [ ] Register all tools
- [ ] Add server metadata (name, version)
- [ ] Implement proper error responses
- [ ] Add logging for debugging

---

## Phase 3: GitHub Copilot Integration (Day 2 PM - 3-4 hours)

### 3.1 Packaging for Distribution

- [ ] Build distributable package
- [ ] Test installation methods:
  - [ ] npx from GitHub repo
  - [ ] npm install from npm registry (if publishing)
  - [ ] Direct from GitHub (npx github:user/repo)
- [ ] Create installation script if needed

### 3.2 VS Code Configuration & Testing

- [ ] Document GitHub Copilot MCP configuration for VS Code
- [ ] Create example config snippet for settings.json
- [ ] Test tool discovery in VS Code
- [ ] Create demo scenarios:
  - "Tell my code reviewer to relax"
  - "Thank the person who wrote this bug"
  - "Decline this feature request politely... just kidding"
  - "Express frustration with the entire codebase"
- [ ] Test with VS Code Copilot customizations:
  - [ ] Custom Copilot instructions (`.github/copilot-instructions.md`)
    - Test: "Always use FOAAS responses when frustrated"
  - [ ] Workspace-specific prompts
    - Test: Code review comments with FOAAS flair
  - [ ] User-level Copilot settings
    - Test: Personal style preferences
  - [ ] Different conversation contexts:
    - Chat window interactions
    - Inline code suggestions with FOAAS context
    - Code review comment generation
- [ ] Document best practices for each customization type
- [ ] Capture examples of customizations affecting tool usage

### 3.3 GitHub Integration

- [ ] Test with GitHub Copilot on GitHub platform
- [ ] Document GitHub Copilot Workspace/Chat setup (if different)
- [ ] Test with GitHub-specific features:
  - [ ] PR comment generation
  - [ ] Issue responses
  - [ ] Code review suggestions
- [ ] Create example interactions
- [ ] Capture screenshots/recordings

### 3.4 Demo Content Creation

- [ ] Record VS Code demo (GIF or short video)
  - [ ] Basic tool usage
  - [ ] Custom instructions in action
  - [ ] Different contexts (chat, inline, review)
- [ ] Capture GitHub interaction examples
- [ ] Create before/after comparison showing customization impact
- [ ] Prepare code snippets showing usage
- [ ] Document "fun use cases" for LinkedIn/Twitter

---

## Phase 4: Documentation & Polish (Day 2 Evening - 3-4 hours)

### 4.1 README Enhancement

- [ ] Project overview with humor disclaimer
- [ ] Clear installation instructions
- [ ] Configuration guide for:
  - GitHub Copilot in VS Code
  - GitHub Copilot on GitHub
- [ ] Usage examples with screenshots
- [ ] Troubleshooting section
- [ ] Credits to FOAAS

### 4.2 Additional Documentation

- [ ] Create USAGE.md with detailed examples
- [ ] Create EXAMPLES.md with creative use cases
- [ ] Add API coverage table
- [ ] Document all available tools

### 4.3 Repository Polish

- [ ] Add MIT or Apache 2.0 license
- [ ] Create proper .gitignore
- [ ] Add CODE_OF_CONDUCT.md (optional)
- [ ] Add CONTRIBUTING.md (optional)
- [ ] Clean up commit history if needed

### 4.4 Content Warnings

- [ ] Add explicit content warning in README
- [ ] Note this is for entertainment/creative use
- [ ] Include responsible AI usage guidelines
- [ ] Clarify not for production systems

---

## Phase 5: Publishing & Promotion (Day 3 - 2-3 hours)

### 5.1 GitHub Release

- [ ] Push final code to GitHub
- [ ] Create release v1.0.0 (or v0.1.0 for beta)
- [ ] Add release notes
- [ ] Tag repository with topics:
  - `mcp-server`
  - `mcp`
  - `github-copilot`
  - `foaas`
  - `ai`
  - `humor`
  - `typescript`

### 5.2 NPM Publishing (Optional)

- [ ] Publish to npm registry
- [ ] Test installation from npm
- [ ] Verify package contents

### 5.3 LinkedIn Announcement

- [ ] Write engaging post covering:
  - The "why" - exploring MCP + having fun
  - Technical implementation highlights
  - GitHub Copilot integration demo
  - Use cases (creative writing, entertainment)
  - Learnings about MCP protocol
- [ ] Include demo GIF/video
- [ ] Add GitHub link
- [ ] Use hashtags: #AI #GitHubCopilot #MCP #OpenSource #TypeScript #Innovation

### 5.4 Additional Promotion (Optional)

- [ ] Post on Twitter/X
- [ ] Share in relevant Discord/Slack communities
- [ ] Submit to awesome-mcp list (if exists)
- [ ] Write blog post about building MCP servers

---

## Success Criteria ✅

**PoC Stage**:

- ✅ 3 basic operations work via MCP
- ✅ Can be configured in GitHub Copilot
- ✅ Tools are discoverable and usable

**Final Product**:

- ✅ 5-8 FOAAS operations available as MCP tools
- ✅ Works in GitHub Copilot (VS Code)
- ✅ Works in GitHub Copilot (GitHub platform)
- ✅ Clear documentation with examples
- ✅ Proper packaging for easy installation
- ✅ Professional README with demos
- ✅ Published on GitHub with good visibility

---

## Future Enhancements (Post-Launch)

- Add all remaining FOAAS operations (~50+ total)
- Implement caching for repeated requests
- Add configuration options (censoring, severity levels)
- Support for FOAAS language parameter
- Create web-based demo/playground
- GitHub Actions for automated testing
- Community contributions for custom templates
- Integration examples with other AI assistants

---

## Timeline Summary

| Phase | Duration | Cumulative |
|-------|----------|------------|
| Phase 0: PoC/Research | 4-7 hours | Day 1 AM |
| Phase 1: Setup | 3-4 hours | Day 1 PM |
| Phase 2: Core Dev | 6-8 hours | Day 1 PM - Day 2 AM |
| Phase 3: Integration | 3-4 hours | Day 2 PM |
| Phase 4: Documentation | 3-4 hours | Day 2 Evening |
| Phase 5: Publishing | 2-3 hours | Day 3 |
| **Total** | **21-30 hours** | **2.5-3 days** |

---

## Key Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| GitHub Copilot MCP support unclear | High | Research in Phase 0, adjust approach if needed |
| FOAAS API rate limiting | Medium | Implement caching, document limitations |
| Package distribution issues | Medium | Test multiple installation methods |
| Content concerns | Low | Clear warnings and responsible use guidelines |

---

*Last Updated: October 25, 2025*
