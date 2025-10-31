# Repository Best Practices - Implementation Plan

**Status**: Completed  
**Started**: October 28, 2025  
**Completed**: October 28, 2025  
**Assignee**: gusztavvargadr

## Overview

Implement GitHub community standards and best practices to make the repository professional and ready for public launch. This was a **launch blocker** - completed before making repo public and social media announcement.

**Actual Time**: ~2-3 hours  
**Priority**: High (Tier 1 - Launch Essential)

## Completion Summary

All repository best practices have been successfully implemented:

### ✅ Community Files (Phase 1)
- ✅ `CONTRIBUTING.md` - Development guidelines and contribution process
- ✅ `SECURITY.md` - Security policy and vulnerability reporting
- ✅ `CODE_OF_CONDUCT.md` - Contributor Covenant 2.1

### ✅ GitHub Templates (Phase 2)
- ✅ `.github/ISSUE_TEMPLATE/bug_report.yml` - Bug report template
- ✅ `.github/ISSUE_TEMPLATE/feature_request.yml` - Feature request template
- ✅ `.github/ISSUE_TEMPLATE/question.yml` - Question template
- ✅ `.github/ISSUE_TEMPLATE/config.yml` - Template configuration
- ✅ `.github/pull_request_template.md` - PR template
- ✅ `.github/CODEOWNERS` - Code ownership definitions
- ✅ `.github/dependabot.yml` - Automated dependency updates

### ✅ Documentation (Phase 4)
- ✅ README badges (Docker Build, License, Docker Image)
- ✅ Professional documentation structure
- ✅ Clear quick start and usage examples

### 🎯 Result
**Repository is launch-ready** with professional community standards, comprehensive templates, and automated dependency management.

---

## Original Implementation Plan

Below is the original detailed implementation plan for reference:

---

## Phase 1: Community Files (60-90 min)

### 1.1 CONTRIBUTING.md

**Location**: `/CONTRIBUTING.md` (root)

**Content Structure**:
```markdown
# Contributing to FOAAS MCP

## Development Environment Setup
- Prerequisites (Node.js 20+, Docker, VS Code)
- Clone and install
- Running tests locally
- Building Docker images

## How to Contribute
- Fork the repository
- Create a feature branch
- Make your changes
- Run tests
- Submit a pull request

## Code Style Guidelines
- TypeScript strict mode
- ES2022 modules
- Prettier/ESLint (if configured)
- Follow existing patterns

## Adding a New Tool
- Step-by-step guide (reference docs/DEVELOPMENT.md)
- Shared schema usage
- Testing requirements
- Documentation updates

## Running Tests
- Unit tests: `npm test`
- Docker tests: `npm run test:docker`
- Coverage: `npm run test:coverage`
- All tests: `npm run test:all`

## Pull Request Process
1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG (if exists)
5. Request review

## Questions or Problems?
- Open an issue
- Check existing issues and discussions
```

**Reference Existing Content**:
- Link to `docs/DEVELOPMENT.md` for architecture details
- Link to `.github/copilot-instructions.md` for AI assistant guidelines
- Keep it concise, avoid duplication

**Checklist**:
- [ ] Create CONTRIBUTING.md
- [ ] Cross-reference with DEVELOPMENT.md
- [ ] Add PR checklist section
- [ ] Include tool addition guide

---

### 1.2 SECURITY.md

**Location**: `/SECURITY.md` (root)

**Content Structure**:
```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

**Please DO NOT open public issues for security vulnerabilities.**

### How to Report

1. **GitHub Security Advisory**: Preferred method
   - Go to: https://github.com/gusztavvargadr/foaas-mcp/security/advisories/new
   - Provide detailed information

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Fix & Disclosure**: Coordinated with reporter

## Security Considerations

This project runs in Docker containers with:
- Non-root user (nodejs UID 1001)
- No network exposure (stdio-only transport)
- Minimal attack surface
- Regular dependency updates (Dependabot)

## Security Updates

Security patches are released as soon as possible:
- Critical: Immediate patch release
- High: Within 7 days
- Medium/Low: Next scheduled release

## Security Best Practices for Users

1. **Use official images**: `ghcr.io/gusztavvargadr/foaas-mcp`
2. **Pin versions**: Use specific version tags, not `latest`
3. **Regular updates**: Keep Docker images updated
4. **Review permissions**: Understand MCP tool capabilities
5. **Network isolation**: Use stdio transport only

## Known Security Limitations

- **Explicit content**: FOAAS returns profanity (by design)
- **Public API**: Connects to foaas.io (external dependency)
- **No authentication**: MCP server assumes trusted local environment

## Security Scanning

- Dependabot: Automated dependency vulnerability scanning
- Docker: Debian 12 Bookworm Slim (regular security patches)
- Future: Trivy scanning (planned in backlog)
```

