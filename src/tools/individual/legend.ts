import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const legendTool = {
  name: 'foaas_legend',
  description: '⚠️ EXPLICIT CONTENT: Call someone a "fucking legend". Use for genuine praise of a person.',
  inputSchema: z.object({
    name: z.string().describe('REQUIRED: Person to call a legend. Use context: issue author, PR creator, helpful contributor, etc.'),
    from: z.string().describe('REQUIRED: Who is giving the praise. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
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
