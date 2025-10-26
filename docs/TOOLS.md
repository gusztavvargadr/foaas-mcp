# Tool Reference

⚠️ **Content Warning**: All tools contain explicit language by design.

FOAAS MCP provides **23 individual tools** that map directly to FOAAS API operations. Each tool provides a unique response - descriptions focus on when to use them, keeping the actual responses as surprises.

## Development Scenario Guide

Tools organized by common development situations:

### Scenario 1: Bug Reports & Debugging

**"Works on my machine" / Runtime errors**
- `foaas_logs` - When the solution is clearly in the logs

**"How do I use X?" / Questions in docs**
- `foaas_rtfm` - When documentation exists but wasn't read

**General confusion**
- `foaas_zero` - Express complete disinterest
- `foaas_everyone` - Universal dismissal
- `foaas_flying` - Maximum level of not caring

---

### Scenario 2: Code Reviews

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

---

### Scenario 3: Pull Requests & Issues

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

---

### Scenario 4: Team Communication

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

---

## Complete Tool List

### Appreciation & Praise (4 tools)

| Tool | Target? | When to Use |
|------|---------|-------------|
| `foaas_thanks` | No | Sarcastic thanks, ironic gratitude |
| `foaas_awesome` | No | Enthusiastic praise or celebrating wins |
| `foaas_legend` | Yes | Genuine praise for a specific person |
| `foaas_dalton` | Yes | Acknowledge someone's problem-solving |

### Rejections & Dismissals (3 tools)

| Tool | Target? | When to Use |
|------|---------|-------------|
| `foaas_because` | No | Answer "why not?" emphatically |
| `foaas_zero` | No | Express complete disinterest |
| `foaas_bye` | No | End conversations or discussions |

### Direct Confrontations (4 tools)

| Tool | Target? | When to Use |
|------|---------|-------------|
| `foaas_off` | Yes | Classic, direct dismissal |
| `foaas_gfy` | Yes | Military-style professional dismissal |
| `foaas_chainsaw` | Yes | Dramatic reaction, sarcastic disbelief |
| `foaas_keep` | Yes | Extended dismissal for persistent issues |

### General Frustration (3 tools)

| Tool | Target? | When to Use |
|------|---------|-------------|
| `foaas_everyone` | No | Universal dismissal of all parties |
| `foaas_flying` | No | Maximum level of not caring |
| `foaas_asshole` | No | General purpose insult or frustration |

### Code Review & Quality (9 tools)

| Tool | Target? | When to Use |
|------|---------|-------------|
| `foaas_logs` | No | Debugging issues, runtime errors |
| `foaas_rtfm` | No | Questions answered in documentation |
| `foaas_think` | Yes | Question someone's decision-making |
| `foaas_thinking` | Yes | Alternative phrasing for questioning |
| `foaas_shutup` | Yes | Stop bikeshedding or trivial debates |
| `foaas_look` | Yes | Request code review or point out issues |
| `foaas_ridiculous` | No | Absurd requirements or deadlines |
| `foaas_understand` | Yes | Express confusion about unclear work |
| `foaas_cool` | No | Sarcastic approval, dismiss excuses |

---

## Parameter Reference

All tools require a `from` parameter (who is sending the message).

Tools marked "Target? Yes" also require a `to` parameter (who/what is being addressed).

**Examples:**
```json
{
  "from": "GitHub Copilot"
}
```

```json
{
  "to": "issue-author",
  "from": "maintainer-bot"
}
```

---

## Usage Examples

### GitHub PR Comments

**Scenario**: Acknowledge great bug fix
```json
{
  "name": "foaas_legend",
  "arguments": {
    "to": "contributor-username",
    "from": "maintainer-bot"
  }
}
```

**Scenario**: Respond to trivial whitespace PR
```json
{
  "name": "foaas_cool",
  "arguments": {
    "from": "code-reviewer"
  }
}
```

**Scenario**: Request changes on confusing code
```json
{
  "name": "foaas_understand",
  "arguments": {
    "to": "pr-author",
    "from": "reviewer"
  }
}
```

### Issue Management

**Scenario**: Close duplicate issue
```json
{
  "name": "foaas_bye",
  "arguments": {
    "from": "issue-triager"
  }
}
```

**Scenario**: Respond to "doesn't work" with no logs
```json
{
  "name": "foaas_logs",
  "arguments": {
    "from": "support-team"
  }
}
```

**Scenario**: React to impossible deadline request
```json
{
  "name": "foaas_ridiculous",
  "arguments": {
    "from": "project-manager"
  }
}
```

### Code Review

**Scenario**: Stop bikeshedding on variable names
```json
{
  "name": "foaas_shutup",
  "arguments": {
    "to": "nitpicker",
    "from": "senior-dev"
  }
}
```

**Scenario**: Question a terrible architectural decision
```json
{
  "name": "foaas_think",
  "arguments": {
    "to": "architect",
    "from": "team-lead"
  }
}
```

---

## Tips for AI Agents

When selecting a tool, consider:

1. **Does it need a target?** - If addressing a specific person/thing, use tools that accept `to` parameter
2. **What's the tone?** - Sarcastic vs. genuine, dismissive vs. confrontational
3. **What's the context?** - Bug report, PR, issue, team discussion
4. **What's the goal?** - Praise, reject, confront, express frustration

The scenario guide above maps common situations to appropriate tools, but feel free to be creative and match the perfect tool to the context.
