# Phase 0.1: FOAAS API Research

**Date**: October 25, 2025  
**Status**: ✅ Complete

## API Overview

- **Base URL**: `https://foaas.io`
- **Operations Endpoint**: `/operations` (returns list of all available operations)
- **Response Format**: JSON (when `Accept: application/json` header is set)
- **Response Structure**: `{ "message": "...", "subtitle": "- ..." }`

## Selected Operations for PoC

### 🎭 Operation Categories

Based on use cases in AI development and code review contexts, operations are grouped as follows:

---

#### **1. Appreciation & Praise** (Sarcastic/Genuine)
*Use case: Thanking contributors, celebrating achievements, acknowledging work*

| Operation | Endpoint | Parameters | Response Example |
|-----------|----------|------------|------------------|
| **thanks** | `/thanks/:from` | `from` | "Fuck you very much. - GitHub" |
| **awesome** | `/awesome/:from` | `from` | "This is Fucking Awesome. - TeamLead" |
| **legend** | `/legend/:name/:from` | `name`, `from` | "Sarah, you're a fucking legend. - Boss" |

**AI Use Cases**:
- Sarcastically thank someone for a bug
- Praise a brilliant solution
- Acknowledge a code review comment

---

#### **2. Dismissals & Rejections** (Responses to requests/changes)
*Use case: Declining feature requests, rejecting modifications, saying no to scope creep*

| Operation | Endpoint | Parameters | Response Example |
|-----------|----------|------------|------------------|
| **because** | `/because/:from` | `from` | "Why? Because fuck you, that's why." |
| **zero** | `/zero/:from` | `from` | "Zero, that's the number of fucks I give." |
| **bye** | `/bye/:from` | `from` | "Fuckity bye-bye!" |

**AI Use Cases**:
- Respond to "why doesn't this work?" questions
- Decline unnecessary feature requests
- Express zero interest in changes
- End a conversation emphatically

---

#### **3. Direct Confrontations** (Named targets)
*Use case: Addressing specific people, entities, or concepts in code/reviews*

| Operation | Endpoint | Parameters | Response Example |
|-----------|----------|------------|------------------|
| **off** | `/off/:name/:from` | `name`, `from` | "Fuck off, Bob." |
| **gfy** | `/gfy/:name/:from` | `name`, `from` | "Golf foxtrot yankee, ServiceMesh." (military) |
| **chainsaw** | `/chainsaw/:name/:from` | `name`, `from` | "Fuck me gently with a chainsaw..." (Heathers) |
| **dalton** | `/dalton/:name/:from` | `name`, `from` | "Deadline: A fucking problem solving super-hero." |
| **keep** | `/keep/:name/:from` | `name`, `from` | "...Keep fucking off until you get back here..." |

**AI Use Cases**:
- Tell a specific bug to f**k off
- Address a problematic dependency
- Respond to a specific code reviewer
- React to a particular error message
- Epic dismissal of persistent issues

---

#### **4. Broad Dismissals** (General/Universal)
*Use case: Expressing frustration with everything, universal complaints*

| Operation | Endpoint | Parameters | Response Example |
|-----------|----------|------------|------------------|
| **everyone** | `/everyone/:from` | `from` | "Everyone can go and fuck off." |
| **flying** | `/flying/:from` | `from` | "I don't give a flying fuck." |
| **asshole** | `/asshole/:from` | `from` | "Fuck you, asshole." |

**AI Use Cases**:
- Express frustration with the entire codebase
- Respond when everything is broken
- Universal dismissal in chaotic situations
- Self-deprecating humor

---

## Detailed Endpoint Testing

### Generic Operations (from-only)

#### `/thanks/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/thanks/GitHub
```
```json
{
  "message": "Fuck you very much.",
  "subtitle": "- GitHub"
}
```
**Parameters**: `from` (who is saying thanks)

---

#### `/awesome/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/awesome/TeamLead
```
```json
{
  "message": "This is Fucking Awesome.",
  "subtitle": "- TeamLead"
}
```
**Parameters**: `from` (who finds it awesome)

---

#### `/because/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/because/Developer
```
```json
{
  "message": "Why? Because fuck you, that's why.",
  "subtitle": "- Developer"
}
```
**Parameters**: `from` (who is explaining)

---

#### `/everyone/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/everyone/ProjectManager
```
```json
{
  "message": "Everyone can go and fuck off.",
  "subtitle": "- ProjectManager"
}
```
**Parameters**: `from` (who is dismissing everyone)

---

#### `/bye/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/bye/Developer
```
```json
{
  "message": "Fuckity bye-bye!",
  "subtitle": "- Developer"
}
```
**Parameters**: `from` (who is saying goodbye)

---

#### `/flying/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/flying/Architect
```
```json
{
  "message": "I don't give a flying fuck.",
  "subtitle": "- Architect"
}
```
**Parameters**: `from` (who doesn't give a flying fuck)

---

#### `/zero/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/zero/Engineer
```
```json
{
  "message": "Zero, that's the number of fucks I give.",
  "subtitle": "- Engineer"
}
```
**Parameters**: `from` (who gives zero fucks)

---

#### `/asshole/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/asshole/Me
```
```json
{
  "message": "Fuck you, asshole.",
  "subtitle": "- Me"
}
```
**Parameters**: `from` (who is calling someone an asshole)

---

### Named Operations (name + from)

#### `/off/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/off/Bob/Alice
```
```json
{
  "message": "Fuck off, Bob.",
  "subtitle": "- Alice"
}
```
**Parameters**: `name` (target), `from` (sender)

---

#### `/legend/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/legend/Sarah/Boss
```
```json
{
  "message": "Sarah, you're a fucking legend.",
  "subtitle": "- Boss"
}
```
**Parameters**: `name` (target), `from` (sender)

---

#### `/gfy/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/gfy/ServiceMesh/DevOps
```
```json
{
  "message": "Golf foxtrot yankee, ServiceMesh.",
  "subtitle": "- DevOps"
}
```
**Parameters**: `name` (target), `from` (sender)  
**Note**: Military phonetic alphabet for "GFY" (Go Fuck Yourself)

---

#### `/chainsaw/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/chainsaw/BugTracker/QA
```
```json
{
  "message": "Fuck me gently with a chainsaw, BugTracker. Do I look like Mother Teresa?",
  "subtitle": "- QA"
}
```
**Parameters**: `name` (target), `from` (sender)  
**Note**: Heathers movie reference

---

#### `/dalton/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/dalton/Deadline/Manager
```
```json
{
  "message": "Deadline: A fucking problem solving super-hero.",
  "subtitle": "- Manager"
}
```
**Parameters**: `name` (target), `from` (sender)  
**Note**: Road House movie reference

---

#### `/keep/:name/:from`
```bash
curl -H "Accept: application/json" https://foaas.io/keep/Complaining/TeamLead
```
```json
{
  "message": "Complaining: Fuck off. And when you get there, fuck off from there too. Then fuck off some more. Keep fucking off until you get back here. Then fuck off again.",
  "subtitle": "- TeamLead"
}
```
**Parameters**: `name` (target behavior/thing), `from` (sender)  
**Note**: Epic extended dismissal

---

## MCP Tool Design Proposal

Based on the categories above, here's how we can structure the MCP tools:

### Approach 1: Category-Based Tools (Recommended for PoC)

```typescript
// 4 main tools covering all use cases

