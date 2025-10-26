# Consolidate Agent Documentation

**Status**: Backlog (Idea)

## Goal

Consolidate and clarify the separation between `.github/copilot-instructions.md` and potential `docs/AGENTS.md` to avoid duplication and confusion.

## Context

Currently we have `.github/copilot-instructions.md` (200+ lines) that serves as development guide for AI coding assistants. As the project grows, we may need clearer documentation structure for different audiences and use cases.

## Current State

**`.github/copilot-instructions.md`** contains:
- Project overview
- Architecture details
- Development workflows
- Tool design patterns
- Adding new tools guide
- CI/CD pipeline info
- Security model
- Documentation structure
- **Roadmap workflow (CRITICAL)**

**Potential confusion:**
- Is this for GitHub Copilot specifically or all AI agents?
- Should agent-specific config go elsewhere?
- How do we document other AI assistants (Claude, ChatGPT, etc.)?
- What's the boundary between "instructions" and "documentation"?

## Possible Approaches

### Option 1: Keep Current (Single File)
- Keep `.github/copilot-instructions.md` as is
- Name implies GitHub Copilot but content works for any agent
- Simple, no duplication
- Works well for current scope

### Option 2: Split by Audience
**`.github/copilot-instructions.md`** - Development guide for AI agents:
- Architecture overview
- Development workflows
- Code patterns and conventions
- How to add features
- Roadmap workflow

**`docs/AGENTS.md`** - Usage guide for different AI agents:
- GitHub Copilot (VS Code)
- GitHub Copilot Coding Agent
- Claude Desktop MCP
- ChatGPT (hypothetical)
- Other MCP clients

### Option 3: Split by Purpose
**`.github/copilot-instructions.md`** - Project context only:
- What this project does
- Architecture decisions
- Key patterns

**`docs/DEVELOPMENT.md`** - Development guide (expand existing):
- Workflows (build, test, deploy)
- Adding tools
- Roadmap workflow
- Contributing

**`docs/AGENTS.md`** - AI agent integration:
- Configuration examples
- Different agent setups
- Best practices

### Option 4: Merge into Existing Docs
- Move content to `DEVELOPMENT.md` and `README.md`
- Delete `.github/copilot-instructions.md`
- Simpler structure
- Less fragmentation

## Questions to Answer

1. **Audience**: Who reads each document?
   - Human developers?
   - AI coding assistants?
   - End users configuring agents?

2. **Scope**: What belongs in instructions vs documentation?
   - Development workflows?
   - Architecture decisions?
   - Configuration examples?
   - Usage guides?

3. **Duplication**: How much overlap is acceptable?
   - Should instructions reference docs?
   - Should docs be self-contained?

4. **Maintenance**: How to keep them in sync?
   - Single source of truth?
   - Clear boundaries?

5. **Future agents**: How to accommodate other AI assistants?
   - Generic patterns?
   - Agent-specific sections?

## Benefits of Consolidation

- **Clarity**: Clear purpose for each file
- **Maintainability**: Less duplication
- **Discoverability**: Easier to find information
- **Scalability**: Room for multiple agents

## Risks of Over-Organization

- **Complexity**: Too many small files
- **Fragmentation**: Information scattered
- **Overhead**: More files to maintain
- **Confusion**: Unclear boundaries

## Recommendation

**For Current State**: Keep `.github/copilot-instructions.md` as is
- Single source works well
- Not much duplication with other docs
- Clear purpose (AI development guide)
- Easy to maintain

**Consider Splitting When**:
- Supporting multiple AI platforms
- Community contributors need clearer guidance
- Instructions file grows beyond 300 lines
- Clear separation of concerns emerges

## Proposed Future Structure (If Needed)

```
.github/
  copilot-instructions.md    # Brief project context for AI

docs/
  DEVELOPMENT.md             # Expanded with workflows and patterns
  AGENTS.md                  # Multi-agent integration guide
  
  agents/                    # Optional: per-agent guides
    github-copilot.md
    claude-desktop.md
    custom-clients.md
```

## Next Steps If Pursued

1. Audit current content in copilot-instructions.md
2. Identify duplicated content with other docs
3. Define clear boundaries for each document
4. Create AGENTS.md with multi-platform guide
5. Refactor copilot-instructions.md to essentials
6. Update links and references
7. Document the new structure

## Related

- `.github/copilot-instructions.md` - Current AI development guide
- `docs/DEVELOPMENT.md` - Developer guide
- `README.md` - User guide
- `docs/roadmap/` - Feature tracking
