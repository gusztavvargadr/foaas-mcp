import { createMcpServer } from './server.js';
import { createHttpTransport } from './transport.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function main() {
  console.log('⚠️  FOAAS MCP Server - EXPLICIT CONTENT WARNING ⚠️');
  console.log('This server provides access to FOAAS (Fuck Off As A Service)');
  console.log('All responses contain explicit language and sarcasm.\n');

  // Create MCP server with all tools
  const mcpServer = createMcpServer();

  // Create HTTP transport with SSE
  createHttpTransport(mcpServer, PORT);
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
