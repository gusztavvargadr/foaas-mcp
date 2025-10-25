import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { FoaasClient } from './foaas/client.js';

// Import individual tools
import { thanksTool } from './tools/individual/thanks.js';
import { awesomeTool } from './tools/individual/awesome.js';
import { legendTool } from './tools/individual/legend.js';
import { becauseTool } from './tools/individual/because.js';
import { zeroTool } from './tools/individual/zero.js';
import { byeTool } from './tools/individual/bye.js';
import { offTool } from './tools/individual/off.js';
import { gfyTool } from './tools/individual/gfy.js';
import { chainsawTool } from './tools/individual/chainsaw.js';
import { daltonTool } from './tools/individual/dalton.js';
import { keepTool } from './tools/individual/keep.js';
import { everyoneTool } from './tools/individual/everyone.js';
import { flyingTool } from './tools/individual/flying.js';
import { assholeTool } from './tools/individual/asshole.js';

// Import group tools
import { expressAppreciationTool } from './tools/groups/express-appreciation.js';
import { declineRequestTool } from './tools/groups/decline-request.js';
import { tellOffTool } from './tools/groups/tell-off.js';
import { expressFrustrationTool } from './tools/groups/express-frustration.js';

export function createMcpServer(): Server {
  console.error('[FOAAS-MCP] Creating MCP server...');
  
  const server = new Server(
    {
      name: 'foaas-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  console.error('[FOAAS-MCP] Server created, initializing FOAAS client...');
  
  // Initialize FOAAS client
  const foaasClient = new FoaasClient();

  // Register all individual tools
  const individualTools = [
    thanksTool,
    awesomeTool,
    legendTool,
    becauseTool,
    zeroTool,
    byeTool,
    offTool,
    gfyTool,
    chainsawTool,
    daltonTool,
    keepTool,
    everyoneTool,
    flyingTool,
    assholeTool,
  ];

  // Register all group tools
  const groupTools = [
    expressAppreciationTool,
    declineRequestTool,
    tellOffTool,
    expressFrustrationTool,
  ];

  // Combine all tools
  const allTools = [...individualTools, ...groupTools];

  console.error(`[FOAAS-MCP] Registered ${allTools.length} tools (${individualTools.length} individual, ${groupTools.length} group)`);

  // Register list_tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    console.error('[FOAAS-MCP] list_tools request received');
    const tools = allTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.inputSchema),
    }));
    console.error(`[FOAAS-MCP] Returning ${tools.length} tool definitions`);
    return { tools };
  });

  // Register call_tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = request.params.arguments;
    
    console.error(`[FOAAS-MCP] call_tool request: ${toolName}`);
    console.error(`[FOAAS-MCP] Arguments received:`, JSON.stringify(args, null, 2));
    
    const tool = allTools.find(t => t.name === toolName);

    if (!tool) {
      console.error(`[FOAAS-MCP] ERROR: Unknown tool: ${toolName}`);
      throw new Error(`Unknown tool: ${toolName}`);
    }

    console.error(`[FOAAS-MCP] Tool found: ${toolName}, validating arguments...`);
    
    // Parse and validate arguments
    const validatedArgs = tool.inputSchema.parse(args ?? {});
    
    console.error(`[FOAAS-MCP] Arguments validated:`, JSON.stringify(validatedArgs, null, 2));
    console.error(`[FOAAS-MCP] Calling tool handler...`);

    // Call the tool handler with the client
    const result = await tool.handler(validatedArgs as never, foaasClient);
    
    console.error(`[FOAAS-MCP] Tool handler completed successfully`);
    
    return result;
  });

  console.error('[FOAAS-MCP] All handlers registered, server ready');

  return server;
}
