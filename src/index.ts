import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createMcpServer } from './server.js';

async function main() {
  // Create MCP server with all tools
  const mcpServer = createMcpServer();

  // Create stdio transport for local communication
  const transport = new StdioServerTransport();
  
  // Connect server to transport
  await mcpServer.connect(transport);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
