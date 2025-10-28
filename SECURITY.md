# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.2.x   | :white_check_mark: |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

**⚠️ Please DO NOT open public issues for security vulnerabilities.**

We take security seriously. If you discover a security vulnerability, please report it responsibly.

### How to Report

We recommend using **GitHub Security Advisories** (preferred method):

1. Go to: https://github.com/gusztavvargadr/foaas-mcp/security/advisories/new
2. Click "Report a vulnerability"
3. Provide detailed information (see below)


### What to Include

To help us understand and address the issue quickly, please include:

- **Description**: Clear description of the vulnerability
- **Impact**: What could an attacker do? What data/systems are at risk?
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Affected Versions**: Which versions are affected?
- **Proof of Concept**: Code or commands demonstrating the issue (if applicable)
- **Suggested Fix**: If you have ideas for fixing it (optional)
- **Contact Information**: How we can reach you for follow-up questions

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days (triage, severity classification)
- **Fix Development**: Depends on severity
  - Critical: Immediate priority
  - High: Within 7 days
  - Medium: Within 30 days
  - Low: Next scheduled release
- **Disclosure**: Coordinated with reporter after fix is available

### What to Expect

1. **Confirmation**: We'll confirm receipt of your report
2. **Assessment**: We'll assess the severity and impact
3. **Communication**: We'll keep you updated on progress
4. **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous)
5. **Release**: We'll coordinate public disclosure timing with you

## Security Considerations

### Architecture Security Model

FOAAS MCP is designed with security in mind:

**Docker Isolation**:
- Runs in isolated Docker container
- Non-root user (nodejs UID 1001)
- Minimal attack surface
- No privileged operations

**Network Security**:
- **stdio-only transport** (no network exposure)
- No HTTP server listening on ports
- No inbound connections accepted
- Communication via standard input/output only

**Dependency Security**:
- Minimal dependencies (only essentials)
- Regular updates via Dependabot
- Automated security scanning
- Zero known vulnerabilities (maintained)

**Base Image**:
- Debian 12 Bookworm Slim (official, maintained)
- Regular security patches from Debian
- Better CVE management than Alpine
- LTS support through 2028

### Known Limitations

**By Design**:
- **Explicit Content**: Returns profanity from FOAAS (intentional, not a vulnerability)
- **External API Dependency**: Connects to foaas.io (public API, no sensitive data sent)
- **No Authentication**: MCP server assumes trusted local environment
- **No Data Validation**: Limited validation of FOAAS API responses (assumes API is trustworthy)

**Not Security Issues**:
- Offensive language in responses (expected behavior)
- Requires internet connection (documented dependency)
- No encryption for stdio transport (local IPC, not needed)

### What IS a Security Issue?

- **Container escape** possibilities
- **Privilege escalation** within container
- **Arbitrary code execution** via malicious input
- **Dependency vulnerabilities** with exploits
- **Denial of Service** attacks on MCP server
- **Information disclosure** of sensitive data
- **Supply chain attacks** (compromised dependencies)

### What is NOT a Security Issue?

- Offensive language in tool responses (by design)
- Rate limiting from FOAAS API (external service limitation)
- Network connectivity required (documented dependency)
- Missing features (use feature request instead)

## Security Updates

### Update Notification

Security updates are announced via:
- GitHub Security Advisories
- Release notes (with `security` label)
- Docker image tags (new versions)

### Applying Updates

**For Users**:

1. **Check for updates** regularly:
   ```bash
   docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest
   ```

2. **Review release notes** for security patches

3. **Restart MCP server** with new image

**For Developers**:

1. **Pull latest code**:
   ```bash
   git pull origin main
   ```

2. **Update dependencies**:
   ```bash
   npm install
   ```

3. **Rebuild Docker image**:
   ```bash
   npm run docker:build
   ```

## Security Best Practices for Users

### Recommended Configuration

1. **Use Official Images**: Only use images from `ghcr.io/gusztavvargadr/foaas-mcp`
2. **Pin Versions**: Use specific version tags (e.g., `v0.2.0`), not `latest`
3. **Regular Updates**: Update to latest stable release monthly
4. **Review Permissions**: Understand MCP tool capabilities before use
5. **Local Only**: Use stdio transport only (no HTTP)
6. **Docker Desktop**: Use Docker Desktop security features if available

### Docker Security

```bash
# Good: Use specific version, read-only container
docker run --rm -i --read-only ghcr.io/gusztavvargadr/foaas-mcp:v0.2.0

# Good: Drop capabilities (if needed for advanced security)
docker run --rm -i --cap-drop ALL ghcr.io/gusztavvargadr/foaas-mcp:v0.2.0

# Avoid: Using latest tag without verification
docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest
```

### VS Code MCP Configuration

**.vscode/mcp.json**:
```json
{
  "mcpServers": {
    "foaas": {
      "command": "docker",
      "args": [
        "run",
        "--rm",
        "-i",
        "--read-only",
        "ghcr.io/gusztavvargadr/foaas-mcp:v0.2.0"
      ]
    }
  }
}
```

## Security Scanning

We perform regular security scanning:

- **Dependabot**: Automated dependency vulnerability scanning (daily)
- **npm audit**: Local dependency checking (`npm audit`)
- **Docker**: Base image security updates from Debian
- **Code Review**: Manual security review of contributions
- **Future**: Trivy container scanning (planned in roadmap)

### Running Security Checks Locally

```bash
# Check for dependency vulnerabilities
npm audit

# Check for high/critical issues only
npm audit --audit-level=high

# Fix automatically (if possible)
npm audit fix
```

## Responsible Disclosure

We believe in responsible disclosure:

- **Private Reporting**: Report privately first (not public issues)
- **Coordinated Disclosure**: We'll work with you on timing
- **Credit**: We'll credit you in advisories (with your permission)
- **No Retaliation**: We won't pursue legal action for good-faith research

## Security Hall of Fame

We appreciate security researchers who help keep FOAAS MCP secure. Responsible disclosures will be acknowledged here (with permission):

<!-- Contributors will be listed here as security issues are reported and fixed -->

*No security issues reported yet.*

## Questions?

If you're unsure whether something is a security issue:

- **When in doubt, report it privately** (better safe than sorry)
- **Not urgent?** Open a regular issue
- **General security questions?** Open a [question issue](https://github.com/gusztavvargadr/foaas-mcp/issues/new?template=question.yml)

## Additional Resources

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [OWASP Container Security](https://owasp.org/www-project-docker-top-10/)
- [MCP Security Considerations](https://modelcontextprotocol.io/docs/security)

---

Thank you for helping keep FOAAS MCP secure! 🔒
