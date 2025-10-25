import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const chainsawTool = {
  name: 'foaas_chainsaw',
  description: '⚠️ EXPLICIT CONTENT: "Fuck me gently with a chainsaw" (Heathers reference). Sarcastic disbelief.',
  inputSchema: z.object({
    name: z.string().describe('Target/subject of disbelief'),
    from: z.string().describe('Who is expressing disbelief')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.chainsaw(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
