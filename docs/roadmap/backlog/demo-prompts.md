# Demo Prompts Library

**Status**: Backlog

## Goal

Create a library of pre-written prompts to streamline issue and PR processing with FOAAS MCP integration.

## Context

Users and demos benefit from having ready-to-use prompts that effectively demonstrate FOAAS MCP capabilities in common scenarios.

## Proposed Library Structure

### Issue Processing Prompts

**Bug Reports:**
```
Review this bug report and use appropriate FOAAS tools to express frustration
with the issue quality. Be specific about what's missing.
```

**Incomplete Issues:**
```
Check this issue for required information (steps to reproduce, environment, 
expected vs actual). Use FOAAS logs tool if debugging info is missing.
```

**Duplicate Issues:**
```
This looks like a duplicate of #123. Use FOAAS tools to point this out.
```

**Feature Requests:**
```
Evaluate this feature request and use FOAAS tools appropriately if it's 
unrealistic or poorly defined.
```

### PR Review Prompts

**Code Quality:**
```
Review this PR for code quality issues. Use FOAAS think/thinking tools for 
questionable decisions.
```

**Missing Tests:**
```
Check if this PR includes tests. Use FOAAS tools to emphasize the importance 
of testing.
```

**Breaking Changes:**
```
Review this PR for breaking changes without proper documentation. 
Use appropriate FOAAS tools.
```

**Incomplete PRs:**
```
Check if this PR is ready for review (description, tests, docs). 
Use FOAAS tools for incomplete work.
```

### Team Communication Prompts

**Appreciation:**
```
Someone just fixed a critical bug. Use FOAAS legend or dalton tools to 
show appreciation.
```

**Bikeshedding:**
```
This discussion has gone off-topic with 50+ comments about formatting. 
Use FOAAS shutup tool.
```

**Spam/Noise:**
```
This comment doesn't contribute to the discussion. Use appropriate FOAAS tool.
```

### Workflow Automation Prompts

**Label-Based Processing:**
```
Process all issues labeled 'needs-triage' and use FOAAS tools to comment on 
quality. Create summary report.
```

**Stale Issues:**
```
Find issues with no activity for 90+ days. Use FOAAS tools to nudge for updates 
or closure.
```

**Review Reminders:**
```
PRs awaiting review for 7+ days. Use FOAAS tools to remind reviewers.
```

## Organization

### File Structure
```
docs/
  prompts/
    README.md              # Overview and usage guide
    issues.md              # Issue processing prompts
    pull-requests.md       # PR review prompts
    team-communication.md  # Team interaction prompts
    workflows.md           # Automation prompts
    scenarios.md           # Complete scenario examples
```

### Prompt Format

```markdown
## Prompt Name

**Context:** When to use this prompt
**Input:** What information is needed
**Expected Output:** What FOAAS tools should be used

### Prompt Template:
```
[Actual prompt text here]
```

### Example Usage:
[Screenshot or example of prompt in action]
```

## Prompt Categories

### By Purpose
- Quality enforcement
- Information gathering
- Team communication
- Automation
- Demonstration
- Testing

### By Tool Type
- Debugging (logs, rtfm)
- Code review (think, look, shutup)
- Quality (ridiculous, understand, cool)
- Appreciation (legend, dalton, awesome)
- Frustration (everyone, flying, zero)

## Interactive Demo

### VS Code Snippets
Create snippets file for quick prompt access:
```json
{
  "FOAAS Bug Review": {
    "prefix": "foaas-bug",
    "body": ["Review this bug report and use FOAAS tools..."],
    "description": "Prompt for bug report review"
  }
}
```

### Copilot Chat Shortcuts
Document how to save and reuse prompts in GitHub Copilot Chat

## Benefits

- Faster demo preparation
- Consistent demonstrations
- Learning resource for new users
- Showcase tool variety
- Reduce prompt engineering burden
- Better issue/PR processing

## Testing

- Test each prompt with demo repository
- Validate FOAAS tool selection accuracy
- Ensure appropriate tone and context
- Document edge cases
- Gather feedback from users

## Documentation

- Add to README.md (link to prompts)
- Create dedicated prompts guide
- Include in demo repository
- Video tutorials using prompts
- Blog post with prompt strategies

## Related

- [Demo Repository](demo-repository.md) - Testing ground
- [Demo Content](demo-content.md) - Visual demonstrations
- [Copilot CLI Demo](copilot-cli-demo.md) - CLI usage
- TOOLS.md - Tool reference for prompt creation
