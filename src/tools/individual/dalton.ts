import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const daltonTool = {
  name: 'foaas_dalton',
  description: '⚠️ EXPLICIT CONTENT: Calls someone a "fucking problem solving super-hero" (Road House reference).',
  inputSchema: z.object({
    name: z.string().describe('Who is the problem-solving hero'),
    from: z.string().describe('Who is giving the compliment')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.dalton(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
