import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const gfyTool = {
  name: 'foaas_gfy',
  description: '⚠️ EXPLICIT CONTENT: Military-style "Golf Foxtrot Yankee" (Go Fuck Yourself). Professional yet profane.',
  inputSchema: z.object({
    name: z.string().describe('REQUIRED: Target of the message. Use context: person being dismissed, issue author causing problems, etc.'),
    from: z.string().describe('REQUIRED: Who is sending the message. Use "Copilot" when called by AI, otherwise use the current user\'s name.')
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.gfy(args.name, args.from);
    return {
      content: [
        { type: 'text', text: response.message },
        { type: 'text', text: response.subtitle }
      ]
    };
  }
};
