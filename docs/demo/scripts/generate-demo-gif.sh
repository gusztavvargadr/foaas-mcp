#!/bin/bash
# Generate animated GIF demo of FOAAS MCP Server in action
# Simulates a GitHub Copilot interaction responding to a lazy bug report

set -e

# Check dependencies
check_deps() {
    local missing=()
    
    command -v asciinema >/dev/null 2>&1 || missing+=("asciinema")
    command -v agg >/dev/null 2>&1 || missing+=("agg")
    
    if [ ${#missing[@]} -gt 0 ]; then
        echo "❌ Missing dependencies: ${missing[*]}"
        echo ""
        echo "Install with:"
        echo "  asciinema: pip install asciinema"
        echo "  agg: cargo install agg  (or download from https://github.com/asciinema/agg/releases)"
        exit 1
    fi
}

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

# Main demo script
demo_script() {
    clear
    sleep 1
    
    # Show issue context
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BOLD}${WHITE}Issue #42: Application doesn't work${NC}"
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    sleep 0.5
    echo ""
    echo -e "${WHITE}it doesn't work${NC}"
    echo ""
    echo -e "${WHITE}help${NC}"
    echo ""
    sleep 2
    
    # User asks Copilot for help
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
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
    type_fast "📋 Checking logs (foaas_logs):"
    echo ""
    sleep 0.5
    echo -e "${YELLOW}┌─────────────────────────────────────────────────┐${NC}"
    echo -e "${YELLOW}│${NC} ${BOLD}Read the fucking manual${NC}                         ${YELLOW}│${NC}"
    echo -e "${YELLOW}│${NC}                                                 ${YELLOW}│${NC}"
    echo -e "${YELLOW}│${NC} ${WHITE}If you don't know what you are doing, read${NC}     ${YELLOW}│${NC}"
    echo -e "${YELLOW}│${NC} ${WHITE}the fucking manual.${NC}                             ${YELLOW}│${NC}"
    echo -e "${YELLOW}└─────────────────────────────────────────────────┘${NC}"
    echo ""
    sleep 2
    
    # Copilot provides helpful suggestion
    type_fast "Here's a professional response you could use:"
    echo ""
    echo ""
    sleep 0.5
    
    echo -e "${GREEN}┌─────────────────────────────────────────────────┐${NC}"
    echo -e "${GREEN}│${NC} ${BOLD}Hi! Thanks for the report.${NC}                      ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC}                                                 ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} To help debug this, could you provide:         ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC}                                                 ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} 1. What steps did you take?                    ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} 2. What error message did you see?             ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} 3. What's in your logs?                        ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC}    \`docker logs <container>\`                     ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC}                                                 ${GREEN}│${NC}"
    echo -e "${GREEN}│${NC} See our troubleshooting guide: [link]          ${GREEN}│${NC}"
    echo -e "${GREEN}└─────────────────────────────────────────────────┘${NC}"
    echo ""
    sleep 2
    
    # Footer
    echo ""
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${WHITE}${BOLD}FOAAS MCP Server${NC} ${GRAY}|${NC} ${WHITE}23 contextually-aware tools${NC}"
    echo -e "${CYAN}github.com/gusztavvargadr/foaas-mcp${NC}"
    echo -e "${GRAY}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    sleep 3
}

# Generate the recording
generate_recording() {
    local output_cast="foaas-mcp-demo.cast"
    local output_gif="foaas-mcp-demo.gif"
    
    echo "🎬 Recording demo..."
    
    # Create asciinema script input
    script -q -c "bash -c '$(declare -f demo_script type_slow type_fast); demo_script'" /dev/null > /dev/null 2>&1 &
    
    # Better approach: Record with asciinema
    SHELL=/bin/bash asciinema rec \
        --cols 80 \
        --rows 24 \
        --command "bash -c '$(declare -f demo_script type_slow type_fast GRAY BLUE GREEN YELLOW CYAN WHITE BOLD NC); demo_script'" \
        --overwrite \
        "$output_cast"
    
    echo "✅ Recording saved: $output_cast"
    echo ""
    
    # Convert to GIF
    echo "🎨 Converting to GIF..."
    agg \
        --cols 80 \
        --rows 24 \
        --fps 10 \
        --speed 1.0 \
        --font-size 16 \
        --theme dracula \
        "$output_cast" \
        "$output_gif"
    
    echo "✅ GIF saved: $output_gif"
    echo ""
    echo "📊 File size: $(du -h "$output_gif" | cut -f1)"
}

# Alternative: Generate frame-by-frame GIF using ImageMagick
generate_frames() {
    echo "📸 Alternative: Generating frame-by-frame animation..."
    echo "   (Not implemented - use asciinema method above)"
}

# Main
main() {
    echo "🔥 FOAAS MCP Demo GIF Generator"
    echo ""
    
    check_deps
    
    echo "This will create:"
    echo "  1. foaas-mcp-demo.cast (asciinema recording)"
    echo "  2. foaas-mcp-demo.gif (animated GIF)"
    echo ""
    
    read -p "Continue? (y/n) " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Cancelled."
        exit 0
    fi
    
    generate_recording
    
    echo ""
    echo "🎉 Done! Upload foaas-mcp-demo.gif to your LinkedIn post."
    echo ""
    echo "Tips:"
    echo "  - LinkedIn recommends GIFs under 5MB"
    echo "  - Adjust --fps and --speed in agg command to control timing"
    echo "  - Edit demo_script() function to customize the scenario"
}

main "$@"
