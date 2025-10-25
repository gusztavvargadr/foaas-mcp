import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const flyingTool = {
  name: 'foaas_flying',
  description: '⚠️ EXPLICIT CONTENT: "I don\'t give a flying fuck." Maximum level of not caring.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who doesn\'t give a flying fuck. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.flying(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
