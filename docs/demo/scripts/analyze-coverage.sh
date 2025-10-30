#!/usr/bin/env bash
set -euo pipefail

# FOAAS MCP Tool Coverage Analysis
# Analyzes issues.json and pull-requests.json to show which FOAAS tools are covered

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ISSUES_JSON="${SCRIPT_DIR}/../data/issues.json"
PULLS_JSON="${SCRIPT_DIR}/../data/pull-requests.json"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# All 23 FOAAS tools
ALL_TOOLS=(
  "foaas_asshole"
  "foaas_awesome"
  "foaas_because"
  "foaas_bye"
  "foaas_chainsaw"
  "foaas_cool"
  "foaas_dalton"
  "foaas_everyone"
  "foaas_flying"
  "foaas_gfy"
  "foaas_keep"
  "foaas_legend"
  "foaas_logs"
  "foaas_look"
  "foaas_off"
  "foaas_ridiculous"
  "foaas_rtfm"
  "foaas_shutup"
  "foaas_thanks"
  "foaas_think"
  "foaas_thinking"
  "foaas_understand"
  "foaas_zero"
)

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  FOAAS MCP Tool Coverage Analysis                            ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo -e "${RED}Error: jq is not installed${NC}"
  exit 1
fi

# Check if data files exist
if [[ ! -f "$ISSUES_JSON" ]]; then
  echo -e "${RED}Error: $ISSUES_JSON not found${NC}"
  exit 1
fi

if [[ ! -f "$PULLS_JSON" ]]; then
  echo -e "${RED}Error: $PULLS_JSON not found${NC}"
  exit 1
fi

# Extract tools from issues
echo -e "${YELLOW}Analyzing issues.json...${NC}"
ISSUE_TOOLS=$(jq -r '.[].suggested_tool' "$ISSUES_JSON" | sort | uniq)
ISSUE_COUNT=$(echo "$ISSUE_TOOLS" | wc -l)
echo -e "  Found ${ISSUE_COUNT} unique tool references"

# Extract tools from PRs
echo -e "${YELLOW}Analyzing pull-requests.json...${NC}"
PR_TOOLS=$(jq -r '.[].suggested_tool' "$PULLS_JSON" | sort | uniq)
PR_COUNT=$(echo "$PR_TOOLS" | wc -l)
echo -e "  Found ${PR_COUNT} unique tool references"
echo

# Combine and parse all mentioned tools
ALL_MENTIONED=()
while IFS= read -r line; do
  # Split on " or " to handle multiple suggestions
  if [[ "$line" == *" or "* ]]; then
    # Handle multiple tools separated by " or "
    while IFS= read -r tool; do
      tool=$(echo "$tool" | xargs) # trim whitespace
      if [[ -n "$tool" ]]; then
        ALL_MENTIONED+=("$tool")
      fi
    done < <(echo "$line" | sed 's/ or /\n/g')
  else
    # Single tool
    tool=$(echo "$line" | xargs) # trim whitespace
    if [[ -n "$tool" ]]; then
      ALL_MENTIONED+=("$tool")
    fi
  fi
done < <(echo "$ISSUE_TOOLS"; echo "$PR_TOOLS")

# Get unique mentioned tools
UNIQUE_MENTIONED=($(printf '%s\n' "${ALL_MENTIONED[@]}" | sort -u))

