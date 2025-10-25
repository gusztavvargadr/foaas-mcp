import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const keepTool = {
  name: 'foaas_keep',
  description: '⚠️ EXPLICIT CONTENT: Epic extended "keep fucking off" dismissal. For persistent annoyances.',
  inputSchema: z.object({
    name: z.string().describe('REQUIRED: What/who should keep fucking off. Use context: persistent requester, annoying issue, etc.'),
    from: z.string().describe('REQUIRED: Who is dismissing them. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.keep(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
