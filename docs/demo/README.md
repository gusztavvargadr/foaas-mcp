# FOAAS MCP Demo Materials

This directory contains everything needed to demo FOAAS MCP and create announcements.

## Files

### Demo Setup & Testing
- **`demo-setup.sh`** - Automated demo repository creation
- **`issues.json`** - 20 issue templates (100% tool coverage)
- **`pull-requests.json`** - 19 PR templates (all scenarios)  
- **`analyze-coverage.sh`** - Verify FOAAS tool coverage

### Recording
- **`recording-script.sh`** - Terminal demo automation

---

## Quick Start: Create Demo Repository

```bash
# Authenticate with GitHub CLI (first time only)
gh auth login

# Preview what would be created  
./docs/demo/demo-setup.sh --dry-run

# Create demo repository (private by default)
./docs/demo/demo-setup.sh

# Create public demo with custom name
./docs/demo/demo-setup.sh --name my-foaas-demo --visibility public
```

**Creates:**
- Repository with README
- 20 sample issues (lazy reports, security vulns, bikeshedding, etc.)
- 19 sample PRs (excellent fixes, vague descriptions, breaking changes, etc.)
- All 23 FOAAS tools covered
- Proper labels

### Customizing Demo Data

Edit JSON files to customize scenarios:

```bash
# Edit templates
vim docs/demo/issues.json
vim docs/demo/pull-requests.json

# Verify coverage
./docs/demo/analyze-coverage.sh
```

**JSON Format (issues.json):**
```json
{
  "title": "Application crashes on startup",
  "body": "it doesn't work\n\nhelp",
  "labels": ["bug"],
  "suggested_tool": "foaas_logs or foaas_rtfm",
  "scenario": "Lazy bug report without details"
}
```

**JSON Format (pull-requests.json):**
```json
{
  "title": "Fix memory leak in session handler",
  "body": "## Summary\nFixes memory leak...",
  "head": "fix/memory-leak",
  "suggested_tool": "foaas_legend",
  "scenario": "Excellent PR with tests"
}
```

---

## Tool Coverage Analysis

Check FOAAS tool coverage:

```bash
./docs/demo/analyze-coverage.sh
```

**Current Status: 100% Coverage** (23/23 tools, 39 samples)

Output shows:
- Coverage percentage
- Tools by category (Appreciation, Rejections, Confrontations, Code Quality)
- Sample distribution (issues vs PRs)
- Missing tools (if any)

---

## Recording Terminal Demo

### Automated Recording Script

```bash
# Run the script, record it
./docs/demo/recording-script.sh
```

**Shows:**
1. Docker image pull
2. List FOAAS tools (23 total)
3. Three scenarios:
   - Praising teammate (`foaas_legend`)
   - Lazy bug reports (`foaas_logs`)
   - Celebrating success (`foaas_awesome`)

**Duration:** ~30 seconds

### Recording Tools

#### Option 1: Peek (GIF with GUI)
```bash
sudo apt install peek
peek  # Position over terminal, click Record
```

#### Option 2: asciinema + gif-for-cli
```bash
sudo apt install asciinema
npm install -g @asciinema/gif-generator

asciinema rec demo.cast
agg demo.cast demo.gif
```

### Optimize GIF

```bash
sudo apt install gifsicle
gifsicle -O3 --colors 256 demo.gif -o demo-optimized.gif

# Verify size (should be < 5MB for LinkedIn)
ls -lh demo-optimized.gif
```

---

## LinkedIn Post Versions

### Version 1: Technical Focus (Recommended)

```
🚀 Shipped: FOAAS MCP Server v0.1.0

After exploring Model Context Protocol, I built my first MCP server as a learning project - and it turned into something actually useful for demo purposes.

The FOAAS MCP Server exposes 23 humorous response tools through Docker, demonstrating MCP's ability to extend AI assistants with custom capabilities. Perfect for testing agentic workflows with... shall we say, colorful feedback.

🔧 Architecture highlights:
• stdio transport (no HTTP complexity)
• Docker-first design (isolated, portable)
• Individual tool pattern (AI picks contextual best fit)
• TypeScript + Zod schemas (type safety)

📦 Ready to use:
docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest

Integrates with GitHub Copilot in VS Code - the demo GIF shows it responding appropriately to issues and PRs in a test repository.

⚠️ Content warning: Intentionally contains explicit language (it's FOAAS after all)

This was a great way to learn MCP architecture, Docker packaging, and automated CI/CD. Looking forward to building more useful servers!

Full repo: [link]

#MCP #ModelContextProtocol #AITooling #Docker #OpenSource #LearningInPublic
```

