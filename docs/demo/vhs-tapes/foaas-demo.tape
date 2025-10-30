# VHS tape file for FOAAS MCP Server demo
# Install VHS: https://github.com/charmbracelet/vhs
# Run: vhs foaas-demo.tape

# Settings
Output foaas-mcp-demo.gif
Set Theme "Dracula"
Set Width 1200
Set Height 800
Set FontSize 18
Set TypingSpeed 50ms
Set Padding 20

# Start fresh
Hide
Type "clear"
Enter
Sleep 1s
Show

# Title
Type "# FOAAS MCP Server Demo"
Enter
Sleep 500ms
Type "# Responding to lazy bug reports with style"
Enter
Sleep 1s

# Show the issue
Type "clear"
Enter
Type "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Enter
Type "Issue #42: Application doesn't work"
Enter
Type "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Enter
Enter
Type "it doesn't work"
Enter
Enter
Type "help"
Enter
Sleep 2s

# User asks Copilot
Enter
Type "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Enter
Type "@copilot Can you help me respond to this issue?"
Sleep 1s
Enter
Sleep 1s

# Copilot thinking
Enter
Type "GitHub Copilot is thinking..."
Sleep 2s

# Copilot response
Enter
Type "GitHub Copilot"
Enter
Sleep 500ms
Enter
Type "I see this is a bug report with no details. Let me check what would be appropriate..."
Sleep 1s
Enter
Enter
Type "📋 Using FOAAS MCP Server (foaas_logs tool):"
Enter
Sleep 500ms

# FOAAS Response (the money shot)
Type "┌─────────────────────────────────────────────────────────────────────────┐"
Enter
Type "│ Read the fucking manual                                                   │"
Enter
Type "│                                                                         │"
Enter
Type "│ If you don't know what you are doing, read the fucking manual.         │"
Enter
Type "└─────────────────────────────────────────────────────────────────────────┘"
Enter
Sleep 2s

# Professional suggestion
Enter
Type "Here's a professional response you could use:"
Enter
Sleep 500ms
Enter
Type "┌─────────────────────────────────────────────────────────────────────────┐"
Enter
Type "│ Hi! Thanks for the report.                                                │"
Enter
Type "│                                                                         │"
Enter
Type "│ To help debug this, could you provide:                                 │"
Enter
Type "│                                                                         │"
Enter
Type "│ 1. What steps did you take?                                            │"
Enter
Type "│ 2. What error message did you see?                                     │"
Enter
Type "│ 3. What's in your logs? (\`docker logs <container>\`)                     │"
Enter
Type "│                                                                         │"
Enter
Type "│ See our troubleshooting guide for common issues.                       │"
Enter
Type "└─────────────────────────────────────────────────────────────────────────┘"
Enter
Sleep 2s

# Footer
Enter
Type "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Enter
Type "FOAAS MCP Server | 23 contextually-aware tools for AI assistants"
Enter
Type "github.com/gusztavvargadr/foaas-mcp"
Enter
Type "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
Enter

Sleep 3s
