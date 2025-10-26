# Caching Layer

**Status**: Backlog (Future v2.0)

## Goal

Implement optional caching for FOAAS API responses to reduce network calls and improve performance.

## Context

Current implementation makes fresh API calls for every request. FOAAS responses are deterministic for given inputs, making them cacheable.

## Proposed Implementation

### Cache Strategy
- In-memory cache (no external dependencies)
- LRU (Least Recently Used) eviction
- Configurable TTL (time-to-live)
- Optional: Redis support for distributed scenarios

### Cache Key
- Operation name
- All parameters (from, to, name, etc.)
- Format preference

### Configuration
- Environment variable to enable/disable
- Configurable cache size
- Configurable TTL
- Optional cache statistics

### Example
```typescript
// Cache key: foaas_legend:John:Jane
// TTL: 1 hour (responses don't change)
// Max size: 1000 entries
```

## Benefits

- Reduced API calls
- Faster response times
- Lower network usage
- Reduced FOAAS server load
- Better performance at scale

## Considerations

### Pros
- Deterministic responses (safe to cache)
- Simple to implement
- Performance improvement
- No external dependencies needed

### Cons
- Adds complexity
- Memory usage
- Cache invalidation edge cases
- Not needed for current use case (low volume)
- Diminishing returns for demonstration purposes

## Implementation Notes

If pursued:
1. Keep cache optional (disabled by default)
2. Use simple in-memory implementation first
3. Add cache statistics/monitoring
4. Document configuration options
5. Test performance improvements
6. Consider cache warming strategies

## Alternative Solutions

- Client-side caching (in MCP client)
- Simple memoization
- No caching (sufficient for demo use case)

## Recommendation

Low priority:
- Current performance is adequate
- Added complexity not justified yet
- Wait for actual performance issues
- Consider only if usage scales significantly
