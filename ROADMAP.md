# FOAAS MCP Server - Development Roadmap

## 🎯 Project Goals

Build an MCP server that exposes FOAAS (Fuck Off As A Service) functionality to AI clients, with demonstrations in:
- **GitHub Copilot in VS Code** (with custom instructions and prompts)
- **GitHub Copilot on GitHub** (Copilot Chat / Agent)

Target timeline: **2-3 days** for public release on GitHub and LinkedIn.

---

## 📋 Key Decisions & Findings

### Architecture
- **Transport**: ~~Streamable HTTP~~ → **stdio-only** for VS Code MCP (simplified for security)
- **Deployment**: Docker containers for security isolation (Debian 12 Bookworm Slim)
- **Security**: Non-root user (nodejs UID 1001), dumb-init, minimal attack surface
- **Distribution**: Docker image (HTTP/SSE removed, stdio sufficient for demonstration)

### Tool Design
- **18 total tools** (exceeded original plan):
  - **4 group tools** (intelligent wrappers with randomization):
    1. `express_appreciation` - Thanks/praise (3 operations)
    2. `decline_request` - Rejections (3 operations)
    3. `tell_off` - Direct confrontations (5 operations)
    4. `express_frustration` - Universal dismissals (3 operations)
  - **14 individual tools** (direct operation mapping):
    - thanks, awesome, legend, because, zero, bye, off, gfy, chainsaw, dalton, keep, everyone, flying, asshole
- **Total**: 14 FOAAS operations available both as groups AND individual tools for flexibility

### Testing Focus
- ✅ GitHub Copilot in VS Code with customizations
- ✅ Docker deployment validation
- ⏳ GitHub Copilot coding agent (pending GHCR setup)

### Documentation Status
- ✅ Comprehensive README.md (consolidated all phase docs)
- ✅ .github/copilot-instructions.md for development
- ✅ ROADMAP.md as living document

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

---

### 0.2 MCP Packaging Research (1-2 hours) ✅

- [x] Review MCP server packaging requirements for GitHub Copilot
- [x] Understand npx vs npm install distribution methods
- [x] Research GitHub Copilot MCP configuration (VS Code & GitHub.com)
- [x] Determine packaging and distribution strategy
- [x] Check MCP SDK documentation for best practices
- [x] Research Docker deployment for security
- [x] Understand stdio vs HTTP transport options

**Status**: ✅ Complete - **FINAL: Docker + stdio transport** (HTTP/SSE removed)

**Key Decisions** (Updated based on implementation):
- 🐳 **Transport**: ~~Streamable HTTP~~ → **stdio-only**
  - Reason: Simpler, more secure, sufficient for VS Code demonstration
  - Security: No network exposure, Docker isolation
  - Trade-off: Can't access remotely (acceptable for this project's scope)
- 📦 **Packaging**: Docker image only
  - Docker for security: `docker build -t foaas-mcp .`
  - VS Code MCP: `docker run --rm -i foaas-mcp`
- 🔒 **Security Enhancements**:
  - Debian 12 Bookworm Slim base (better CVE management than Alpine)
  - Non-root user execution (nodejs UID 1001)
  - dumb-init for proper signal handling
  - Zero npm vulnerabilities
  - No network exposure (stdio only)

---

### 0.3 Minimal PoC Implementation (2-3 hours) ✅

- [x] Initialize basic Node.js/TypeScript project
- [x] Install `@modelcontextprotocol/sdk` and dependencies
- [x] Create MCP server with **18 tools** (exceeded plan):
  - 4 group tools: `express_appreciation`, `decline_request`, `tell_off`, `express_frustration`
  - 14 individual tools: direct 1:1 mapping to FOAAS operations
- [x] Implement FOAAS HTTP client with all operations
- [x] ~~Set up Streamable HTTP transport~~ → Set up stdio transport (security decision)
- [x] Create production-grade Dockerfile (Debian Bookworm, non-root, dumb-init)
- [x] Test server runs in Docker via stdio

**Status**: ✅ Complete - Exceeded original scope with dual tool approach (groups + individuals)

