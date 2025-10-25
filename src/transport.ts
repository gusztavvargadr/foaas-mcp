import express from 'express';
import cors from 'cors';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';

export function createHttpTransport(mcpServer: Server, port: number = 3000) {
  const app = express();

  // Enable CORS for remote access
  app.use(cors());
  app.use(express.json());

  // Root endpoint - information about the MCP server
  app.get('/', (_req, res) => {
    res.json({
      name: 'foaas-mcp',
      version: '0.1.0',
      description: '⚠️ EXPLICIT CONTENT - FOAAS MCP Server',
      endpoints: {
        sse: '/sse',
        message: '/message',
        health: '/health'
      },
      documentation: 'https://github.com/gusztavvargadr/foaas-mcp'
    });
  });

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'foaas-mcp' });
  });

  // SSE endpoint for MCP protocol
  app.get('/sse', async (req, res) => {
    console.log('New SSE connection established');
    
    const transport = new SSEServerTransport('/message', res);
    await mcpServer.connect(transport);

    // Handle client disconnect
    req.on('close', () => {
      console.log('SSE connection closed');
    });
  });

  // POST endpoint for MCP messages
  app.post('/message', async (req, res) => {
    // SSEServerTransport handles the message internally
    res.status(202).end();
  });

  // Start server
  const server = app.listen(port, () => {
    console.log(`🚀 FOAAS MCP Server running on http://localhost:${port}`);
    console.log(`📡 SSE endpoint: http://localhost:${port}/sse`);
    console.log(`💬 Message endpoint: http://localhost:${port}/message`);
    console.log(`❤️  Health check: http://localhost:${port}/health`);
  });

  return server;
}
