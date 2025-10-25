import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const assholeTool = {
  name: 'foaas_asshole',
  description: '⚠️ EXPLICIT CONTENT: "Fuck you, asshole." General purpose insult or self-deprecation.',
  inputSchema: z.object({
    from: z.string().describe('Who is calling someone an asshole')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.asshole(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
