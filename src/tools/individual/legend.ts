import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const legendTool = {
  name: 'foaas_legend',
  description: '⚠️ EXPLICIT CONTENT: Call someone a "fucking legend". Use for genuine praise of a person.',
  inputSchema: z.object({
    name: z.string().describe('Person to call a legend (e.g., "Sarah", "the architect")'),
    from: z.string().describe('Who is giving the praise')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.legend(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
