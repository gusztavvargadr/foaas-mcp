import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const shutupTool = {
  name: 'foaas_shutup',
  description: 'Use for bikeshedding, endless debates, off-topic discussions, nitpicking in code reviews, or when someone won\'t stop arguing about trivial matters. Direct and unambiguous dismissal.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.shutup(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