### Version 2: Story Focus

```
💭 Learning by doing: I built an MCP server (and learned a lot)

Been exploring Model Context Protocol for a few weeks. Read the docs, tried examples, but nothing clicks like building something yourself.

So I built the FOAAS MCP Server - a deliberately humorous demo that wraps FOAAS in Docker and exposes it through MCP's tool protocol.

What I learned:
✅ MCP's stdio transport is beautifully simple  
✅ Docker-first architecture = zero dependency hell
✅ Type safety (Zod) catches issues early
✅ Individual tools > grouped tools for AI selection

The demo shows GitHub Copilot using it to respond to issues and PRs - it actually picks appropriate responses based on context!

v0.1.0 is live on GHCR. MIT licensed. Feedback welcome!

⚠️ Note: Contains explicit language (FOAAS is intentionally profane)

[link to repo]

#MCP #LearningInPublic #AI #OpenSource #Docker
```

### Version 3: Short & Punchy

```
🎯 Built my first MCP server: FOAAS MCP

23 humorous response tools. Docker packaged. stdio transport. GitHub Copilot integration demo.

Perfect for testing agentic workflows with... personality.

⚠️ Warning: Explicit language (it's FOAAS)

Live on GHCR, MIT licensed.

[link]

#MCP #ModelContextProtocol #AI #Docker
```

---

## Hashtag Strategy

**Primary (always include):**
- `#MCP` - Core technology
- `#ModelContextProtocol` - Full name for discoverability

**Secondary (choose 3-4):**
- `#AI` - Broad reach
- `#AITooling` - Specific niche
- `#Docker` - Technology showcase  
- `#OpenSource` - Community signal
- `#LearningInPublic` - Personal touch (Version 2)
- `#GitHub` - Platform mention (if showing Copilot)

**Maximum:** 7-10 hashtags (LinkedIn allows 3, but more work in practice)

---

## Posting Guidelines

### Timing
- **Best:** Tuesday-Thursday, 7-9 AM or 12-1 PM (timezone: EU/US business hours)
- **Avoid:** Weekends, late night, holidays

### Content Warning
Include in post or first comment:
```
⚠️ Content Warning: This project intentionally contains explicit language.
It's a demo/learning tool using the FOAAS API (Fuck Off As A Service).
```

### Engagement Tips
- **First hour:** Respond quickly to comments
- **Ask questions:** "What MCP servers are you building?"
- **Share learnings:** "The hardest part was..."
- **Be humble:** "First attempt, feedback welcome"

### Follow-up Content Ideas
1. **Technical deep dive:** Architecture decisions (thread or article)
2. **Development log:** What I learned building this
3. **Demo video:** Extended tutorial
4. **Comparison:** MCP vs other extension patterns

---

## Troubleshooting

### Recording Issues

**Problem:** Peek doesn't capture transparent terminal  
**Solution:** Change terminal to solid background before recording

**Problem:** asciinema GIF is huge  
**Solution:** Use gifsicle with `-O3 --colors 256` and limit recording time

**Problem:** Text too small in GIF  
**Solution:** Increase terminal font size before recording (20pt+)

### Demo Script Issues

**Problem:** Docker pull takes too long  
**Solution:** Pull image before recording, script will use cached version

**Problem:** Commands run too fast  
**Solution:** Edit `recording-script.sh` and increase sleep times

### LinkedIn Upload

**Problem:** GIF too large (>5MB)  
**Solution:** Reduce colors, dimensions, or duration:
```bash
gifsicle -O3 --colors 128 --resize 800x_ demo.gif -o demo-small.gif
```

**Problem:** Post flagged for profanity  
**Solution:** Add content warning as first line, avoid profanity in post text itself

---

## What's Next?

After posting:

1. **Monitor engagement** (first 2-4 hours critical)
2. **Respond to comments** promptly
3. **Share in relevant communities** (MCP Discord, Reddit r/MachineLearning)
4. **Consider follow-up** content (blog post, video tutorial)
5. **Update README** with "Featured on LinkedIn" badge (optional)

---

## Resources

- [Model Context Protocol Docs](https://modelcontextprotocol.io/docs)
- [FOAAS API](https://www.foaas.com/)
- [LinkedIn Best Practices](https://www.linkedin.com/help/linkedin/answer/a522288)
- [GIF Optimization Guide](https://www.npmjs.com/package/gifsicle)

---

**Questions?** Open an issue or reach out on LinkedIn!