1. express_appreciation(target?: string, from: string)
   - Maps to: thanks, awesome, legend
   - If target provided: legend
   - Otherwise: thanks or awesome (could be random or parameter)

2. decline_request(reason: string, from: string)
   - Maps to: because, zero, bye
   - reason: "because" | "zero-fucks" | "goodbye"

3. tell_off(target: string, from: string, style?: string)
   - Maps to: off, gfy, chainsaw, dalton, keep
   - style: "direct" | "military" | "movie" | "calm"

4. express_universal_frustration(from: string, intensity?: string)
   - Maps to: everyone, flying, asshole
   - intensity: "everyone" | "flying-fuck" | "self-deprecating"
```

### Approach 2: Individual Tools (More explicit)

```typescript
// One tool per operation (15 tools total)
- foaas_thanks(from)
- foaas_awesome(from)
- foaas_legend(name, from)
- foaas_because(from)
- foaas_zero(from)
- foaas_bye(from)
- foaas_off(name, from)
- foaas_gfy(name, from)
// ... etc
```

### Approach 3: Hybrid (Best of both)

```typescript
// Grouped by signature pattern
- foaas_generic(operation: string, from: string)
  - operation: "thanks" | "awesome" | "because" | "everyone" | "bye" | "flying" | "zero" | "asshole"
  
- foaas_named(operation: string, name: string, from: string)
  - operation: "off" | "gfy" | "legend" | "chainsaw" | "dalton" | "keep"
```

## Recommended Approach for PoC

**Use Approach 1 (Category-Based)** because:
1. ✅ More intuitive for AI to understand use cases
2. ✅ Better discoverability (4 tools vs 15)
3. ✅ Easier to extend later
4. ✅ Natural language descriptions work better
5. ✅ Fits AI assistant conversation flow

## API Characteristics Observed

### Response Format
- ✅ Consistent JSON structure: `{ message, subtitle }`
- ✅ Message contains the main response
- ✅ Subtitle shows attribution (who said it)

### Rate Limiting
- ⚠️ No observed rate limiting in testing
- ⚠️ Should implement client-side throttling anyway
- ⚠️ Consider caching identical requests

### Error Handling
- ❓ Need to test: invalid parameters
- ❓ Need to test: network failures
- ❓ Need to test: API downtime

### Content Considerations
- ⚠️ All responses contain explicit language
- ⚠️ Must include content warnings in tool descriptions
- ⚠️ Should document responsible use guidelines

## Next Steps for Phase 0.2

1. Test remaining endpoints (why, zero, bye, flying, asshole, gfy, chainsaw, dalton, keep)
2. Document any special response formats or edge cases
3. Verify parameter validation behavior
4. Test error scenarios
5. Research MCP packaging for GitHub Copilot

## Sample MCP Tool Descriptions

```json
{
  "name": "express_appreciation",
  "description": "Express sarcastic or genuine appreciation (contains explicit language). Use to thank someone for their work, celebrate a win, or acknowledge a code review comment. Can be directed at a specific person or general.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "target": {
        "type": "string",
        "description": "Optional: specific person or thing to appreciate (e.g., 'Sarah', 'the code reviewer')"
      },
      "from": {
        "type": "string",
        "description": "Who is expressing appreciation (e.g., 'The Team', 'DevOps', your name)"
      },
      "style": {
        "type": "string",
        "enum": ["thanks", "awesome", "legend"],
        "description": "Style of appreciation: 'thanks' (sarcastic), 'awesome' (enthusiastic), 'legend' (praising)"
      }
    },
    "required": ["from"]
  }
}
```

---

**Phase 0.1 Status**: ✅ **Ready to proceed to Phase 0.2**

Key findings:
- ✅ API is straightforward and reliable
- ✅ JSON responses are consistent
- ✅ Selected operations cover diverse use cases
- ✅ Category-based tool design is viable
- ✅ Ready for packaging research

