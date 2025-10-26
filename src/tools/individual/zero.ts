import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, formatFoaasResponse } from '../shared/schemas.js';

export const zeroTool = {
  name: 'foaas_zero',
  description: '⚠️ EXPLICIT CONTENT: "Zero, that\'s the number of fucks I give." Use to express complete disinterest.',
  inputSchema: z.object({
    from: fromParam
  }),
  handler: async (args: { from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.zero(args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
