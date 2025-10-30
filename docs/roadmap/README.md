# FOAAS MCP Roadmap

This directory tracks the development roadmap for the FOAAS MCP server using an **incremental, append-only approach**.

## 📁 Directory Structure

```
docs/roadmap/
├── README.md          # This file - overview and workflow
├── next/              # Active work (2-5 items max)
├── backlog/           # Future ideas to be considered
└── completed/         # Historical reference (append-only)
```

Check each directory to see current status, active work, and completed features.

## 🔄 Workflow

### CRITICAL: Always Consult the Roadmap

**Before starting any feature:**
1. ✅ Check `next/` to see what's currently in progress
2. ✅ Check `backlog/` to avoid duplicate work
3. ✅ Create a new file in `backlog/` if it's a new idea

**When starting work on a feature:**
1. Move the file from `backlog/` → `next/`
2. Add your name and start date to the file
3. Update status to "In Progress"

**When finishing a feature:**
1. Move the file from `next/` → `completed/`
2. Add completion date to the file
3. Update status to "Completed"
4. **Update current state in other docs** (README.md, DEVELOPMENT.md, TOOLS.md, etc.)

### Append-Only Philosophy

- ✅ **DO**: Add new files to track new work
- ✅ **DO**: Move files between directories as status changes
- ✅ **DO**: Add completion notes to finished features
- ❌ **DON'T**: Delete or heavily edit completed items
- ❌ **DON'T**: Keep updating a single roadmap file

**Why?** Git history tracks the journey. Completed items document decisions. Current docs reflect the present.

## 📝 Feature File Format

Keep it simple and consistent:

```markdown
# Feature Name

**Status**: Backlog / In Progress / Completed
**Started**: YYYY-MM-DD (if applicable)
**Completed**: YYYY-MM-DD (if applicable)

## Goal
One-sentence description of what this achieves

## Context
Why we're doing this, what problem it solves

## What Changed (for completed items)
Brief summary of implementation

## Benefits
What value this provides

## Considerations
Trade-offs, alternatives, or future thoughts
```

## 🎯 Project Vision

Build a production-ready MCP server that:
- Exposes FOAAS functionality to AI clients
- Demonstrates MCP protocol in action
- Prioritizes security and best practices
- Provides comprehensive documentation
- Integrates seamlessly with GitHub Copilot

## 🔗 Related Documentation

- [README.md](../../README.md) - Main project documentation
- [DEVELOPMENT.md](../DEVELOPMENT.md) - Local development guide
- [TOOLS.md](../TOOLS.md) - Tool reference
- [.github/copilot-instructions.md](../../.github/copilot-instructions.md) - AI development guide
