# Tool Reference

FOAAS MCP provides 18 tools in two categories:

## Individual Tools (14) - `foaas_*` prefix

Direct 1:1 mapping to FOAAS API operations.

### Appreciation (4)
- `foaas_thanks` - Sarcastic "fuck you very much"
- `foaas_awesome` - Enthusiastic "this is fucking awesome"
- `foaas_legend` - "You're a fucking legend"
- `foaas_dalton` - "Problem solving super-hero" (Road House)

### Rejections (3)
- `foaas_because` - "Why? Because fuck you, that's why"
- `foaas_zero` - "Zero, that's the number of fucks I give"
- `foaas_bye` - "Fuckity bye-bye"

### Confrontations (4)
- `foaas_off` - Classic "Fuck off"
- `foaas_gfy` - Military "Golf Foxtrot Yankee"
- `foaas_chainsaw` - "Fuck me gently with a chainsaw" (Heathers)
- `foaas_keep` - "Keep fucking off until you reach the horizon"

### Frustration (3)
- `foaas_everyone` - "Everyone can fuck off"
- `foaas_flying` - "I don't give a flying fuck"
- `foaas_asshole` - General purpose "Fuck you, asshole"

## Group Tools (4) - `proper_*` prefix

Intelligent wrappers that randomly select from multiple operations. **Not standard FOAAS** - these are custom tools.

### proper_appreciation
**Operations**: thanks, awesome, legend, dalton  
**Parameters**: `target` (optional), `from`, `operation` (optional)

Use when: Praise contributors, celebrate wins, express thanks

### proper_rejection  
**Operations**: because, zero, bye  
**Parameters**: `from`, `operation` (optional)

Use when: Decline requests, reject suggestions, end conversations

### proper_confrontation
**Operations**: off, gfy, chainsaw, keep  
**Parameters**: `target` (required), `from`, `operation` (optional)

Use when: Dismiss specific people/things, direct confrontation

### proper_frustration
**Operations**: everyone, flying, asshole  
**Parameters**: `from`, `operation` (optional)

Use when: Express universal frustration, show complete apathy

## Parameter Patterns

**Pattern A - Target-based:**
- `proper_appreciation`: target optional (some ops don't need it)
- `proper_confrontation`: target required (all ops need it)

**Pattern B - No target:**
- `proper_rejection`: general statements
- `proper_frustration`: universal feelings

## Examples

### Individual tool:
```json
{
  "name": "foaas_legend",
  "arguments": {
    "name": "the developer",
    "from": "AI assistant"
  }
}
```

### Group tool with target:
```json
{
  "name": "proper_appreciation",
  "arguments": {
    "target": "the developer",
    "from": "AI assistant",
    "operation": "random"
  }
}
```

### Group tool without target:
```json
{
  "name": "proper_frustration",
  "arguments": {
    "from": "AI assistant",
    "operation": "random"
  }
}
```
