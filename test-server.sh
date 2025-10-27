#!/usr/bin/env bash
# Test script for FOAAS MCP Server
# Run this after building to verify everything works

set -e

# First argument: Docker image to test (default: foaas-mcp:local)
IMAGE="${1:-foaas-mcp:local}"

echo "🧪 Testing FOAAS MCP Server: $IMAGE"
echo ""

# Test 1: List Tools
echo "📋 Test 1: Listing all tools..."
RESULT=$(echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | docker run --rm -i "$IMAGE" 2>/dev/null | grep -o '"tools":\[' | wc -l)
if [ "$RESULT" -eq 1 ]; then
    echo "✅ Tools list returned successfully"
else
    echo "❌ Failed to list tools"
    exit 1
fi

# Test 2: Simple Tool Call
echo ""
echo "🎯 Test 2: Calling foaas_awesome..."
RESULT=$(echo '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"foaas_awesome","arguments":{"from":"TestUser"}}}' | docker run --rm -i "$IMAGE" 2>/dev/null | jq -r '.result.content[].text' | grep -i "fucking awesome" | wc -l)
if [ "$RESULT" -eq 1 ]; then
    echo "✅ Simple tool call successful"
else
    echo "❌ Simple tool call failed"
    exit 1
fi

# Test 3: Complex Tool Call
echo ""
echo "🎯 Test 3: Calling foaas_legend..."
JSON_LEGEND='{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"foaas_legend","arguments":{"to":"the developer","from":"TestUser"}}}'
RESULT=$(echo "$JSON_LEGEND" | docker run --rm -i "$IMAGE" 2>/dev/null | jq -r '.result.content[].text' | grep -i "fucking legend" | wc -l)
if [ "$RESULT" -eq 1 ]; then
    echo "✅ Complex tool call successful"
else
    echo "❌ Complex tool call failed"
    exit 1
fi

# Test 4: Verify response format (message only, no subtitle)
echo ""
echo "🔍 Test 4: Verifying response format..."
# Check that we get exactly 1 content item (message only, no subtitle)
RESULT=$(echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"foaas_thanks","arguments":{"from":"TestUser"}}}' | docker run --rm -i "$IMAGE" 2>/dev/null | jq '.result.content | length')
if [ "$RESULT" -eq 1 ]; then
    echo "✅ Response format correct (message only)"
else
    echo "❌ Unexpected response format (expected 1 content item, got $RESULT)"
    exit 1
fi

echo ""
echo "🎉 All tests passed! Server is working correctly."
echo ""
# Only show next steps if running in an interactive terminal (not in CI)
if [ -t 1 ]; then
    echo "Next steps:"
    echo "1. Restart MCP server in VS Code"
    echo "2. Enable 'foaas-mcp-local' server"
    echo "3. Test via GitHub Copilot chat"
fi
