# Shared Schemas Refactoring

**Completed**: October 26, 2025

## Goal

Apply DRY (Don't Repeat Yourself) principle across all tools by creating shared Zod schemas for common parameters and response formatting.

## What Changed

Created `src/tools/shared/schemas.ts` with:
- `fromParam` - Standard "from" parameter (who is performing the action)
- `toParam` - Standard "to" parameter (who/what is receiving/targeted)
- `formatFoaasResponse()` - Standard response formatter

## Impact

- All 23 tools now use consistent parameter definitions
- Single source of truth for parameter descriptions
- Easier maintenance (change once, affects all tools)
- Consistent response format across all tools
- Updated "Copilot" references to generic "AI assistant"

## Benefits

- **Consistency**: Parameters work the same across all tools
- **Maintainability**: Update schemas in one place
- **Clarity**: `from`/`to` direction immediately clear to AI agents
- **Quality**: Standard formatting ensures predictable responses

## Files Updated

- Created: `src/tools/shared/schemas.ts`
- Updated: All 23 tool files in `src/tools/individual/`
- Validated: Automated tests confirm schema consistency
