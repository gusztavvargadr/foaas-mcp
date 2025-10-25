import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const awesomeTool = {
  name: 'foaas_awesome',
  description: '⚠️ EXPLICIT CONTENT: "This is fucking awesome" response. Use for enthusiastic praise or celebrating wins.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who finds it awesome. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.awesome(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
