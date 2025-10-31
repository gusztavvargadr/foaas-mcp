#!/bin/bash
# Simple automated demo generator using asciinema + agg
# This creates a GIF by running the existing interactive script

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"

cd "$REPO_ROOT"

# Colors
GREEN='\033[92m'
CYAN='\033[96m'
NC='\033[0m'

echo "🔥 FOAAS MCP Demo GIF Generator (Simple)"
echo ""

# Check dependencies
if ! command -v asciinema >/dev/null 2>&1; then
    echo "❌ asciinema not found. Install with: sudo apt-get install asciinema"
    exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
    echo "❌ docker not found"
    exit 1
fi

# Pull agg image
echo -e "${CYAN}📦 Pulling agg Docker image...${NC}"
docker pull -q ghcr.io/asciinema/agg >/dev/null 2>&1 || true

OUTPUT_DIR="$SCRIPT_DIR"

echo ""
echo -e "${GREEN}This will record the interactive demo script.${NC}"
echo -e "${GREEN}The script will auto-advance through issues.${NC}"
echo ""
echo "Output files (in docs/demo/gif/):"
echo "  - foaas-mcp-demo.cast"
echo "  - foaas-mcp-demo.gif"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 0
fi

# Record using the existing script with timeout-based auto-advance
echo ""
echo "🎬 Recording demo (will auto-advance)..."
echo ""

# Create a wrapper that runs the demo with auto-advance
cat > /tmp/foaas-demo-runner.sh << 'EOF'
#!/bin/bash
export DEMO_AUTO_ADVANCE=1
bash docs/demo/gif/workflow.sh
EOF
chmod +x /tmp/foaas-demo-runner.sh

# Record with asciinema
# Note: Terminal size is captured from the current terminal
asciinema rec \
    --overwrite \
    --command "bash /tmp/foaas-demo-runner.sh" \
    "$OUTPUT_DIR/foaas-mcp-demo.cast"

echo ""
echo "✅ Recording complete: $OUTPUT_DIR/foaas-mcp-demo.cast"
echo ""

# Convert to GIF
echo "🎨 Converting to GIF..."
docker run --rm -v "$OUTPUT_DIR:/data" ghcr.io/asciinema/agg \
    --speed 1.5 \
    --theme dracula \
    /data/foaas-mcp-demo.cast \
    /data/foaas-mcp-demo.gif

echo ""
echo "✅ GIF saved: $OUTPUT_DIR/foaas-mcp-demo.gif"
echo ""
echo "📊 File size: $(du -h "$OUTPUT_DIR/foaas-mcp-demo.gif" | cut -f1)"
echo ""
echo "🎉 Done! View with: xdg-open \"$OUTPUT_DIR/foaas-mcp-demo.gif\""

# Cleanup
rm -f /tmp/foaas-demo-runner.sh
