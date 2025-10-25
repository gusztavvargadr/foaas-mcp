import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const becauseTool = {
  name: 'foaas_because',
  description: '⚠️ EXPLICIT CONTENT: "Why? Because fuck you, that\'s why." Use to reject questions or decline requests emphatically.',
  inputSchema: z.object({
    from: z.string().describe('REQUIRED: Who is rejecting the question. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.because(args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
