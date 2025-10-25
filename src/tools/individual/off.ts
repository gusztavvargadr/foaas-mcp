import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const offTool = {
  name: 'foaas_off',
  description: '⚠️ EXPLICIT CONTENT: Classic "Fuck off" directed at someone. Direct and unambiguous dismissal.',
  inputSchema: z.object({
    name: z.string().describe('Who to tell off (e.g., "Bob", "the bug", "that feature request")'),
    from: z.string().describe('Who is telling them off')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.off(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
