# FOAAS MCP Demo Materials

This directory contains materials for demonstrating the FOAAS MCP Server's capabilities.

## 📁 Structure

```
docs/demo/
├── README.md          # This file
├── gif/              # GIF generation tools
│   ├── generate.sh              # Automated GIF generator
│   └── workflow.sh              # Demo script showing issue processing
└── repo/             # Demo repository setup
    ├── setup.sh                 # GitHub CLI script to create demo repo
    ├── issues.json              # Sample GitHub issues (20 items)
    ├── labels.json              # Sample labels
    └── pull-requests.json       # Sample PRs (19 items)
```

## 🎬 Generate Demo GIF

### Quick Start

```bash
# From repository root
cd /path/to/foaas-mcp

# Run the generator
bash docs/demo/gif/generate.sh
```

This will:
1. ✅ Check for `asciinema` and `docker`
2. ✅ Record the demo automatically (no manual input needed)
3. ✅ Convert to GIF using Docker-based `agg`
4. ✅ Output `foaas-mcp-demo.gif` in `docs/demo/gif/`

### Requirements

**Linux (Ubuntu/Debian):**
```bash
# Install asciinema
sudo apt-get update && sudo apt-get install -y asciinema

# Setup Docker-based agg
docker pull ghcr.io/asciinema/agg
```

**macOS:**
```bash
brew install asciinema agg
```

### What the Demo Shows

The automated demo processes 5 representative issues:

1. **Issue #1** - Lazy bug report → "Read the fucking manual"
2. **Issue #2** - Excellent bug report → "You're a fucking legend"
3. **Issue #3** - Absurd feature request → "That's fucking ridiculous"
4. **Issue #4** - Architecture bikeshedding → "Shut the fuck up"
5. **Issue #5** - Vague error report → "Look at what you're doing"

Each shows:
- 📋 Issue title and content
- � FOAAS response (internal)
- ✅ Professional comment added

## 📦 Create Demo Repository

Use the `setup.sh` script to create a live demo repository on GitHub with all sample issues and PRs.

### Quick Start

```bash
# From repository root
bash docs/demo/repo/setup.sh
```

This creates a repository named `foaas-mcp-demo` (private by default) with:
- ✅ 20 sample issues (various quality levels)
- ✅ 19 sample PRs (various scenarios)
- ✅ Labels and metadata

### Options

```bash
# Create public demo repo
bash docs/demo/repo/setup.sh --visibility public

# Custom repository name
bash docs/demo/repo/setup.sh --name my-foaas-demo

# Recreate existing repo (deletes and recreates)
bash docs/demo/repo/setup.sh --clean

# Preview without creating
bash docs/demo/repo/setup.sh --dry-run

# Full options
bash docs/demo/repo/setup.sh --name my-demo --owner myorg --visibility public
```

### Requirements

**GitHub CLI** must be installed and authenticated:

```bash
# Install gh CLI
# Linux: https://github.com/cli/cli/blob/trunk/docs/install_linux.md
# macOS: brew install gh

# Authenticate
gh auth login
```

### What Gets Created

The demo repository includes:

**20 Issues covering:**
- 🏆 Excellent reports (detailed, with reproduction steps)
- ❌ Poor reports (vague, missing info)
- 🎯 Absurd requests (unrealistic features)
- 🛑 Process issues (bikeshedding, urgent panic)

**19 Pull Requests covering:**
- ✨ Good PRs (clean, tested, documented)
- ⚠️ Problematic PRs (no tests, breaking changes)
- 🚫 Dangerous PRs (security issues, removing error handling)

**All 23 FOAAS tools** are represented across the issues and PRs.

## 🎨 Customization

### Adjust GIF Speed

Edit `docs/demo/gif/generate.sh` and change the `--speed` parameter:

```bash
docker run --rm -v "$OUTPUT_DIR:/data" ghcr.io/asciinema/agg \
    --speed 1.5 \    # Change this (1.0 = normal, 2.0 = 2x faster)
    --theme dracula \
    /data/foaas-mcp-demo.cast \
    /data/foaas-mcp-demo.gif
```

### Adjust Terminal Width

The demo uses 85-character width. To change, edit `docs/demo/gif/linkedin-workflow-demo.sh` line ~18:

```bash
SEP="━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
# Add or remove ━ characters to adjust width
```

### Customize Demo Issues/PRs

To modify what's created in the demo repository, edit the JSON files:

- **`repo/issues.json`** - Edit issue titles, bodies, labels
- **`repo/labels.json`** - Add/remove/change labels
- **`repo/pull-requests.json`** - Edit PR content

Then run `bash docs/demo/repo/setup.sh --clean` to recreate the repository.

## 📊 File Sizes

**GIF targets for social media:**
- ✅ < 5MB (LinkedIn limit)
- ✅ 1200x675 or similar (16:9 aspect ratio)
- ✅ 10-15 fps
- ✅ 20-40 seconds duration

The `generate.sh` script produces GIFs meeting these targets automatically.

## 🔗 Related

- **Main README**: `../../README.md` - Installation and usage
- **Contributing Guide**: `../../CONTRIBUTING.md` - Development setup
- **Demo Repository**: https://github.com/gusztavvargadr/foaas-mcp-demo - Live example

## 💡 Tips

**For best GIF results:**
- Run on a clean terminal (minimal scrollback)
- Ensure Docker has pulled the agg image
- Use a monospace font
- Close other applications for smooth recording
- Auto-advance demo takes ~60-90 seconds

**For demo repository:**
- Use `--dry-run` first to preview
- Use `--clean` to reset/recreate existing repo
- Make repo public after verifying content
- Pin 3-4 representative issues to showcase variety

**Troubleshooting:**
- If generation fails, check `asciinema --version` and `docker --version`
- If GIF is too large, increase `--speed` (1.5 → 2.0)
- If setup fails, check `gh auth status`
- If text is cut off, reduce terminal width in script

---

**Ready to demo?** 
- Generate GIF: `bash docs/demo/gif/generate.sh`
- Create repo: `bash docs/demo/repo/setup.sh`

🎉