**Key Details to Add**:
- Your preferred security contact email
- Enable GitHub Security Advisories
- Reference Docker security model
- Clear about explicit content nature

**Checklist**:
- [ ] Create SECURITY.md
- [ ] Add security contact method
- [ ] Enable GitHub Security Advisories
- [ ] Document security architecture
- [ ] List supported versions

---

### 1.3 CODE_OF_CONDUCT.md

**Location**: `/CODE_OF_CONDUCT.md` (root)

**Approach**: Use standard Contributor Covenant 2.1

**Content**: 
```markdown
# Contributor Covenant Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual
identity and orientation.

[... rest of Contributor Covenant 2.1 ...]

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT EMAIL].

All complaints will be reviewed and investigated promptly and fairly.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.1, available at
[https://www.contributor-covenant.org/version/2/1/code_of_conduct.html][v2.1].

[homepage]: https://www.contributor-covenant.org
[v2.1]: https://www.contributor-covenant.org/version/2/1/code_of_conduct.html
```

**Quick Method**:
```bash
curl -o CODE_OF_CONDUCT.md https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md
# Then edit enforcement contact email
```

**Checklist**:
- [ ] Create CODE_OF_CONDUCT.md (Contributor Covenant 2.1)
- [ ] Add enforcement contact email
- [ ] GitHub will auto-detect and display in repo

---

## Phase 2: GitHub Templates (30-45 min)

### 2.1 Issue Templates

**Location**: `/.github/ISSUE_TEMPLATE/`

**Files to Create**:
1. `bug_report.yml`
2. `feature_request.yml`
3. `question.yml`
4. `config.yml` (optional - disable blank issues)

**2.1.1 Bug Report** (`bug_report.yml`):
```yaml
name: Bug Report
description: Report a bug or unexpected behavior
title: "[Bug]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for taking the time to report a bug!

  - type: textarea
    id: description
    attributes:
      label: Bug Description
      description: Clear description of the bug
      placeholder: What went wrong?
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: How can we reproduce this?
      placeholder: |
        1. Configure MCP with...
        2. Run command...
        3. See error...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should have happened?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happened?
    validations:
      required: true

  - type: dropdown
    id: version
    attributes:
      label: Version
      description: Which version are you using?
      options:
        - latest
        - v0.1.0
        - Built from source
        - Other (specify in description)
    validations:
      required: true

  - type: dropdown
    id: environment
    attributes:
      label: Environment
      description: Where are you running this?
      options:
        - VS Code (local)
        - GitHub Codespaces
        - Docker Desktop
        - Other (specify)
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Logs / Error Messages
      description: Relevant logs or error messages
      render: shell
      placeholder: Paste error output here

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Anything else we should know?
```

**2.1.2 Feature Request** (`feature_request.yml`):
```yaml
name: Feature Request
description: Suggest a new feature or enhancement
title: "[Feature]: "
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for suggesting a feature! Check the [roadmap](docs/roadmap/) first.

  - type: textarea
    id: problem
    attributes:
      label: Problem Statement
      description: What problem does this solve?
      placeholder: I'm frustrated when...
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Proposed Solution
      description: How should this work?
      placeholder: I'd like to be able to...
    validations:
      required: true

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: What other approaches have you thought about?

  - type: dropdown
    id: priority
    attributes:
      label: Priority (Your Perspective)
      options:
        - Nice to have
        - Would be useful
        - Important
        - Critical
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Additional Context
      description: Screenshots, examples, references, etc.
```

