#!/usr/bin/env bash
set -euo pipefail

# FOAAS MCP Demo Repository Setup Script
# Creates a demo repository with sample issues and PRs for testing FOAAS MCP tools

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LABELS_JSON="${SCRIPT_DIR}/labels.json"
ISSUES_JSON="${SCRIPT_DIR}/issues.json"
PULLS_JSON="${SCRIPT_DIR}/pull-requests.json"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
REPO_NAME="${DEMO_REPO_NAME:-foaas-mcp-demo}"
REPO_OWNER="${DEMO_REPO_OWNER:-$(gh api user -q .login)}"
REPO_VISIBILITY="${DEMO_REPO_VISIBILITY:-private}"
DRY_RUN="${DRY_RUN:-false}"

# Usage information
usage() {
  cat << EOF
Usage: $0 [OPTIONS]

Creates a demo repository with sample issues and PRs for testing FOAAS MCP tools.

OPTIONS:
  -n, --name NAME       Repository name (default: foaas-mcp-demo)
  -o, --owner OWNER     Repository owner (default: current user)
  -v, --visibility VIS  Repository visibility: public or private (default: private)
  -d, --dry-run         Show what would be created without creating anything
  -h, --help            Show this help message

ENVIRONMENT VARIABLES:
  DEMO_REPO_NAME        Same as --name
  DEMO_REPO_OWNER       Same as --owner
  DEMO_REPO_VISIBILITY  Same as --visibility
  DRY_RUN              Same as --dry-run (set to "true")

EXAMPLES:
  # Create private demo repo for current user
  $0

  # Create public demo repo with custom name
  $0 --name my-foaas-demo --visibility public

  # Preview what would be created
  $0 --dry-run

  # Use environment variables
  DEMO_REPO_NAME=test-repo DRY_RUN=true $0

DATA FILES:
  labels.json          - Label definitions (edit to customize)
  issues.json          - Issue templates (edit to customize)
  pull-requests.json   - PR templates (edit to customize)

EOF
  exit 0
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -n|--name)
      REPO_NAME="$2"
      shift 2
      ;;
    -o|--owner)
      REPO_OWNER="$2"
      shift 2
      ;;
    -v|--visibility)
      REPO_VISIBILITY="$2"
      shift 2
      ;;
    -d|--dry-run)
      DRY_RUN="true"
      shift
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo -e "${RED}Unknown option: $1${NC}"
      usage
      ;;
  esac
done

# Validate inputs
if [[ ! "$REPO_VISIBILITY" =~ ^(public|private)$ ]]; then
  echo -e "${RED}Error: visibility must be 'public' or 'private'${NC}"
  exit 1
fi

if [[ ! -f "$LABELS_JSON" ]]; then
  echo -e "${RED}Error: $LABELS_JSON not found${NC}"
  exit 1
fi

if [[ ! -f "$ISSUES_JSON" ]]; then
  echo -e "${RED}Error: $ISSUES_JSON not found${NC}"
  exit 1
fi

if [[ ! -f "$PULLS_JSON" ]]; then
  echo -e "${RED}Error: $PULLS_JSON not found${NC}"
  exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
  echo -e "${RED}Error: GitHub CLI (gh) is not installed${NC}"
  echo "Install it from: https://cli.github.com/"
  exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo -e "${RED}Error: jq is not installed${NC}"
  echo "Install it with: sudo apt install jq"
  exit 1
fi

# Check authentication
if ! gh auth status &> /dev/null; then
  echo -e "${RED}Error: Not authenticated with GitHub CLI${NC}"
  echo "Run: gh auth login"
  exit 1
fi

REPO_FULL="${REPO_OWNER}/${REPO_NAME}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  FOAAS MCP Demo Repository Setup                             ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "${YELLOW}Configuration:${NC}"
echo -e "  Repository: ${GREEN}${REPO_FULL}${NC}"
echo -e "  Visibility: ${GREEN}${REPO_VISIBILITY}${NC}"
echo -e "  Dry Run:    ${GREEN}${DRY_RUN}${NC}"
echo

if [[ "$DRY_RUN" == "true" ]]; then
  echo -e "${YELLOW}DRY RUN MODE - No changes will be made${NC}"
  echo
fi

# Function to execute or preview commands
execute() {
  local description="$1"
  shift
  
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${YELLOW}[DRY RUN]${NC} $description"
    echo -e "  Command: $*"
  else
    echo -e "${BLUE}▶${NC} $description"
    "$@"
  fi
}

# Check if repository exists
echo -e "${BLUE}Checking if repository exists...${NC}"
if gh repo view "$REPO_FULL" &> /dev/null; then
  echo -e "${YELLOW}⚠ Repository $REPO_FULL already exists${NC}"
  read -p "Do you want to use the existing repository? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Aborted${NC}"
    exit 1
  fi
  REPO_EXISTS=true
else
  REPO_EXISTS=false
fi

# Create repository if it doesn't exist
if [[ "$REPO_EXISTS" == "false" ]]; then
  echo
  echo -e "${GREEN}Creating repository...${NC}"
  execute "Create $REPO_VISIBILITY repository" \
    gh repo create "$REPO_FULL" \
      --"$REPO_VISIBILITY" \
      --description "Demo repository for FOAAS MCP - contains sample issues and PRs" \
      --add-readme
  echo -e "${GREEN}✓${NC} Repository created"
fi

# Create labels
echo
echo -e "${GREEN}Creating labels...${NC}"
LABEL_COUNT=$(jq length "$LABELS_JSON")
echo -e "  Loading ${LABEL_COUNT} labels from ${LABELS_JSON}"

