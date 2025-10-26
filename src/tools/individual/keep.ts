import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, dismissPersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const keepTool = {
  name: 'foaas_keep',
  description: '⚠️ EXPLICIT CONTENT: Epic extended "keep fucking off" dismissal. For persistent annoyances.',
  inputSchema: z.object({
    name: dismissPersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.keep(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