**2.1.3 Question** (`question.yml`):
```yaml
name: Question
description: Ask a question about usage or configuration
title: "[Question]: "
labels: ["question"]
body:
  - type: markdown
    attributes:
      value: |
        Have a question? We're here to help!
        
        **First**, check:
        - [README](README.md)
        - [Development Guide](docs/DEVELOPMENT.md)
        - [Tools Reference](docs/TOOLS.md)

  - type: textarea
    id: question
    attributes:
      label: Your Question
      description: What would you like to know?
    validations:
      required: true

  - type: dropdown
    id: category
    attributes:
      label: Question Category
      options:
        - Installation / Setup
        - Configuration
        - Usage / Features
        - Development / Contributing
        - Docker / Deployment
        - Other
    validations:
      required: true

  - type: textarea
    id: tried
    attributes:
      label: What Have You Tried?
      description: Any troubleshooting steps you've already taken?

  - type: textarea
    id: context
    attributes:
      label: Additional Context
      description: Anything else that might help us answer?
```

**2.1.4 Config** (`config.yml`):
```yaml
blank_issues_enabled: true
contact_links:
  - name: Documentation
    url: https://github.com/gusztavvargadr/foaas-mcp/blob/main/README.md
    about: Read the documentation first
  - name: Roadmap
    url: https://github.com/gusztavvargadr/foaas-mcp/blob/main/docs/roadmap/README.md
    about: Check planned features and progress
```

**Checklist**:
- [ ] Create `.github/ISSUE_TEMPLATE/` directory
- [ ] Add bug_report.yml
- [ ] Add feature_request.yml
- [ ] Add question.yml
- [ ] Add config.yml
- [ ] Test templates by creating sample issues

---

### 2.2 Pull Request Template

**Location**: `/.github/pull_request_template.md`

**Content**:
```markdown
## Description

<!-- Provide a brief description of your changes -->

## Type of Change

<!-- Mark relevant items with [x] -->

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to break)
- [ ] Documentation update
- [ ] Code refactoring (no functional changes)
- [ ] Test additions/improvements
- [ ] CI/CD changes
- [ ] Dependency updates

## Related Issues

<!-- Link related issues: Fixes #123, Closes #456, Related to #789 -->

## Changes Made

<!-- List key changes -->

- 
- 
- 

## Testing

<!-- Describe testing performed -->

- [ ] Unit tests pass (`npm test`)
- [ ] Docker tests pass (`npm run test:docker`)
- [ ] Coverage maintained or improved (`npm run test:coverage`)
- [ ] Manual testing performed
- [ ] New tests added for new features

## Documentation

- [ ] README updated (if needed)
- [ ] DEVELOPMENT.md updated (if needed)
- [ ] TOOLS.md updated (if adding/changing tools)
- [ ] Code comments added/updated
- [ ] Roadmap updated (if completing a roadmap item)

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] No console warnings or errors
- [ ] Docker image builds successfully
- [ ] All CI checks pass
- [ ] Branch is up-to-date with main

## Screenshots / Demo

<!-- If applicable, add screenshots or demo output -->

## Additional Notes

<!-- Any other information for reviewers -->
```

**Checklist**:
- [ ] Create pull_request_template.md
- [ ] Ensure checklist is comprehensive
- [ ] Test by opening a sample PR

---

## Phase 3: Repository Configuration (30 min)

### 3.1 Branch Protection Rules

**Settings → Branches → Add rule**

**Configuration for `main` branch**:
- [x] Require a pull request before merging
  - [x] Require approvals: 1 (for external contributors)
  - [ ] Dismiss stale PR approvals (optional - good for active projects)
  - [x] Require review from Code Owners (if you add CODEOWNERS file)
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date
  - Select: "build" (from docker-publish.yml)
  - Select: "test" (from docker-publish.yml)
- [x] Require conversation resolution before merging
- [x] Require linear history (optional - cleaner history)
- [x] Do not allow bypassing the above settings
- [x] Allow force pushes: Only for administrators
- [x] Allow deletions: No

**Checklist**:
- [ ] Configure branch protection for `main`
- [ ] Enable required status checks
- [ ] Set required approvals

