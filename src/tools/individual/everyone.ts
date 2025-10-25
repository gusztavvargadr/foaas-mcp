import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const everyoneTool = {
  name: 'foaas_everyone',
  description: '⚠️ EXPLICIT CONTENT: "Everyone can go and fuck off." Universal dismissal of all parties.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who is dismissing everyone. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.everyone(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