**Goal**: ~~Working MCP server with category-based tools that can be accessed via HTTP~~ → **Working Docker-first MCP server with stdio transport and enhanced security**

---

### 0.4 GitHub Copilot Integration Test (1-2 hours) ✅

- [x] Package PoC for Docker testing
- [x] Configure in VS Code GitHub Copilot (`.vscode/mcp.json`):
  ```json
  {
    "mcpServers": {
      "foaas-mcp-dev": {
        "command": "docker",
        "args": ["run", "--rm", "-i", "--name", "foaas-mcp-stdio", "foaas-mcp"]
      }
    }
  }
  ```
- [x] Test basic interactions:
  - [x] "Tell John to gfy"
  - [x] "Tell off" with randomization
  - [x] "Express frustration" with group tools
- [x] Test with VS Code customizations:
  - [x] Custom Copilot instructions (`.github/copilot-instructions.md`)
  - [x] GitHub integration (tested with issue comments)
- [x] Test Docker deployment:
  - [x] `docker build -t foaas-mcp .`
  - [x] Verified stdio transport works with VS Code
- [x] Document setup process (in README.md)
- [x] Validate approach

**Status**: ✅ Complete - Docker-first stdio approach validated and working

**Goal**: ~~Confirm MCP server works with GitHub Copilot and responds to custom instructions~~ → **Validated and production-ready**

### 0.5 Go/No-Go Decision ✅

**Evaluate**:
- Does MCP server communicate properly? ✅ Yes (stdio transport)
- Can GitHub Copilot discover and use tools? ✅ Yes (18 tools discovered)
- Is FOAAS API suitable for this use case? ✅ Yes (all operations working)
- Are there any blockers? ✅ No blockers

**Decision**: ✅ **GO** - Proceeded to implementation with enhanced security approach

---

## Phase 1: Project Setup (Day 1 Morning - 3-4 hours) ✅

### 1.1 Project Initialization ✅

- [x] Set up TypeScript configuration (ES2022, strict mode)
- [x] Configure build system (tsc)
- [x] Set up project structure (enhanced):
  ```
  src/
    index.ts              # Main stdio entry point
    server.ts             # MCP server with tool registry
    foaas/
      client.ts           # FOAAS API wrapper
      types.ts            # TypeScript interfaces
    tools/
      individual/         # 14 individual tools
      groups/             # 4 group tools
    utils/                # Utilities (reserved)
  ```
- [x] Initialize package.json with proper metadata
- [x] Add .gitignore, .dockerignore

### 1.2 Dependencies ✅

- [x] Install MCP SDK: `@modelcontextprotocol/sdk@^1.20.2`
- [x] HTTP client: Built-in node:https
- [x] Dev dependencies: TypeScript, @types/node
- [x] Validation: zod@^3.25.76, zod-to-json-schema@^3.24.2
- [x] Zero npm vulnerabilities achieved

### 1.3 Packaging Setup ✅

- [x] Configure package.json for Docker distribution
- [x] Create npm scripts: `build`, `dev`, `docker:build`
- [x] Docker as primary distribution method (not npm)

---

## Phase 2: Core Development (Day 1 PM - Day 2 AM - 6-8 hours) ✅

### 2.1 FOAAS Client Implementation ✅

- [x] Create typed FOAAS API client with FoaasResponse interface
- [x] Implement all 14 selected operations:
  - Appreciation: thanks, awesome, legend
  - Rejection: because, zero, bye
  - Confrontation: off, gfy, chainsaw, dalton, keep
  - Frustration: everyone, flying, asshole
- [x] Add error handling (API down, network errors, timeouts)
- [x] Support JSON response format (Content-Type: application/json)
- [x] No caching (not needed for demonstration)

### 2.2 MCP Tools Implementation ✅

- [x] Implement **18 tools** (exceeded plan):
  - **4 group tools** with intelligent randomization:
    - `express_appreciation` - Randomly selects: thanks, awesome, or legend
    - `decline_request` - Randomly selects: because, zero, or bye
    - `tell_off` - Randomly selects: off, gfy, chainsaw, dalton, or keep
    - `express_frustration` - Randomly selects: everyone, flying, or asshole
  - **14 individual tools** for direct operation access