---

### 3.2 Repository Settings

**Settings → General**

**Description**: 
```
🐳 Secure Docker-based MCP server exposing FOAAS (Fuck Off As A Service) - 23 tools for humorous dev responses
```

**Website**: 
```
https://foaas.io
```

**Topics** (add these):
```
mcp
mcp-server
model-context-protocol
foaas
github-copilot
docker
typescript
ai-assistant
developer-tools
humor
```

**Features**:
- [x] Issues
- [x] Discussions (enable for Q&A)
- [ ] Projects (not needed yet)
- [x] Wiki (optional)
- [x] Sponsorships (if you want GitHub Sponsors)

**Pull Requests**:
- [x] Allow merge commits
- [x] Allow squash merging (recommended)
- [x] Allow rebase merging
- [x] Always suggest updating PR branches
- [x] Automatically delete head branches

**Checklist**:
- [ ] Update repository description
- [ ] Add repository topics (10 keywords)
- [ ] Set website URL
- [ ] Enable Discussions
- [ ] Configure PR settings

---

### 3.3 Dependabot Configuration

**Location**: `/.github/dependabot.yml`

**Content**:
```yaml
version: 2
updates:
  # npm dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "UTC"
    open-pull-requests-limit: 10
    reviewers:
      - "gusztavvargadr"
    labels:
      - "dependencies"
      - "npm"
    commit-message:
      prefix: "chore(deps)"
      include: "scope"
    groups:
      # Group development dependencies
      dev-dependencies:
        patterns:
          - "@types/*"
          - "@vitest/*"
          - "vitest"
          - "tsx"
          - "typescript"
      # Group production dependencies
      production-dependencies:
        patterns:
          - "@modelcontextprotocol/*"
          - "zod"
          - "zod-to-json-schema"

  # Docker dependencies
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "UTC"
    reviewers:
      - "gusztavvargadr"
    labels:
      - "dependencies"
      - "docker"
    commit-message:
      prefix: "chore(docker)"

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "UTC"
    reviewers:
      - "gusztavvargadr"
    labels:
      - "dependencies"
      - "github-actions"
    commit-message:
      prefix: "chore(ci)"
```

**Checklist**:
- [ ] Create `.github/dependabot.yml`
- [ ] Enable Dependabot security alerts (Settings → Security → Dependabot)
- [ ] Enable Dependabot security updates
- [ ] Enable Dependabot version updates
- [ ] Test by checking for dependency PRs

---

### 3.4 CODEOWNERS (Optional but Recommended)

**Location**: `/.github/CODEOWNERS`

**Content**:
```
# CODEOWNERS for foaas-mcp
# These owners will be requested for review on PRs

# Default owner for everything
* @gusztavvargadr

# Documentation
/docs/ @gusztavvargadr
*.md @gusztavvargadr

# CI/CD
/.github/ @gusztavvargadr
/Dockerfile @gusztavvargadr
/docker-compose.yml @gusztavvargadr

# Core source
/src/ @gusztavvargadr

# Tests
/src/__tests__/ @gusztavvargadr
```

**Checklist**:
- [ ] Create CODEOWNERS file
- [ ] Update branch protection to require Code Owner review

---

## Phase 4: CI/CD & README Enhancements (15-30 min)

### 4.1 Add CI Status Badge to README

**Edit**: `/README.md`

**Add at top after title**:
```markdown
# FOAAS MCP Server

[![Docker Build](https://github.com/gusztavvargadr/foaas-mcp/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/gusztavvargadr/foaas-mcp/actions/workflows/docker-publish.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Pulls](https://img.shields.io/docker/pulls/gusztavvargadr/foaas-mcp)](https://github.com/gusztavvargadr/foaas-mcp/pkgs/container/foaas-mcp)

⚠️ **EXPLICIT CONTENT WARNING** ⚠️
```

**Optional Additional Badges**:
- Coverage badge (if you publish coverage)
- Version badge
- PRs welcome badge

**Checklist**:
- [ ] Add CI status badge
- [ ] Add license badge
- [ ] Add Docker pulls badge (GHCR)
- [ ] Verify badges display correctly

