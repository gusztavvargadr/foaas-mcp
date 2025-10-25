import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const chainsawTool = {
  name: 'foaas_chainsaw',
  description: '⚠️ EXPLICIT CONTENT: "Fuck me gently with a chainsaw, {name}!" (Heathers reference). Sarcastic disbelief directed at someone.',
  inputSchema: z.object({
    name: z.string().describe('REQUIRED: Who to express disbelief at. Use context: person with unbelievable request, shocking issue author, etc.'),
    from: z.string().describe('REQUIRED: Who is expressing disbelief. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
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
