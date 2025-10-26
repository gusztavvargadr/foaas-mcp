# All FOAAS Operations

**Status**: Backlog (Future v2.0)

## Goal

Expand from current 23 operations to support all ~50+ FOAAS operations available in the API.

## Current Coverage

**Implemented** (23 operations):
- Appreciation: thanks, awesome, legend, dalton
- Rejections: because, zero, bye
- Confrontations: off, gfy, chainsaw, keep
- Frustration: everyone, flying, asshole
- Code Review: logs, rtfm, think, thinking, shutup, look, ridiculous, understand, cool

**Not Yet Implemented** (~30+ operations):
- Additional variations and scenarios
- Language-specific operations
- Context-specific responses

## Implementation Approach

### Dynamic Discovery Option
- Query `/operations` endpoint at startup
- Dynamically generate tools from API response
- Reduce manual maintenance
- Automatically support new FOAAS operations
- Trade-off: Less control over tool descriptions

### Manual Implementation (Current)
- Curated tool selection
- Custom descriptions for AI context
- Better scenario categorization
- More control over user experience

### Research Phase
- Audit all FOAAS operations via `/operations` endpoint
- Evaluate dynamic discovery vs manual implementation
- Categorize by use case
- Identify overlaps with current tools
- Determine which add value

### Development
- Follow existing patterns (1 tool = 1 operation)
- Use shared schemas
- Add to appropriate scenario categories
- Update documentation
- Consider code generation for repetitive tools

### Testing
- Add to automated tests
- Validate with GitHub Copilot
- Ensure AI can select appropriately
- Test edge cases

## Considerations

### Benefits
- More variety in responses
- Cover more scenarios
- Comprehensive API coverage
- Better tool selection options

### Costs
- Tool discovery complexity (50+ tools)
- Maintenance overhead
- Diminishing returns (many similar tools)
- AI selection may be harder
- Documentation bloat

## Alternative Approaches

1. **Selective addition**: Only add operations with clear use cases
2. **Parameterization**: Use parameters to select variants
3. **Categories remain**: Keep current 23, add only truly unique operations
4. **User request**: Wait for community feedback on which operations are needed

## Recommendation

Start conservative:
- Current 23 tools cover most scenarios
- Add new operations based on user feedback
- Focus on quality over quantity
- Each new tool should add clear value
