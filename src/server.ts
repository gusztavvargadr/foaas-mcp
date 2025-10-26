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
import { logsTool } from './tools/individual/logs.js';
import { rtfmTool } from './tools/individual/rtfm.js';
import { thinkTool } from './tools/individual/think.js';
import { thinkingTool } from './tools/individual/thinking.js';
import { shutupTool } from './tools/individual/shutup.js';
import { lookTool } from './tools/individual/look.js';
import { ridiculousTool } from './tools/individual/ridiculous.js';
import { understandTool } from './tools/individual/understand.js';
import { coolTool } from './tools/individual/cool.js';

export function createMcpServer(): Server {
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
  
  // Initialize FOAAS client
  const foaasClient = new FoaasClient();

  // Register all tools
  const allTools = [
    // Appreciation & Praise
    thanksTool,
    awesomeTool,
    legendTool,
    daltonTool,
    // Rejections & Dismissals
    becauseTool,
    zeroTool,
    byeTool,
    // Direct Confrontations
    offTool,
    gfyTool,
    chainsawTool,
    keepTool,
    // General Frustration
    everyoneTool,
    flyingTool,
    assholeTool,
    // Code Review & Quality
    logsTool,
    rtfmTool,
    thinkTool,
    thinkingTool,
    shutupTool,
    lookTool,
    ridiculousTool,
    understandTool,
    coolTool,
  ];

  // Register list_tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    const tools = allTools.map(tool => ({
      name: tool.name,
      description: tool.description,
      inputSchema: zodToJsonSchema(tool.inputSchema),
    }));
    return { tools };
  });

  // Register call_tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const args = request.params.arguments;
    
    console.error(`[FOAAS-MCP] Tool called: ${toolName}`);
    
    const tool = allTools.find(t => t.name === toolName);

    if (!tool) {
      console.error(`[FOAAS-MCP] ERROR: Unknown tool: ${toolName}`);
      throw new Error(`Unknown tool: ${toolName}`);
    }
    
    // Parse and validate arguments
    const validatedArgs = tool.inputSchema.parse(args ?? {});

    // Call the tool handler with the client
    const result = await tool.handler(validatedArgs as never, foaasClient);
    
    console.error(`[FOAAS-MCP] Tool completed: ${toolName}`);
    
    return result;
  });

  return server;
}
