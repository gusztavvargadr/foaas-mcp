import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';

export const gfyTool = {
  name: 'foaas_gfy',
  description: '⚠️ EXPLICIT CONTENT: Military-style "Golf Foxtrot Yankee" (Go Fuck Yourself). Professional yet profane.',
  inputSchema: z.object({
    name: z.string().describe('Target of the message'),
    from: z.string().describe('Who is sending the message')
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