- [x] Input validation using Zod schemas
- [x] Proper MCP tool responses with `⚠️ EXPLICIT CONTENT` warnings
- [x] AI-friendly descriptions for each tool
- [x] Dual content response (message + subtitle)

### 2.3 Server Implementation ✅

- [x] Create main MCP server entry point (stdio transport)
- [x] Register all 18 tools with categorization
- [x] Add server metadata (name: "foaas-mcp-dev", version from package.json)
- [x] Implement proper error responses
- [x] Logging via MCP SDK built-in mechanisms

---

## Phase 3: GitHub Copilot Integration (Day 2 PM - 3-4 hours) ✅

### 3.1 Packaging for Distribution ✅

- [x] Build distributable Docker image
- [x] Test installation: `docker build -t foaas-mcp .`
- [x] ~~npx/npm distribution~~ → Docker-only distribution (security decision)

### 3.2 VS Code Configuration & Testing ✅

- [x] Document GitHub Copilot MCP configuration (in README.md)
- [x] Create .vscode/mcp.json config for Docker stdio
- [x] Test tool discovery in VS Code (18 tools discovered)
- [x] Test demo scenarios:
  - [x] "Tell John to gfy from me"
  - [x] "Tell off" with randomization
  - [x] "Express frustration" with group tools
- [x] Test with VS Code Copilot customizations:
  - [x] Custom Copilot instructions (`.github/copilot-instructions.md`)
  - [x] GitHub integration tested (issue comment creation)
- [x] Document setup in README and Copilot instructions

**Note**: GitHub Copilot coding agent integration and demo content moved to Phase 6 (depends on GHCR setup in Phase 5)

---

## Phase 4: Documentation & Polish (Day 2 Evening - 3-4 hours) ✅

### 4.1 README Enhancement ✅

- [x] Comprehensive README.md (300+ lines)
- [x] Project overview with humor disclaimer
- [x] Clear Docker installation instructions
- [x] Configuration guide for VS Code GitHub Copilot
- [x] Usage examples for all 18 tools
- [x] Troubleshooting section
- [x] Credits to FOAAS

### 4.2 Additional Documentation ✅

- [x] .github/copilot-instructions.md (179 lines for development)
- [x] API coverage: All 14 selected operations implemented
- [x] Tool reference table in README
- [x] ROADMAP.md preserved in root (living document)

### 4.3 Repository Polish ✅

- [x] Add MIT license
- [x] Create .gitignore and .dockerignore
- [x] Clean documentation structure
- [x] Professional commit history

### 4.4 Content Warnings ✅

- [x] `⚠️ EXPLICIT CONTENT` warnings in all tool descriptions
- [x] Note about entertainment/demonstration use in README
- [x] Responsible AI usage guidelines
- [x] Clear disclaimer about production use

---

## Phase 5: GitHub Container Registry & CI/CD (Day 3 - 4-6 hours) ⏳ In Progress

**Goal**: Set up automated Docker image publishing to GitHub Container Registry (GHCR) for use with GitHub Copilot coding agent.

### 5.1 GitHub Container Registry Setup ⏳

- [ ] Create `.github/workflows/docker-publish.yml` for automated builds
- [ ] Configure workflow to build on:
  - Push to main branch
  - New version tags (e.g., v1.0.0, v1.1.0)
  - Pull requests (build only, no push)
- [ ] Set up multi-platform builds (linux/amd64, linux/arm64)
- [ ] Configure image tagging strategy:
  - `latest` for main branch
  - `vX.Y.Z` for version tags
  - `sha-<commit>` for specific commits
- [ ] Add image metadata (labels, annotations)
- [ ] Test automated build pipeline

**Expected Output**: `ghcr.io/gusztavvargadr/foaas-mcp:latest`

### 5.2 GitHub Copilot Coding Agent Integration ⏳

- [ ] Create MCP configuration documentation for repository
- [ ] Document JSON configuration format:
  ```json
  {
    "mcpServers": {
      "foaas": {
        "type": "local",
        "command": "docker",
        "args": [
          "run",
          "--rm",
          "-i",
          "ghcr.io/gusztavvargadr/foaas-mcp:latest"
        ],
        "tools": ["*"]
      }
    }
  }
  ```
