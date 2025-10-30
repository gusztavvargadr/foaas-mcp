#!/bin/bash
# Demo script for FOAAS MCP Server
# This script demonstrates the MCP server with GitHub Copilot CLI

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Typing effect function
type_text() {
    text="$1"
    delay=${2:-0.05}
    for ((i=0; i<${#text}; i++)); do
        echo -n "${text:$i:1}"
        sleep "$delay"
    done
    echo
}

# Clear and start demo
clear
sleep 1

# Title
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}    🔥 FOAAS MCP Server - CLI Demo 🔥${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo
sleep 2

# Scene 1: Show what we're using
echo -e "${GREEN}→ Using Docker-based MCP server${NC}"
sleep 1
type_text "$ docker pull ghcr.io/gusztavvargadr/foaas-mcp:latest" 0.03
sleep 0.5
echo "✓ Image already present"
echo
sleep 2

# Scene 2: List available tools
echo -e "${GREEN}→ Available tools (23 total):${NC}"
sleep 1
type_text '$ echo '\''{"jsonrpc":"2.0","id":1,"method":"tools/list"}'\'' | docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest | jq -r '\''.result.tools[].name'\'' | head -10' 0.02
sleep 0.5
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest 2>/dev/null | \
  jq -r '.result.tools[].name' | head -10
echo "... (13 more tools)"
echo
sleep 2

# Scene 3: Praise a teammate
echo -e "${GREEN}→ Scenario: Praising a teammate for fixing a critical bug${NC}"
sleep 1
type_text '$ # Using foaas_legend tool' 0.03
sleep 0.5
type_text '$ echo '\''{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_legend","arguments":{"to":"Sarah","from":"Team"}}}'\'' | docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest | jq -r '\''.result.content[0].text'\''' 0.02
sleep 0.5
echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_legend","arguments":{"to":"Sarah","from":"Team"}}}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest 2>/dev/null | \
  jq -r '.result.content[0].text'
echo
sleep 2

# Scene 4: Responding to lazy bug reports
echo -e "${GREEN}→ Scenario: Someone says 'it doesn'\''t work' with no details${NC}"
sleep 1
type_text '$ # Using foaas_logs tool' 0.03
sleep 0.5
type_text '$ echo '\''{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"foaas_logs","arguments":{"from":"DevTeam"}}}'\'' | docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest | jq -r '\''.result.content[0].text'\''' 0.02
sleep 0.5
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"foaas_logs","arguments":{"from":"DevTeam"}}}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest 2>/dev/null | \
  jq -r '.result.content[0].text'
echo
sleep 2

# Scene 5: Celebrating success
echo -e "${GREEN}→ Scenario: Celebrating a successful deployment${NC}"
sleep 1
type_text '$ # Using foaas_awesome tool' 0.03
sleep 0.5
type_text '$ echo '\''{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"Production"}}}'\'' | docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest | jq -r '\''.result.content[0].text'\''' 0.02
sleep 0.5
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"Production"}}}' | \
  docker run --rm -i ghcr.io/gusztavvargadr/foaas-mcp:latest 2>/dev/null | \
  jq -r '.result.content[0].text'
echo
sleep 2

# Closing
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${YELLOW}   ⭐ github.com/gusztavvargadr/foaas-mcp${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo
sleep 2
