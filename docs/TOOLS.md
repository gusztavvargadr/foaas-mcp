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
**Operations**: `thanks`, `awesome`, `legend`, `dalton`  
**Parameters**: `target` (optional), `from`, `operation` (optional)

- **thanks**: Sarcastic "fuck you very much"
- **awesome**: Enthusiastic "This is fucking awesome"
- **legend**: Direct praise - "You're a fucking legend"
- **dalton**: Hero praise - "You're a fucking problem solving super-hero" (Road House reference)

**When to use**: Express appreciation, celebrate wins, praise contributors

**Target parameter**:
- Required for: `legend`, `dalton`
- Optional for: `thanks`, `awesome` (don't need a specific person)
- Random selection: If target provided, can pick any of 4; without target, only `thanks`/`awesome`

---

### 2. **foaas_tell_off** (Direct Confrontation)
**Operations**: `off`, `gfy`, `chainsaw`, `keep`  
**Parameters**: `target` (required), `from`, `operation` (optional)

- **off**: Classic "Fuck off, {target}"
- **gfy**: Military-style "Golf Foxtrot Yankee" (Go Fuck Yourself)
- **chainsaw**: Theatrical sarcastic disbelief - "Fuck me gently with a chainsaw, {target}!" (Heathers)
- **keep**: Extended dismissal - "Keep fucking off until you reach the horizon"

**When to use**: Dismiss requests, reject suggestions, tell someone/something to go away

**Target parameter**:
- Required for ALL operations in this group
- Examples: issue author, PR creator, person making request, annoying bug

---

### 3. **foaas_decline_request** (Rejections)
**Operations**: `because`, `zero`, `bye`  
**Parameters**: `from`, `operation` (optional)

- **because**: "Why? Because fuck you, that's why"
- **zero**: "Zero, that's the number of fucks I give"
- **bye**: "Fuckity bye-bye!"

**When to use**: Decline requests, express disinterest, end conversations

**No target parameter**: These are general statements that don't need a specific person

---

### 4. **foaas_express_frustration** (Universal Frustration)
**Operations**: `everyone`, `flying`, `asshole`  
**Parameters**: `from`, `operation` (optional)

- **everyone**: "Everyone can go and fuck off"
- **flying**: "I don't give a flying fuck"
- **asshole**: "Fuck you, asshole" (general purpose)

**When to use**: Express frustration with everything/everyone, show complete apathy, general insults

**No target parameter**: These express broad feelings, not directed at specific people

---

## Parameter Consistency

All group tools follow one of two patterns:

### Pattern A: Target-based groups
- `foaas_express_appreciation`: `target` (optional) + `from` + `operation`
- `foaas_tell_off`: `target` (required) + `from` + `operation`

**Rationale**: Some appreciation operations don't need a target (`thanks`, `awesome`), but all tell-off operations do.

### Pattern B: No-target groups  
- `foaas_decline_request`: `from` + `operation`
- `foaas_express_frustration`: `from` + `operation`

**Rationale**: These express general feelings/statements that aren't directed at anyone specific.

---

## Design Philosophy

1. **Semantic Grouping**: Operations grouped by intent, not just similar words
2. **Random Selection**: Each group can randomly pick an appropriate operation
3. **Context-Aware**: Groups respect whether a target makes sense semantically
4. **Individual Access**: All operations also available as standalone tools (`foaas_*`)

---

## Migration Notes (v0.1.0)

**What changed:**
- **Renamed all group tools** to use `foaas_` prefix for consistency:
  - `express_appreciation` → `foaas_express_appreciation`
  - `tell_off` → `foaas_tell_off`
  - `decline_request` → `foaas_decline_request`
  - `express_frustration` → `foaas_express_frustration`
- **Moved `dalton`** from `foaas_tell_off` → `foaas_express_appreciation`
  - **Reason**: "problem solving super-hero" is praise, not confrontation
  - **Impact**: `foaas_tell_off` now has 4 operations instead of 5
  - **Fix**: Users calling `foaas_tell_off` will no longer get praise mixed with dismissal

**What stayed consistent:**
- All parameter signatures unchanged for backward compatibility
- All individual tools (`foaas_*`) remain the same
- Random selection logic preserved

---

## Examples

### Using appreciation with target:
```json
{
  "name": "foaas_express_appreciation",
  "arguments": {
    "target": "the developer",
    "from": "AI assistant",
    "operation": "random"
  }
}
```
→ Could return: `legend`, `dalton`, `thanks`, or `awesome`

### Using appreciation without target:
```json
{
  "name": "foaas_express_appreciation", 
  "arguments": {
    "from": "AI assistant",
    "operation": "random"
  }
}
```
→ Could return: `thanks` or `awesome` (target-based ops excluded)

### Using tell_off (always needs target):
```json
{
  "name": "foaas_tell_off",
  "arguments": {
    "target": "the bug",
    "from": "AI assistant",
    "operation": "random"
  }
}
```
→ Could return: `off`, `gfy`, `chainsaw`, or `keep`

### Using decline_request (no target):
```json
{
  "name": "foaas_decline_request",
  "arguments": {
    "from": "AI assistant",
    "operation": "random"
  }
}
```
→ Could return: `because`, `zero`, or `bye`

### Using express_frustration (no target):
```json
{
  "name": "foaas_express_frustration",
  "arguments": {
    "from": "AI assistant",
    "operation": "random"
  }
}
```
→ Could return: `everyone`, `flying`, or `asshole`