- [ ] Add instructions for repository administrators
- [ ] Test configuration with coding agent
- [ ] Document validation steps

**Reference**: [Extending GitHub Copilot coding agent with MCP](https://docs.github.com/en/copilot/how-tos/agents/copilot-coding-agent/extending-copilot-coding-agent-with-mcp)

### 5.3 Documentation Updates ⏳

- [ ] Update README.md with GHCR usage instructions
- [ ] Add section for GitHub Copilot coding agent integration
- [ ] Document image pulling: `docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest`
- [ ] Add troubleshooting for image access (public vs private)
- [ ] Create USAGE-CODING-AGENT.md with step-by-step guide

### 5.4 Image Optimization ⏳

- [ ] Review Dockerfile for optimization opportunities
- [ ] Consider layer caching strategies
- [ ] Verify image size (target: <250MB)
- [ ] Test image on both amd64 and arm64
- [ ] Add health check mechanism (if applicable)

---

## Phase 6: Testing & Quality Assurance (Day 4 - 4-6 hours) ⏳ Pending

**Goal**: Implement comprehensive testing and follow best practices for public repository release.

### 6.1 Unit Tests ⏳

- [ ] Set up testing framework (vitest or jest)
- [ ] Test FOAAS client:
  - [ ] Test all 14 operation methods
  - [ ] Test error handling (network failures, timeouts, invalid responses)
  - [ ] Test JSON parsing
  - [ ] Mock HTTP requests
- [ ] Test tool schemas:
  - [ ] Validate Zod schema definitions
  - [ ] Test JSON schema conversion
- [ ] Add test scripts to package.json
- [ ] Target: >80% code coverage

### 6.2 Integration Tests ⏳

- [ ] Test MCP server lifecycle:
  - [ ] Server initialization
  - [ ] Tool registration
  - [ ] Server metadata
- [ ] Test stdio transport:
  - [ ] Request/response cycle
  - [ ] Error handling
  - [ ] Protocol compliance
- [ ] Test Docker image:
  - [ ] Image builds successfully
  - [ ] Container starts and responds
  - [ ] Non-root user verification
  - [ ] Signal handling (dumb-init)
- [ ] Test with MCP Inspector or similar tool
- [ ] **GitHub Copilot coding agent integration** (from Phase 3.3):
  - [ ] Test with GHCR image in coding agent
  - [ ] Verify tools are discoverable
  - [ ] Test actual task assignments
  - [ ] Document integration experience

### 6.3 GitHub Actions CI ⏳

- [ ] Create `.github/workflows/ci.yml`
- [ ] Run tests on:
  - [ ] Push to main
  - [ ] Pull requests
  - [ ] Multiple Node.js versions (18, 20, 22)
- [ ] Check code quality:
  - [ ] TypeScript compilation
  - [ ] Linting (eslint)
  - [ ] Formatting (prettier)
- [ ] Security scanning:
  - [ ] npm audit
  - [ ] Dependabot alerts
  - [ ] Docker image scanning (Trivy)
- [ ] Add CI status badge to README

### 6.4 Repository Best Practices ⏳

- [ ] Add CONTRIBUTING.md:
  - [ ] How to set up development environment
  - [ ] How to run tests
  - [ ] How to submit PRs
  - [ ] Code style guidelines
- [ ] Add SECURITY.md:
  - [ ] Supported versions
  - [ ] How to report vulnerabilities
  - [ ] Security update policy
- [ ] Add CODE_OF_CONDUCT.md (Contributor Covenant)
- [ ] Configure GitHub repository settings:
  - [ ] Branch protection rules for main
  - [ ] Require status checks before merging
  - [ ] Enable Dependabot security updates
  - [ ] Enable Dependabot version updates
- [ ] Add issue templates:
  - [ ] Bug report
  - [ ] Feature request
  - [ ] Question
- [ ] Add pull request template
- [ ] Configure repository topics and description

### 6.5 Documentation Review ⏳

- [ ] Review README.md for completeness
- [ ] Ensure all examples work
- [ ] Add architecture diagram (optional)
- [ ] Add FAQ section
- [ ] Proofread all documentation
- [ ] Check all links work

### 6.6 Demo Content Creation ⏳ (from Phase 3.4)

- [ ] Record VS Code demo (GIF or short video)
- [ ] Record coding agent demo with GHCR image
- [ ] Capture interaction examples for documentation
- [ ] Create usage guide with real scenarios
- [ ] Document "fun use cases" for LinkedIn post
- [ ] Prepare before/after examples showing tool usage

---

## Phase 7: Public Release & Promotion (Day 5 - 2-3 hours) ⏳ Pending

### 7.1 GitHub Release ⏳

- [x] Push final code to GitHub (main branch)
- [ ] Create release v1.0.0
- [ ] Add comprehensive release notes:
  - **Features**: 18 FOAAS tools, Docker-first approach, GitHub Copilot integration
  - **Security**: Debian Bookworm Slim, non-root execution, zero vulnerabilities
  - **Distribution**: GHCR hosted image
  - **Documentation**: Complete guides for VS Code and coding agent
- [ ] Tag repository with topics:
  - `mcp-server`, `mcp`, `github-copilot`, `foaas`
  - `ai`, `humor`, `typescript`, `docker`, `security`
  - `github-container-registry`, `coding-agent`
- [ ] Verify image is publicly accessible on GHCR
- [ ] Test installation from release notes

### 7.2 NPM Publishing ❌ Not Applicable

- [x] ~~Publish to npm registry~~ → Docker-only distribution (security decision)

### 7.3 LinkedIn Announcement ⏳

- [ ] Write engaging post covering:
  - **The Journey**: Exploring MCP + having fun + security learning
  - **Technical Highlights**:
    - Docker-first approach with Debian Bookworm (security over convenience)
    - 18 tools with dual design (groups + individuals)
    - GitHub Container Registry integration for coding agent
    - Zero npm vulnerabilities
  - **Integration Stories**:
    - VS Code MCP local development
    - GitHub Copilot coding agent in repositories
  - **Use Cases**: Creative writing, entertainment, learning MCP protocol
  - **Key Learnings**:
    - Docker security best practices (non-root, minimal base images)
    - MCP protocol implementation
    - Debian vs Alpine trade-offs
    - CI/CD with GHCR
- [ ] Include demo GIF/video
- [ ] Add GitHub repository link
- [ ] Add GHCR image link
- [ ] Use hashtags: #AI #GitHubCopilot #MCP #OpenSource #TypeScript #Docker #Security #DevOps #GHCR

### 7.4 Additional Promotion ⏳

- [ ] Post on Twitter/X
- [ ] Share in relevant communities:
  - [ ] MCP Discord/Slack
  - [ ] Docker community
  - [ ] GitHub Discussions
  - [ ] Reddit (r/docker, r/programming, r/typescript)
- [ ] Submit to awesome lists:
  - [ ] awesome-mcp (if exists)
  - [ ] awesome-github-copilot (if exists)
- [ ] Write blog post (optional):
  - Building secure MCP servers with Docker
  - GitHub Copilot coding agent integration guide
  - Lessons learned from production-ready MCP server
- [ ] Consider submitting to:
  - [ ] Dev.to
  - [ ] Medium
  - [ ] Hashnode

---

## Success Criteria ✅

**PoC Stage**: ✅ **Complete**

- ✅ 18 tools work via MCP (exceeded 3 basic operations)
- ✅ Can be configured in GitHub Copilot
- ✅ Tools are discoverable and usable

**Final Product**: ✅ **Core Complete** (Phases 5-7 pending for public release)

- ✅ 14 FOAAS operations available as 18 MCP tools (exceeded 5-8 target)
- ✅ Works in GitHub Copilot (VS Code)
- ⏳ Works in GitHub Copilot coding agent - Pending GHCR setup (Phase 5)
- ✅ Clear documentation with examples (comprehensive README)
- ✅ Proper packaging for easy installation (Docker-first)
- ✅ Professional README with tool reference
- ⏳ GHCR image publishing - Pending (Phase 5)
- ⏳ Testing & CI/CD - Pending (Phase 6)
- ⏳ Public release - Pending (Phase 7)

---

## Future Enhancements (Post-Launch)

**Potential v2.0 Features**:
- Add all remaining FOAAS operations (~50+ total)
- Implement caching for repeated requests
- Add configuration options (censoring, severity levels)
- Support for FOAAS language parameter
- GitHub Actions for automated testing
- Community contributions for custom templates

**Alternative Transport Options** (if needed):
- HTTP/SSE transport for remote access (removed in v1.0 for security)
- WebSocket transport for bidirectional communication
- Integration examples with other AI assistants (ChatGPT, Claude)

**Security Enhancements**:
- Automated vulnerability scanning (Dependabot, Snyk)
- Regular base image updates
- Security policy documentation

---

## Timeline Summary

| Phase | Duration | Status | Cumulative |
|-------|----------|--------|------------|
| Phase 0: PoC/Research | 4-7 hours | ✅ Complete | Day 1 AM |
| Phase 1: Setup | 3-4 hours | ✅ Complete | Day 1 PM |
| Phase 2: Core Dev | 6-8 hours | ✅ Complete | Day 1 PM - Day 2 AM |
| Phase 3: Integration | 3-4 hours | ✅ Complete | Day 2 PM |
| Phase 4: Documentation | 3-4 hours | ✅ Complete | Day 2 Evening |
| Phase 5: GHCR & CI/CD | 4-6 hours | ⏳ In Progress | Day 3 |
| Phase 6: Testing & QA | 5-7 hours | ⏳ Pending | Day 4 |
| Phase 7: Public Release | 2-3 hours | ⏳ Pending | Day 5 |
| **Total** | **30-44 hours** | **~45% done** | **4-5 days** |

---

## Key Risks & Mitigations

| Risk | Impact | Mitigation | Status |
|------|--------|------------|---------|
| GitHub Copilot MCP support unclear | High | Research in Phase 0, adjust approach if needed | ✅ Resolved - MCP support confirmed |
| FOAAS API rate limiting | Medium | Implement caching, document limitations | ✅ Accepted - Documented, no caching needed |
| Package distribution issues | Medium | Test multiple installation methods | ✅ Resolved - Docker-first via GHCR |
| Content concerns | Low | Clear warnings and responsible use guidelines | ✅ Resolved - All warnings in place |
| GHCR image access | Medium | Ensure public visibility, test access | ⏳ Pending Phase 5 |
| Test coverage | Medium | Implement comprehensive testing in Phase 6 | ⏳ Pending Phase 6 |
| CI/CD pipeline failures | Medium | Test thoroughly, have rollback plan | ⏳ Pending Phase 5-6 |

---

## Implementation Summary (Living Document)

**What We Built** (vs Original Plan):
- ✅ **18 tools** instead of 4 (exceeded plan with dual approach)
- ✅ **stdio-only** transport instead of HTTP (security decision)
- ✅ **Debian Bookworm Slim** base image (security over size)
- ✅ **Non-root execution** with dumb-init (production-grade)
- ✅ **Zero npm vulnerabilities** (clean dependency tree)
- ✅ **Single comprehensive README** (300+ lines)
- ✅ **Docker-first workflow** (not npm-first)

**Architecture Changes**:
| Original Plan | Actual Implementation | Reason |
|--------------|----------------------|---------|
| HTTP/SSE transport | stdio-only | Simpler, more secure, sufficient for demo |
| 4 group tools | 18 tools (4 groups + 14 individual) | More flexibility for users |
| Unspecified base | Debian Bookworm Slim | Better CVE management than Alpine |
| npm package | Docker image only | Security isolation priority |

**Current Status**: 🚧 **v1.0 in progress** - Core complete, GHCR + Testing + Release pending

**Next Steps**:
1. **Phase 5**: Set up GitHub Container Registry with automated builds
2. **Phase 6**: Add comprehensive testing and CI/CD
3. **Phase 7**: Public release and promotion

---

*Last Updated: October 25, 2025*
*Living Document - Updated to reflect actual implementation*
