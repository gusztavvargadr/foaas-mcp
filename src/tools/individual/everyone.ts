import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const everyoneTool = {
  name: 'foaas_everyone',
  description: 'Use for dismissing everyone at once, expressing frustration with all parties, universal rejection, or showing you\'re done with everything and everyone. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.everyone(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
