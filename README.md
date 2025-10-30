# FOAAS MCP Server

[![Docker Build](https://github.com/gusztavvargadr/foaas-mcp/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/gusztavvargadr/foaas-mcp/actions/workflows/docker-publish.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Image](https://img.shields.io/badge/docker-ghcr.io-blue)](https://github.com/gusztavvargadr/foaas-mcp/pkgs/container/foaas-mcp)

⚠️ **EXPLICIT CONTENT WARNING** ⚠️

A secure, Docker-based [Model Context Protocol](https://modelcontextprotocol.io) server exposing [FOAAS](https://foaas.io/) (Fuck Off As A Service) operations. Perfect for adding humorous (and explicit) responses to development workflows.

## Features

- 🐳 Docker-first (Debian 12, Node.js 20.19.5, non-root)
- 🔧 23 MCP tools covering common dev scenarios
- � Scenario-based organization (bug reports, code reviews, PRs, etc.)
- 🔒 stdio-only transport (no network exposure)

## Quick Start

### Using Pre-built Image

```bash
docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest
```

**VS Code Configuration** (`.vscode/mcp.json`):
```json
{
  "mcpServers": {
    "foaas": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "ghcr.io/gusztavvargadr/foaas-mcp:latest"]
    }
  }
}
```

### Building from Source

```bash
git clone https://github.com/gusztavvargadr/foaas-mcp.git
cd foaas-mcp
npm run docker:build
```

Restart MCP server in VS Code (GitHub Copilot status bar → Restart MCP Servers).

## Available Tools (23 Total)

All tools provide direct 1:1 mapping to FOAAS operations with `foaas_` prefix:

**Appreciation & Praise (4):** thanks, awesome, legend, dalton  
**Rejections & Dismissals (3):** because, zero, bye  
**Direct Confrontations (4):** off, gfy, chainsaw, keep  
**General Frustration (3):** everyone, flying, asshole  
**Code Review & Quality (9):** logs, rtfm, think, thinking, shutup, look, ridiculous, understand, cool

## Usage Scenarios

### Bug Reports & Debugging

**"Works on my machine" / Runtime errors**
- `foaas_logs` - When the solution is clearly in the logs

**"How do I use X?" / Questions already in docs**
- `foaas_rtfm` - When documentation exists but wasn't read

**General confusion**
- `foaas_zero` - Express complete disinterest
- `foaas_everyone` - Universal dismissal
- `foaas_flying` - Maximum level of not caring

### Code Reviews

**Questionable code / Bad decisions**
- `foaas_think` - Question someone's thought process
- `foaas_thinking` - Alternative phrasing for questioning decisions

**Pointing out issues**
- `foaas_look` - Request someone examine something specific

**Nitpicking / Endless debates**
- `foaas_shutup` - Stop bikeshedding and trivial arguments

**Great contributions**
- `foaas_legend` - Genuine praise for someone
- `foaas_dalton` - Call someone a problem-solving hero

### Pull Requests & Issues

**Spam / Duplicates**
- `foaas_off` - Classic dismissal
- `foaas_bye` - End the conversation
- `foaas_thanks` - Sarcastic gratitude

**Absurd requests / Scope creep**
- `foaas_ridiculous` - For unrealistic requirements
- `foaas_chainsaw` - Dramatic reaction to absurdity

**Unclear requirements**
- `foaas_understand` - Express genuine confusion

**Sarcastic approval**
- `foaas_cool` - Dismiss excuses with peak sarcasm
- `foaas_awesome` - Enthusiastic (but maybe ironic) celebration

### Team Communication

**General frustration**
- `foaas_everyone` - Dismiss all parties
- `foaas_flying` - Express not caring
- `foaas_asshole` - General purpose frustration

**Rejecting requests**
- `foaas_because` - Answer "why not?" emphatically
- `foaas_zero` - Show complete disinterest

**Direct confrontation**
- `foaas_gfy` - Military-style professional profanity
- `foaas_keep` - Extended dismissal for persistent issues

**Team praise**
- `foaas_legend` - Call someone a legend
- `foaas_dalton` - Acknowledge problem-solving skills

## Example Usage

### GitHub Copilot Integration

Ask Copilot to use FOAAS MCP tools in natural language:

```
"Respond to this bug report with no logs" → foaas_logs
"Acknowledge @contributor's excellent fix" → foaas_legend
"This feature request is unrealistic" → foaas_ridiculous
"Stop bikeshedding on variable names" → foaas_shutup
```

### Direct Tool Calls

All tools require a `from` parameter. Tools with a target require `to`:

```json
{
  "name": "foaas_legend",
  "arguments": {
    "to": "contributor",
    "from": "maintainer"
  }
}
```

```json
{
  "name": "foaas_logs",
  "arguments": {
    "from": "support-bot"
  }
}
```

## Documentation

- **[Contributing Guide](CONTRIBUTING.md)** - Setup, architecture, development workflow
- **[Demo Materials](docs/demo/)** - LinkedIn GIFs, demo repository setup
- **[Roadmap](docs/roadmap/)** - Development roadmap and feature tracking

## Image Tags

- `latest` - Latest stable release
- `v1.0.0` - Semantic versions
- `sha-<commit>` - Specific commits (testing)

## Security

- Process isolation via Docker
- Non-root user (nodejs UID 1001)
- Minimal Debian 12 Bookworm Slim base
- stdio-only transport (no network)
- Regular security updates

## License

MIT License - See LICENSE file for details

## Links

- [FOAAS](https://foaas.io/) - Original API
- [Model Context Protocol](https://modelcontextprotocol.io) - MCP specification
- [GitHub Copilot](https://github.com/features/copilot) - AI integration
