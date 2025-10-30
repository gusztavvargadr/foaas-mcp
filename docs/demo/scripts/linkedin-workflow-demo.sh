#!/bin/bash
# Realistic demo simulating Copilot processing 5 GitHub issues with FOAAS MCP
# This shows the actual workflow: read issue → analyze → respond with FOAAS → add comment

# Colors
GRAY='\033[90m'
BLUE='\033[94m'
GREEN='\033[92m'
YELLOW='\033[93m'
CYAN='\033[96m'
WHITE='\033[97m'
BOLD='\033[1m'
DIM='\033[2m'
NC='\033[0m'

# Typing simulation
type_slow() {
    local text="$1"
    local delay="${2:-0.04}"
    for ((i=0; i<${#text}; i++)); do
        printf "%s" "${text:$i:1}"
        sleep "$delay"
    done
}

type_fast() {
    type_slow "$1" 0.015
}

# Issue data (from issues.json)
declare -a ISSUES=(
    "1|Application crashes on startup|it just doesn't work. Can someone fix this?|foaas_logs|Read the fucking manual|Check logs with: docker logs <container>"
    "2|Memory leak in user session handler|Detailed: Steps to reproduce, heap snapshots, proposed fix in src/auth/session-manager.ts|foaas_legend|You're a fucking legend|Excellent bug report! Assigning to backend team"
    "3|Add real-time collab, AI, blockchain, VR...|10 major features requested by next week|foaas_ridiculous|That's fucking ridiculous|Let's break this into realistic 3-month phases"
    "4|We should rewrite the entire application|Maybe microservices? Serverless? Blockchain? Service mesh?|foaas_shutup|Shut the fuck up|Focus on current roadmap. See: docs/ARCHITECTURE.md"
    "5|Upload error|Error when trying to upload file. Please fix.|foaas_look|Look at what you're doing|Provide: error message, file size, browser console logs"
)

clear
sleep 1

# Title
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${WHITE}  🔥 FOAAS MCP Server - GitHub Issue Triage Demo${NC}"
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
sleep 1

type_fast "Processing 5 issues from GitHub repository..."
echo ""
echo ""
sleep 1.5

# Process each issue
for issue_data in "${ISSUES[@]}"; do
    IFS='|' read -r number title body tool foaas_msg comment <<< "$issue_data"
    
    clear
    
    # Issue header
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${WHITE}${BOLD}Issue #${number}: ${title}${NC}"
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo -e "${DIM}${body}${NC}"
    echo ""
    sleep 1.5
    
    # User prompt
    echo -e "${CYAN}@copilot${NC} "
    type_slow "respond to this issue" 0.06
    echo ""
    sleep 0.8
    
    # Copilot thinking
    echo ""
    echo -e "${GRAY}GitHub Copilot is thinking...${NC}"
    sleep 1.5
    
    # Copilot analysis
    echo ""
    echo -e "${BLUE}${BOLD}GitHub Copilot${NC}"
    echo ""
    type_fast "Analyzing issue quality and context..."
    sleep 0.8
    echo ""
    echo ""
    
    # FOAAS tool selection
    type_fast "📋 Selected tool: ${tool}"
    echo ""
    sleep 0.5
    
    # FOAAS response
    echo ""
    echo -e "${YELLOW}┌─────────────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${YELLOW}│${NC} ${BOLD}${foaas_msg}${NC}"
    # Calculate padding
    padding=$((69 - ${#foaas_msg}))
    printf "${YELLOW}│${NC}\n"
    echo -e "${YELLOW}└─────────────────────────────────────────────────────────────────────┘${NC}"
    echo ""
    sleep 1.2
    
    # Professional comment
    type_fast "Generating professional response..."
    echo ""
    sleep 0.6
    echo ""
    echo -e "${GREEN}┌─────────────────────────────────────────────────────────────────────┐${NC}"
    echo -e "${GREEN}│${NC} ${BOLD}Hi! Thanks for the report.${NC}"
    printf "${GREEN}│${NC}\n"
    echo -e "${GREEN}│${NC} ${comment}"
    printf "${GREEN}│${NC}\n"
    echo -e "${GREEN}└─────────────────────────────────────────────────────────────────────┘${NC}"
    echo ""
    sleep 1s
    
    # Add comment action
    type_fast "✅ Comment added to Issue #${number}"
    echo ""
    sleep 1.5
    echo ""
    echo -e "${DIM}Press any key to continue...${NC}"
    read -n 1 -s -r
done

# Summary
clear
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BOLD}${WHITE}  ✅ Successfully Processed 5 Issues${NC}"
echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
sleep 1

echo -e "${WHITE}Each response was:${NC}"
echo -e "  ${GREEN}✓${NC} Contextually appropriate"
echo -e "  ${GREEN}✓${NC} Professionally framed"
echo -e "  ${GREEN}✓${NC} Actually helpful"
echo ""
sleep 2

echo -e "${BOLD}${WHITE}🔥 FOAAS MCP Server${NC}"
echo ""
echo -e "  ${CYAN}→${NC} 23 contextually-aware tools"
echo -e "  ${CYAN}→${NC} Works with GitHub Copilot in VS Code"
echo -e "  ${CYAN}→${NC} 100% Docker-based, zero configuration"
echo -e "  ${CYAN}→${NC} Open source (MIT license)"
echo ""
sleep 1

echo -e "${CYAN}${BOLD}🔗 github.com/gusztavvargadr/foaas-mcp${NC}"
echo ""
sleep 3
