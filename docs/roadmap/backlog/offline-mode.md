# Offline Mode (Local FOAAS API)

**Status**: Backlog

## Goal

Enable fully offline operation by bundling or hosting a local version of FOAAS API, eliminating external network dependencies.

## Context

Current implementation requires network access to https://foaas.io. Some users may need offline operation for security, reliability, or testing purposes.

## Proposed Approaches

### Option 1: Bundled Static Responses
- Pre-generate all possible responses
- Bundle JSON files with Docker image
- No network calls needed
- Simple and fast
- Trade-off: No dynamic API updates

### Option 2: Local FOAAS API Instance
- Run own FOAAS API server
- Docker Compose setup with both services
- Full API compatibility
- More control and visibility
- Can modify/extend API

### Option 3: Hybrid Mode
- Try FOAAS API first
- Fall back to local responses if network unavailable
- Best of both worlds
- Requires response cache/bundle

## Implementation Details

### Bundled Responses Approach

**Structure:**
```
src/
  foaas/
    responses/
      thanks.json
      awesome.json
      legend.json
      ...
```

**Format:**
```json
{
  "thanks": {
    "template": "{{message}}",
    "message": "Fuck you very much",
    "subtitle": "- {from}"
  }
}
```

**Client Changes:**
- Check if offline mode enabled
- Load from bundled responses
- Interpolate parameters
- Return formatted response

### Local FOAAS API Setup

**docker-compose.yml:**
```yaml
services:
  foaas-api:
    image: foaas/foaas-api  # If exists
    # Or custom build
    ports:
      - "8080:8080"
    
  foaas-mcp:
    image: ghcr.io/gusztavvargadr/foaas-mcp
    environment:
      - FOAAS_API_URL=http://foaas-api:8080
    depends_on:
      - foaas-api
```

**Benefits:**
- Full API compatibility
- Can customize responses
- Usage monitoring
- Better control

### Configuration

**Environment Variables:**
```bash
# Offline mode (bundled responses)
FOAAS_OFFLINE_MODE=true

# Custom API URL (local instance)
FOAAS_API_URL=http://localhost:8080

# Hybrid mode
FOAAS_FALLBACK_OFFLINE=true
```

## Benefits

### Bundled Responses
- ✅ Zero network dependencies
- ✅ Faster responses (no HTTP overhead)
- ✅ Smaller attack surface
- ✅ Works in air-gapped environments
- ✅ Simpler deployment

### Local API Instance
- ✅ Full API compatibility
- ✅ Custom responses possible
- ✅ Usage analytics
- ✅ Version control
- ✅ Can extend with new operations

## Use Cases

### Offline Development
- No internet required
- Faster testing
- Consistent responses

### Air-Gapped Environments
- Security requirements
- Isolated networks
- Compliance needs

### Reliability
- No external API dependency
- No rate limiting concerns
- Always available

### Testing
- Predictable responses
- No network flakiness
- Faster CI/CD

## Considerations

### Bundled Responses
- Need to update when FOAAS API changes
- Missing dynamic content
- Larger Docker image
- Requires response maintenance

### Local API
- More complex setup
- Two containers to manage
- Need to maintain API server
- Additional resource usage

### Hybrid Mode
- More complex logic
- Need fallback mechanism
- Testing both code paths

## Implementation Steps

1. **Research FOAAS API:**
   - Document all operations and response formats
   - Check if FOAAS is open source
   - Evaluate hosting options

2. **Implement Bundled Mode:**
   - Create response templates
   - Update client with offline mode
   - Test all operations
   - Document configuration

3. **Optional Local API:**
   - Find or create FOAAS API Docker image
   - Create docker-compose setup
   - Test integration
   - Document deployment

4. **Testing:**
   - Test offline mode
   - Test local API mode
   - Test hybrid fallback
   - Performance comparison

## Self-Hosted FOAAS API

### Benefits of Self-Hosting
- **Control**: Customize responses and operations
- **Visibility**: Monitor usage patterns
- **Reliability**: No external dependencies
- **Privacy**: Keep requests private
- **Performance**: Lower latency
- **Customization**: Add custom operations

### Deployment Options
- Docker container
- Kubernetes deployment
- Cloud hosting (AWS, GCP, Azure)
- Self-hosted server

### Monitoring
- Request logs
- Usage statistics
- Popular tools/operations
- Performance metrics
- Error tracking

## Related

- [HTTP Transport](http-transport.md) - Remote access considerations
- [Configuration Options](configuration-options.md) - Environment config
- [Caching Layer](caching-layer.md) - Response caching
- Current FOAAS client in `src/foaas/client.ts`
