#!/bin/bash
# Simple terminal demo of FOAAS MCP Server
# No recording - just run this and screen-record it manually

# Colors
GRAY='\033[90m'
BLUE='\033[94m'
GREEN='\033[92m'
YELLOW='\033[93m'
CYAN='\033[96m'
WHITE='\033[97m'
BOLD='\033[1m'
NC='\033[0m'

# Typing simulation
type_slow() {
    local text="$1"
    local delay="${2:-0.05}"
    for ((i=0; i<${#text}; i++)); do
        printf "%s" "${text:$i:1}"
        sleep "$delay"
    done
}

type_fast() {
    type_slow "$1" 0.02
}

# Press any key to continue
wait_key() {
    read -n 1 -s -r -p ""
}

clear
sleep 1

# Show issue context
echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${WHITE}Issue #42: Application doesn't work${NC}"
echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
sleep 0.5
echo ""
echo -e "${WHITE}it doesn't work${NC}"
echo ""
echo -e "${WHITE}help${NC}"
echo ""
sleep 2

# User asks Copilot for help
echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
sleep 0.5
echo -e "${CYAN}@copilot${NC} "
type_slow "Can you help me respond to this issue?" 0.06
echo ""
sleep 1

# Copilot thinking
echo ""
echo -e "${GRAY}GitHub Copilot is thinking...${NC}"
sleep 2

# Copilot response
echo ""
echo -e "${BLUE}${BOLD}GitHub Copilot${NC}"
echo ""
sleep 0.5

# The money shot - FOAAS response
type_fast "I see this is a bug report with no details. Let me check what would be appropriate..."
echo ""
sleep 1
echo ""
type_fast "📋 Using FOAAS MCP Server (foaas_logs tool):"
echo ""
sleep 0.5
echo -e "${YELLOW}┌─────────────────────────────────────────────────────────────────────────┐${NC}"
echo -e "${YELLOW}│${NC} ${BOLD}Read the fucking manual${NC}                                                   ${YELLOW}│${NC}"
echo -e "${YELLOW}│${NC}                                                                         ${YELLOW}│${NC}"
echo -e "${YELLOW}│${NC} ${WHITE}If you don't know what you are doing, read the fucking manual.${NC}         ${YELLOW}│${NC}"
echo -e "${YELLOW}└─────────────────────────────────────────────────────────────────────────┘${NC}"
echo ""
sleep 2

# Copilot provides helpful suggestion
type_fast "Here's a professional response you could use:"
echo ""
echo ""
sleep 0.5

echo -e "${GREEN}┌─────────────────────────────────────────────────────────────────────────┐${NC}"
echo -e "${GREEN}│${NC} ${BOLD}Hi! Thanks for the report.${NC}                                                ${GREEN}│${NC}"
echo -e "${GREEN}│${NC}                                                                         ${GREEN}│${NC}"
echo -e "${GREEN}│${NC} To help debug this, could you provide:                                 ${GREEN}│${NC}"
echo -e "${GREEN}│${NC}                                                                         ${GREEN}│${NC}"
echo -e "${GREEN}│${NC} 1. What steps did you take?                                            ${GREEN}│${NC}"
echo -e "${GREEN}│${NC} 2. What error message did you see?                                     ${GREEN}│${NC}"
echo -e "${GREEN}│${NC} 3. What's in your logs? (\`docker logs <container>\`)                     ${GREEN}│${NC}"
echo -e "${GREEN}│${NC}                                                                         ${GREEN}│${NC}"
echo -e "${GREEN}│${NC} See our troubleshooting guide for common issues.                       ${GREEN}│${NC}"
echo -e "${GREEN}└─────────────────────────────────────────────────────────────────────────┘${NC}"
echo ""
sleep 2

# Footer
echo ""
echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${WHITE}${BOLD}FOAAS MCP Server${NC} ${GRAY}|${NC} ${WHITE}23 contextually-aware tools for AI assistants${NC}"
echo -e "${CYAN}github.com/gusztavvargadr/foaas-mcp${NC}"
echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
sleep 3
