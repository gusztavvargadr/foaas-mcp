import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const daltonTool = {
  name: 'foaas_dalton',
  description: '⚠️ EXPLICIT CONTENT: Calls someone a "fucking problem solving super-hero" (Road House reference).',
  inputSchema: z.object({
    name: z.string().describe('REQUIRED: Who is the problem-solving hero. Use context: person who fixed the bug, resolved the issue, etc.'),
    from: z.string().describe('REQUIRED: Who is giving the compliment. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
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