# Coverage analysis
echo -e "${GREEN}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║${NC}  Tool Coverage Summary                                        ${GREEN}║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "${YELLOW}Total FOAAS tools:${NC} ${#ALL_TOOLS[@]}"
echo -e "${YELLOW}Covered tools:${NC}     ${#UNIQUE_MENTIONED[@]}"

COVERAGE_PERCENT=$(( ${#UNIQUE_MENTIONED[@]} * 100 / ${#ALL_TOOLS[@]} ))
echo -e "${YELLOW}Coverage:${NC}          ${COVERAGE_PERCENT}%"
echo

# Find covered tools
echo -e "${GREEN}✓ Covered Tools (${#UNIQUE_MENTIONED[@]}/23):${NC}"
for tool in "${UNIQUE_MENTIONED[@]}"; do
  # Count occurrences
  count=$(printf '%s\n' "${ALL_MENTIONED[@]}" | grep -c "^${tool}$" || true)
  echo -e "  • ${tool} ${BLUE}(${count} samples)${NC}"
done
echo

# Find missing tools
MISSING=()
for tool in "${ALL_TOOLS[@]}"; do
  found=false
  for mentioned in "${UNIQUE_MENTIONED[@]}"; do
    if [[ "$tool" == "$mentioned" ]]; then
      found=true
      break
    fi
  done
  if [[ "$found" == "false" ]]; then
    MISSING+=("$tool")
  fi
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo -e "${RED}✗ Missing Tools (${#MISSING[@]}/23):${NC}"
  for tool in "${MISSING[@]}"; do
    echo -e "  • ${tool}"
  done
  echo
  echo -e "${YELLOW}Suggestions:${NC}"
  echo -e "  Add samples for missing tools to ${ISSUES_JSON} or ${PULLS_JSON}"
else
  echo -e "${GREEN}🎉 All tools are covered!${NC}"
  echo
fi

# Category breakdown
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  Tool Category Breakdown                                      ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo

# Appreciation tools
APPRECIATION=("foaas_thanks" "foaas_awesome" "foaas_legend" "foaas_dalton")
echo -e "${YELLOW}Appreciation & Praise:${NC}"
for tool in "${APPRECIATION[@]}"; do
  if printf '%s\n' "${UNIQUE_MENTIONED[@]}" | grep -q "^${tool}$"; then
    echo -e "  ${GREEN}✓${NC} $tool"
  else
    echo -e "  ${RED}✗${NC} $tool"
  fi
done
echo

# Rejections
REJECTIONS=("foaas_because" "foaas_zero" "foaas_bye")
echo -e "${YELLOW}Rejections & Declines:${NC}"
for tool in "${REJECTIONS[@]}"; do
  if printf '%s\n' "${UNIQUE_MENTIONED[@]}" | grep -q "^${tool}$"; then
    echo -e "  ${GREEN}✓${NC} $tool"
  else
    echo -e "  ${RED}✗${NC} $tool"
  fi
done
echo

# Confrontations
CONFRONTATIONS=("foaas_off" "foaas_gfy" "foaas_chainsaw" "foaas_keep")
echo -e "${YELLOW}Confrontations & Dismissals:${NC}"
for tool in "${CONFRONTATIONS[@]}"; do
  if printf '%s\n' "${UNIQUE_MENTIONED[@]}" | grep -q "^${tool}$"; then
    echo -e "  ${GREEN}✓${NC} $tool"
  else
    echo -e "  ${RED}✗${NC} $tool"
  fi
done
echo

# Frustration
FRUSTRATION=("foaas_everyone" "foaas_flying" "foaas_asshole")
echo -e "${YELLOW}Frustration & Exasperation:${NC}"
for tool in "${FRUSTRATION[@]}"; do
  if printf '%s\n' "${UNIQUE_MENTIONED[@]}" | grep -q "^${tool}$"; then
    echo -e "  ${GREEN}✓${NC} $tool"
  else
    echo -e "  ${RED}✗${NC} $tool"
  fi
done
echo

# Code Quality
CODE_QUALITY=("foaas_logs" "foaas_rtfm" "foaas_think" "foaas_thinking" "foaas_shutup" "foaas_look" "foaas_ridiculous" "foaas_understand" "foaas_cool")
echo -e "${YELLOW}Code Review & Quality:${NC}"
for tool in "${CODE_QUALITY[@]}"; do
  if printf '%s\n' "${UNIQUE_MENTIONED[@]}" | grep -q "^${tool}$"; then
    echo -e "  ${GREEN}✓${NC} $tool"
  else
    echo -e "  ${RED}✗${NC} $tool"
  fi
done
echo

# Sample distribution
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  Sample Distribution                                          ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo

ISSUE_SAMPLES=$(jq length "$ISSUES_JSON")
PR_SAMPLES=$(jq length "$PULLS_JSON")
TOTAL_SAMPLES=$((ISSUE_SAMPLES + PR_SAMPLES))

echo -e "${YELLOW}Total samples:${NC}     ${TOTAL_SAMPLES}"
echo -e "${YELLOW}Issue samples:${NC}    ${ISSUE_SAMPLES}"
echo -e "${YELLOW}PR samples:${NC}       ${PR_SAMPLES}"
echo

# Recommendations
if [[ ${#MISSING[@]} -gt 0 ]]; then
  echo -e "${YELLOW}Recommendations:${NC}"
  echo -e "  1. Add ${#MISSING[@]} more samples to achieve 100% coverage"
  echo -e "  2. Consider edge cases for each tool"
  echo -e "  3. Balance between issue and PR samples"
  echo
fi

# Exit code based on coverage
if [[ ${#MISSING[@]} -eq 0 ]]; then
  exit 0
else
  exit 1
fi
