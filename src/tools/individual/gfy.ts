import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, toParam, formatFoaasResponse } from '../shared/schemas.js';

export const gfyTool = {
  name: 'foaas_gfy',
  description: 'Use for military-style dismissal, telling someone off in a formal manner, dismissing with phonetic code, or adding professional flair to profanity. Requires a target. ⚠️ EXPLICIT CONTENT.',
  inputSchema: z.object({
    to: toParam,
    from: fromParam
  }),
  handler: async (args: { to: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.gfy(args.to, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
