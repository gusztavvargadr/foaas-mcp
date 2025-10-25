import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const thanksTool = {
  name: 'foaas_thanks',
  description: '⚠️ EXPLICIT CONTENT: Sarcastic "fuck you very much" response. Use for ironic gratitude or sarcastic thanks.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who is saying thanks. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.thanks(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
