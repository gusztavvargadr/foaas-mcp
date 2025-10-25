import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const zeroTool = {
  name: 'foaas_zero',
  description: '⚠️ EXPLICIT CONTENT: "Zero, that\'s the number of fucks I give." Use to express complete disinterest.',
  inputSchema: z.object({
    from: z.string().describe('Who gives zero fucks')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.zero(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
