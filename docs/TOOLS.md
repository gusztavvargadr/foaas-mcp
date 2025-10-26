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
**Parameters**: `to` (optional), `from`

Use when: Praise contributors, celebrate wins, express thanks

### proper_rejection  
**Operations**: because, zero, bye  
**Parameters**: `from`

Use when: Decline requests, reject suggestions, end conversations

### proper_confrontation
**Operations**: off, gfy, chainsaw, keep  
**Parameters**: `to` (required), `from`

Use when: Dismiss specific people/things, direct confrontation

### proper_frustration
**Operations**: everyone, flying, asshole  
**Parameters**: `from`

Use when: Express universal frustration, show complete apathy

## Parameter Patterns

All tools use consistent **`from`/`to`** parameter naming:

- **`from`** (required): Who is performing the action (e.g., user name, person's name)
- **`to`** (optional/required): Who/what receives the message
  - Required for: `proper_confrontation`, individual tools like `foaas_off`, `foaas_legend`, etc.
  - Optional for: `proper_appreciation` (depends on operation)
  - Not used: `proper_rejection`, `proper_frustration`, simple tools like `foaas_thanks`

This consistent naming makes it easier for AI agents to understand the message direction.

## Examples

### Individual tool:
```json
{
  "name": "foaas_legend",
  "arguments": {
    "to": "the developer",
    "from": "Alice"
  }
}
```

### Group tool with target:
```json
{
  "name": "proper_appreciation",
  "arguments": {
    "to": "the developer",
    "from": "Bob",
    "operation": "random"
  }
}
```

### Group tool without target:
```json
{
  "name": "proper_frustration",
  "arguments": {
    "from": "Charlie",
    "operation": "random"
  }
}
```
