import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const byeTool = {
  name: 'foaas_bye',
  description: '⚠️ EXPLICIT CONTENT: "Fuckity bye-bye!" Use for emphatic goodbyes or ending conversations.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who is saying goodbye. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.bye(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
