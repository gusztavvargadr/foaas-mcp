# Configuration Options

**Status**: Backlog (Future v2.0)

## Goal

Add user-configurable options for customizing FOAAS MCP behavior without code changes.

## Proposed Options

### Content Filtering
- **Safe mode**: Mask or replace explicit content
- Censoring levels (none, partial, full)
- Custom replacement words
- Severity filtering
- Context-appropriate responses
- Workplace-friendly mode

### Response Customization
- Language selection (if FOAAS supports)
- Format preferences (message only, full response)
- Custom templates
- Response length limits

### Behavior Settings
- Timeout values
- Retry logic
- Error handling preferences
- **Logging levels** (debug, info, warn, error)
  - Debug mode: Everything logged (local development)
  - Production mode: Warnings, errors, minimal info only

### Performance
- Cache settings (if caching implemented)
- Rate limiting
- Connection pooling

## Configuration Methods

### Environment Variables
```bash
FOAAS_CENSOR_LEVEL=partial
FOAAS_LANGUAGE=en
FOAAS_TIMEOUT=5000
FOAAS_LOG_LEVEL=info
```

### Configuration File
```json
{
  "foaas": {
    "censor": "partial",
    "language": "en",
    "timeout": 5000,
    "logLevel": "info"
  }
}
```

### Docker Environment
```yaml
environment:
  - FOAAS_CENSOR_LEVEL=partial
  - FOAAS_TIMEOUT=5000
```

## Benefits

- User control over behavior
- Workplace-appropriate modes
- Flexible deployment
- No code changes needed
- Different configs for different contexts

## Considerations

### Pros
- Increases flexibility
- Accommodates different use cases
- Professional deployment options
- Easy to implement

### Cons
- Adds complexity
- Documentation burden
- Testing matrix grows
- May conflict with project's humorous nature
- Censoring defeats the purpose

## Implementation Priority

Low priority because:
- Current simplicity is a feature
- Explicit content is core to FOAAS
- Configuration adds cognitive load
- May be over-engineering
- Focus on core functionality first

## Alternative Approach

- Keep it simple (current approach)
- Fork for serious use cases
- Environment-specific Docker images
- Let users wrap with their own filters
