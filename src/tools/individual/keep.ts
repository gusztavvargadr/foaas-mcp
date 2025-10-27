import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse, DEFAULT_FROM } from '../shared/schemas.js';

export const keepTool = {
  name: 'foaas_keep',
  description: 'Use for dealing with persistent annoyances, dismissing someone who keeps bothering you, extended rejection, or emphasizing that someone should stay away. Requires a target.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from?: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.keep(args.to, args.from ?? DEFAULT_FROM);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