for i in $(seq 0 $((LABEL_COUNT - 1))); do
  name=$(jq -r ".[$i].name" "$LABELS_JSON")
  description=$(jq -r ".[$i].description" "$LABELS_JSON")
  color=$(jq -r ".[$i].color" "$LABELS_JSON")
  
  execute "Create label '$name'" \
    gh label create "$name" \
      --repo "$REPO_FULL" \
      --description "$description" \
      --color "$color" \
      --force
done
echo -e "${GREEN}✓${NC} Labels created"

# Create issues
echo
echo -e "${GREEN}Creating issues...${NC}"
ISSUE_COUNT=$(jq length "$ISSUES_JSON")
echo -e "  Loading ${ISSUE_COUNT} issues from ${ISSUES_JSON}"

CREATED_ISSUES=()
for i in $(seq 0 $((ISSUE_COUNT - 1))); do
  title=$(jq -r ".[$i].title" "$ISSUES_JSON")
  body=$(jq -r ".[$i].body" "$ISSUES_JSON")
  labels=$(jq -r ".[$i].labels | join(\",\")" "$ISSUES_JSON")
  
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${YELLOW}[DRY RUN]${NC} Would create issue: $title"
  else
    echo -e "${BLUE}▶${NC} Creating issue: $title"
    issue_url=$(gh issue create \
      --repo "$REPO_FULL" \
      --title "$title" \
      --body "$body" \
      --label "$labels")
    issue_number=$(echo "$issue_url" | grep -oP 'issues/\K\d+')
    CREATED_ISSUES+=("$issue_number")
    echo -e "${GREEN}  ✓${NC} Created #${issue_number}"
  fi
done
echo -e "${GREEN}✓${NC} Issues created"

# Create pull requests
echo
echo -e "${GREEN}Creating pull requests...${NC}"
PR_COUNT=$(jq length "$PULLS_JSON")
echo -e "  Loading ${PR_COUNT} PRs from ${PULLS_JSON}"

CREATED_PRS=()
for i in $(seq 0 $((PR_COUNT - 1))); do
  title=$(jq -r ".[$i].title" "$PULLS_JSON")
  body=$(jq -r ".[$i].body" "$PULLS_JSON")
  head=$(jq -r ".[$i].head" "$PULLS_JSON")
  
  if [[ "$DRY_RUN" == "true" ]]; then
    echo -e "${YELLOW}[DRY RUN]${NC} Would create PR: $title (branch: $head)"
  else
    echo -e "${BLUE}▶${NC} Creating PR: $title"
    
    # Clone repo if not already cloned
    if [[ ! -d "/tmp/${REPO_NAME}" ]]; then
      git clone "https://github.com/${REPO_FULL}.git" "/tmp/${REPO_NAME}" &> /dev/null
    fi
    
    cd "/tmp/${REPO_NAME}"
    
    # Create branch with a dummy commit
    git checkout -b "$head" &> /dev/null || git checkout "$head" &> /dev/null
    echo "# ${title}" >> "DEMO-${head}.md"
    git add "DEMO-${head}.md"
    git commit -m "Demo: ${title}" &> /dev/null
    git push -u origin "$head" &> /dev/null
    
    # Create PR
    pr_url=$(gh pr create \
      --repo "$REPO_FULL" \
      --title "$title" \
      --body "$body" \
      --head "$head" \
      --base main)
    pr_number=$(echo "$pr_url" | grep -oP 'pull/\K\d+')
    CREATED_PRS+=("$pr_number")
    echo -e "${GREEN}  ✓${NC} Created #${pr_number}"
    
    cd - &> /dev/null
  fi
done
echo -e "${GREEN}✓${NC} Pull requests created"

# Cleanup temp directory
if [[ -d "/tmp/${REPO_NAME}" ]] && [[ "$DRY_RUN" == "false" ]]; then
  rm -rf "/tmp/${REPO_NAME}"
fi

# Summary
echo
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║${NC}  Demo Repository Setup Complete!                             ${BLUE}║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo
echo -e "${GREEN}Repository:${NC}   https://github.com/${REPO_FULL}"
echo

if [[ "$DRY_RUN" == "false" ]]; then
  echo -e "${GREEN}Created:${NC}"
  echo -e "  • ${#CREATED_ISSUES[@]} issues"
  echo -e "  • ${#CREATED_PRS[@]} pull requests"
  echo
  
  if [[ ${#CREATED_ISSUES[@]} -gt 0 ]]; then
    echo -e "${YELLOW}Issues:${NC}"
    for issue in "${CREATED_ISSUES[@]}"; do
      echo -e "  • https://github.com/${REPO_FULL}/issues/${issue}"
    done
    echo
  fi
  
  if [[ ${#CREATED_PRS[@]} -gt 0 ]]; then
    echo -e "${YELLOW}Pull Requests:${NC}"
    for pr in "${CREATED_PRS[@]}"; do
      echo -e "  • https://github.com/${REPO_FULL}/pull/${pr}"
    done
    echo
  fi
fi

echo -e "${GREEN}Next Steps:${NC}"
echo -e "  1. Configure VS Code MCP settings (.vscode/mcp.json)"
echo -e "  2. Enable the foaas-mcp server"
echo -e "  3. Restart MCP servers in GitHub Copilot"
echo -e "  4. Try commands like:"
echo -e "     ${BLUE}@workspace review this PR and respond appropriately${NC}"
echo -e "     ${BLUE}@workspace check issue #1 and provide feedback${NC}"
echo
echo -e "${YELLOW}Tool Coverage Analysis:${NC}"
echo -e "  Run: ${BLUE}./docs/demo/analyze-coverage.sh${NC}"
echo

if [[ "$DRY_RUN" == "true" ]]; then
  echo -e "${YELLOW}This was a dry run. Run without --dry-run to create the demo repo.${NC}"
fi
