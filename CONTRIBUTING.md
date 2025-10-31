# Contributing to FOAAS MCP

Thank you for your interest in contributing to FOAAS MCP! This document provides guidelines and instructions for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Project Architecture](#project-architecture)
- [Development Environment](#development-environment)
- [How to Contribute](#how-to-contribute)
- [Code Style Guidelines](#code-style-guidelines)
- [Adding a New Tool](#adding-a-new-tool)
- [Running Tests](#running-tests)
- [Pull Request Process](#pull-request-process)
- [CI/CD Pipeline](#cicd-pipeline)
- [Debugging](#debugging)
- [Questions or Problems?](#questions-or-problems)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

Before you begin:
- Review the [README](README.md) for project overview and usage scenarios
- Review the [Roadmap](docs/roadmap/) to see what's planned
- Check [existing issues](https://github.com/gusztavvargadr/foaas-mcp/issues) to avoid duplicates

## Project Architecture

**Transport**: stdio only (no HTTP/network)  
**Runtime**: Docker (Debian 12 Bookworm Slim + Node.js 20.19.5)  
**Language**: TypeScript 5.9.3 (ES2022, strict mode)  
**Tools**: 23 individual tools (all `foaas_*` prefix)

### Architecture Decisions

**Individual Tools Only**: Direct 1:1 mapping to FOAAS API operations
- Each tool maps to exactly one FOAAS endpoint
- AI can select the best contextual fit
- Simpler architecture (no randomization logic)
- Consistent parameters within each tool

**stdio Transport**: Simpler and more secure than HTTP
- No network exposure
- Process isolation via Docker
- Sufficient for VS Code integration
- Standard MCP pattern

**Docker-First**: Isolated, portable, reproducible
- Non-root user (nodejs UID 1001)
- dumb-init for proper signal handling
- Minimal base (Debian 12 Bookworm Slim)
- Multi-platform support (amd64 + arm64)

## Development Environment

### Prerequisites

- **Node.js 20+** (LTS recommended)
- **Docker** (for building and testing)
- **VS Code** (recommended, with GitHub Copilot for testing)
- **Git** (obviously!)

### Setup

1. **Fork and clone** the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/foaas-mcp.git
   cd foaas-mcp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Build Docker image**:
   ```bash
   npm run docker:build
   ```

5. **Run tests**:
   ```bash
   npm test
   npm run test:docker
   ```

## How to Contribute

### Reporting Bugs

1. **Search existing issues** first
2. **Use the bug report template** when creating a new issue
3. **Provide complete information**: steps to reproduce, expected/actual behavior, version, environment
4. **Include logs/errors** if applicable

### Suggesting Features

1. **Check the [roadmap](docs/roadmap/)** - it might already be planned!
2. **Use the feature request template**
3. **Explain the problem** you're trying to solve
4. **Describe your proposed solution**
5. **Consider alternatives** you've thought about

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
3. **Make your changes**
4. **Write/update tests**
5. **Run all tests** (see [Running Tests](#running-tests))
6. **Commit your changes** with clear messages:
   ```bash
   git commit -m "feat: add new tool for X"
   # or
   git commit -m "fix: resolve issue with Y"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Open a Pull Request**

## Code Style Guidelines

### General Principles

- **TypeScript strict mode** - no type `any` unless absolutely necessary
- **ES2022 modules** - use `import/export`, not `require`
- **Functional style** - prefer pure functions and immutability
- **DRY principle** - reuse shared components (especially schemas)

### TypeScript Conventions

```typescript
// Use explicit types for function parameters and return values
export async function fetchData(url: string): Promise<FoaasResponse> {
  // ...
}

// Use const for immutable values
const API_BASE_URL = 'https://foaas.io';

// Use interfaces for object shapes
interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: z.ZodObject<any>;
  handler: ToolHandler;
}
```

### File Organization

- **One tool per file** in `src/tools/individual/`
- **Shared utilities** in `src/tools/shared/`
- **Tests** in `src/__tests__/`
- **Keep files focused** - single responsibility principle

### Naming Conventions

- **Files**: lowercase with hyphens (`my-tool.ts`)
- **Variables/functions**: camelCase (`myFunction`)
- **Types/Interfaces**: PascalCase (`MyInterface`)
- **Constants**: UPPER_SNAKE_CASE (`MY_CONSTANT`)
- **Tool names**: `foaas_` prefix (`foaas_mytool`)

## Adding a New Tool

### 1. Create Tool File

**Location**: `src/tools/individual/newtool.ts`

```typescript
import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const newtoolTool = {
  name: 'foaas_newtool',
  description: 'Use for [specific scenario]. [When to use this tool].',
  inputSchema: z.object({
    to: toParam,  // Include if operation takes a target
    from: fromParam
  }),
  handler: async (args, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.newtool(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
```

**Description Guidelines:**
- Focus on use cases and scenarios
- Keep responses as surprises - describe when to use, not what it says
- Be specific about the situation (e.g., "lazy bug reports", "code review requests")

**Shared Schemas**: Always use from `src/tools/shared/schemas.ts`:
- `fromParam` - Who is sending/performing action (always required)
- `toParam` - Who/what is receiving/targeted (for operations with targets)
- `formatFoaasResponse()` - Standard response format

### 2. Add Client Method

**Location**: `src/foaas/client.ts`

```typescript
async newtool(name: string, from: string): Promise<FoaasResponse> {
  return this.fetch(`/newtool/${encodeURIComponent(name)}/${encodeURIComponent(from)}`);
}
```

### 3. Register in Server

**Location**: `src/server.ts`

```typescript
import { newtoolTool } from './tools/individual/newtool.js';

const allTools = [
  // ... existing tools
  newtoolTool
];
```

### 4. Add Tests

**Location**: `src/__tests__/tools.test.ts`

```typescript
describe('foaas_newtool', () => {
  it('should handle newtool operation', async () => {
    const result = await server.callTool('foaas_newtool', {
      to: 'target',
      from: 'sender'
    });
    expect(result.content[0].text).toContain('expected text');
  });
});
```

### 5. Update Documentation

- Update README.md with the new tool if it's a significant addition
- Update demo scenarios in `docs/demo/data/` if appropriate
- Update roadmap if completing a roadmap item

### 6. Build and Test

```bash
npm run build
npm test
npm run docker:build
npm run test:docker
```

## Running Tests

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (during development)
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Docker Tests

```bash
# Test local Docker image
npm run test:docker

# Test specific image tag
npm run test:docker:registry
```

### All Tests

```bash
# Run both unit and Docker tests
npm run test:all
```

### Test Requirements

- **All tests must pass** before submitting PR
- **Coverage must be maintained** (currently 100%)
- **Add tests for new features**
- **Update tests for changed features**

## Pull Request Process

### Before Submitting

1. ✅ **Run all tests** and ensure they pass
2. ✅ **Update documentation** if needed
3. ✅ **Add tests** for new functionality
4. ✅ **Build Docker image** successfully
5. ✅ **Self-review your code**
6. ✅ **Check for console errors/warnings**
7. ✅ **Rebase on latest main** if needed

### PR Description

Use the [pull request template](.github/pull_request_template.md) and include:

- **Clear description** of changes
- **Type of change** (bug fix, feature, etc.)
- **Related issues** (Fixes #123)
- **Testing performed**
- **Screenshots/demo** (if applicable)

### Review Process

1. **Automated checks** will run (build, tests, linting)
2. **Code owner review** required
3. **Address feedback** promptly
4. **Resolve conversations** before merge
5. **Squash and merge** (keep history clean)

### After Merge

- Your branch will be automatically deleted
- Changes will be included in the next release
- You'll be credited in release notes! 🎉

## CI/CD Pipeline

### Pull Request Workflow

**On Pull Requests:**
1. Build Docker image (linux/amd64 only)
2. Run automated tests (`./test-server.sh`)
3. Report status
4. ❌ **No registry push** - images stay local

**Purpose**: Fast feedback, no unnecessary registry pollution

### Main Branch & Release Workflow

**On Main Branch Commits / Version Tags:**
1. Build Docker image (linux/amd64 only)
2. Run automated tests
3. **If tests pass**: Rebuild multi-platform (linux/amd64 + linux/arm64)
4. Push to GHCR with appropriate tags

**Critical**: Failed tests = no registry push. This ensures broken images never reach users.

### Tags Generated

- **PRs**: `pr-<number>` (e.g., `pr-5`)
- **Main commits**: `sha-<commit>` (e.g., `sha-a1b2c3d`)
- **Version tags**: `v1.0.0`, `1.0.0`, `1.0`, `1`, `latest`

### Registry

All images pushed to: `ghcr.io/gusztavvargadr/foaas-mcp`

## Debugging

### MCP Logs in VS Code

**View → Output → "Model Context Protocol"**

Shows all MCP communication, tool calls, and errors.

### Manual Container Testing

**List available tools:**
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest
```

**Test specific tool:**
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"Developer"}}}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest
```

**Test local image:**
```bash
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | \
  docker run --rm -i foaas-mcp:local
```

### Common Issues

**"MCP server not responding"**
- Check Docker is running
- Verify image exists: `docker images | grep foaas-mcp`
- Check MCP logs in VS Code Output panel

**"Tool not found"**
- Rebuild image: `npm run docker:build`
- Restart MCP server in VS Code
- Check tool is registered in `src/server.ts`

**"Tests failing"**
- Clean build: `npm run clean && npm run build`
- Rebuild Docker: `npm run docker:build`
- Check test output for specific failures

## Questions or Problems?

- **General questions**: Open a [question issue](https://github.com/gusztavvargadr/foaas-mcp/issues/new?template=question.yml)
- **Bugs**: Open a [bug report](https://github.com/gusztavvargadr/foaas-mcp/issues/new?template=bug_report.yml)
- **Features**: Open a [feature request](https://github.com/gusztavvargadr/foaas-mcp/issues/new?template=feature_request.yml)
- **Discussions**: Use [GitHub Discussions](https://github.com/gusztavvargadr/foaas-mcp/discussions)
- **Security**: See [SECURITY.md](SECURITY.md) for vulnerability reporting

## Additional Resources

- [README](README.md) - Usage scenarios and quick start
- [Demo Materials](docs/demo/) - Demo repository and LinkedIn GIF generation
- [Roadmap](docs/roadmap/) - Development plans and feature tracking
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [GitHub Copilot Instructions](.github/copilot-instructions.md) - AI assistant guidelines

## Recognition

Contributors are listed in:
- Release notes
- GitHub contributors page
- Project README (for significant contributions)

Thank you for contributing! 🚀