---

### 4.2 Add Labels

**Settings → Labels**

**Recommended Labels**:
```
Type Labels:
- bug (red) - Something isn't working
- enhancement (blue) - New feature or request
- documentation (blue) - Documentation improvements
- question (purple) - Questions about usage

Priority Labels:
- priority: critical (red)
- priority: high (orange)
- priority: medium (yellow)
- priority: low (green)

Status Labels:
- status: triage (yellow) - Needs initial review
- status: in-progress (blue) - Being worked on
- status: blocked (red) - Blocked by something
- status: ready (green) - Ready to work on

Category Labels:
- category: docker (blue)
- category: mcp (blue)
- category: tools (blue)
- category: ci-cd (blue)
- category: security (red)

Meta Labels:
- good first issue (green)
- help wanted (green)
- duplicate (gray)
- wontfix (gray)
- invalid (gray)
- dependencies (blue) - For Dependabot
```

**Quick Setup**:
GitHub provides default labels. You can add/customize as needed.

**Checklist**:
- [ ] Review default labels
- [ ] Add custom labels (priorities, categories)
- [ ] Remove unused default labels

---

## Phase 5: Testing & Validation (15 min)

### 5.1 Validation Checklist

**Community Profile**:
- [ ] Visit: https://github.com/gusztavvargadr/foaas-mcp/community
- [ ] Verify all items are checked:
  - [x] Description
  - [x] README
  - [x] Code of conduct
  - [x] Contributing
  - [x] License
  - [x] Security policy
  - [x] Issue templates
  - [x] Pull request template

**Insights Check**:
- [ ] Settings → Insights → Community Standards shows 100%

**Manual Testing**:
- [ ] Create test issue using each template
- [ ] Create test PR to verify template
- [ ] Check Dependabot is configured (should see it in Security tab)
- [ ] Verify branch protection rules work (try pushing to main)
- [ ] Verify badges display correctly in README

---

## Summary Checklist

### Community Files (Root Level)
- [ ] CONTRIBUTING.md created
- [ ] SECURITY.md created
- [ ] CODE_OF_CONDUCT.md created

### GitHub Templates (.github/)
- [ ] .github/ISSUE_TEMPLATE/bug_report.yml
- [ ] .github/ISSUE_TEMPLATE/feature_request.yml
- [ ] .github/ISSUE_TEMPLATE/question.yml
- [ ] .github/ISSUE_TEMPLATE/config.yml
- [ ] .github/pull_request_template.md
- [ ] .github/CODEOWNERS
- [ ] .github/dependabot.yml

### Repository Settings
- [ ] Description updated
- [ ] Topics/tags added (10 keywords)
- [ ] Website URL set
- [ ] Discussions enabled
- [ ] Branch protection configured
- [ ] PR settings configured
- [ ] Labels organized
- [ ] Dependabot enabled

### Documentation Updates
- [ ] README badges added
- [ ] Community profile 100%

### Testing
- [ ] All templates tested
- [ ] Dependabot verified
- [ ] Branch protection tested
- [ ] Badges verified

---

## Post-Implementation

After completing all items:

1. **Verify Community Standards**: Should show 100%
2. **Create Announcement Issue**: Document completion
3. **Update Roadmap**: Move this file to `completed/`
4. **Ready for Public Launch**: Repository is now ready to make public
5. **Next Step**: Social media announcement (separate roadmap item)

---

## Time Estimates

| Phase | Time | Priority |
|-------|------|----------|
| Phase 1: Community Files | 60-90 min | High |
| Phase 2: GitHub Templates | 30-45 min | High |
| Phase 3: Repository Config | 30 min | High |
| Phase 4: CI/CD & README | 15-30 min | Medium |
| Phase 5: Testing | 15 min | High |
| **Total** | **2.5-3.5 hours** | - |

---

## Notes

- Can be done in one sitting or split across multiple sessions
- Most items are one-time setup with minimal ongoing maintenance
- Dependabot will create PRs automatically (main ongoing activity)
- Templates can be refined based on actual usage
- Some items (like Discussions) can be enabled later if not needed immediately
