#!/bin/bash
# Simple demo showing GitHub issue triage with FOAAS MCP responses

# Colors
GRAY='\033[90m'
GREEN='\033[92m'
CYAN='\033[96m'
WHITE='\033[97m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

SEP="━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Typing simulation
type_text() {
    local text="$1"
    local delay="${2:-0.02}"
    for ((i=0; i<${#text}; i++)); do
        printf "%s" "${text:$i:1}"
        sleep "$delay"
    done
}

# Issue data
declare -a ISSUES=(
    "1|Application crashes on startup|it just doesn't work. Can someone fix this?|Read the fucking manual|Check logs with: docker logs <container>"
    "2|Memory leak in user session handler|Detailed: Steps to reproduce, heap snapshots, proposed fix in src/auth/session-manager.ts|You're a fucking legend|Excellent bug report! Assigning to backend team"
    "3|Add real-time collab, AI, blockchain, VR...|10 major features requested by next week|That's fucking ridiculous|Let's break this into realistic 3-month phases"
    "4|We should rewrite the entire application|Maybe microservices? Serverless? Blockchain? Service mesh?|Shut the fuck up|Focus on current roadmap. See: docs/ARCHITECTURE.md"
    "5|Upload error|Error when trying to upload file. Please fix.|Look at what you're doing|Provide: error message, file size, browser console logs"
)

clear

# Title
echo -e "${BOLD}${CYAN}🔥 FOAAS MCP - GitHub Issue Triage${NC}"
echo -e "${GRAY}${SEP}${NC}"
echo ""
sleep 1

type_text "Processing 5 issues from repository..."
echo ""
echo ""
sleep 1

# Process each issue
for issue_data in "${ISSUES[@]}"; do
    IFS='|' read -r number title body foaas_msg comment <<< "$issue_data"
    
    # Issue header
    echo -e "${GRAY}${SEP}${NC}"
    echo -e "${WHITE}${BOLD}Issue #${number}: ${title}${NC}"
    echo -e "${GRAY}${SEP}${NC}"
    echo -e "${DIM}${body}${NC}"
    echo ""
    sleep 1
    
    # FOAAS response (internal)
    echo -e "${CYAN}� ${foaas_msg}${NC}"
    echo ""
    sleep 1
    
    # Professional comment
    type_text "✅ Adding comment..."
    echo ""
    echo -e "${GREEN}${comment}${NC}"
    echo ""
    sleep 1
    
    # Pause between issues
    if [ -z "$DEMO_AUTO_ADVANCE" ]; then
        sleep 3
    else
        sleep 2
    fi
    echo ""
done

# Summary
echo -e "${GRAY}${SEP}${NC}"
echo -e "${BOLD}${WHITE}✅ Processed 5 issues${NC}"
echo -e "${GRAY}${SEP}${NC}"
echo ""
sleep 1

echo -e "${BOLD}${WHITE}🔥 FOAAS MCP Server${NC}"
echo ""
echo -e "  ${CYAN}→${NC} 23 contextually-aware tools"
echo -e "  ${CYAN}→${NC} Works with GitHub Copilot in VS Code"
echo -e "  ${CYAN}→${NC} 100% Docker-based, zero configuration"
echo -e "  ${CYAN}→${NC} Open source (MIT license)"
echo ""
sleep 2

echo -e "${CYAN}${BOLD}🔗 github.com/gusztavvargadr/foaas-mcp${NC}"
echo ""
sleep 3
