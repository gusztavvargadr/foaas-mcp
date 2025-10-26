import { z } from 'zod';
import type { FoaasClient } from '../../foaas/client.js';
import type { CallToolResult } from '@modelcontextprotocol/sdk/types.js';
import { fromParam, praisePersonParam, formatFoaasResponse } from '../shared/schemas.js';

export const legendTool = {
  name: 'foaas_legend',
  description: '⚠️ EXPLICIT CONTENT: Call someone a "fucking legend". Use for genuine praise of a person.',
  inputSchema: z.object({
    name: praisePersonParam,
    from: fromParam
  }),
  handler: async (args: { name: string; from: string }, client: FoaasClient): Promise<CallToolResult> => {
    const response = await client.legend(args.name, args.from);
    return formatFoaasResponse(response.message, response.subtitle);
  }
};
